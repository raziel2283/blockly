/**
 * @fileoverview Generating RCML for exception blocks.
 * @author semeiko@robotct.ru
 */
'use strict';
goog.provide('Blockly.RCML.exception');
goog.require('Blockly.RCML');

Blockly.RCML['try_catch'] = function(block){
    var branch = Blockly.RCML.statementToCode(block, 'DO0');
    var branch2 = Blockly.RCML.statementToCode(block, 'DO1');
    var code = 'try {\n' + branch + '} catch {\n' +branch2+ '}\n';
    var param = block.getFieldValue('PARAM');
    if(param && /[a-zA-Z]/.test(param))
        code = 'try {\n' + branch + '} catch ('+param+') {\n' +branch2+ '}\n';
    return code;
};

Blockly.RCML['try_catch_modes'] = function(block){
    var branch = Blockly.RCML.statementToCode(block, 'DO0');
    var branch2 = Blockly.RCML.statementToCode(block, 'DO1');
    var mode = block.getFieldValue('MODE');
    var param = Blockly.RCML.valueToCode(block,'PARAM',Blockly.RCML.ORDER_NONE);
    var code = 'try ("' +mode+ '", ' +param+ ') {\n' + branch + '} catch {\n' +branch2+ '}\n';
    var param2 = block.getFieldValue('PARAM2');
    if(param2 && /[a-zA-Z]/.test(param2))
        code = 'try ("' +mode+ '", ' +param+ ') {\n' + branch + '} catch ('+param2+') {\n' +branch2+ '}\n';
    return code;
};