'use strict';

var once = require('once');

var helpers = require('./helpers');

function map(values, iterator, extensions, done) {
    // Allow for extensions to not be specified
    if (typeof extensions === 'function') {
        done = extensions;
        extensions = {};
    }

    // Handle no callback case
    if (typeof done !== 'function') {
        done = helpers.noop;
    }

    done = once(done);

    // Will throw if non-object
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
        //触发'start'事件，传入执行时间戳数据
        exts.before(storage);
        iterator(value, once(handler));

        function handler(err, result) {
            if (err) {
                exts.error(err, storage);
                return done(err, results);
            }

            exts.after(result, storage);
            results[key] = result;
            if (--count === 0) {
                done(err, results);
            }
        }
    }
}

module.exports = map;