/**
 * @fileoverview Generating RCML for exception blocks.
 * @author semeiko@robotct.ru
 */
'use strict';
goog.provide('Blockly.Blocks.rcml_exception');
goog.require('Blockly.Blocks');

Blockly.Blocks.rcml_exception.HUE = 210;

Blockly.Blocks['try_catch'] = {
    /**
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "previousStatement": true,
            "nextStatement": true,
            "colour": Blockly.Blocks.rcml_exception.HUE
        });
        this.appendStatementInput('DO0')
            .appendField("try");
        this.appendDummyInput()
            .appendField("catch")
            .appendField(new Blockly.FieldTextInput(''),'PARAM');
        this.appendStatementInput('DO1');
    },
    onchange: function(ev) {
        var param = this.getFieldValue('PARAM');
        if (param){
            if (/[a-zA-Z]/.test(param)) this.setWarningText(null);
            else this.setWarningText('Only english letters');
        }
    }
};

Blockly.Blocks['try_catch_modes'] = {
    /**
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "MODE",
                    "options": [
                        ['Time-lapse mode', "error_time_limit"],
                        ['Mode of counting the number of attempts', "error_try_count"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "PARAM",
                    "check": "Number"
                }
            ],
            "previousStatement": true,
            "nextStatement": true,
            "colour": Blockly.Blocks.rcml_exception.HUE
        });
        this.appendStatementInput('DO0')
            .appendField("try");
        this.appendDummyInput()
            .appendField("catch")
            .appendField(new Blockly.FieldTextInput(''),'PARAM2');
        this.appendStatementInput('DO1');


        var thisBlock = this;
        this.setTooltip(function() {
            var op = thisBlock.getFieldValue('MODE');
            var TOOLTIPS = {
                'error_time_limit': 'Time-lapse mode',
                'error_try_count': 'Mode of counting the number of attempts'
            };
            return TOOLTIPS[op];
        });
    },
    onchange: function(ev) {
        var param = this.getFieldValue('PARAM2');
        if (param){
            if (/[a-zA-Z]/.test(param)) this.setWarningText(null);
            else this.setWarningText('Only english letters');
        }
    }
};