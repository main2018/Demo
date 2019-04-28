// 文本信息文件下载
var funDownload = function (content, filename) {
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  };
  const html = `
  <!doctype html>
  <html>
  <head>
  <meta charset="utf-8">
  <title>测试</title>
  </head>

  <body>
  <h1>测试</h1>
  </body>
  </html>
  `
  funDownload(html, 'test.html');  
  
  // 图片下载
  var imgDownload = function (url, filename) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';

    const domImg = new Image()
    domImg.src = url
    domImg.onload = function () {
      // 图片转base64地址
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var width = domImg.naturalWidth;
      var height = domImg.naturalHeight;
      canvas.width = width
      canvas.height = height
      context.drawImage(domImg, 0, 0, width, height);
      // 如果是PNG图片，则canvas.toDataURL('image/png')
      eleLink.href = canvas.toDataURL('image/jpeg')
      // 触发点击
      document.body.appendChild(eleLink)
      eleLink.click()
      // 然后移除
      document.body.removeChild(eleLink)
    }
  }
