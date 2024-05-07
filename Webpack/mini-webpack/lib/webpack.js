/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2024-05-07 14:41:36
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2024-05-07 14:58:04
 * @FilePath: /code-demo/Webpack/mini-webpack/lib/webpack.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require('fs')
const path = require('path')
const parser  = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

class Webpack  {
  constructor(options) {
    this.entry = options.entry
    this.output = options.output
    this.bundleFile()

  }
  readFile(modulePath) {
    const content = fs.readFileSync(modulePath, 'utf-8')
    return content
  }
  // 定义parseContent 方法，使用 @babel/parser 的 parse 方法以模块模式将文件内容转化为抽象语法树 AST。

  parseContent(content) {
    const ast = parser.parse(content, {
      sourceType: 'module'
    })
    console.log(ast, ast.program.body);
    return ast
  }
  // 3. 从入口文件开始收集模块的依赖，生成依赖关系图
  // 收集单个模块的依赖，生成 code
  transform(modulePath) {
    const content = this.readFile(modulePath)
    const ast = this.parseContent(content)
    const dependencies = {}
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(modulePath)
            dependencies[node.source.value] = './' + path.join(dirname, node.source.value)
        }
    })
    const { code } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    return {
        filename: modulePath,
        dependencies,
        code
    }
  }
  generateDependenciesGraph(entry) {
      const entryModule = this.transform(entry)
      const graphArray = [entryModule]

      for (let i = 0; i < graphArray.length; i ++) {
          const module = graphArray[i]
          const { dependencies } = module
          if (dependencies) {
              for (let key in dependencies) {
                  graphArray.push(this.transform(dependencies[key]))
              }
          }
      }

      let graph = {}
      graphArray.forEach(item => {
          const { filename, dependencies, code } = item
          graph[filename] = {
              dependencies,
              code
          }
      })
      return graph
  }
  // 生成 bundle
  bundleFile() {
      const { entry } = this
      const graph = JSON.stringify(this.generateDependenciesGraph(entry))
      const content =  `
          (function(graph) {
              // webpackBootstrap
              function require(modulePath){
                  // 缺失了 require 补齐:require("./a.js") ---> require("./src/a.js")
                  function localRequire(relativePath) {
                      return require(graph[modulePath].dependencies[relativePath]);
                  }
                  const exports = {};
                  // 自执行函数前的表达式或者方法执行必须加分号，否则自执行函数会被当作表达式或者方法的参数执行
                  (function(require, exports, code){
                      eval(code);
                  })(localRequire, exports, graph[modulePath].code)
                  
                  return exports;
              }
              require('${entry}');
          })(${graph})
      `
      const { path: relativePath, filename } = this.output
      const bundlePath = path.join(relativePath, filename)
      fs.writeFileSync(bundlePath, content, 'utf-8')
  }

  
}

module.exports = Webpack