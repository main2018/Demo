const generate = require('./generateFile')
const { template } = require( './component/template')

generate({
  hint: '请输入要生成的组件名称: ',
  path: '../common/components',
  template: template,
  filename: 'index.vue',
  overwrite: false,
  onlyfile: false,
  suffix: '.vue',
  /*
  next: [
    {
      hint: '请输入next1组件名称: ',
      path: '../common/components',
      filename: 'next1.vue',
      template: template,
      overwrite: false,
    }, {
      hint: '请输入要生成的组件名称: ',
      path: '../common/components',
      filename: 'next2.vue',
      template: template,
      overwrite: true,
    },
  ]
  */
})
