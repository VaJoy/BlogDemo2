'use strict';

var assert = require('assert');

var metadata = require('./helpers/metadata');

function set(name, fn) {
  //参数类型判断，不合法则报错
  assert(name, 'Task name must be specified');
  assert(typeof name === 'string', 'Task name must be a string');
  assert(typeof fn === 'function', 'Task function must be specified');

  //weakmap 里要求 key 对象不能被引用过，所以有必要给 fn 多加一层简单包装
  function taskWrapper() {
    return fn.apply(this, arguments);
  }

  //解除包装
  function unwrap() {
    return fn;
  }

  taskWrapper.unwrap = unwrap;
  taskWrapper.displayName = name;

  //fn 若设置过 metadata，则获取其 branch 属性值作为 tree.nodes 值
  var meta = metadata.get(fn) || {};
  var nodes = [];
  if (meta.branch) {
    nodes.push(meta.tree);
  }

  // this._registry.set 接口最后会返回 taskWrapper
  var task = this._registry.set(name, taskWrapper) || taskWrapper;

  //设置任务的 metadata
  metadata.set(task, {
    name: name,
    orig: fn,
    tree: {
      label: name,
      type: 'task',
      nodes: nodes
    }
  });
}

module.exports = set;
