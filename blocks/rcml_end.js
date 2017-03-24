/**
 * @fileoverview Generating RCML for end blocks.
 * @author semeiko@robotct.ru
 */
'use strict';
goog.provide('Blockly.Blocks.rcml_end');
goog.require('Blockly.Blocks');

Blockly.Blocks['end'] = {
    /**
     * @this Blockly.Block
     */
    init: function() {
        var OPERATORS =
            [
                ["return", 'RETURN'],
                ["throw", 'THROW'],
                ["exit", 'EXIT']
            ];
        this.setColour(210);
        this.appendValueInput('VALUE')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OPERATORS');
        this.setPreviousStatement(true);

        var thisBlock = this;
        this.setTooltip(function() {
            var op = thisBlock.getFieldValue('OPERATORS');
            var TOOLTIPS = {
                'RETURN': "return",
                'THROW': "throw",
                'EXIT': "exit"
            };
            return TOOLTIPS[op];
        });
    }
};
