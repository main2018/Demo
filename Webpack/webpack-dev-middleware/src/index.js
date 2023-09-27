/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-09-26 14:53:52
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-09-26 18:00:50
 * @FilePath: /code-demo/Webpack/webpack-dev-middleware/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'
import { test } from './block.js'
document.querySelector('#app').innerHTML = `<p>hello world~</p>`
console.log('index.js1');

test()

// 接收热更新输出，只有accept才能被更新
if (module.hot) {
  module.hot.accept();
}