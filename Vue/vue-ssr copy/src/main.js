/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2024-08-06 16:26:28
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2024-08-06 17:55:39
 * @FilePath: /code-demo/Vue/vue-ssr/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import App from "./App.vue";
import {a} from './test'


console.log(a, 888888);
new Vue({
  render: (h) => h(App),
}).$mount("#app")

if (module.hot) {
  // 文件监听自身更新
  // module.hot.accept(
  //   () => {
  //     console.log('main.js 热更新成功');
  //   },
  //   error => {
  //     console.log('main.js 热更新失败:', error);
  //   }
  // );

  // 监听指定文件更新
  // module.hot.accept('./test.js', () => {
  //   console.log('test.js 热更新成功');
  // });
}