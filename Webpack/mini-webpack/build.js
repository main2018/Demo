/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2024-05-07 14:45:36
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2024-05-07 14:49:33
 * @FilePath: /code-demo/Webpack/mini-webpack/build.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Webpack = require('./lib/webpack')
const config = require('./lib/webpack.config')
new Webpack(config)
console.log(11111)