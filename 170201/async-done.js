'use strict';

var domain = require('domain');

var eos = require('end-of-stream');
var tick = require('next-tick');
var once = require('once');
var exhaust = require('stream-exhaust');

var eosConfig = {
    error: false,
};

function asyncDone(fn, cb) {
    cb = once(cb);

    var d = domain.create();
    d.once('error', onError);
    var domainBoundFn = d.bind(fn);

    function done() {
        d.removeListener('error', onError);
        d.exit();
        //执行 cb
        return cb.apply(null, arguments);
    }

    function onSuccess(result) {
        return done(null, result);
    }

    function onError(error) {
        return done(error);
    }

    function asyncRunner() {
        var result = domainBoundFn(done);

        function onNext(state) {
            onNext.state = state;
        }

        function onCompleted() {
            return onSuccess(onNext.state);
        }

        if (result && typeof result.on === 'function') {
            // result 为 Stream 时
            d.add(result);
            //消耗完毕了自动触发 done
            eos(exhaust(result), eosConfig, done);
            return;
        }

        if (result && typeof result.subscribe === 'function') {
            // result 为 RxJS observable 时的处理
            result.subscribe(onNext, onError, onCompleted);
            return;
        }

        if (result && typeof result.then === 'function') {
            // result 为 Promise 对象时的处理
            result.then(onSuccess, onError);
            return;
        }
    }

    tick(asyncRunner);
}

module.exports = asyncDone;