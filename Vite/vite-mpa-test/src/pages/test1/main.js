/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-09-08 10:49:50
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-09-08 15:07:38
 * @FilePath: /code-demo/Vite/vite-mpa-test/src/pages/test1/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 测试commonjs报错does not provide an export named 'default'
// import commonjs from './commonjs'
import commonjs from '@src/pages/test1/commonjs'
console.log('commonjs', commonjs);

createApp(App)
  .use(router)
  .mount('#app')
