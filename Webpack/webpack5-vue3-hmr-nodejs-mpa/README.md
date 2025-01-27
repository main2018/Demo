<!--
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-01-27 10:29:13
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-01-27 10:57:15
 * @FilePath: /code-demo/Webpack/webpack5-vue3-hmr-nodejs-mpa/Readme.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 项目描述
- 此项目为webpack5+vue3+webpack-dev-middleware的用于实验hmr多页应用的基础项目，非生产版项目，如需生产需要自行扩展

## 注意事项
1.  ❌ 注意：eval-source-map/inline-source-map等行内（非单独文件）source-map可能会导致HMR失效<br>
    ❌ 具体表现为：更新了浏览器没刷新，但是组件的状态丢失，比如input的内容没了<br>
    ❌ 如发现热更新不生效可能就跟devtool有关，可以尝试使用cheap-source-map等选项<br>

2.  ❌ 注意：正常情况下，修改入口文件不会触发热更新（浏览器会刷新）<br>
    ❌ 如想实现入口文件(main.js)的热更新，需要在入口文件中添加如下代码<br>
    ❌ 添加以下代码虽然可以实现入口文件的热更新，但是组件状态依然会丢失，比如input的内容丢失<br>

    ```javascript
    if (module.hot) {
      module.hot.accept()
    }
    ```