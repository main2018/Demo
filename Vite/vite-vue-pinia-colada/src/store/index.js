/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-29 13:34:00
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-29 13:35:52
 * @FilePath: /code-demo/Vite/vite-vue-pinia-colada/src/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";

export default defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});