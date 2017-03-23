/**
 * @fileoverview Light Loop block for Blockly.
 * @author semeiko@robotct.ru
 */
'use strict';
goog.provide('Blockly.Blocks.rcml_loops');
goog.require('Blockly.Blocks');

Blockly.Blocks['light_loop'] = {
    /**
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "loop",
            "previousStatement": null,
            "nextStatement": null,
            "colour": 120
        });
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    }
};