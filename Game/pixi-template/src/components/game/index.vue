<!--
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-01 22:30:36
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-03 15:55:21
 * @FilePath: /code-demo/Game/pixi-template/src/components/game.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div ref="gameRef" class="game"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useBase from '../../libs/use/useBase.js' 
import Game from './game.js'

const { ctx } = useBase()

const gameRef = ref(null)
// console.log('更新了1时');

onMounted(async() => {
  // console.log('更新了2时', gameRef.value);
  const game = new Game(ctx)
  await game.init(gameRef.value, p => {
    console.log('加载进度：', p);
  })
})

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    // console.log('更新了3时2112');
    // ctx.destroy()
    window.location.reload()
  })
}
</script>

<style lang="scss" scoped>
.game{
  width: 375px;
  height: 480px;
  :deep(canvas) {
    width: 100%;
    height: 100%;
  }
}
</style>
