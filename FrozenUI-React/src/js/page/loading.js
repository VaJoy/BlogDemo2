/**
 * Created by vajoylan on 2015/9/13.
 */
require('../../css/frozen.css'); //把样式引进来
var React = require('react'),
    Loading = require('../component/Loading');

var wrap = document.querySelector('.wrap'),
    hideCallback = function(){  //卸载组件后的回调
        alert('done!!');
    };

React.render(
    <Loading content='哈喽' onHide={hideCallback} isPart={true}/>, wrap
);

setTimeout(function(){ //3秒后卸载组件，模拟触发回调
    React.unmountComponentAtNode(wrap)
}, 3000);