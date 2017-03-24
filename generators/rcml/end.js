/**
 * @fileoverview Generating RCML for end blocks.
 * @author semeiko@robotct.ru
 */
'use strict';
goog.provide('Blockly.RCML.rcml_end');
goog.require('Blockly.RCML');

Blockly.RCML['end'] = function(block) {
    var value = Blockly.RCML.valueToCode(block,'VALUE',Blockly.RCML.ORDER_NONE);
    switch (block.getFieldValue('OPERATORS')) {
        case 'RETURN':
            if(value) return 'return '+value+';\n';
            return 'return;\n';
        case 'THROW':
            if(value) return 'throw '+value+';\n';
            return 'throw;\n';
        case 'EXIT':
            if(value) return 'exit '+value+';\n';
            return 'exit;\n';
    }
    throw 'Unknown flow statement.';
};