/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-01-24 14:43:36
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-01-26 17:03:54
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr-nodejs/server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// ❌ 注意：eval-source-map/inline-source-map等行内（非单独文件）source-map可能会导致HMR失效
// ❌ 具体表现为：更新了浏览器没刷新，但是组件的状态丢失，比如input的内容没了
// ❌ 如发现热更新不生效可能就跟devtool有关，可以尝试使用cheap-source-map等选项
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const path = require('path');
const open = require('open'); // 引入 open 模块

const app = express();
const compiler = webpack(webpackConfig);

// 使用 webpack-dev-middleware
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }, // 打印彩色日志
    writeToDisk: false,  // 是否写入磁盘, 默认是false, 写入内存
  })
);

// 使用 webpack-hot-middleware
app.use(
  webpackHotMiddleware(compiler, {
    log: console.log, // 在控制台输出热更新日志
    heartbeat: 2000, // 心跳间隔
  })
);

// 静态文件支持
// app.use(express.static('public'));
// 配置多页路由
app.get('/:page?', manageRequest);
app.get('/:page?/*', manageRequest);

function manageRequest(req, res, next) {
  console.log('req.params.page', req.params.page);
  const page = req.params.page;
  const validPages = ['index', 'about']; // 定义有效页面
  if (validPages.includes(page)) {
    const filepath = path.join(compiler.outputPath, `${page}.html`);
    // res.sendFile(path.resolve(__dirname, `dist/${page}.html`));
    compiler.outputFileSystem.readFile(filepath, (err, file) => {
      if (err) {
        return next('输入路径无效，请输入目录名作为路径，有效路径有：\n/');
      }
      res.setHeader('Content-Type', 'text/html');
      res.send(file);
    });
  } else {
    next();
  }
}
// 静态文件路由（放在最后）
// app.use(express.static(path.resolve(__dirname, 'dist')));

// 启动服务器
let port = 3000;
createServer()

function createServer() {
    const server = app.listen(port, function(err) {
      console.log(`Server is running at http://localhost:${port}`);
      open(`http://localhost:${port}`); // 自动打开浏览器
    })
    server.on('error', err => {
        if (err.code == 'EADDRINUSE') { // 端口被占用
          port++
            createServer()
        }
    })
}
