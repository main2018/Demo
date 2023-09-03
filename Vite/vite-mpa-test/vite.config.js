import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path'
import fs from 'fs'

import history from 'connect-history-api-fallback'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import commonjs from 'vite-plugin-commonjs'
import requireTransform from 'vite-plugin-require-transform'

function readPages(srcDir) {
  const pagesDir = resolve(srcDir, 'pages')
  let pages = fs.readdirSync(pagesDir, { withFileTypes: true })
    .filter((o) => o.isDirectory() && !/^[._]/.test(o.name))
    .map((o) => ({ name: o.name, path: join('pages', o.name) }))
  if (!pages.length) {
    pages = [
      {
        name: 'index',
        path: '',
      },
    ]
  }
  pages = pages.filter(o => o.name !== 'index').map(o => ({
    from: new RegExp(`^\\/a-vue3\\/${o.name}`),
    to: `/a-vue3/${o.name}/index.html`,
  }))
  return pages
}
const pages = readPages(resolve(__dirname, 'src'))
console.log(pages, 66666);

// 方法1
const multiPageRewritePlugin = (options) => {
  return {
    name: 'vite-plugin-multi-page-path-rewrite-plugin',
    configureServer(server) {
      server.middlewares.use(history({
        rewrites: options.rewrites,
        // disableDotRule: true,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        verbose: true,
        logger: () => {
          // 
        },
      }))
    }
  }
}

// 方法2
// https://stackoverflow.com/questions/69701743/how-can-i-configure-vites-dev-server-to-give-404-errors
const rewriteSlashToIndexHtml = () => {
  return {
    name: 'rewrite-slash-to-index-html',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      // rewrite / as index.html
      server.middlewares.use('/', (req, _, next) => {
        if (req.url === '/a-vue3/test1/detail') {
          req.url = '/a-vue3/test1/index.html'
        }
        next()
      })
    },
  }
}

const viteHtmlPlugin = () => {
  return {
    name: 'vite-plugin-html',
    enforce: 'pre',
    transformIndexHtml: {
      enforce: 'pre',
      async transform(html, ctx) {
        const bodyInjectRE = /<\/body>/
        const _html = html.replace(
          bodyInjectRE,
          `<script type="module" src="./main.js"></script>\n</body>`,
        )
        const tags = [
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'tag',
            },
          },
        ]
        return {
          html: _html,
          tags: tags,
        }
      },
    },
  }
}
const viteVantPlugin = (options) => {
  return {
    name: 'vite-plugin-vant',
    async resolveId(source, importer, options) {
      console.log(source, 22222);
      if (source == 'vant/es/button/style') {
        const resolution = await this.resolve('vant/es/button/style/index', importer, {
					skipSelf: true,
					...options
				})
        return resolution.id
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  // envPrefix: 'APP_',
  appType: 'mpa',
  // 项目根路径，index.html路径
  root: 'src/pages',
  // 开发或生产环境服务的公共基础路径
  base: '/a-vue3',
  // 相对于root根路径的
  publicDir: '../../public',
  // 生成静态资源的存放路径（相对于 build.outDir）
  // assetsDir: './abc',
  plugins: [
    vue(),
    // 解决map下router history模式路由刷新404
    multiPageRewritePlugin({
      rewrites: pages
    }),
    viteHtmlPlugin(),
    // rewriteSlashToIndexHtml(),
    viteVantPlugin(),
    requireTransform({
      fileRegex: /.js$|.vue$/
    }),
  ],
  build: {
    // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录,若 outDir 在根目录之外则会抛出一个警告避免意外删除掉重要的文件
    outDir: '../../dist/a-vue3',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        test1: resolve(__dirname, 'src/pages/test1/index.html'),
        test2: resolve(__dirname, 'src/pages/test2/index.html'),
      },
    }
  },
})
