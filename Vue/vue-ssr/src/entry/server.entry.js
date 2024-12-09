/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2024-08-08 10:13:42
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2024-08-08 10:36:26
 * @FilePath: /code-demo/Vue/vue-ssr/src/entry/server.entry.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import createApp from '../main.js';

export default function (ctx) {
  const { app } = createApp();
  console.log(app.state, ctx, 8888888);
  return app;
}