### scripts模块使用方法(用来生成 组件 路由 等 自动生成文件夹和文件)
原理： 利用node的fs模块生成文件， process模块来监听用户输入

"scripts": {
  "new:comp": "node ./scripts/generateComponent",
  "new:view": "node ./scripts/generateView"
},

npm run new:comp // 生成组件
npm run new:view // 生成路由

如需配置： 修改generateComponent等js文件里的配置即可
