/**
 * @fileoverview Generating RCML for logic blocks.
 * @author semeiko@robotct.ru (Egor Semeiko)
 */
'use strict';
goog.provide('Blockly.RCML.logic');
goog.require('Blockly.RCML');


Blockly.RCML['controls_if'] = function(block) {
    // If/elseif/else condition.
    var n = 0;
    var code = '', branchCode, conditionCode;
    do {
        conditionCode = Blockly.RCML.valueToCode(block, 'IF' + n,
                Blockly.RCML.ORDER_NONE) || 'false';
        branchCode = Blockly.RCML.statementToCode(block, 'DO' + n);
        code += (n > 0 ? 'else ' : '') +
            'if (' + conditionCode + ') {\n' + branchCode + '}';

        ++n;
    } while (block.getInput('IF' + n));

    if (block.getInput('ELSE')) {
        branchCode = Blockly.RCML.statementToCode(block, 'ELSE');
        code += ' else {\n' + branchCode + '}';
    }
    return code + '\n';
};

Blockly.RCML['controls_ifelse'] = Blockly.RCML['controls_if'];

Blockly.RCML['logic_compare'] = function(block) {
    // Comparison operator.
    var OPERATORS = {
        'EQ': '==',
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
    };
    var operator = OPERATORS[block.getFieldValue('OP')];
    var order = (operator == '==' || operator == '!=') ?
        Blockly.RCML.ORDER_EQUALITY : Blockly.RCML.ORDER_RELATIONAL;
    var argument0 = Blockly.RCML.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.RCML.valueToCode(block, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Blockly.RCML['logic_operation'] = function(block) {
    // Operations 'and', 'or'.
    var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
    var order = (operator == '&&') ? Blockly.RCML.ORDER_LOGICAL_AND :
        Blockly.RCML.ORDER_LOGICAL_OR;
    var argument0 = Blockly.RCML.valueToCode(block, 'A', order);
    var argument1 = Blockly.RCML.valueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
        // If there are no arguments, then the return value is false.
        argument0 = 'false';
        argument1 = 'false';
    } else {
        // Single missing arguments have no effect on the return value.
        var defaultArgument = (operator == '&&') ? 'true' : 'false';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Blockly.RCML['logic_negate'] = function(block) {
    // Negation.
    var order = Blockly.RCML.ORDER_UNARY_PREFIX;
    var argument0 = Blockly.RCML.valueToCode(block, 'BOOL', order) || 'true';
    var code = '!' + argument0;
    return [code, order];
};

Blockly.RCML['logic_boolean'] = function(block) {
    // Boolean values true and false.
    var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
    return [code, Blockly.RCML.ORDER_ATOMIC];
};

Blockly.RCML['logic_null'] = function(block) {
    // Null data type.
    return ['null', Blockly.RCML.ORDER_ATOMIC];
};

Blockly.RCML['logic_ternary'] = function(block) {
    // Ternary operator.
    var value_if = Blockly.RCML.valueToCode(block, 'IF',
            Blockly.RCML.ORDER_CONDITIONAL) || 'false';
    var value_then = Blockly.RCML.valueToCode(block, 'THEN',
            Blockly.RCML.ORDER_CONDITIONAL) || 'null';
    var value_else = Blockly.RCML.valueToCode(block, 'ELSE',
            Blockly.RCML.ORDER_CONDITIONAL) || 'null';
    var code = value_if + ' ? ' + value_then + ' : ' + value_else;
    return [code, Blockly.RCML.ORDER_CONDITIONAL];
};
