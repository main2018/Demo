<!--
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2023-09-08 10:49:50
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2023-09-08 15:07:23
 * @FilePath: /code-demo/Vite/vite-mpa-test/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 引入js文件does not provide an export named 'default'问题
1. optimizeDeps.includes = ['@src/pages/test1/commonjs']，同时import文件的路径需保持一致import commonjs from '@src/pages/test1/commonjs'
2. 或者使用vite-plugin-commonjs自动把使用的js转为esm
