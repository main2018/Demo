/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-02-03 11:27:05
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-02-03 12:06:25
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr-nodejs-devServer/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // 设置开发模式
  // entry: './src/main.js', // 项目入口文件
  entry: {
    main: [
      // 模块热替换的运行时代码
      'webpack/hot/dev-server.js',
      // 用于 web 套接字传输、热重载逻辑的 web server 客户端
      'webpack-dev-server/client/index.js?hot=true&live-reload=true',
      // 你的入口起点
      './src/main.js',
    ]
  },
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
    clean: true, // 每次构建清理输出目录
  },
  // ❌ 注意：eval-source-map/inline-source-map等行内（非单独文件）source-map可能会导致HMR失效
  // ❌ 具体表现为：更新了浏览器没刷新，但是组件的状态丢失，比如input的内容没了
  // ❌ 如发现热更新不生效可能就跟devtool有关，可以尝试使用cheap-source-map等选项
  // devtool: 'inline-source-map',
  // 在 Node.js API 中使用 webpack dev server 时，不要将 dev server 选项放在 webpack 配置对象中。而是在创建时， 将其作为第二个参数传递。例如：
  // new WebpackDevServer(options, compiler)
  // devServer: {
  //   static: path.resolve(__dirname, 'dist'), // 静态文件目录
  //   hot: true, // 启用热更新
  //   port: 8080, // 开发服务器端口
  //   open: true, // 自动打开浏览器
  // },
  module: {
    rules: [
      {
        test: /\.vue$/, // 匹配 .vue 文件
        loader: 'vue-loader',
      },
      {
        test: /\.css$/, // 匹配 .css 文件
        use: ['style-loader', 'css-loader'], // 样式加载器
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // 图片资源加载
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // 模块热替换的插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "__VUE_OPTIONS_API__": true,
      "__VUE_PROD_DEVTOOLS__": false,
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(true),
    }),
    new VueLoaderPlugin(), // Vue 加载器插件
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML 模板
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置路径别名
    },
    extensions: ['.js', '.vue', '.json'], // 自动解析的扩展名
  },
};

