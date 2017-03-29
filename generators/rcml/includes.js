/**
 * @fileoverview Generating RCML for include blocks.
 * @author semeiko@robotct.ru
 */
'use strict';
goog.provide('Blockly.RCML.includes');
goog.require('Blockly.RCML');

Blockly.RCML['include'] = function(block) {
    var path = Blockly.RCML.valueToCode(block, 'TEXT', Blockly.RCML.ORDER_NONE);
    var code = 'include ' +path;
    Blockly.RCML.definitions_['include'+block.id] = code;
    return null;
};

Blockly.RCML['include_lib'] = function(block) {
    var name = block.getFieldValue('FIELDNAME', 'text');
    var path = Blockly.RCML.valueToCode(block, 'TEXT', Blockly.RCML.ORDER_NONE);
    var code = 'include_lib ' +name+ ' ' +path;
    if(/^[a-zA-Z][a-zA-Z0-9_]+$/.test(name)) Blockly.RCML.definitions_[name] = code;
    return null;
};