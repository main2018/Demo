/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-16 21:26:49
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-16 22:34:56
 * @FilePath: /code-demo/Node/微信公众号图片代理/server1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const app = express();
const port = 8889;

app.use('/list', (req, res) => {
  res.send({
    code: 200,
    message: 'Hello from the proxy',
    data: [
      {id: 1, name: 'Alice'},
      {id: 2, name: 'Bob'},
      {id: 3, name: 'Charlie'},
      {id: 4, name: 'David'},
      {id: 5, name: 'Eve'},
      {id: 6, name: 'Frank'},
      {id: 7, name: 'Grace'},
      {id: 8, name: 'Henry'},
    ],
  });
})
// 创建代理中间件

// 代理静态目录static
// app.use(express.static('static'));

// 启动服务器
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});