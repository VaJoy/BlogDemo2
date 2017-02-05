'use strict';
//获取数组除最后一个元素之外的所有元素，这里用来获取第一个参数（tasks数组）
var initial = require('lodash.initial');
//获取数组的最后一个元素，这里用来获取最后一个参数（extension对象）
var last = require('lodash.last');
//将引入的函数异步化
var asyncDone = require('async-done');
var nowAndLater = require('now-and-later');

var helpers = require('./helpers');

function buildParallel() {
    var args = helpers.verifyArguments(arguments);  //验证传入参数合法性

    var extensions = helpers.getExtensions(last(args));  //extension对象

    if (extensions) {
        args = initial(args);    //tasks数组
    }

    function parallel(done) {
        //遍历tasks数组，将每个task异步化，且将其生命周期和extensions属性关联起来
        nowAndLater.map(args, asyncDone, extensions, done);
    }

    return parallel;
}

module.exports = buildParallel;