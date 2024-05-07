/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2024-05-07 14:41:47
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2024-05-07 15:02:27
 * @FilePath: /code-demo/Webpack/mini-webpack/lib/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { resolve } = require('path')
module.exports = {
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'main.js',
  },
}