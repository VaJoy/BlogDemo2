'use strict';

// 使用 WeakMap 来保存 metadata
var WM = require('es6-weak-map');
var metadata = new WM();

module.exports = metadata;
