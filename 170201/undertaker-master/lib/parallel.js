'use strict';

var bach = require('bach');

var metadata = require('./helpers/metadata');
var buildTree = require('./helpers/buildTree');
var normalizeArgs = require('./helpers/normalizeArgs');
var createExtensions = require('./helpers/createExtensions');

//并行任务接口
function parallel() {
  var create = this._settle ? bach.settleParallel : bach.parallel;
  //通过参数获取存在寄存器（registry）中的 taskFunctions（数组形式）
  var args = normalizeArgs(this._registry, arguments);
  //新增一个扩展对象，用于后续给 taskFunction 加上生命周期
  var extensions = createExtensions(this);
  //将 taskFunctions 里的每一个 taskFunction 加上生命周期，且异步化taskFunction，安排它们并发执行（调用fn的时候）
  var fn = create(args, extensions);

  fn.displayName = '<parallel>';

  //设置初步 metadata，方便外层 this.task 接口获取依赖关系
  metadata.set(fn, {
    name: fn.displayName,
    branch: true,  //表示当前 task 是被依赖的（parallel）任务
    tree: {
      label: fn.displayName,
      type: 'function',
      branch: true,
      nodes: buildTree(args)  //返回每个 task metadata.tree 的集合（数组）
    }
  });
  //返回 parallel taskFunction 供外层 this.task 接口注册任务
  return fn;
}

module.exports = parallel;
