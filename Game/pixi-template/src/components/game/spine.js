/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-03 11:53:12
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-05 21:55:53
 * @FilePath: /code-demo/Game/pixi-template/src/components/game/spine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Base from './base.js'
import { Spine } from '@esotericsoftware/spine-pixi-v8'

export default class SpineAnimation extends Base {
  constructor(attrs) {
    super()
    this.initAttr(attrs)
    this.init()
  }
  init() {
    // const spineData = assets.main.spine_data
    // const spineAtlas = assets.main.spine_atlas

    // const spine = new Spine(spineData, spineAtlas)
    console.log(0.6 * this.pageScale, 999999);
    
    const spine = Spine.from({ skeleton: "slingoWinData", atlas: "slingoWinAtlas", scale: 0.6 * this.scale });
    // Add the Spine container to the stage
    // spine.position.set(this.app.renderer.width / 2, this.app.renderer.height / 2);
    spine.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    spine.state.setAnimation(0, 'slingo', true)
    this.app.stage.addChild(spine);

    // app.stage.addChild(spine)
  }
  play(spine) {
  }
  stop(spine) {
  }
}