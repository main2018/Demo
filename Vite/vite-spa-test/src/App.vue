<!--
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-09-08 10:49:50
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-02-12 15:25:51
 * @FilePath: /code-demo/Vite/vite-spa-test/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <img src="./assets/gold.png" class="logo" alt="Vite logo" />
  <img src="./assets/bg.png" class="logo" alt="Vite logo" />
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <router-link to="detail">detail</router-link>
  <router-view></router-view>
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
