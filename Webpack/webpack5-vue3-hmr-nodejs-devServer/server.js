/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-02-03 11:32:35
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-02-03 11:55:23
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr-nodejs-devServer/server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

const devServerOptions = { ...webpackConfig.devServer, hot: false, client: false, port: 8888, open: true };
// 由于手动添加了 `hot` 与 `client` 参数，其将被禁用
const server = new webpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
};

const stopServer = async () => {
  console.log('Stopping server...');
  await server.stop();
};

runServer();

// setTimeout(stopServer, 5000);