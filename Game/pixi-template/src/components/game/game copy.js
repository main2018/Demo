/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-01 22:47:23
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-02 00:46:56
 * @FilePath: /code-demo/Game/pixi-template/src/components/game/game.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Application, Sprite } from 'pixi.js';
import {devicePixelRatio, WIDTH_DESIGN, HEIGHT_DESIGN, WIDTH, HEIGHT, PAGE_SCALE} from './config.js';
import {Loader} from './loader.js';

export default class Game {
  constructor(gameBox) {
    this.app = null
    this.gameBox = null
  }
  async init(gameBox) {
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
    this.adapt()
    gameBox.appendChild(this.app.canvas);
    this.loader = new Loader(this.app);
    const assets = await this.loader.init()
    console.log(assets, 888888);
    this.assets = assets
    this.addBg()
    
  }
  adapt() {
    const width = this.gameBox.clientWidth
    const height = this.gameBox.clientHeight
    const scale = Math.min(width / WIDTH_DESIGN, height / HEIGHT_DESIGN);
    this.app.stage.scale.set(scale);
    this.app.renderer.resize(width, height);
  }
  setup() {}
  addBg() {
    console.log(PAGE_SCALE, 888888);
    
    const bg = this.createSprite(this.assets.main.bg, {
      position: [this.app.screen.width, this.app.screen.height],
      // position: [0, 0],
      anchor: [0.5],
    });
    this.app.stage.addChild(bg);
  }
  // 创建精灵
  createSprite(texture, {position, anchor, pivot}) {
    const sprite = new Sprite(texture);
    if (anchor) sprite.anchor.set(...anchor);
    if (pivot) sprite.pivot.set(...pivot);
    if (position) sprite.position.set(...position);
    return sprite;
  }
}