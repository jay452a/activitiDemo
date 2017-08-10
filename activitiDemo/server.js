/**
 * Created by lenovo on 2017/6/26.
 */
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackDevServer = require('webpack-dev-server');
var config = require("./src/js/webpack.config.js");

config.entry.index.unshift("webpack-dev-server/client?http://localhost:8080"); // 将执替换js内联进去
config.entry.index.unshift("webpack/hot/only-dev-server");

var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    hot: true,
    historyApiFallback: false,
    // noInfo: true,
    open:'true',
    stats: {
        colors: true // 用颜色标识
    },
    proxy: {

        // '/test': {
        //     target: 'http://10.0.51.9:8888/activiti-app/app/flaginfo',
        //     secure: false,
        //     changeOrigin: true
        // }

        '/test': {
            target: 'http://10.0.51.9:8888/activiti-app/app/flaginfo',
           // pathRewrite: {'^/activiti-app/app/flaginfo' : '/activiti-app/app/flaginfo'},
            changeOrigin: true
        }
    }
});
server.listen(8080);