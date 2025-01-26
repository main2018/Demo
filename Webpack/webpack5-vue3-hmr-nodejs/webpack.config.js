/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-01-24 14:43:21
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-01-24 14:44:17
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr-nodejs/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // 开发模式
  entry: [
    'webpack-hot-middleware/client?reload=true', // 热更新入口
    './src/main.js', // 应用入口
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // 必须配置 publicPath，否则热更新无法正常工作
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR 插件
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue', '.json'],
  },
};
