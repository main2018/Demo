/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-02-12 11:48:33
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-13 10:37:36
 * @FilePath: /code-demo/Webpack/webpack-test/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TestPlugin = require('./plugins/webpack-plugin-test.js')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    new TestPlugin(),
  ],
  externalsType: 'script',
  externals: {
    // 自行引入，添加script标签引入jquery cdn
    // jquery: 'jQuery',
    // jquery: '"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"',
    jquery: [
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
      '$',
    ],
    // lodash: {
    //   commonjs: 'lodash', // commonjs规范中的引入方式 直接require('lodash')，需要安装lodash
    //   commonjs2: 'lodash', // commonjs2规范中的引入方式 直接require('lodash'),需要安装lodash
    //   amd: 'lodash', // amd规范中的引入方式 define(['lodash'], function(){}),需要安装lodash
    //   module: 'lodash', // 通过模块引入时，模块的名称 import _ from 'lodash',需要安装lodash
    //   root: '_', // 通过script标签引入时，全局变量的名称 <script src="lodash.js"></script>,
    // }
  },

}