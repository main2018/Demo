/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-02 02:02:28
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-03 17:55:21
 * @FilePath: /code-demo/Game/pixi-template/src/components/game/base.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Sprite, Text, TextStyle, Color, FillGradient } from 'pixi.js';
import {devicePixelRatio, WIDTH_DESIGN, HEIGHT_DESIGN, WIDTH, HEIGHT, PAGE_SCALE, PICTURE_SCALE, SCALE,
  getPageScale,
  getScale,
} from './config.js';

export default class Base {
  constructor() {
    this.resetScale()
  }
  resetScale() {
    this.pageScale = getPageScale()
    this.scale = getScale()
  }
  initAttr(attrs) {
    if (!attrs) return
    for (let key in attrs) {
      this[key] = attrs[key]
    }
  }
  // 创建精灵
  createSprite(texture, {position, anchor = [0.5, 0.5], pivot, scale = this.scale}) {
    // console.log(scale, this.pageScale, position, 'createSprite');
    
    const sprite = new Sprite(texture);
    if (position) sprite.position.set(...position.map(n => this.calcNum(n)));
    if (anchor) sprite.anchor.set(...anchor);
    if (pivot) sprite.pivot.set(...pivot);
    sprite.scale.set(scale);
    return sprite;
  }
  createText(text, style, {position, anchor = [0.5, 0.5], pivot = [0]} = {}) {
    const gradient = new FillGradient({
      type: 'linear',
      start: { x: 0, y: 0 },
      end: { x: this.calcNum(WIDTH), y: 0 },
      colorStops: [
          { offset: 0, color: 0xff0000 },    // Red
          { offset: 0.33, color: 0x00ff00 }, // Green
          { offset: 0.66, color: 0x0000ff }, // Blue
          { offset: 1, color: 0xff00ff }     // Purple
      ],
      textureSpace: 'global'  // Use world coordinates
    });

    console.log(36 * this.pageScale, 888888);
    
    const styleBase = {
      padding: 0,
      fontFamily: 'Arial',
      fontSize: 20 * this.pageScale,
      lineHeight: 24 * this.pageScale,
      fontStyle: 'italic',
      fontWeight: 'bold',
      align: 'center',
      // fill: '#ffffff',
      fill: { fill: gradient },
      stroke: { color: '#4a1850', width: 5, join: 'round' },
      dropShadow: {
          color: '#000000',
          blur: 4,
          angle: Math.PI / 6,
          distance: 6,
      },
      wordWrap: true,
      wordWrapWidth: this.calcNum(WIDTH),
    }
    style = new TextStyle({...styleBase, ...style || {}});
    text = new Text({
      text,
      style,
    })
    if (position) text.position.set(...position.map(n => this.calcNum(n)));
    if (anchor) text.anchor.set(...anchor);
    if (pivot) text.pivot.set(...pivot);
    return text
  }
  calcNum(num) {
    return num * this.pageScale
  }
}