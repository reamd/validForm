/**
 * Created by reamd on 2016/7/7.
 */
(function($, factory){
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jQuery'], function () {
            return factory;
        });
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports.validForm = factory;

    } else {
        // Browser globals
        window.validForm = factory;
    }
}(jQuery, function(model, callback){
        var cb = callback || alert,
            flag = false,
            $tEl = $(model.el),
            tData = model.data,
            dRule = {
              empty:    /[^\s*]/,
              isNumber: /^\d+$/,
              isEmail:  /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
              isUrl:    /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
              isMobile: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
              isID:     /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              isDate:   /^[1-2][0-9][0-9][0-9](-|\/)(0?[1-9]|1[0-2])(-|\/)([0-2]?[1-9]|3[0-1])$/
            };
            _obj2Arr = function (obj){
                var arr = [];
                for(var i in obj){
                    arr.push(obj[i]);

                }
                return arr;
            };

        if(Object.prototype.toString.call(tData) === '[object Object]') {
            tData = _obj2Arr(tData);
        }

        tData.forEach(function(item, idx){
            if(flag) {return;}
            var ele  = item[0],
                rule = item[1],
                tip  = item[2] || '数据非法';
            switch(rule) {
                case 'empty':
                case null:
                case undefined:
                case '':
                    rule = dRule.notNull;
                    break;
                case 'isNumber':
                    rule = dRule.isNumber;
                    break;
                case 'isEmail':
                    rule = dRule.isEmail;
                    break;
                case 'isUrl':
                    rule = dRule.isUrl;
                    break;
                case 'isMobile':
                    rule = dRule.isMobile;
                    break;
                case 'isID':
                    rule = dRule.isID;
                    break;
                case 'isDate':
                    rule = dRule.isDate;
                    break;
                default:
                    rule = Object.prototype.toString.call(rule) === '[object RegExp]'? rule:new RegExp(rule);
                    break;
            }
            if(!rule) {
                cb(tip);
                flag = true;
                return;
            }
            if(!rule.test($tEl.find(ele).val())) {
                    cb(tip);
                    flag = true;
            }
        });
}));