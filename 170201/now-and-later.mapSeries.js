'use strict';

var once = require('once');

var helpers = require('./helpers');

function mapSeries(values, iterator, extensions, done) {
    // Allow for extensions to not be specified
    if (typeof extensions === 'function') {
        done = extensions;
        extensions = {};
    }

    // Handle no callback case
    if (typeof done !== 'function') {
        done = helpers.noop;  //空方法
    }

    done = once(done);

    // Will throw if non-object
    var keys = Object.keys(values);
    var length = keys.length;
    var idx = 0;
    // Return the same type as passed in
    var results = helpers.initializeResults(values);

    var exts = helpers.defaultExtensions(extensions);

    var key = keys[idx];
    next(key);

    function next(key) {
        var value = values[key];

        var storage = exts.create(value, key) || {};

        exts.before(storage);
        iterator(value, once(handler));

        function handler(err, result) {
            if (err) {
                exts.error(err, storage);
                return done(err, results); //有任务出错，故所有任务应停止调用
            }

            exts.after(result, storage);
            results[key] = result;

            if (++idx >= length) {
                done(err, results); //全部任务已经结束了
            } else {
                next(keys[idx]);  //next不在是放在外面的循环里，而是在任务的回调里
            }
        }
    }
}

module.exports = mapSeries;