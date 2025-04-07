/*
 * @Author: zongwei.guo
 * @Date: 2022-11-07 17:49:25
 * @Remark: @lottie 文件处理
 * @LastEditors: zongwei.guo
 * @LastEditTime: 2022-12-01 23:11:52
 */

const fs = require('fs')
const path = require("path");
const schema = require('./schema.json')
const loaderUtils = require('loader-utils')
module.exports = function (source) {
  const options = this.getOptions(schema)
  let sourceFormat = null
  let filename = ''
  
  // 获取lottie文件名
  if (options.filename) {
    if (typeof options.filename == 'string') {
      filename = options.filename
    } else {
      filename = options.filename({
        resourcePath: this.resourcePath,
        pageName: [...this._compilation.entries.keys()][0]
      })
    }
  }
  const filenameBasename = path.basename(filename)
  // 获取配置中publicPath
  let publicPath = ''
  if (options.publicPath) {
    if (typeof options.publicPath == 'string') {
      publicPath = options.publicPath
    } else {
      publicPath = options.publicPath()
    }
  }
 
  try {
    sourceFormat = eval("(" + source + ")")
  } catch (error) {
    sourceFormat = null
  }
  // var callback = this.async();
  const pathPrefix = (this.resourcePath.replace(new RegExp(path.basename(this.resourcePath)), ''))
  if (sourceFormat && sourceFormat.assets) {
   for (let i = 0; i < sourceFormat.assets.length; i++) {
    if(sourceFormat.assets[i].p){
      if (/^http/.test(sourceFormat.assets[i].p)) {
        
      } else if(/^data/.test(sourceFormat.assets[i].p)) {
        sourceFormat.assets[i].e = 1
      } else {
        const imgUrl = path.resolve(pathPrefix, sourceFormat.assets[i].u, sourceFormat.assets[i].p)
        if (fs.existsSync(imgUrl)) {
          // 读取相应路径的图片内容，临时使用同步方式，需要优化
          const imgData = fs.readFileSync(imgUrl)
          // 插值方式获取图片文件名
          let imgOutPath = loaderUtils.interpolateName({
            resourcePath: imgUrl
          },  path.join(filename.replace(filenameBasename, ''),sourceFormat.assets[i].u, filenameBasename), {
            content: imgData
          });
          // 将lottie中u修改为最终路径
          // sourceFormat.assets[i].p = path.basename(imgOutPath)
          sourceFormat.assets[i].p = imgOutPath
          sourceFormat.assets[i].u = publicPath
          // 生成图片文件
          this.emitFile(imgOutPath, imgData, null);
        } else {
          throw new Error(imgUrl + '文件不存在，请将图片与lottie放置同一目录下');
        }
      }
      
        // callback(null, source)
      }

    }
   
  }
  const dataResult = JSON.stringify(sourceFormat)
   // 插值方式获取lottie文件名
  let resPath = loaderUtils.interpolateName(this, filename.replace(path.extname(filename),'.json'), {
    content: dataResult
  });
   // 重新生成lottie文件
   this.emitFile(resPath, dataResult, null);
  // 导出loader结果 -- lottie模块路径
  let outPath = `__webpack_public_path__ + ${JSON.stringify(resPath)}`;
  return `module.exports = ${outPath}`;
}
// module.exports.raw = true;
