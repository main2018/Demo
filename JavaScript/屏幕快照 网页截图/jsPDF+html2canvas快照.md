1.Nuxt中使用
``` bash

require(['./pdf.js'], res => {
  const renderHTMLtoPDF = res.default
  this.$nextTick(() => {
    renderHTMLtoPDF()
  })
})
```
