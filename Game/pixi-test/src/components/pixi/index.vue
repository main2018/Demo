<!--
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-12-25 11:52:08
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-12-26 13:05:25
 * @FilePath: /code-demo/Game/vite-vue-game-playground/src/components/pixi/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div ref="pixiRef" class="pixi-index" id="pixi">
    
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onActivated,
  onDeactivated,
  onUnmounted,
  computed,
} from 'vue'
import pixiLogo from '@/assets/pixi.png'

import { Application, Sprite, Assets } from 'pixi.js';

let pixiRef = ref(null)

onMounted(async() => {
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  const pixelRatio = window.devicePixelRatio || 1;
  const width = pixiRef.value.clientWidth,
        height = pixiRef.value.clientHeight;
  const app = new Application({
    width: width,
    height: height,
    antialias: true,
    transparent: true,
    backgroundAlpha: 0, // 背景透明度（背景默认为黑色不透明），0为完全透明，1为不透明
    resolution: pixelRatio,
    forceCanvas: false,
    // background: 'rgba(0, 0, 0, 0)',
    autoResize: true,
    resizeTo: window,
    hello: true,
  });
  // app.renderer.backgroundColor = 0xffffff;
  const scale = width / 375 / pixelRatio
  app.stage.scale.set(scale, scale);
  // app.stage.pivot.set(0.5);
  // app.stage.x = width;
  // app.renderer.scale
  // const root = new Container();
  // root.width = width;
  // root.height = height;

  // app.stage.addChild(root);

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  document.getElementById('pixi').appendChild(app.view);
  // document.body.appendChild(app.view);

  // load the texture we need
  // const texture = await Assets.load(pixiLogo);
  const arr = [
    {alias: 'spritesheet', name: 'spritesheet', src: new URL('@/assets/texture/chips.json', import.meta.url).href},
    {alias: 'pixi1', name: 'pixi', src: new URL('@/assets/pixi.png', import.meta.url).href}
  ]
  const texture = await Assets
    .load(arr, (p) => {
      console.log("loading: " + p); 

      //Display the percentage of files currently loaded
      // console.log("progress: " + loader.progress + "%"); 
    });
  console.log(texture, Assets.get('pixi1'), 888888);
  console.log(Assets.get('spritesheet').textures['bet1.png'], 999999);

  // This creates a texture from a 'bunny.png' image
  const bunny = new Sprite(texture['pixi1']);

  // Setup the position of the bunny
  console.log(app.screen.width, app.renderer.width, 11111);
  // bunny.x = app.renderer.width / 2;
  // bunny.y = app.renderer.height / 2;
  // bunny.x = app.screen.width / scale
  console.log(scale, 22222);
  bunny.x = 375/2*pixelRatio
  // bunny.y = 50*pixelRatio
  bunny.y = app.screen.height/2/scale

  // Rotate around the center
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  // Add the bunny to the scene we are building
  app.stage.addChild(bunny);

  // const bet = new Sprite(Assets.get('spritesheet').textures['bet1.png'])
  // bet.scale.set(0.5)
  // app.stage.addChild(bet);

  // Listen for frame updates
  app.ticker.add(() => {
      // each frame we spin the bunny around a bit
      bunny.rotation += 0.01;
      // bunny.y += 2
      // if (bunny.y>= app.screen.height * scale) {
      //   bunny.y = 50*pixelRatio
      // }
  });
})

  
</script>

<style lang='css'>


.pixi-index{
  width: 100vw;
  height: 100vh;
  background: pink;
  
}
canvas{
  width: 100%;
  height: 100%;
  /* background-color: transparent; */
}
</style>
