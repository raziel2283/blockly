Blockly.Blocks['math_number_property_2'] = {
    /**
     * @this Blockly.Block
     */
    init: function() {
        var PROPERTIES =
            [
                ['% 2 != 0', 'EVAL'],
                ['even', 'EVEN'],
                ['odd', 'ODD'],
                ['whole', 'WHOLE'],
                ['positive', 'POSITIVE'],
                ['negative', 'NEGATIVE'],
                ['divisible_by', 'DIVISIBLE_BY']
            ];
        this.jsonInit({
            "message0": "%1 is %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE"
                },
                {
                    "type": "field_dropdown",
                    "name": "PROPERTY",
                    "options": PROPERTIES
                }
            ]
        });
        this.setColour(230);
        this.setOutput(true, 'Boolean');
    }
};