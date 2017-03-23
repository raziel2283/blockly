/**
 * @fileoverview Generating RCML for include blocks.
 * @author semeiko@robotct.ru
 */
'use strict';
goog.provide('Blockly.Blocks.include');
goog.require('Blockly.Blocks');

Blockly.Blocks.include.HUE = 430;

Blockly.Blocks['include'] = {
    /**
     * Block for variable setter.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'include %1',
            "args0": [
                {
                    "type": "input_value",
                    "name": "TEXT"
                }
            ],
            "colour": Blockly.Blocks.include.HUE
        });
    }
};

Blockly.Blocks['include_lib'] = {
    /**
     * Block for variable setter.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'include_lib %1 %2',
            "args0": [
                {
                    "type":"field_input",
                    "name":"FIELDNAME",
                    "text": "name"
                },
                {
                    "type": "input_value",
                    "name": "TEXT"
                }
            ],
            "colour": Blockly.Blocks.include.HUE
        });
    },
    onchange: function(ev) {
        var name = this.getFieldValue('FIELDNAME');
        if (/^[a-zA-Z][a-zA-Z0-9_]+$/.test(name)) {
            this.setWarningText(null);
        } else this.setWarningText('Only letters and numbers and separator');
    }
};
