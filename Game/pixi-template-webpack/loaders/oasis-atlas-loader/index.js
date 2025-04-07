/*
 * @Author: guozongwei
 * @Date: 2019-05-16 16:30:40
 * @Remark: oasis atlas 文件处理， 对于oasis工具生成的图集，修改内部图片路径
 * spine图集，生成同文件同名json和png文件。注意，生成后的三个文件文件名相同
 */
const fs = require('fs')
const path = require("path");
const schema = require('./schema.json')
const loaderUtils = require('loader-utils')
module.exports = function (source) {
  const options = this.getOptions(schema)
  let sourceFormat = null
  let filename = ''
  // 获取atlas文件名
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
  // 获取配置中publicPath
  let publicPath = ''
  if (options.publicPath) {
    if (typeof options.publicPath == 'string') {
      publicPath = options.publicPath
    } else {
      publicPath = options.publicPath()
    }
  }
  // 插值方式获取atlas文件名
  let resPath = loaderUtils.interpolateName(this, filename, {
    content: source
  });
  try {
    // TODO 应用合理方式判断是否为对象字符串，而不是放在trycatch里

    // oasis生成的图集为类json结构，而spine为文本形式
    sourceFormat = eval("(" + source + ")")
  } catch (error) {
    sourceFormat = null
  }
  // var callback = this.async();
  const pathPrefix = (this.resourcePath.replace(new RegExp(path.basename(this.resourcePath)), ''))
  
  if (sourceFormat && sourceFormat.atlasItems) {

    // 处理oasis图集工具生成的图集，为类json结构，可eval

   for (let i = 0; i < sourceFormat.atlasItems.length; i++) {
      const imgUrl = path.resolve(pathPrefix, sourceFormat.atlasItems[i].img)
      if (fs.existsSync(imgUrl)) {
        // 读取相应路径的图片内容，临时使用同步方式，需要优化
        const imgData = fs.readFileSync(imgUrl)
        // 插值方式获取图片文件名
        let imgOutPath = loaderUtils.interpolateName({
          resourcePath: imgUrl
        }, filename, {
          content: imgData
        });
        // 将atlas中img修改为最终路径
        sourceFormat.atlasItems[i].img = publicPath + imgOutPath
        // 生成图片文件
        this.emitFile(imgOutPath, imgData, null);
        // callback(null, source)
      }else{
        throw new Error(imgUrl + '文件不存在，请将图片与atlas放置同一目录下');
      }

    }
    // 重新生成atlas文件
    // this.emitFile(resPath, JSON.stringify(sourceFormat), null);
  }else {
    // 处理spine图集，生成与atlas同名json和png
    sourceFormat = source
    const resourceName =  path.basename(this.resourcePath, '.atlas') 
    const imgUrl = path.resolve(pathPrefix, resourceName + '.png')
    if (fs.existsSync(imgUrl)) {
      // 读取相应路径的图片内容，临时使用同步方式，需要优化
      const imgData = fs.readFileSync(imgUrl)
      // 生成图片文件
      this.emitFile(resPath.replace(/\.atlas/, '.png'), imgData, null);
      // callback(null, source)
    }else{
      throw new Error(imgUrl + '文件不存在，请将json与atlas放置同一目录下');
    }

    const jsonUrl = path.resolve(pathPrefix, resourceName + '.json')
    if (fs.existsSync(jsonUrl)) {
      // 读取相应路径的图片内容，临时使用同步方式，需要优化
      const jsonData = fs.readFileSync(jsonUrl)
     
      // 生成图片文件
      this.emitFile(resPath.replace(/\.atlas/, '.json'), jsonData, null);
      // callback(null, source)
    }else{
      throw new Error(jsonUrl + '文件不存在，请将json与atlas放置同一目录下');
    }
     // 重新生成atlas文件
   
  }
  let endJsonPath = loaderUtils.interpolateName(this, filename, {
    content: JSON.stringify(sourceFormat)
  });
  this.emitFile(endJsonPath, JSON.stringify(sourceFormat), null);
  // 导出loader结果 -- atlas模块路径
  let outPath = `__webpack_public_path__ + ${JSON.stringify(endJsonPath)}`;
  return `module.exports = ${outPath}`;
}
// module.exports.raw = true;
