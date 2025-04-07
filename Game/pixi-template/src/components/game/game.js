/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-01 22:47:23
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-03 21:39:28
 * @FilePath: /code-demo/Game/pixi-template/src/components/game/game.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Application, Sprite } from 'pixi.js'; 
import {devicePixelRatio} from './config.js';
import Base from './base.js';
import Board from './board.js';
import Slot from './slot.js';
import Loader from './loader.js';
import Spine from './spine.js';

export default class Game extends Base {
  constructor(ctx) {
    super()
    this.ctx = ctx
    this.app = null
    this.gameBox = null
    // this.pageScale = 1
    // this.scale = 1
    this.assets = null
    this.loader = null
  }
  async init(gameBox, progress = () => {}) {
    this.app = new Application()
    this.gameBox = gameBox
    await this.app.init({
      width: gameBox.clientWidth,
      height: gameBox.clientHeight,
      backgroundColor: 0x1099bb,
      backgroundAlpha: 1,
      resolution: devicePixelRatio,
      autoDensity: true,
      antialias: true,
      // autoResize: true,
      // resizeTo: window,
    });
    gameBox.appendChild(this.app.canvas);
    this.loader = new Loader(this._getAttrAll());
    const assets = await this.loader.init(progress)
    this.assets = assets

    const resize = this.resize.bind(this)
    this.ctx.$bus.off('resize', resize)
    this.ctx.$bus.on('resize', resize)
    resize()
  }
  _getAttrAll() {
    const { ctx, app, gameBox, pageScale, scale, assets, loader } = this
    const attrAll = {
      ctx,
      app,
      gameBox,
      pageScale,
      scale,
      assets,
      loader,
    }
    return attrAll
  }
  reset() {
    this.clean()
    this.draw()
  }
  draw() {
    this.addBg()
    const board = new Board(this._getAttrAll()) 
    // const slot = new Slot(this._getAttrAll())
    this.addGameOver()
    const spine = new Spine(this._getAttrAll())
  }
  clean() {
    this.app.stage.removeChildren().forEach(item => item.destroy())
    // this.app.renderer.destroy(true, { children: true });
    // this.app.destroy(true, { children: true });
    // this.app = null
  }

  resize() {
    const width = this.gameBox.clientWidth
    const height = this.gameBox.clientHeight
    // const scale = Math.min(width / WIDTH_DESIGN, height / HEIGHT_DESIGN);
    // this.app.stage.scale.set(scale);
    this.resetScale()
    this.app.renderer.resize(width, height);
    this.reset()
  }
  adapt() {
    
  }
  addBg() {
    // console.log(PAGE_SCALE, getPageScale(), this.app.screen.width, 888888);
    
    const bg = this.createSprite(this.assets.main.base.bg, {
      // position: [0, 0],
      anchor: [0.5],
    }); 
    bg.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    this.app.stage.addChild(bg);
  }
  addGameOver() {
    const text = this.createText('丁未歲，鳳陽 Atma Rich text with a lot of options and across multiple lines', {
      fontFamily: 'hinted-Atma-Bold',
      // fontFamily: 'Crosterian',
    })
    console.log(text, 999999);
    text.position.set(this.app.screen.width / 2, 10 * this.pageScale + text.height/2);
    this.app.stage.addChild(text);
  }
  
}

// if (import.meta.hot) {
//   location.reload()
// }