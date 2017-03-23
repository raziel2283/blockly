/**
 * @fileoverview Generating RCML for loop blocks.
 * @author semeiko@robotct.ru (Egor Semeiko)
 */
Blockly.RCML['light_loop'] = function(block){
    var branch = Blockly.RCML.statementToCode(block, 'DO');
    branch = Blockly.RCML.addLoopTrap(branch, block.id);
    return 'loop {\n' + branch + '}\n';
};

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