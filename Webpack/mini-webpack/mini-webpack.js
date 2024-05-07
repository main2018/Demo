/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2024-05-07 15:10:40
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2024-05-07 15:55:57
 * @FilePath: /code-demo/Webpack/mini-webpack/mini-webpack.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

// 1. 分析依赖
function parseModules(file) {
  const entry = getModuleInfo(file)

  const temp = [entry]
  const depsGraph = {}
  // 生成依赖图
  getDeps(temp, entry)
  temp.forEach(moduleInfo => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    }
  })
  return depsGraph
}

function getDeps(temp, {deps}) {
  Object.keys(deps).forEach(key => {
    const child = getModuleInfo(deps[key])
    temp.push(child)
    getDeps(temp, child)
  })
}

function getModuleInfo(file) {
  const content = fs.readFileSync(file, 'utf-8')
  // 代码转为AST
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  // 使用traverse解析ast里的依赖
  const deps = {}
  traverse(ast, {
    // 获取import导入的模块
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file)
      deps[node.source.value] = './' + path.join(dirname, node.source.value)
    }
  })
  const { code } = transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  // console.log(code)
  return {
    file,
    deps,
    code
  }
}
// 2. 生成 bundle
function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file))
  // 解释一下下面这段代码
  return `
    (function (graph) {
      function require(file) {
        function localRequire(relativePath) {
          return require(graph[file].deps[relativePath])
        }
        var exports = {};
        (function(require, exports, code) {
          eval(code)
        })(localRequire, exports, graph[file].code)
        return exports
      }
      require('${file}')
    })(${depsGraph})
  `
}
const content = bundle("./src/index.js")
fs.writeFileSync('./dist/bundle.js', content)