/**
 * @fileoverview Generating RCML for variables blocks.
 * @author semeiko@robotct.ru (Egor Semeiko)
 */
'use strict';
goog.provide('Blockly.RCML.variables');
goog.require('Blockly.RCML');

Blockly.RCML['variables_get'] = function(block) {
    // Variable getter.
    var code = Blockly.RCML.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return [code, Blockly.RCML.ORDER_ATOMIC];
};

Blockly.RCML['variables_set'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.RCML.valueToCode(block, 'VALUE',
            Blockly.RCML.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.RCML.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return varName + ' = ' + argument0 + ';\n';
};