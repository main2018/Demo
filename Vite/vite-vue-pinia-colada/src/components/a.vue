<!--
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-29 18:02:37
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-30 00:32:27
 * @FilePath: /code-demo/Vite/vite-vue-pinia-colada/src/components/a.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="a">
    <h3>组件A</h3>
    isLoading: {{ isLoading }}
    <p>测试多组件重复请求</p>
    <input v-model="searchText" autofocus type="search" placeholder="Eduardo">
    {{ searchResult }}
  </div>
</template>

<script setup>
import {useContactSearchNormal, useContactSearch} from '../use/contacts'
// const { isLoading, data: searchResult, asyncStatus, searchText } = useContactSearchNormal()
const { isLoading, data: searchResult, asyncStatus, searchText } = useContactSearch()
</script>

<style>
</style>
