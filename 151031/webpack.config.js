var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //插件项
    //plugins: [commonsPlugin],
    //页面入口文件配置
    entry: undefined,
    //入口文件输出配置
    output: {
        pathinfo: true
    },
    module: {
        //加载器配置
        loaders: [
            //{ test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'babel-loader' }
            //{ test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
};