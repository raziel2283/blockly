/**
 * @fileoverview RCML for system blocks.
 * @author semeiko@robotct.ru
 */
'use strict';
goog.provide('Blockly.Blocks.rcml_system');
goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.rcml_system.HUE = 160;

Blockly.Blocks['system_input'] = {
    /**
     * Block for input statement.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "system.input",
            "previousStatement": true,
            "nextStatement": null,
            "colour": Blockly.Blocks.rcml_system.HUE
        });
    }
};

Blockly.Blocks['system_set'] = {
    /**
     * Block for set statement.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "system.set %1 value: %2",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PARAM1",
                    "options": [ ["behavior", "behavior"] ]
                },
                {
                    "type": "field_dropdown",
                    "name": "PARAM2",
                    "options": [ ["~", "~"], ["#", "#"] ]
                }
            ],
            "previousStatement": true,
            "nextStatement": null,
            "colour": Blockly.Blocks.rcml_system.HUE
        });
    }
};

Blockly.Blocks['system_sleep'] = {
    /**
     * Block for sleep statement.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "system.sleep %1 msec",
            "args0": [
                {
                    "type": "input_value",
                    "name": "NUM",
                    "check": "Number"
                }
            ],
            "previousStatement": true,
            "nextStatement": null,
            "colour": Blockly.Blocks.rcml_system.HUE
        });
    }
};

Blockly.Blocks['system_hand_control'] = {
    /**
     * Block for hand_control statement.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "system.hand_control %1 %2 %3 %4 %5 %6 %7 %8",
            "args0": [
                {
                    "type": "field_input",
                    "name": "ROBOT",
                    "text": "@robot"
                },
                {
                    "type": "input_value",
                    "name": "PARAM1",
                    "check": "String"
                },
                {
                    "type": "input_value",
                    "name": "PARAM2",
                    "check": "String"
                },
                {
                    "type": "input_value",
                    "name": "PARAM3",
                    "check": "String"
                },
                {
                    "type": "input_value",
                    "name": "PARAM4",
                    "check": "String"
                },
                {
                    "type": "input_value",
                    "name": "PARAM5",
                    "check": "String"
                },
                {
                    "type": "input_value",
                    "name": "PARAM6",
                    "check": "String"
                },
                {
                    "type": "input_value",
                    "name": "PARAM7",
                    "check": "String"
                }
            ],
            "previousStatement": true,
            "nextStatement": null,
            "colour": Blockly.Blocks.rcml_system.HUE
        });
    }
};

Blockly.Blocks['system_send_package'] = {
    /**
     * Block for send_package statement.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "system.send_package %1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PARAM",
                    "options": [ ['null', ""], ["~", "~"], ["#", "#"] ]
                }
            ],
            "previousStatement": true,
            "nextStatement": null,
            "colour": Blockly.Blocks.rcml_system.HUE
        });
    }
};

Blockly.Blocks['system_mutex_lock'] = {
    /**
     * Block for mutex_lock statement.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "system.mutex_lock %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "PARAM",
                    "check": "String"
                }
            ],
            "previousStatement": true,
            "nextStatement": null,
            "colour": Blockly.Blocks.rcml_system.HUE
        });
    }
};

Blockly.Blocks['system_mutex_unlock'] = {
    /**
     * Block for mutex_unlock statement.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "system.mutex_unlock %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "PARAM",
                    "check": "String"
                }
            ],
            "previousStatement": true,
            "nextStatement": null,
            "colour": Blockly.Blocks.rcml_system.HUE
        });
    }
};