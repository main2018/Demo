/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-08-30 19:20:11
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-09-10 18:20:11
 * @FilePath: /h5-agile-vue3-seven/vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue';
// import vueJsx from '@vitejs/plugin-vue-jsx'
import history from 'connect-history-api-fallback'
import mpa from 'vite-plugin-mpa'
import { createHtmlPlugin } from 'vite-plugin-html';
import htmlTemplate from 'vite-plugin-html-template'
import writeToDisk from './plugins/vite-writeToDisk'
import legacy from '@vitejs/plugin-legacy'
import commonjs from 'vite-plugin-commonjs'
// import requireTransform from 'vite-plugin-require-transform';
import vitePluginRequire from './plugins/vite-plugin-require';
import requireTransform from './plugins/vite-plugin-require-transform';
// import vitePluginRequire from "vite-plugin-require";
const packPages = require("./packConf/index")();
import path, { resolve } from 'path'
import fs from 'fs'
const proxy = require('./config/proxy.config')
import inject from '@rollup/plugin-inject';

// import Components from 'unplugin-vue-components/vite';
// import { VantResolver } from 'unplugin-vue-components/resolvers';

const viteHtmlPlugin = () => {
  return {
    name: 'vite-plugin-html',
    enforce: 'pre',
    transformIndexHtml: {
      enforce: 'pre',
      async transform(html, ctx) {
        return html.replace(/<\/body>/, `<script type="module" src="./_index.js"></script>\n</body>`)
      }
    },
  }
}
const viteVantPlugin = (options) => {
  return {
    name: 'vite-plugin-vant',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (/^vant\/es\/[a-zA-Z]+\/style$/.test(source)) {
        const resolution = await this.resolve(`${source}/index`, importer, {
					skipSelf: true,
					...options
				})
        return resolution.id
      }
    }
  }
}
const rewriteSlashToIndexHtml = () => {
  return {
    name: 'vite-plugin-rewrite',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use(history({
        rewrites: packPages.map(name => ({
          from: new RegExp(`^\\/a-vue3\\/${name}`),
          to: `/a-vue3/${name}/_index.html`,
        })),
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        verbose: false,
      }))
    }
  }
}

const pages = {}
packPages.map(name => {
  pages[name] = {
    entry: `src/views/${name}/_index.js`,
    filename: '_index.html',
    title: `${name} page`,
    template: `src/views/${name}/_index.html`,
    // template: `index.html`,
  }
})
const preI18nPages = packPages.filter(name => fs.existsSync(resolve(__dirname, `./src/views/${name}/pre-i18n.js`)))

console.log(preI18nPages, 6666);
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    root: 'src/views',
    base: '/a-vue3',
    // publicDir: '/',
    // 环境变量文件路径,相对于root
    envDir: '../../',
    server: {
      // middlewareMode: 'html',
      host: "localhost",
      // https: false,
      port: 5173,
      proxy,
      open: `/a-vue3/${packPages[0]}/`,
      // open: true
      // watch: {
      //   ignored: ['!**/node_modules/vite-plugin-require-transform/**'],
      // },
    },
    assetsInclude: ['**/*.svga'],
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      // "window.getImageUrl": "url => new URL(url, import.meta.url).href",
    },
    resolve: {
      alias: {
        "vue": "vue/dist/vue.runtime.esm-bundler.js",
        "@src": path.resolve(__dirname, "./src"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@tools": path.resolve(__dirname, "./src/tools"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@storePinia": path.resolve(__dirname, "./src/storePinia"),
        "@views": path.resolve(__dirname, "./src/views"),
        "@css": path.resolve(__dirname, "./src/css"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@img": path.resolve(__dirname, "./src/assets/img"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@plugins": path.resolve(__dirname, "./src/plugins"),
        "@static": path.resolve(__dirname, "./static"),
        "@mockJson": path.resolve(__dirname, "./static/mockJson")
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    optimizeDeps: {
      include: [
        '@utils/fingerprint2-2.1.4',
        '@plugins/vue-infinite-scroll',
        // '@plugins/pre-i18n.js',
        // '@src/pre-i18n.js',
        // '@src/views/pre-i18n.js',
        // '@src/views/spa-crazy-monster/pre-i18n.js',
        ...preI18nPages.map(name => `@src/views/${name}/pre-i18n`),
        'swiper-vue3',
        'swiper-vue3/vue',
        '@tweenjs/tween.js',
        'vuex',
        '@vant/use',
        'svga.lite',
        'vant/es/**/style/*',
        'protobufjs/minimal',
        'fake-progress',
        'web-vitals',
        'wasm-feature-detect',
        'firebase/app',
        'firebase/analytics',
        'firebase/performance',
        // '../../pre-i18n',

      ],
    },
    plugins: [
      // legacy({
      //   targets: ['defaults', 'ie >= 11', 'chrome 52'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // }),
      vue(),
      // Components({
      //   resolvers: [VantResolver()],
      // }),
      
      // mpa({
      //   // open: `${packPages[0]}/a-vue3?promotion_id=2132&showBar=1&showNavigation=true&new=true`,
      //   scanDir: './',
      //   scanFile: '_index.js',
      //   filename: '_index.html',
      // }),
      // htmlTemplate({
      //   pagesDir: 'src/views',
      //   pages
      // }),
      vitePluginRequire(),
      // requireTransform({
      //   fileRegex: /.js$|.vue$/
      // }),
      commonjs(),
      rewriteSlashToIndexHtml(),
      viteHtmlPlugin(),
      viteVantPlugin(),
      // createHtmlPlugin({
      //   minify: false,
      //   pages:  packPages.map(name => {
      //     return {
      //       entry: `${name}/_index.js`,
      //       filename: `a-vue3/${name}.html`,
      //       template: `${name}/_index.html`,
      //       injectOptions: {
              
      //       },
      //     }
      //   })
      // }),
      // writeToDisk(),
      // inject({
      //   $: "jquery",
      //   jQuery: "jquery",
      //   "window.jQuery": "jquery",
      //   // _: "lodash",
      //   "window._": "lodash",
      // }),
    ],
    build: {
      // outDir: './dist'
      // target: 'es2018'
    },
    // build: {
    //   rollupOptions: {
    //     input: {
    //       test: path.resolve(__dirname, './src/views/spa-vite-test/_index.html')
    //     },
    //     // output: { dir: "./dist" },
    //   },
    //   terserOptions: {
    //     compress: {
    //       drop_console: true,
    //       drop_debugger: true,
    //     },
    //   },
    // },
  }
});
