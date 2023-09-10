/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-09-08 15:39:01
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-09-10 17:23:18
 * @FilePath: /code-demo/Vite/vite-mpa-test/plugins/vite-plugin-require.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function vitePluginRequire() {
  return {
    name: 'vite-plugin-require',
    // enforce: 'pre',
    // configResolved(config) {
    //   console.log(config.plugins.map(p => p.name));
    // },
    transform(code, id) {
      // if (id.endsWith('index.vue')) {
      //   // console.log('code:', code);
      //   // const ast = this.parse(code)
      //   // treeWalk(ast, {
      //   //   // node.type == 'ImportDeclaration'
      //   //   // ImportDeclaration(node) {
      //   //   //   console.log(node.source.value);
      //   //   // },
      //   //   FunctionDeclaration(node) {
      //   //     console.log(node);
      //   //   },
      //   // })
      //   // new URL(url, import.meta.url).href
      //   // const regex = /require\s*\(`*\s*["']([^"']+?)["']\s*`*\)/gi;
      //   // const res = code.replace(regex, "new URL('$1', import.meta.url).href")
      //   const regex = /require\((['"`])(.*?)\1\)/ig;
      //   const res = code.replace(regex, "new URL(`$2`, import.meta.url).href")
      //   console.log(res, 88888);
      //   return res
      // }
      // if (/\/node_modules\//g.test(id)) return code
      if (/\.(vue|js|jsx|ts|tsx|mjs)$/.test(id)) {
        // console.log('code:', code);
        // const ast = this.parse(code)
        // treeWalk(ast, {
        //   // node.type == 'ImportDeclaration'
        //   // ImportDeclaration(node) {
        //   //   console.log(node.source.value);
        //   // },
        //   FunctionDeclaration(node) {
        //     console.log(node);
        //   },
        // })
        const regex = /require\((['"`])(.*?)\1\)/ig;
        // const res = code.replace(regex, "new URL(`$2`, import.meta.url).href")
        const res = code.replace(regex, (match, $1, $2) => {
          // 如果是npm包需要放行
          return $2.startsWith('.') ? `new URL(\`${$2}\`, import.meta.url).href` : match
        })
        return res
      }
    },
  }
}
function treeWalk(ast, visitor) {
  for (const node of Object.values(ast)) {
    if (node && typeof node === 'object') {
      visitor[node.type]?.(node)
      treeWalk(node, visitor)
    }
  }
}