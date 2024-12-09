/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2024-08-06 14:39:45
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2024-08-08 10:03:38
 * @FilePath: /code-demo/Vue/vue-ssr/server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const serverRender = require('vue-server-renderer');
const Vue = require('vue');
const fs = require('fs');

const server = express();

// 定义一个配置对象，表示页面相关信息，title，meta
const desc = {
  title: '这是一个ssr页面',
  meta: '<meta name="description" content="Vue.js 服务端渲染指南"></meta>'
}


server.get('*', async (req, res) => {
  try {
    // 1. 创建vue实例
    const app = new Vue({
      data() {
        return {
          msg: 'hello SSR'
        }
      },
      template: `<div>
                  <span>{{ msg }}</span>
                  <input v-model="msg">
                 </div>`
    });
    
    // hope 有一个方法，可以将vue实例转化为html字符串。
    // vue-server-renderer
    
    // a. 创建一个渲染器, 支持页面模板
    const render = serverRender.createRenderer({
      template: fs.readFileSync('./index.html', 'utf-8')
    });
    
    // b. 调用renderToString(vue实例， 回调函数)
    // render.renderToString(app, (err, html) => {
    //   res.send(html);
    // });
    console.log(app.state, 7777777);
    const html = await render.renderToString(app, desc);
    // 1. 页面失活！
    // 2. 开发，组件怎么写
    res.send(html);
  } catch (error) {
    console.log(error);
  }
});

server.listen(12306, () => {
  console.log('server is running at http://localhost:12306');
});