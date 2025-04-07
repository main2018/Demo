/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-01 22:33:24
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-01 22:44:21
 * @FilePath: /code-demo/Game/pixi-template/postcss.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import postcssPxToRem from 'postcss-pxtorem'
export default {
  plugins: [
    postcssPxToRem({
      rootValue: 100,
      miniPixelValue: 2,
      propList: ['*'],
      // exclude: /node_modules/i,
    }),
  ]
}