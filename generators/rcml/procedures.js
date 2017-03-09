/**
 * @fileoverview Generating RCML for procedures blocks.
 * @author semeiko@robotct.ru (Egor Semeiko)
 */
'use strict';
goog.provide('Blockly.RCML.procedures');
goog.require('Blockly.RCML');

Blockly.RCML['procedures_defreturn'] = function(block) {
    // Define a procedure with a return value.
    // First, add a 'global' statement for every variable that is not shadowed by
    // a local parameter.
    var globals = [];
    for (var i = 0, varName; varName = block.workspace.variableList[i]; i++) {
        if (block.arguments_.indexOf(varName) == -1) {
            globals.push(Blockly.RCML.variableDB_.getName(varName,
                Blockly.Variables.NAME_TYPE));
        }
    }
    globals = globals.length ? '  global ' + globals.join(', ') + ';\n' : '';

    var funcName = Blockly.RCML.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.RCML.statementToCode(block, 'STACK');
    if (Blockly.RCML.STATEMENT_PREFIX) {
        branch = Blockly.RCML.prefixLines(
                Blockly.RCML.STATEMENT_PREFIX.replace(/%1/g,
                    '\'' + block.id + '\''), Blockly.RCML.INDENT) + branch;
    }
    if (Blockly.RCML.INFINITE_LOOP_TRAP) {
        branch = Blockly.RCML.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + block.id + '\'') + branch;
    }
    var returnValue = Blockly.RCML.valueToCode(block, 'RETURN',
            Blockly.RCML.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = '  return ' + returnValue + ';\n';
    }
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.RCML.variableDB_.getName(block.arguments_[i],
            Blockly.Variables.NAME_TYPE);
    }
    var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
        globals + branch + returnValue + '}';
    code = Blockly.RCML.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    Blockly.RCML.definitions_['%' + funcName] = code;
    return null;
};
// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.RCML['procedures_defnoreturn'] =
    Blockly.RCML['procedures_defreturn'];
Blockly.RCML['procedures_callreturn'] = function(block) {
    // Call a procedure with a return value.
    var funcName = Blockly.RCML.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.RCML.valueToCode(block, 'ARG' + i,
                Blockly.RCML.ORDER_COMMA) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.RCML.ORDER_FUNCTION_CALL];
};
Blockly.RCML['procedures_callnoreturn'] = function(block) {
    // Call a procedure with no return value.
    var funcName = Blockly.RCML.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.RCML.valueToCode(block, 'ARG' + i,
                Blockly.RCML.ORDER_COMMA) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ');\n';
    return code;
};
Blockly.RCML['procedures_ifreturn'] = function(block) {
    // Conditionally return value from a procedure.
    var condition = Blockly.RCML.valueToCode(block, 'CONDITION',
            Blockly.RCML.ORDER_NONE) || 'false';
    var code = 'if (' + condition + ') {\n';
    if (block.hasReturnValue_) {
        var value = Blockly.RCML.valueToCode(block, 'VALUE',
                Blockly.RCML.ORDER_NONE) || 'null';
        code += '  return ' + value + ';\n';
    } else {
        code += '  return;\n';
    }
    code += '}\n';
    return code;
};