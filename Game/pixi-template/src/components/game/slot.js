/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-02 02:00:33
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-02 22:33:36
 * @FilePath: /code-demo/Game/pixi-template/src/components/game/slot.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Base from './base.js'
export default class Slot extends Base {
  constructor(attrs) {
    super()
    this.initAttr(attrs)
    this.init()
  }
  init() {
    const bg = this.createSprite(this.assets.main.num_get, {
      position: [44, 0],
      // position: [0, 0],
      anchor: [0.5],
    });
    this.app.stage.addChild(bg);
  }
}