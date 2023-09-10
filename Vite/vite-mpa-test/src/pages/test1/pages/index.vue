<!--
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-09-08 10:49:50
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-09-08 17:55:24
 * @FilePath: /code-demo/Vite/vite-mpa-test/src/pages/test1/pages/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
// 测试自动按需引入
// import {Button as VanButton} from 'vant'
// import 'vant/es/button/style/index.js'
// 测试vant/es/toast/style自动转vant/es/toast/style/index
import { Toast } from 'vant';
import 'vant/es/toast/style';
let logoUrl = require('../img/num/3x@.png')
console.log('logoUrl', logoUrl);

</script>

<template>
  <div>
    index page
    <VanButton type="primary" @click="Toast('Toast')">Van Button</VanButton>
    <!-- 测试require -->
    <!-- <img :src="require(`/vite.svg`)" alt=""> -->
    <img :src="require('../img/num/1.png')" alt="">
    <img :src="require('../img/num/3x@.png')" alt="">
    <img :src="logoUrl" alt="">
    <div class="list">
      <div class="item" v-for="i in 10" :key="i">
        <img :src="require(`../img/num/${i}.png`)" alt="">
      </div>
    </div>
    <img :src="require(`../img/num/3.png`)" alt="">

  </div>    
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
