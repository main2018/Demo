/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-09-08 16:52:10
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-09-08 17:18:17
 * @FilePath: /code-demo/Vite/vite-mpa-test/plugins/vite-plugin-require-dynamic-import.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 安装插件：npm install @rollup/plugin-node-resolve --save-dev

// vite-plugin-require-dynamic-import.js
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default function RequireDynamicImportPlugin() {
  return {
    name: 'vite-plugin-require-dynamic-import',
    configureServer(server) {
      server.middlewares.use('/', (req, res, next) => {
        if (req.url.endsWith('.vue')) {
          console.log(88888, server.middlewares, req.body);
        }
        next()
      })
      // server.middlewares.use(async (req, res, next) => {
      //   console.log('req.url', req.url);
      //   if (req.url.endsWith('.vue')) {
      //     console.log(88888, res.body);
      //     // 替换 require 动态引入语句
      //     res.body = res.body.toString().replace(
      //       /require\(["']([^"']+)["']\)/g,
      //       (match, path) => {
      //         // 将 require 动态引入替换为 import() 形式
      //         return `import("${path}")`;
      //       }
      //     );
      //   }
      //   await next();
      // });
    },
    configureRollup(config) {
      // 添加 nodeResolve 插件，以解析模块路径
      config.plugins.push(nodeResolve());
    },
  }
};