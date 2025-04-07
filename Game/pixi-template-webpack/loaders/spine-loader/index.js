/*
 * @Author: guozongwei
 * @Date: 2019-05-16 16:30:40
 * @Remark: oasis atlas 文件处理， 对于oasis工具生成的图集，修改内部图片路径
 * spine图集，生成同文件同名json和png文件。注意，生成后的三个文件文件名相同
 */
const fs = require("fs");
const path = require("path");
const schema = require("./schema.json");
const loaderUtils = require("loader-utils");
const crypto = require("crypto");
module.exports = function (source) {
  const options = this.getOptions(schema);
  let sourceFormat = null;
  let filename = "";
  // 获取atlas文件名
  if (options.filename) {
    if (typeof options.filename == "string") {
      filename = options.filename;
    } else {
      filename = options.filename({
        resourcePath: this.resourcePath,
        pageName: [...this._compilation.entries.keys()][0],
      });
    }
  }
  // console.log("###filename", filename);
  // 获取配置中publicPath
  let publicPath = "";
  if (options.publicPath) {
    if (typeof options.publicPath == "string") {
      publicPath = options.publicPath;
    } else {
      publicPath = options.publicPath();
    }
  }
  // 插值方式获取atlas文件名
  let resPath = loaderUtils.interpolateName(this, filename, {
    content: source,
  });
  // console.log("###resPath", resPath);
  try {
    // TODO 应用合理方式判断是否为对象字符串，而不是放在trycatch里

    // oasis生成的图集为类json结构，而spine为文本形式
    sourceFormat = eval("(" + source + ")");
  } catch (error) {
    sourceFormat = null;
  }
  // var callback = this.async();
  const pathPrefix = this.resourcePath.replace(
    new RegExp(path.basename(this.resourcePath)),
    ""
  );
  const resourcePath = this.resourcePath;
  const resourceExt = path.extname(resourcePath);
  const resourceName = path.basename(resourcePath, resourceExt);
  // const pathPrefix = path.dirname(resourcePath);
  // 始终以 .atlas 文件内容生成公共哈希
  let atlasContent;
  if (resourceExt === ".atlas") {
    atlasContent = source;
  } else {
    const atlasPath = path.resolve(pathPrefix, `${resourceName}.atlas`);
    if (!fs.existsSync(atlasPath)) {
      this.emitError(
        new Error(`${atlasPath} 文件不存在，请将 json 与 atlas 放置同一目录下`)
      );
      return source;
    }
    atlasContent = fs.readFileSync(atlasPath);
  }
  const commonHash = crypto
    .createHash("sha256")
    .update(atlasContent)
    .digest("hex")
    .slice(0, 5);
  // console.log("Generated common hash:", commonHash);

  if (resourceExt === ".atlas") {
    // 处理 .png 文件
    const pngUrl = path.resolve(pathPrefix, `${resourceName}.png`);
    if (fs.existsSync(pngUrl)) {
      const pngData = fs.readFileSync(pngUrl);
      const newPngName = `${resourceName}-${commonHash}.png`;
      const endPngPath = filename
        .replace("[name]", resourceName)
        .replace("[contenthash:5]", commonHash)
        .replace("[ext]", "png");
      // console.log("Generated PNG path:", endPngPath);
      this.emitFile(endPngPath, pngData, null);
    } else {
      this.emitError(
        new Error(
          `${pngUrl} 文件不存在，请将 json、png 与 atlas 放置同一目录下`
        )
      );
    }

    // 处理 .json 文件
    const jsonUrl = path.resolve(pathPrefix, `${resourceName}.json`);
    if (fs.existsSync(jsonUrl)) {
      const jsonData = fs.readFileSync(jsonUrl);
      // const newJsonName = `${resourceName}-${commonHash}.json`;
      const endJsonPath = filename
        .replace("[name]", resourceName)
        .replace("[contenthash:5]", commonHash)
        .replace("[ext]", "json");
      // console.log("Generated JSON path:", endJsonPath);
      this.emitFile(endJsonPath, jsonData, null);
    } else {
      this.emitError(
        new Error(
          `${jsonUrl} 文件不存在，请将 json、png 与 atlas 放置同一目录下`
        )
      );
    }

    // 处理 .atlas 文件自身
    const newAtlasName = `${resourceName}-${commonHash}.atlas`;
    const endAtlasPath = filename
      .replace("[name]", resourceName)
      .replace("[contenthash:5]", commonHash)
      .replace("[ext]", "atlas");
    // console.log("Generated atlas path:", endAtlasPath);

    // 更新 .atlas 文件中的图片引用，确保使用相同的哈希值
    const regex = new RegExp(`${resourceName}\\.png`, "g");
    const updatedSource = source
      .toString()
      .replace(regex, `${resourceName}-${commonHash}.png`);
    // console.log("Updated atlas content:", updatedSource);
    this.emitFile(endAtlasPath, updatedSource, null);

    // 导出 loader 结果 -- atlas 模块路径
    let atlasOutPath = `__webpack_public_path__ + ${JSON.stringify(
      endAtlasPath
    )}`;
    return `module.exports = ${atlasOutPath}`;
  } else if (resourceExt === ".json") {
    const jsonData = source;
    // const newJsonName = `${resourceName}-${commonHash}.json`;
    const endJsonPath = filename
      .replace("[name]", resourceName)
      .replace("[contenthash:5]", commonHash)
      .replace("[ext]", "json");
    // console.log("Generated JSON path:", endJsonPath);
    this.emitFile(endJsonPath, jsonData, null);

    // 导出 loader 结果 -- json 模块路径
    let jsonOutPath = `__webpack_public_path__ + ${JSON.stringify(
      endJsonPath
    )}`;
    return `module.exports = ${jsonOutPath}`;
  }

  return source;
};
