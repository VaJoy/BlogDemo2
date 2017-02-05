'use strict';

var assert = require('assert');

var map = require('lodash.map');
var flatten = require('lodash.flatten');

function normalizeArgs(registry, args) {
  function getFunction(task) {
    if (typeof task === 'function') {
      return task;
    }

    var fn = registry.get(task);
    assert(fn, 'Task never defined: ' + task);
    return fn;
  }

  //使用 flatten 将参数（单个或多个task）转为扁平化数组，再遍历（map）处理，生成并返回 taskFunctions 数组
  return map(flatten(args), getFunction);
}

module.exports = normalizeArgs;
