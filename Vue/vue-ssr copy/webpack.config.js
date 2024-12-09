/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2024-08-06 16:26:19
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2024-08-06 17:48:01
 * @FilePath: /code-demo/Vue/vue-ssr/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const {resolve} = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        },
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html'),
    })
  ],
  devServer: {
    // webpack-dev-server v4.0.0 开始，模块热替换是默认开启的
    hot: true,
  }
}