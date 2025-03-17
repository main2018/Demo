const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 8888;

const proxyMiddleware = createProxyMiddleware({
  target: 'http://localhost:8889',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
})
app.use('/api', proxyMiddleware);

// 创建代理中间件
// const proxy = createProxyMiddleware({
//   target: 'https://mmbiz.qpic.cn', // 目标地址
//   changeOrigin: true, // 修改请求的 Origin 为目标地址
//   pathRewrite: {
//     '^/proxy': '',
//   },
//   on: {
//     proxyReq: (proxyReq, req, res) => {
//       // 移除 Referer 头
//       console.log('Removing Referer header');
//       proxyReq.removeHeader('Referer');
//     },
//   },
// });

// 代理路由
app.get('/proxy', (req, res, next) => {
  console.log('Proxying request', req.query.url);
  
  const targetUrl = req.query.url; // 获取目标 URL
  if (!targetUrl) {
    return res.status(400).send('Missing URL parameter');
  }
  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': '', // 移除 /proxy 前缀
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        // 移除 Referer 头
        console.log('Removing Referer header');
        proxyReq.removeHeader('Referer');
      },
    },
  });

  // 将请求转发到目标 URL
  proxy(req, res, next);
});
// 代理静态目录static
app.use(express.static('static'));

// 启动服务器
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});