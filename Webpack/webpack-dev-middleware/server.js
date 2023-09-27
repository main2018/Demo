/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-09-26 14:52:15
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-09-26 16:07:58
 * @FilePath: /code-demo/Webpack/webpack-dev-middleware/server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');

const app = express();
const config = require('./webpack.dev.config.js');
const compiler = webpack(config);
// const DIST_DIR = path.join(__dirname, "dist")

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
// 使用webpack-hot-middleware中间件，配置在console台输出日志
app.use(webpackHotMiddleware(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

// 使用静态资源目录，才能访问到/dist/idndex.html
app.use(express.static(config.output.path))

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port http://localhost:3000\n');

});