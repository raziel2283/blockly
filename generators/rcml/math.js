/**
 * @fileoverview Generating RCML for math blocks.
 * @author semeiko@robotct.ru (Egor Semeiko)
 */
'use strict';
goog.provide('Blockly.RCML.math');
goog.require('Blockly.RCML');

Blockly.RCML['math_number'] = function(block) {
    // Numeric value.
    var code = parseFloat(block.getFieldValue('NUM'));
    return [code, Blockly.RCML.ORDER_ATOMIC];
};
Blockly.RCML['math_arithmetic'] = function(block) {
    // Basic arithmetic operators, and power.
    var OPERATORS = {
        'ADD': [' + ', Blockly.RCML.ORDER_ADDITION],
        'MINUS': [' - ', Blockly.RCML.ORDER_SUBTRACTION],
        'MULTIPLY': [' * ', Blockly.RCML.ORDER_MULTIPLICATION],
        'DIVIDE': [' / ', Blockly.RCML.ORDER_DIVISION],
        'POWER': [null, Blockly.RCML.ORDER_COMMA]  // Handle power separately.
    };
    var tuple = OPERATORS[block.getFieldValue('OP')];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.RCML.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.RCML.valueToCode(block, 'B', order) || '0';
    var code;
    // Power in RCML requires a special case since it has no operator.
    if (!operator) {
        return [null, Blockly.RCML.ORDER_FUNCTION_CALL];
    }
    code = argument0 + operator + argument1;
    return [code, order];
};
Blockly.RCML['math_single'] = null;
Blockly.RCML['math_constant'] = null;
Blockly.RCML['math_number_property'] = null;
Blockly.RCML['math_change'] = null;
// Rounding functions have a single operand.
Blockly.RCML['math_round'] = null;
// Trigonometry functions have a single operand.
Blockly.RCML['math_trig'] = null;
Blockly.RCML['math_on_list'] = null;
Blockly.RCML['math_modulo'] = null;
Blockly.RCML['math_constrain'] = null;
Blockly.RCML['math_random_int'] = null;
Blockly.RCML['math_random_float'] = null;

Blockly.RCML['math_number_property_2'] = function(block){
    var value = Blockly.RCML.valueToCode(block, 'VALUE', Blockly.RCML.ORDER_MODULUS) || '0';
    var property = block.getFieldValue('PROPERTY');
    var code;
    switch (property) {
        case 'EVAL':
            code = value + ' % 2 != 0';
            break;
        case 'EVEN':
            code = value + ' % 2 == 0';
            break;
        case 'ODD':
            code = value + ' % 2 == 1';
            break;
        case 'WHOLE':
            code = value + ' % 1 == 0';
            break;
        case 'POSITIVE':
            code = value + ' > 0';
            break;
        case 'NEGATIVE':
            code = value + ' < 0';
            break;
        case 'DIVISIBLE_BY':
            code = value + ' % 0 == 0';
            break;
    }
    return [code, Blockly.RCML.ORDER_EQUALITY];
};