<script setup>
</script>

<template>
  <div>
    test1
    <img src="/vite.svg" class="logo" alt="Vite logo" />
    <router-link to="/detail">Detail</router-link>
    <router-view></router-view>
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
