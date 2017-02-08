'use strict';

var once = require('once');
var helpers = require('./helpers');

function map(values, iterator, extensions, done) {
    if (typeof extensions === 'function') {
        done = extensions;
        extensions = {};
    }

    if (typeof done !== 'function') {
        done = helpers.noop;  //没有传入done则赋予一个空函数
    }

    //让 done 函数只执行一次
    done = once(done);

    var keys = Object.keys(values);
    var length = keys.length;
    var count = length;
    var idx = 0;

    // 初始化一个空的、和values等长的数组
    var results = helpers.initializeResults(values);

    /**
     * helpers.defaultExtensions(extensions) 返回如下对象：
     *  {
            create: extensions.create || defaultExts.create,
            before: extensions.before || defaultExts.before,
            after: extensions.after || defaultExts.after,
            error: extensions.error || defaultExts.error,
        }
     */
    var exts = helpers.defaultExtensions(extensions);

    for (idx = 0; idx < length; idx++) {
        var key = keys[idx];
        next(key);
    }

    function next(key) {
        var value = values[key];
        //创建一个 Storage 实例
        var storage = exts.create(value, key) || {};
        //触发'start'事件
        exts.before(storage);
        //利用 async-done 将 taskFunction 转为异步方法并执行
        iterator(value, once(handler));

        function handler(err, result) {
            if (err) {
                //触发'error'事件
                exts.error(err, storage);
                return done(err, results);
            }
            //触发'stop'事件
            exts.after(result, storage);
            results[key] = result;
            if (--count === 0) {
                done(err, results);
            }
        }
    }
}

module.exports = map;