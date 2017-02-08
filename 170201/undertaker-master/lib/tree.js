'use strict';

var defaults = require('lodash.defaults');
var map = require('lodash.map');

var metadata = require('./helpers/metadata');

function tree(opts) {
  opts = defaults(opts || {}, {
    deep: false,
  });

  var tasks = this._registry.tasks();  //获取所有存储的任务
  var nodes = map(tasks, function(task) {  //遍历并返回metadata数组
    var meta = metadata.get(task);

    if (opts.deep) {   //如果传入了 {deep: true}，则从 meta.tree 开始返回
      return meta.tree;
    }

    return meta.tree.label; //从 meta.tree.label 开始返回
  });

  return {  //返回Tasks对象
    label: 'Tasks',
    nodes: nodes
  };
}

module.exports = tree;
