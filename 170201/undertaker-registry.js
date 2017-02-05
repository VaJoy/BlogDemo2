/**
 * Created by vajoy on 2017/2/2.
 */
'use strict';

function DefaultRegistry() {
    //对外免 new 处理
    if (this instanceof DefaultRegistry === false) {
        return new DefaultRegistry();
    }
    //初始化任务对象，用于存储任务
    this._tasks = {};
}

// 初始化方法（仅做占位使用）
DefaultRegistry.prototype.init = function init(taker) {};

//返回指定任务方法
DefaultRegistry.prototype.get = function get(name) {
    return this._tasks[name];
};

//保存任务
DefaultRegistry.prototype.set = function set(name, fn) {
    return this._tasks[name] = fn;
};

//获取任务对象
DefaultRegistry.prototype.tasks = function tasks() {
    var self = this;

    //克隆 this._tasks 对象，避免外部修改会对其有影响
    return Object.keys(this._tasks).reduce(function(tasks, name) {
        tasks[name] = self.get(name);
        return tasks;
    }, {});
};

module.exports = DefaultRegistry;