// 图片压缩

function compressWithSize(file, maxWidth = 1000, maxHeight = 800) {
  if (!file || !file.type.includes('image')) return Promise.resolve(file)
  // 压缩图片需要的一些元素和对象
  let reader = new FileReader(),
      img = new Image()

  // 缩放图片需要的canvas
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')

  // base64地址图片加载完毕后
  img.src = URL.createObjectURL(file)
  return new Promise(resolve => {
    img.onload = function () {
      // 图片原始尺寸
      let originWidth = this.width
      let originHeight = this.height
      // 目标尺寸
      let targetWidth = originWidth, targetHeight = originHeight
      // 图片尺寸超过400x400的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth
          targetHeight = Math.round(maxWidth * (originHeight / originWidth))
        } else {
          // 更高，按照高度限定尺寸
          targetHeight = maxHeight
          targetWidth = Math.round(maxHeight * (originWidth / originHeight))
        }
      }
  
      // canvas对图片进行缩放
      canvas.width = targetWidth
      canvas.height = targetHeight
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight)
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight)
      // document.querySelector('img').src = canvas.toDataURL('image/png')
      // canvas转为blob并上传
      canvas.toBlob(function (blob) {
        return resolve(blob)
      //  let xhr = new XMLHttpRequest()
      //  xhr.onreadystatechange = function() {
      //    if (xhr.status == 200) {
      //      // xhr.responseText就是返回的数据
      //    }
      //  }
      //  xhr.open('POST', 'upload.php', true)
      //  xhr.send(blob)
      }, file.type || 'image/png')
    }
  })
}



async function compressWithQuality(file, maxSize = 0.2) {
  // maxSize
  let size = file.size / 1024 / 1024
  // console.log(URL.createObjectURL(file))
  if (size <= maxSize) return file
  console.log('压缩前:', file.size)
  let quality = size > maxSize ? maxSize / size : 1
  console.log('quality', quality)
  let toBase64 = false
  let url = await canvasCompress(file, toBase64, quality)
  return url
  // url = toBase64 ? url : URL.createObjectURL(url)
  // let img = document.querySelector('#res')
  // img.src = url
  // img.onload = function () {
  //   // no longer need to read the blob so it's revoked
  //   URL.revokeObjectURL(url)
  // }
}
function canvasCompress(file, toBase64 = true, quality = 0.1, type = 'jpeg', w) {
  return new Promise(resolve => {
    var ready = new FileReader()
    ready.readAsDataURL(file)
    ready.onload = function (e) {
      var img = new Image()
      img.src = e.target.result
      img.onload = function () {
        // 默认按比例压缩
        let width = img.width,
            height = img.height,
            scale = width / height
        width = w || width
        height = width / scale
        // var quality = 0.7  // 默认图片质量为0.7
        // 生成canvas
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        // 创建属性节点
        var anw = document.createAttribute('width')
        anw.nodeValue = width
        var anh = document.createAttribute('height')
        anh.nodeValue = height
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        if (type === 'jpeg') {
          // 如果转换成jpeg，图片的通明区域会被转成黑色，所以就填充成白色
          // 参考： https://blog.csdn.net/sinat_17775997/article/details/58708042
          ctx.fillStyle = '#fff'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
        ctx.drawImage(img, 0, 0, width, height)
        // var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        // console.log('imageData', imageData)
        // quality值越小，所绘制出的图像越模糊
        let url = ''
        if (toBase64) {
          url = url = canvas.toDataURL('image/jpeg', quality) // image/jpeg或者image/webp
          resolve(url)
        } else {
          // url = convertBase64UrlToBlob(canvas.toDataURL('image/jpeg', quality))
          url = canvas.toBlob(blob => {
            url = blob
            console.log('压缩后', blob.size)
            resolve(url)
          }, 'image/jpeg', quality)
        }
        // 回调函数返回base64的值
      }
    }
  })
}
function convertBase64UrlToBlob(base64) {
  var arr = base64.split(','), mime = arr[0].match(/:(.*?)/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})
}

export default compressWithQuality
export {compressWithSize}

function post(url, params) {
  let xhr = new XMLHttpRequest()  // XMLHttpRequest 对象
  xhr.onload = e => {
    var data = JSON.parse(e.target.responseText)
    console.log(data)
  } // 请求完成
  xhr.onerror = () => {} // 请求失败

  xhr.upload.onprogress = e => {
    let total = e.total
    let loaded = e.loaded
    console.log(total, loaded)
  } //【上传进度调用方法实现】
  xhr.open('post', url, true) // post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
  xhr.upload.onloadstart = function () { // 上传开始执行方法
    ot = new Date().getTime()   // 设置上传开始时间
    oloaded = 0//设置上传开始时，以上传的文件大小为0
  }

  xhr.send(form) //开始上传，发送form数据
}
