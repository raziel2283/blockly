/**
 * @fileoverview Generating RCML for loop blocks.
 * @author semeiko@robotct.ru (Egor Semeiko)
 */
Blockly.RCML['controls_repeat'] = function(block){
    var branch = Blockly.RCML.statementToCode(block, 'DO');
    branch = Blockly.RCML.addLoopTrap(branch, block.id);
    return 'loop {\n' + branch + '}\n';
};
Blockly.RCML['controls_repeat_ext'] = Blockly.RCML['controls_repeat'];
Blockly.RCML['controls_whileUntil'] = Blockly.RCML['controls_repeat'];
Blockly.RCML['controls_for'] = Blockly.RCML['controls_repeat'];
Blockly.RCML['controls_forEach'] = Blockly.RCML['controls_repeat'];

Blockly.RCML['controls_flow_statements'] = function(block) {
    // Flow statements: continue, break.
    switch (block.getFieldValue('FLOW')) {
        case 'BREAK':
            return 'break;\n';
        case 'CONTINUE':
            return '\n';
    }
    throw 'Unknown flow statement.';
};