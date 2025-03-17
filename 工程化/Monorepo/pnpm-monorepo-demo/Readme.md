<!--
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2024-12-09 15:41:24
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-17 10:42:16
 * @FilePath: /code-demo/工程化/Monorepo/pnpm-monorepo-demo/Readme.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
来源：【【前端开发】你一定能学会Monorepo【前端基础】-哔哩哔哩】 https://b23.tv/d7kt9Ar

#### 注意：
1. Vue项目
2. React项目

#### 思考：vue、react安装在哪里？
- 根目录下
- vite
- vue / @vitejs/plugin-vue
- react / react-dom / @vitejs/plugin-react

#### 开发说明：
在 Monorepo 根目录下，你可以使用 pnpm install 安装所有包的依赖。你也可以为特定的包安装依赖：
```zsh
pnpm add lodash --filter package-a
```
你可以在 Monorepo 根目录下运行特定包的脚本。例如：
```zsh
pnpm run --filter package-a build
```