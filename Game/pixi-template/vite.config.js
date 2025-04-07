/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-01 22:30:36
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-05 21:42:27
 * @FilePath: /code-demo/Game/pixi-template/vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginSpine from './plugins/vite-plugin-spine.js'

import {dirname} from "path";
import {fileURLToPath} from 'url';
const getDirname = (url) => dirname(fileURLToPath(url));
const __dirname = getDirname(import.meta.url);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginSpine({
      fileName: "assets/[name].[hash].[ext]"
      // fileName: "assets/spine/[name].[hash].[ext]"
    }),
  ],
  server: {
    // hot: false,
  },
  // assetsInclude: ['**/*.atlas', '**/*.json'], // 明确包含 Spine 文件
  assetsInclude: ['**/*.atlas'], // 明确包含 Spine 文件
  // assetsInclude: ["**/*.svga",'**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', "**/*.pag"],
  // build: {
  //   assetsInlineLimit: 0 // 禁止将资源转为 base64（确保文件保持独立）
  // }
  build: {
    emptyOutDir: true,
    assetsInlineLimit: 0, // 禁止将资源转为 base64（确保文件保持独立）
    rollupOptions: {
      output: {
        dir: resolve(__dirname, `./dist/`),
        entryFileNames: `js/js_[name].[hash].js`, 
        chunkFileNames: `js/js_[name].[hash].js`,
        assetFileNames: assetInfo => {
          // console.log(assetInfo, 111111);
          if (assetInfo.name.endsWith(".css")) {
            return `css/css_[name].[hash].css`;
          }
          return `assets/[name].[hash].[ext]`;
        },
        // manualChunks: id => {
        //   if (id.includes("node_modules")) {
        //     return id
        //       .toString()
        //       .split("node_modules/")[1]
        //       .split("/")[0]
        //       .toString(); // 拆分多个 vendors
        //   }
        // },
        manualChunks(id) {
          // if (id.includes('node_modules/svelte')) {
          //   return 'svelte-bundle'
          // }
          // if (id.includes('node_modules/swiper')) {
          //   return 'swiper-bundle'
          // }
          // if (id.includes('node_modules') && !id.includes('firebase')) {
          //   return 'vendor'
          // }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
    },
  }
})
