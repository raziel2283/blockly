/**
 * @fileoverview Helper functions for generating RCML for blocks.
 * @author semeiko@robotct.ru (Semeiko Egor)
 */
'use strict';
goog.provide('Blockly.RCML');
goog.require('Blockly.Generator');

/**
 * RCML code generator.
 * @type {!Blockly.Generator}
 */
Blockly.RCML = new Blockly.Generator('RCML');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.RCML.addReservedWords(
    'break,case,else,false,if,null,return,true,Null,loop,bool,and,or,not,throw,default,float,try,catch,include,include_lib'
);

/**
 * Order of operation ENUMs.
 * http://rcml.info/aboutrcml
 */
Blockly.RCML.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.RCML.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] . ?.
Blockly.RCML.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.RCML.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.RCML.ORDER_ADDITIVE = 4;       // + -
Blockly.RCML.ORDER_SHIFT = 5;          // << >>
Blockly.RCML.ORDER_BITWISE_AND = 6;    // &
Blockly.RCML.ORDER_BITWISE_XOR = 7;    // ^
Blockly.RCML.ORDER_BITWISE_OR = 8;     // |
Blockly.RCML.ORDER_RELATIONAL = 9;     // >= > <= < as is is!
Blockly.RCML.ORDER_EQUALITY = 10;      // == !=
Blockly.RCML.ORDER_LOGICAL_AND = 11;   // &&
Blockly.RCML.ORDER_LOGICAL_OR = 12;    // ||
Blockly.RCML.ORDER_IF_NULL = 13;       // ??
Blockly.RCML.ORDER_CONDITIONAL = 14;   // expr ? expr : expr
Blockly.RCML.ORDER_CASCADE = 15;       // ..
Blockly.RCML.ORDER_ASSIGNMENT = 16;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.RCML.ORDER_NONE = 99;          // (...)

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.RCML.init = function(workspace) {
    // Create a dictionary of definitions to be printed before the code.
    Blockly.RCML.definitions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    Blockly.RCML.functionNames_ = Object.create(null);

    // Push variables names
    if (!Blockly.RCML.variableDB_) Blockly.RCML.variableDB_ = new Blockly.Names(Blockly.RCML.RESERVED_WORDS_);
    else Blockly.RCML.variableDB_.reset();
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.RCML.finish = function(code) {
    // Indent every line.
    if (code) {
        code = Blockly.RCML.prefixLines(code, Blockly.RCML.INDENT);
    }
    code = 'function main() {\n' + code + '}';

    // Convert the definitions dictionary into a list.
    var imports = [];
    var definitions = [];
    for (var name in Blockly.RCML.definitions_) {
        var def = Blockly.RCML.definitions_[name];
        if (def.match(/^include\s/) || def.match(/^include_lib\s/)) {
            imports.push(def);
        } else {
            definitions.push(def);
        }
    }
    // Clean up temporary data.
    delete Blockly.RCML.definitions_;
    delete Blockly.RCML.functionNames_;
    Blockly.RCML.variableDB_.reset();
    var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n');
    return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.RCML.scrubNakedValue = function(line) {
    return line + ';\n';
};

/**
 * Encode a string as a properly escaped RCML string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} RCML string.
 * @private
 */
Blockly.RCML.quote_ = function(string) {
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n')
        .replace(/'/g, '\\\'');
    return '\'' + string + '\'';
};

/**
 * Common tasks for generating RCML from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The RCML code created for this block.
 * @return {string} RCML code with comments and subsequent blocks added.
 * @private
 */
Blockly.RCML.scrub_ = function(block, code) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        comment = Blockly.utils.wrap(comment, Blockly.RCML.COMMENT_WRAP - 3);
        if (comment) {
            commentCode += Blockly.RCML.prefixLines(comment, '// ') + '\n';
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.RCML.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.RCML.prefixLines(comment, '// ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = Blockly.RCML.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.RCML.getAdjusted = function(block, atId, opt_delta, opt_negate,
                                   opt_order) {
    var delta = opt_delta || 0;
    var order = opt_order || Blockly.RCML.ORDER_NONE;
    if (block.workspace.options.oneBasedIndex) {
        delta--;
    }
    var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
    if (delta > 0) {
        var at = Blockly.RCML.valueToCode(block, atId,
                Blockly.RCML.ORDER_ADDITION) || defaultAtIndex;
    } else if (delta < 0) {
        var at = Blockly.RCML.valueToCode(block, atId,
                Blockly.RCML.ORDER_SUBTRACTION) || defaultAtIndex;
    } else if (opt_negate) {
        var at = Blockly.RCML.valueToCode(block, atId,
                Blockly.RCML.ORDER_UNARY_NEGATION) || defaultAtIndex;
    } else {
        var at = Blockly.RCML.valueToCode(block, atId, order) ||
            defaultAtIndex;
    }

    if (Blockly.isNumber(at)) {
        // If the index is a naked number, adjust it right now.
        at = parseFloat(at) + delta;
        if (opt_negate) {
            at = -at;
        }
    } else {
        // If the index is dynamic, adjust it in code.
        if (delta > 0) {
            at = at + ' + ' + delta;
            var innerOrder = Blockly.RCML.ORDER_ADDITION;
        } else if (delta < 0) {
            at = at + ' - ' + -delta;
            var innerOrder = Blockly.RCML.ORDER_SUBTRACTION;
        }
        if (opt_negate) {
            if (delta) {
                at = '-(' + at + ')';
            } else {
                at = '-' + at;
            }
            var innerOrder = Blockly.RCML.ORDER_UNARY_NEGATION;
        }
        innerOrder = Math.floor(innerOrder);
        order = Math.floor(order);
        if (innerOrder && order >= innerOrder) {
            at = '(' + at + ')';
        }
    }
    return at;
};