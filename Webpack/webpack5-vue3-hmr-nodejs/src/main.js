/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-01-24 11:19:36
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-01-24 15:33:32
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
console.log(999);

// 如果模块热替换被启用
// if (module.hot) {
//   module.hot.accept()
// }
