const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 设置开发模式
  entry: './src/main.js', // 项目入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
    clean: true, // 每次构建清理输出目录
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'), // 静态文件目录
    hot: true, // 启用热更新
    port: 8080, // 开发服务器端口
    open: true, // 自动打开浏览器
  },
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
