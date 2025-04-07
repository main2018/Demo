/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-01 22:48:38
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-03 01:12:02
 * @FilePath: /code-demo/Game/pixi-template/src/components/game/config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const devicePixelRatio = window.devicePixelRatio || 1;
export const WIDTH_DESIGN = 750 // 设计图宽度
export const HEIGHT_DESIGN = 960 // 设计图高度
export const WIDTH = 375 // 实际展示宽度
export const HEIGHT = 480 // 实际展示高度
export const PAGE_SCALE = document.documentElement.clientWidth / WIDTH; // 页面/尺寸单位缩放比例
export const PICTURE_SCALE = WIDTH / WIDTH_DESIGN; // 图片缩放比例
export const SCALE = PICTURE_SCALE * PAGE_SCALE; // 精灵图比例

export const getPageScale = () => document.documentElement.clientWidth / WIDTH; // 页面缩放比例
export const getScale = () => PICTURE_SCALE * getPageScale(); // 位置缩放比例

// 位置信息
export const positionInfo = {
  board: {
    x: 44,
    y: 80,
    itemW: 58,
    itemH: 58,
  }
}
