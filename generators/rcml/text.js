/**
 * @fileoverview Generating RCML for text blocks.
 * @author semeiko@robotct.ru (Egor Semeiko)
 */
'use strict';
goog.provide('Blockly.RCML.texts');
goog.require('Blockly.RCML');

Blockly.RCML['text'] = function(block) {
    // Text value.
    var code = Blockly.RCML.quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.RCML.ORDER_ATOMIC];
};
Blockly.RCML['text_join'] = null;
Blockly.RCML['text_append'] = null;
Blockly.RCML['text_length'] = null;
Blockly.RCML['text_isEmpty'] = null;
Blockly.RCML['text_indexOf'] = null;
Blockly.RCML['text_charAt'] = null;
Blockly.RCML['text_getSubstring'] = null;
Blockly.RCML['text_changeCase'] = null;
Blockly.RCML['text_trim'] = null;
Blockly.RCML['text_print'] = function(block) {
    // Print statement.
    var msg = Blockly.RCML.valueToCode(block, 'TEXT',
            Blockly.RCML.ORDER_NONE) || '\'\'';
    return 'system.echo(' + msg + ');\n';
};
Blockly.RCML['text_prompt_ext'] = null;
Blockly.RCML['text_prompt'] = null;