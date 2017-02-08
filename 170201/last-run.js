'use strict';

var assert = require('assert');

var WM = require('es6-weak-map');
var hasNativeWeakMap = require('es6-weak-map/is-native-implemented');
var defaultResolution = require('default-resolution');

var runtimes = new WM();

function isFunction(fn) {
    return (typeof fn === 'function');
}

function isExtensible(fn) {
    if (hasNativeWeakMap) {
        // 支持原生 weakmap 直接返回
        return true;
    }
    //平台不支持 weakmap 的话则要求 fn 是可扩展属性的对象，以确保还是能支持 es6-weak-map
    return Object.isExtensible(fn);
}

//timeResolution参数用于决定返回的时间戳后几位数字要置0
function lastRun(fn, timeResolution) {
    assert(isFunction(fn), 'Only functions can check lastRun');
    assert(isExtensible(fn), 'Only extensible functions can check lastRun');
    //先获取捕获时间
    var time = runtimes.get(fn);

    if (time == null) {
        return;
    }
    //defaultResolution接口 - timeResolution格式处理（转十进制整数）
    var resolution = defaultResolution(timeResolution);

    //减去(time % resolution)的作用是将后n位置0
    return time - (time % resolution);
}

function capture(fn, timestamp) {
    assert(isFunction(fn), 'Only functions can be captured');
    assert(isExtensible(fn), 'Only extensible functions can be captured');

    timestamp = timestamp || Date.now();
    //（在任务执行的时候）存储捕获时间信息
    runtimes.set(fn, timestamp);
}

function release(fn) {
    assert(isFunction(fn), 'Only functions can be captured');
    assert(isExtensible(fn), 'Only extensible functions can be captured');

    runtimes.delete(fn);
}

//绑定静态方法
lastRun.capture = capture;
lastRun.release = release;

module.exports = lastRun;