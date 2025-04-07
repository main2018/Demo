module.exports = {
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "./loaders/")],
  },
  modules: {
    rules: [
      {
        test: /spine[\\/].+\.atlas$/,
        loader: "spine-atlas-loader",
        type: "javascript/auto",
        options: {
          filename: (ctx) => {
            let filename = ctx.resourcePath || ctx.filename;
            filename = filename.split(path.sep).join("/");
            let url = filename.match(/src\/(\S*)/);
            const ts = Date.now();
            if (url) {
              // 正常图片名字位置处理方式
              const index = url[1].lastIndexOf("/") || 0;
              url = url[1].slice(0, index);
              if (url.indexOf("web-sync") > -1 && env.isOffline == 0) {
                const pageName = createHash("md5")
                  .update(`${pageHost}a-vue3/${ctx.pageName}`)
                  .digest("hex");
                return `views/web-sync/${ctx.pageName}/[name]-[contenthash:5].[ext]?qm_source=${pageName}`;
                // return `views/web-sync/${ctx.pageName}/[name].[ext]?ts=${ts}&qm_source=${pageName}`;
              }
              return url + `/[name]-[contenthash:5].[ext]`;
              // return url + `/[name].[ext]?ts=${ts}`;
            } else {
              return `assets/img/common/[name]-[contenthash:5].[ext]`;
              // return `assets/img/common/[name].[ext]?ts=${ts}`;
            }
          },
          publicPath: _config[_env].publicPath,
        },
      },
      {
        // test: /spine\/[^\/]+\.json$/,
        test: /spine[\\/].+\.json$/,
        type: "asset/resource",
        generator: {
          filename: (ctx) => {
            let filename = ctx.resourcePath || ctx.filename;
            filename = filename.split(path.sep).join("/");
            let url = filename.match(/src\/(\S*)/);
            const ts = Date.now();
            
            if (url) {
              // 正常图片名字位置处理方式
              const index = url[1].lastIndexOf("/") || 0;
              url = url[1].slice(0, index);
              if (url.indexOf("web-sync") > -1 && env.isOffline == 0) {
                const pageName = createHash("md5")
                  .update(`${pageHost}a-vue3/${ctx.pageName}`)
                  .digest("hex");
                return `views/web-sync/${ctx.pageName}/[name]-[contenthash:5].[ext]?qm_source=${pageName}`;
                // return `views/web-sync/${ctx.pageName}/[name].[ext]?ts=${ts}&qm_source=${pageName}`;
              }
              return url + `/[name]-[contenthash:5].[ext]`;
              // return url + `/[name].[ext]?ts=${ts}`;
            } else {
              return `assets/img/common/[name]-[contenthash:5].[ext]`;
              // return `assets/img/common/[name].[ext]?ts=${ts}`;
            }
          },
        },
      },

      // {
      //   test: /spineLoader\/.*\.(atlas|json)$/,
      //   loader: "spine-loader",
      //   type: 'javascript/auto',
      //   options:{
      //     filename: (ctx) => {
      //       let filename  = ctx.resourcePath
      //       filename = filename.split(path.sep).join("/");
      //       let url = filename.match(/src\/(\S*)/);
      //       if (url) {
      //         // 正常图片名字位置处理方式
      //         const index = url[1].lastIndexOf("/") || 0;
      //         url = url[1].slice(0, index);
      //         if(url.indexOf("web-sync")>-1 && env.isOffline == 0){
      //           const pageName = createHash('md5').update(`${pageHost}a-vue3/${ctx.pageName}`).digest("hex")
      //           return `views/web-sync/${ctx.pageName}/[name]-[contenthash:5].[ext]?qm_source=${pageName}`;
      //         }
      //         return url + "/[name]-[contenthash:5].[ext]";
      //       } else {
      //         return "assets/img/common/[name]-[contenthash:5].[ext]";
      //       }
      //     },
      //     publicPath: _config[_env].publicPath
      //   }
      // },
    ]
  }
}