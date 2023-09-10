/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-09-01 10:39:51
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-09-01 23:39:25
 * @FilePath: /h5-agile-vue3-seven/server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
// import opt from './vite.config.js'

var router = express.Router();
const resolve = (p) => path.resolve(__dirname, p)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // 以中间件模式创建 Vite 应用，并将 appType 配置为 'custom'
  // 这将禁用 Vite 自身的 HTML 服务逻辑
  // 并让上级服务器接管控制
  const vite = await createViteServer({
    configFile: './vite.config.js',
    // server: { middlewareMode: true },
    // appType: 'custom'
  })
  // const vite = await createViteServer({
  //   server: { middlewareMode: true },
  //   appType: 'custom'
  // })

  // 使用 vite 的 Connect 实例作为中间件
  // 如果你使用了自己的 express 路由（express.Router()），你应该使用 router.use
  // router.get(/^\/a\-vue3\//, async (req, res) => {
  //   console.log(req.originalUrl, 33333);
  //   const url = req.originalUrl
  //   var pathUrl = req.path.replace('/a-vue3/', '')
  //   pathUrl = pathUrl.replace('/index.html', '')
  //   var pathArr = pathUrl.split('/')
  //   // console.log(pathArr, 99999999);
  //   let template = fs.readFileSync(resolve(`src/views/${pathArr[0]}/_index.html`), 'utf-8')
  //   template = await vite.transformIndexHtml(url, template)
  //   console.log(template, 999999);
  //   // template = await vite.transformIndexHtml(url, template)
  //   // 服务 index.html - 下面我们来处理这个问题
  //   // console.log(vite, 88888);
  //   // res.send('66666666')
  //   res.status(200).set({ 'Content-Type': 'text/html' }).end(template)

  // })
  // app.use(router);
  app.use(vite.middlewares)

  // app.get('*', async (req, res) => {
  //   console.log(req.originalUrl, 33333);
  //   // const url = req.originalUrl
  //   // var pathUrl = req.path.replace('/a-vue3/', '')
  //   // pathUrl = pathUrl.replace('/index.html', '')
  //   // var pathArr = pathUrl.split('/')
  //   // // console.log(pathArr, 99999999);
  //   // let template = fs.readFileSync(resolve(`src/views/${pathArr[0]}/_index.html`), 'utf-8')
  //   // // template = await vite.transformIndexHtml(url, template)
  //   // console.log(template, 999999);
  //   // // template = await vite.transformIndexHtml(url, template)
  //   // // 服务 index.html - 下面我们来处理这个问题
  //   // // console.log(vite, 88888);
  //   // // res.send('66666666')
  //   // res.status(200).set({ 'Content-Type': 'text/html' }).end(template)

  // })
  // app.use('*', async (req, res) => {
  //   // 服务 index.html - 下面我们来处理这个问题
  //   // console.log(vite, 88888);
  //   res.send('66666666')

  // })
  
  
  app.listen(5173)
}

createServer()
