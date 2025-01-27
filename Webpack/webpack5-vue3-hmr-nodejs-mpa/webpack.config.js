/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-01-24 17:03:10
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-01-27 10:24:12
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr-nodejs-mpa/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

// 获取多页入口
const pages = {
  index: {
    entry: './src/pages/index/main.js',
    template: './src/pages/index/index.html',
    filename: 'index.html',
  },
  about: {
    entry: './src/pages/about/main.js',
    template: './src/pages/about/index.html',
    filename: 'about.html',
  },
};

module.exports = {
  mode: 'development',
  // ❌ 注意：eval-source-map/inline-source-map等行内（非单独文件）source-map可能会导致HMR失效
  // ❌ 具体表现为：更新了浏览器没刷新，但是组件的状态丢失，比如input的内容没了
  // ❌ 如发现热更新不生效可能就跟devtool有关，可以尝试使用cheap-source-map等选项
  devtool: 'cheap-source-map',
  entry: Object.fromEntries(
    Object.entries(pages).map(([name, config]) => [
      name,
      [
        // reload=true：在 HMR 失败时强制刷新浏览器。
        // timeout=2000：设置连接超时。
        'webpack-hot-middleware/client?reload=true&timeout=2000&logging=info', // HMR 客户端
        config.entry,
      ],
    ])
  ),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
        // use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR 插件
    new VueLoaderPlugin(),
    ...Object.entries(pages).map(
      ([name, config]) =>
        new HtmlWebpackPlugin({
          template: config.template,
          filename: config.filename,
          chunks: [name], // 指定当前页面需要的入口
        })
    ),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue', '.json'],
  },
};
