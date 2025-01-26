<!--
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-01-24 11:20:05
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-01-26 17:38:25
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <h1>Hello Vue 3 + Webpack 5 + HMR in NodeJS!</h1>
    <h2>Index</h2>阿斯顿发ddsssdadadsd啊是的asdf 说的
    <form action="">
      <div class="form-item">
        <label for="name">Name:</label>
        <input v-model="formData.username" type="text" id="name" name="name" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: ''
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #333;
}
</style>
