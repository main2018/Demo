/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-13 10:14:02
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-13 10:43:44
 * @FilePath: /code-demo/Webpack/webpack-test/plugins/webpack-plugin-test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class TestPlugin {
  constructor(options) {
    // this.options = options
  }
  apply(compiler) {
    debugger;
    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      console.log('make', compiler)
      compilation.hooks.seal.tap('TestPlugin', () => {
        console.log('seal', compilation)
      })
      setTimeout(() => {
        callback()
      })
    })
  }
}

module.exports = TestPlugin