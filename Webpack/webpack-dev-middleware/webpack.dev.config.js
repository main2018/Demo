/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-09-26 14:52:37
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-09-26 18:00:15
 * @FilePath: /code-demo/Webpack/webpack-dev-middleware/webpack.dev.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', // 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
    './src/index.js'
  ],
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(), // 启动HMR
    new webpack.NoEmitOnErrorsPlugin() // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
  ]
};