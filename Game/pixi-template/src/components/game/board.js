/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-02 02:00:33
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-03 16:30:16
 * @FilePath: /code-demo/Game/pixi-template/src/components/game/slot.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Base from './base.js'
import {positionInfo} from './config.js'
import {Container} from 'pixi.js'
export default class Slot extends Base {
  constructor(attrs) {
    super()
    this.initAttr(attrs)
    this.init()
  }
  init() {
    const container = new Container({label: 'board'})
    const bg = this.createSprite(this.assets.main.base.num_get, {
      position: [positionInfo.board.x, positionInfo.board.y],
      anchor: [0],
    });
    container.addChild(bg);
    this.app.stage.addChild(container);
  }
}