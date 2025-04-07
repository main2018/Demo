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

const imgTypes = ['png', 'webp']

function rewriteImgPath(source, imgPath) {
  // // 将二进制数据转换为字符串
  // const sourceString = source.toString('utf8');
  // // 正则表达式匹配图片路径
  // const regex = /(\w+\.(png|jpg|jpeg|gif))/g;
  // // 替换图片路径
  // const modifiedSourceString = sourceString.replace(regex, (match) => {
  //   return `${prefix}${match}`;
  // });
  // // 将修改后的字符串转换回二进制数据
  // const modifiedSource = Buffer.from(modifiedSourceString, 'utf8');

  // 正则表达式匹配图片路径
  const regex = /^(\w+\.(png|webp|jpe?g|gif))/g;

  // 替换图片路径
  const modifiedSource = source.replace(regex, (match) => {
    return imgPath;
  });
  return modifiedSource
}
module.exports = function (source) {
  // console.log('进来啦啦啦啦啦啦', this.resourcePath || this.filename);
  // const callback = this.async();
  let sourceFormat = source
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
    content: sourceFormat
  });
  // console.log(source, 'this.source');
  
  const pathPrefix = (this.resourcePath.replace(new RegExp(path.basename(this.resourcePath)), ''))

  const resourceName =  path.basename(this.resourcePath, '.atlas') 
  // const imgUrl = path.resolve(pathPrefix, resourceName + '.png')
  const imgList = imgTypes.map(type => path.resolve(pathPrefix, resourceName + '.' + type))
  const imgUrl = imgList.find(url => fs.existsSync(url))
  // console.log(imgUrl, 999999999);
  
  // if (fs.existsSync(imgUrl)) {
  if (imgUrl) {
    // 读取相应路径的图片内容，临时使用同步方式，需要优化
    const imgData = fs.readFileSync(imgUrl)
    // 生成图片文件
    const url = resPath.replace(/\.atlas/, '.png')
    sourceFormat = rewriteImgPath(sourceFormat, url.split('/').pop());
    // console.log(rewriteImgPath(sourceFormat, url), 999999999);
    
    // this.emitFile('views/honey-party/web-sync/img/game/spine/honeyPotJackpot.png', imgData, null);
    this.emitFile(url, imgData, null);
    // callback(null, source)
  }else{
    throw new Error(imgList[0] + `文件不存在，请将${imgTypes.join('/')}与json放置同一目录下`);
  }

  // const atlasUrl = path.resolve(pathPrefix, resourceName + '.atlas')
  // if (fs.existsSync(atlasUrl)) {
  //   // 读取相应路径的图片内容，临时使用同步方式，需要优化
  //   const atlasData = fs.readFileSync(atlasUrl)
    
  //   // 生成图片文件
  //   // console.log(resPath.replace(/\.json/, '.atlas'), atlasData, 77777777);
    
  //   // this.emitFile('views/honey-party/web-sync/img/game/spine/honeyPotJackpot.atlas', atlasData, null);
  //   this.emitFile(resPath.replace(/\.json/, '.atlas'), atlasData, null);
  //   // callback(null, source)
  // }else{
  //   throw new Error(jsonUrl + '文件不存在，请将atlas与json放置同一目录下');
  // }

  let endJsonPath = loaderUtils.interpolateName(this, filename, {
    content: JSON.stringify(sourceFormat)
  });
  let outPath = `__webpack_public_path__ + ${JSON.stringify(endJsonPath)}`;
  this.emitFile(endJsonPath, sourceFormat, null);
  return `module.exports = ${outPath}`;
}
// module.exports.raw = true;
