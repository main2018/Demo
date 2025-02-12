/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-02-12 11:48:33
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-02-12 14:41:47
 * @FilePath: /code-demo/Webpack/webpack-test/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  externalsType: 'script',
  externals: {
    // 自行引入，添加script标签引入jquery cdn
    // jquery: 'jQuery',
    // jquery: '"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"',
    jquery: [
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
      '$',
    ],
  },

}