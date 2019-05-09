``` bash
Nuxt中使用

require(['~/assets/js/pdf.js'], res => {
  const renderHTMLtoPDF = res.default
  this.$nextTick(() => {
    renderHTMLtoPDF()
  })
})
```
