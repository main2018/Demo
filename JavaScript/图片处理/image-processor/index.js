'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var EXIF = require('./small-exif')
var ImageProcessor = (function () {
  function ImageProcessor() {
  }
  ImageProcessor.prototype.autoZoomAndRotateFromUrl = function (url, ratio, callback) {
    var _this = this
    if (!url) {
      return
    }
    var reader = new FileReader()
    var image = new Image()
    var orientation = 1
    // 监听读取完成事件
    reader.onload = function (readerEvent) {
      image.src = readerEvent.target.result
      image.onload = function () {
        callback(_this.getDataFromCanvas(image, ratio, orientation))
      }
    }
    // 读取图片
    this.getImageBlob(url, function (blob) {
      EXIF.getData(blob, function () {
        orientation = EXIF.getTag(this, 'Orientation')
        reader.readAsDataURL(blob)
      })
    })
  }
  ImageProcessor.prototype.autoZoomAndRotateFromFile = function (file, ratio, callback) {
    var _this = this
    if (!file) {
      return
    }
    EXIF.getData(file, function () {
      var orientation = EXIF.getTag(file, 'Orientation')
      console.log(orientation)
      var reader = new FileReader()
      var image = new Image()
      // 监听读取完成事件
      reader.onload = function (readerEvent) {
        image.src = readerEvent.target.result
        image.onload = function () {
          callback(_this.getDataFromCanvas(image, ratio, orientation))
        }
      }
      // 读取图片
      reader.readAsDataURL(file)
    })
  }
  ImageProcessor.prototype.getImageBlob = function (url, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (xhr.status === 200) {
        if (callback) {
          callback(xhr.response)
        }
      }
    }
    xhr.send()
  }
  ImageProcessor.prototype.getDataFromCanvas = function (image, ratio, orientation) {
    var dstWidth = Math.ceil(image.width * ratio)
    var dstHeight = Math.ceil(image.height * ratio)
    var canvas = document.createElement('canvas')
    console.log('width: ' + image.width)
    console.log('height: ' + image.height)
    canvas.width = dstWidth
    canvas.height = dstHeight // 计算等比缩小后图片宽高
    var ctx = canvas.getContext('2d')
    if (orientation && orientation !== 1) {
      switch (orientation) {
        case 6:
          canvas.width = dstHeight
          canvas.height = dstWidth
          ctx.rotate(Math.PI / 2)
          ctx.drawImage(image, 0, -dstHeight, dstWidth, dstHeight)
          break
        case 3:
          ctx.rotate(Math.PI)
          ctx.drawImage(image, -dstWidth, -dstHeight, dstWidth, dstHeight)
          break
        case 8:
          canvas.width = dstHeight
          canvas.height = dstWidth
          ctx.rotate(3 * Math.PI / 2)
          ctx.drawImage(image, -dstWidth, 0, dstWidth, dstHeight)
          break
      }
    } else {
      ctx.drawImage(image, 0, 0, dstWidth, dstHeight)
    }
    var imageData = canvas.toDataURL('image/jpeg', 1)
    return imageData
  }
  ImageProcessor.prototype.getBlobAndBase64FromFile = function (file, ratio, callback) {
    if (!file) {
      return
    }
    EXIF.getData(file, function () {
      var orientation = EXIF.getTag(file, 'Orientation')
      console.log(orientation)
      var reader = new FileReader()
      var image = new Image()
      // 监听读取完成事件
      reader.onload = function (readerEvent) {
        image.src = readerEvent.target.result
        image.onload = function () {
          var dstWidth = Math.ceil(image.width * ratio)
          var dstHeight = Math.ceil(image.height * ratio)
          var canvas = document.createElement('canvas')
          console.log('width: ' + image.width)
          console.log('height: ' + image.height)
          canvas.width = dstWidth
          canvas.height = dstHeight // 计算等比缩小后图片宽高
          var ctx = canvas.getContext('2d')
          if (orientation && orientation !== 1) {
            switch (orientation) {
              case 6:
                canvas.width = dstHeight
                canvas.height = dstWidth
                ctx.rotate(Math.PI / 2)
                ctx.drawImage(image, 0, -dstHeight, dstWidth, dstHeight)
                break
              case 3:
                ctx.rotate(Math.PI)
                ctx.drawImage(image, -dstWidth, -dstHeight, dstWidth, dstHeight)
                break
              case 8:
                canvas.width = dstHeight
                canvas.height = dstWidth
                ctx.rotate(3 * Math.PI / 2)
                ctx.drawImage(image, -dstWidth, 0, dstWidth, dstHeight)
                break
            }
          } else {
            ctx.drawImage(image, 0, 0, dstWidth, dstHeight)
          }
          var base64 = canvas.toDataURL('image/jpeg', 0.8)
          callback(base64)
        }
      }
      // 读取图片
      reader.readAsDataURL(file)
    })
  }
  return ImageProcessor
}())
exports.ImageProcessor = ImageProcessor
// # sourceMappingURL=image-processor.js.map
