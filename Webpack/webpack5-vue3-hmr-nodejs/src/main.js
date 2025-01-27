/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-01-24 11:19:36
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-01-27 10:28:42
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
console.log(999);

// ❌ 注意：正常情况下，修改入口文件不会触发热更新（浏览器会刷新）
// ❌ 如想实现入口文件的热更新，需要在入口文件中添加如下代码
// ❌ 添加以下代码虽然可以实现入口文件的热更新，但是组件状态依然会丢失，比如input的内容丢失

// 如果模块热替换被启用
if (module.hot) {
  module.hot.accept()
}


// // 确保 HMR 正常运行
// if (module.hot) {
//   module.hot.accept('./App.vue', () => {
//     const newApp = require('./App.vue').default;
//     app._container.innerHTML = ''; // 清空旧内容
//     createApp(newApp).mount('#app'); // 挂载新的组件
//   });
// }
