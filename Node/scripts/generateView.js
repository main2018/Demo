const generate = require('./generateFile')
const { template } = require( './component/template')

generate({
  hint: '请输入要生成的模块名称: ',
  path: '../views',
  filename: 'pc.vue',
  template: template,
  overwrite: false,
  next: [
    {
      path: '../views',
      filename: 'mob.vue',
      template: template,
      overwrite: true,
    }, {
      path: '../pages/index',
      template: pcTempl,
      suffix: '.vue',
      onlyfile: true,
      overwrite: true,
    }, {
      path: '../pages/mob',
      suffix: '.vue',
      onlyfile: true,
      overwrite: true,
      template: mobTempl,
    },
  ]
})

function mobTempl(dir) {
  return `<script>
import Index from '~/views/${dir}/mob'
export default Index
</script>
`
}

function pcTempl(dir) {
  return `<script>
import Index from '~/views/${dir}/pc'
export default Index
</script>
`
}
