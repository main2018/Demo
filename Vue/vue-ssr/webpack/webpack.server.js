/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2024-08-08 10:13:42
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2024-08-08 10:27:01
 * @FilePath: /code-demo/Vue/vue-ssr/webpack/webpack.server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
module.exports = merge(base, {
  entry: {
    server: './src/entry/server.entry.js'
  },
  output: {
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  plugins: [
    // new VueSSRServerPlugin()
  ]
});