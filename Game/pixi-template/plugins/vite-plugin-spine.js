/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-03 18:19:22
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-05 21:46:11
 * @FilePath: /code-demo/Game/pixi-template/plugins/vite-plugin-spine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

function rewriteImgPath(source, imgPath) {
  const regex = /^(\w+\.(png|webp|jpe?g|gif))/g;

  // 替换图片路径
  const modifiedSource = source.replace(regex, (match) => {
    return imgPath;
  });
  return modifiedSource
}


// 处理 atlas 文件，目前用的方法1
// 方法1: 生成新的 atlas 文件和图片文件，同时移除旧的 atlas 文件
// 方法2: 直接修改 atlas 文件中的图片路径 同时生成新的图片文件，修改atlas文件中的图片路径可以在generateBundle 中进行 
export default function vitePluginSpine(options = {}) {
  const defaultOptions = {
    fileName: 'assets/[name].[hash].[ext]'
  };
  const pluginOptions = { ...defaultOptions, ...options };
  // 保存 Vite 的 base 配置
  let viteBase = '/';
  let urlAtlasOld = '';

  return {
    name: 'vite-plugin-spine',
    enforce: 'pre',
    apply: 'build',
    configResolved(config) {
      // 获取 Vite 配置的 base 值
      viteBase = config.base;
      if (!viteBase.endsWith('/')) {
        viteBase += '/';
      }
    },
    async transform(code, id) {
      // 匹配 spine/**/*.atlas
      // const regex = /spine[\\/].+\.atlas$/
      const regex = /spine[\\/].+\.atlas\?url$/
      if (regex.test(id)) {
        // return cloneDeep
        // console.log(code, 4444444);
        const filePath = path.resolve(id).split('?')[0];
        // console.log(filePath, 111111);

        const dir = path.dirname(filePath);
        const baseName = path.basename(filePath, '.atlas');

        // 读取 atlas 文件内容
        const atlasContent = await fs.promises.readFile(filePath, 'utf-8');

        // 查找可能的图片扩展名
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
        let imagePath = '';
        let imageExt = '';

        for (const ext of imageExtensions) {
          const possiblePath = path.join(dir, `${baseName}${ext}`);
          if (fs.existsSync(possiblePath)) {
            imagePath = possiblePath;
            imageExt = ext;
            break;
          }
        }

        if (!imagePath) {
          console.warn(`No matching image found for atlas file: ${filePath}`);
          return atlasContent;
        }
  
        // 生成唯一的图片文件名
        const imageContent = await fs.promises.readFile(imagePath);
        const hash = createHash('sha256').update(imageContent).digest('hex').substring(0, 8);

      // 根据配置生成新的图片文件名
        const newImageName = pluginOptions.fileName
          .replace('[name]', baseName)
          .replace('[hash]', hash)
          .replace('[ext]', imageExt.substring(1)); // 去掉扩展名前的点

        this.emitFile({
          type: 'asset',
          fileName: newImageName,
          source: imageContent
        });
  
        const modifiedAtlasContent = rewriteImgPath(atlasContent, newImageName.split('/').pop());
        // 复制并重命名图片文件
        // fs.copyFileSync(imagePath, newImagePath);
        console.log(filePath, 11111);

        
        const atlasHash = createHash('sha256').update(modifiedAtlasContent).digest('hex').substring(0, 8);
        const newAtlasName = pluginOptions.fileName
          .replace('[name]', baseName)
          .replace('[hash]', atlasHash)
          .replace('[ext]', 'atlas')
          .replace(/^[\/\\]/, '');
        console.log(newAtlasName, 333333);
        const urlAtlas = this.emitFile({
          type: 'asset',
          fileName: newAtlasName,
          source: modifiedAtlasContent,
        });
        console.log(urlAtlas, 22222);

        const regexExport = /__VITE_ASSET__([a-zA-Z0-9]+)__/i
        urlAtlasOld = code.match(regexExport)[1]
        const newCode = `export default "__VITE_ASSET__${urlAtlas}__"`;

        
        console.log(code, newCode, urlAtlasOld, this.getFileName(urlAtlas),  555555);
        
        return {
          code: newCode,
          // 将图片文件作为额外依赖，确保它们被正确处理
          // dependencies: [imagePath],
          map: null,
        };
        
        // const dir = path.dirname(id);
        // const files = fs.readdirSync(dir);
        // const pngFile = files.find(f => f.match(/\.(png|webp|jpg)$/));
        // if (pngFile) {
        //   return code.replace(/^(.+\.(png|webp|jpg))/m, pngFile);
        // }
      }
      return null
    },
    async generateBundle(options, bundle) {
      console.log(Object.keys(bundle), 66666);
      // 找到旧的 atlas 文件 并获取到它的路径 然后从资源列表中删除
      if (urlAtlasOld) {
        const bundleKey = this.getFileName(urlAtlasOld)
        delete bundle[bundleKey]
      }
    }
  }
}