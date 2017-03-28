/**
 * @fileoverview Generating RCML for system blocks.
 * @author semeiko@robotct.ru
 */
'use strict';
goog.provide('Blockly.RCML.rcml_system');
goog.require('Blockly.RCML');

Blockly.RCML['system_input'] = function() {
    return 'system.input();\n';
};

Blockly.RCML['system_set'] = function(block) {
    var param = block.getFieldValue('PARAM1');
    var param2 = block.getFieldValue('PARAM2') || '';
    if(param2) return 'system.set("' +param+ '", ' +param2+ ');\n';
    return 'system.set("' +param+ '");\n';
};

Blockly.RCML['system_sleep'] = function(block) {
    var second = Blockly.RCML.valueToCode(block, 'NUM', Blockly.RCML.ORDER_NONE) || 0;
    return 'system.sleep(' + second + ');\n';
};

Blockly.RCML['system_hand_control'] = function(block) {
    var robot = block.getFieldValue('ROBOT');
    var param = Blockly.RCML.valueToCode(block, 'PARAM1', Blockly.RCML.ORDER_NONE);
    var param2 = Blockly.RCML.valueToCode(block, 'PARAM2', Blockly.RCML.ORDER_NONE);
    var param3 = Blockly.RCML.valueToCode(block, 'PARAM3', Blockly.RCML.ORDER_NONE);
    var param4 = Blockly.RCML.valueToCode(block, 'PARAM4', Blockly.RCML.ORDER_NONE);
    var param5 = Blockly.RCML.valueToCode(block, 'PARAM5', Blockly.RCML.ORDER_NONE);
    var param6 = Blockly.RCML.valueToCode(block, 'PARAM6', Blockly.RCML.ORDER_NONE);
    var param7 = Blockly.RCML.valueToCode(block, 'PARAM7', Blockly.RCML.ORDER_NONE);

    if(!robot || !param || param.length < 3) return null;
    var code = robot + ', ' +param;

    if(param2 && param2.length > 2) code += ', '+param2;
    if(param3 && param3.length > 2) code += ', '+param3;
    if(param4 && param4.length > 2) code += ', '+param4;
    if(param5 && param5.length > 2) code += ', '+param5;
    if(param6 && param6.length > 2) code += ', '+param6;
    if(param7 && param7.length > 2) code += ', '+param7;
    return 'system.hand_control(' +code+ ');\n';
};

Blockly.RCML['system_send_package'] = function(block) {
    var param = block.getFieldValue('PARAM');
    if(param) return 'system.send_package(' + param + ');\n';
    return 'system.send_package();\n';
};

Blockly.RCML['system_mutex_lock'] = function(block) {
    var param = Blockly.RCML.valueToCode(block, 'PARAM', Blockly.RCML.ORDER_NONE);
    return 'system.mutex_lock(' + param + ');\n';
};

Blockly.RCML['system_mutex_unlock'] = function(block) {
    var param = Blockly.RCML.valueToCode(block, 'PARAM', Blockly.RCML.ORDER_NONE);
    return 'system.mutex_unlock(' + param + ');\n';
};