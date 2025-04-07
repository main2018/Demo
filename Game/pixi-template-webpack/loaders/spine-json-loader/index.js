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
  // console.log('进来啦啦啦啦啦啦', this.resourcePath || this.filename);
  
  const options = this.getOptions(schema)
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
  // console.log(source, 'this.source');
  
  const pathPrefix = (this.resourcePath.replace(new RegExp(path.basename(this.resourcePath)), ''))

  const resourceName =  path.basename(this.resourcePath, '.json') 
  const imgUrl = path.resolve(pathPrefix, resourceName + '.png')
  if (fs.existsSync(imgUrl)) {
    // 读取相应路径的图片内容，临时使用同步方式，需要优化
    const imgData = fs.readFileSync(imgUrl)
    // 生成图片文件
    // this.emitFile('views/honey-party/web-sync/img/game/spine/honeyPotJackpot.png', imgData, null);
    this.emitFile(resPath.replace(/\.json/, '.png'), imgData, null);
    // callback(null, source)
  }else{
    throw new Error(imgUrl + '文件不存在，请将png与json放置同一目录下');
  }

  const atlasUrl = path.resolve(pathPrefix, resourceName + '.atlas')
  if (fs.existsSync(atlasUrl)) {
    // 读取相应路径的图片内容，临时使用同步方式，需要优化
    const atlasData = fs.readFileSync(atlasUrl)
    
    // 生成图片文件
    // console.log(resPath.replace(/\.json/, '.atlas'), atlasData, 77777777);
    
    // this.emitFile('views/honey-party/web-sync/img/game/spine/honeyPotJackpot.atlas', atlasData, null);
    this.emitFile(resPath.replace(/\.json/, '.atlas'), atlasData, null);
    // callback(null, source)
  }else{
    throw new Error(jsonUrl + '文件不存在，请将atlas与json放置同一目录下');
  }

  let endJsonPath = loaderUtils.interpolateName(this, filename, {
    content: JSON.stringify(source)
  });
  let outPath = `__webpack_public_path__ + ${JSON.stringify(endJsonPath)}`;
  // let outPath = `__webpack_public_path__ + ${JSON.stringify('views/honey-party/web-sync/img/game/spine/honeyPotJackpot.json')}`;
  // console.log(resPath, pathPrefix, endJsonPath, 'resPath');
  // this.emitFile('views/honey-party/web-sync/img/game/spine/honeyPotJackpot.json', source, null);
  this.emitFile(endJsonPath, source, null);
  return `module.exports = ${outPath}`;
  // return `module.exports = ${outPath}`;
}
// module.exports.raw = true;
