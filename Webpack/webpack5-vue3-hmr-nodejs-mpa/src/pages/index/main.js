/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-01-24 11:19:36
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-01-26 16:58:16
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');
console.log('app', app);

// 如果模块热替换被启用
// if (module.hot) {
//   module.hot.accept()
// }
// if (module.hot) {
//   console.log('module.hot', 'index');
//   module.hot.accept('./App.vue', () => {
//     const updatedApp = require('./App.vue').default;
//     app.unmount();
//     createApp(updatedApp).mount('#app');
//   });
// }
