function toCamel(name) {
  return name.toLowerCase()
  .replace(/[-_][a-z]/g, l => l.toUpperCase())
  .replace(/[-_]/g, '')
  .replace(/^[a-z]/, l => l.toUpperCase())
}

module.exports = {
  template: compoenntName => {
    return `<template lang="pug">
.${compoenntName} ${compoenntName}组件
</template>

<script>
export default {
  name: '${toCamel(compoenntName)}',
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="stylus" scoped>
</style>
`
  },

  entryTemplate: `import Main from './main.vue'
  export default Main`
}
