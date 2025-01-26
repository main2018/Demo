/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-01-24 14:43:36
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-01-24 16:56:06
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr-nodejs/server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const open = require('open'); // 引入 open 模块

const app = express();
const compiler = webpack(webpackConfig);

// 使用 webpack-dev-middleware
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }, // 打印彩色日志
  })
);

// 使用 webpack-hot-middleware
app.use(
  webpackHotMiddleware(compiler, {
    log: console.log, // 在控制台输出热更新日志
    heartbeat: 2000, // 心跳间隔
  })
);

// 静态文件支持
app.use(express.static('public'));

// 启动服务器
let port = 3000;
createServer()

function createServer() {
    const server = app.listen(port, function(err) {
      console.log(`Server is running at http://localhost:${port}`);
      open(`http://localhost:${port}`); // 自动打开浏览器
    })
    server.on('error', err => {
        if (err.code == 'EADDRINUSE') { // 端口被占用
          port++
            createServer()
        }
    })
}
