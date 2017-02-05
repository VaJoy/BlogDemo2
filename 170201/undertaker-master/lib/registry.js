'use strict';

var reduce = require('lodash.reduce');

var validateRegistry = require('./helpers/validateRegistry');

function setTasks(inst, task, name) {
  inst.set(name, task);
  return inst;
}

function registry(newRegistry) {
  if (!newRegistry) {
    return this._registry;
  }

  //验证是否有效，主要判断是否带有 .get/.set/.tasks/.init 接口，若不符合则抛出错误
  validateRegistry(newRegistry);

  var tasks = this._registry.tasks();

  //将现有 tasks 拷贝到新的寄存器上
  this._registry = reduce(tasks, setTasks, newRegistry);
  //调用初始化接口（无论是否需要，寄存器务必带有一个init接口）
  this._registry.init(this);
}

module.exports = registry;
