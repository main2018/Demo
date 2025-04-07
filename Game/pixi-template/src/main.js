/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-01 22:30:36
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-03 01:26:35
 * @FilePath: /code-demo/Game/pixi-template/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './css/reset.css'
import './utils/rem.js'
import App from './App.vue'
import mitt from 'mitt'
import { debounce } from 'lodash-es'
const emitter = mitt()
const app = createApp(App)
;(function watchResize() {
  let isInit = false
  window.addEventListener('resize', debounce(async function () {
    
    // await nextTick()
    const deviceHeight = window.screen.height,
          width = document.documentElement.clientWidth,
          height = document.documentElement.clientHeight,
          scale = width / 375
    // store.scale = scale
    // const isHalf = !!(height / deviceHeight < 0.9 || getParam('heightPercent'));
    // store.isHalf = isHalf;
    if (isInit) {
      console.log('resize1');
      emitter.emit('resize', { width, height, scale })
    }
    isInit = true
  }, 300))
  const event = new CustomEvent("resize", {});
  // var event = document.createEvent("HTMLEvents");
  // event.initEvent("resize", false, false);
  window.dispatchEvent(event)
})()
app.config.globalProperties.$bus = emitter
app.mount('#app')
