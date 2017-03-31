/**
 * @fileoverview Generating RCML for modules blocks.
 * @author semeiko@robotct.ru
 */
'use strict';
goog.provide('Blockly.RCML.rcml_modules');
goog.require('Blockly.RCML');

Blockly.RCML['module_return'] = function(block) {
    // Call a module with a return value.
    var moduleName = block.getFieldValue('MODULE');
    var funcName = block.getFieldValue('FUNCTION');
    var args = [];
    for (var i = 0; i < block.arguments_; i++) {
        var arg = Blockly.RCML.valueToCode(block, 'ARG' + i, Blockly.RCML.ORDER_COMMA) || null;
        if(arg) args[i] = arg;
    }
    var code = moduleName + funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.RCML.ORDER_FUNCTION_CALL];
};

Blockly.RCML['module_no_return'] = function(block) {
    // MODE Flag
    var flag = block.getFieldValue('FLAG');
    // Call a module with no return value.
    var moduleName = block.getFieldValue('MODULE');
    var funcName = block.getFieldValue('FUNCTION');
    var args = [];
    for (var i = 0; i < block.arguments_; i++) {
        var arg = Blockly.RCML.valueToCode(block, 'ARG' + i, Blockly.RCML.ORDER_COMMA) || null;
        if(arg) args[i] = arg;
    }
    return flag + moduleName + funcName + '(' + args.join(', ') + ');\n';
};