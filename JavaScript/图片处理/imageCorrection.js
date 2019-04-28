// 图片校正
/* 
* orientation值 旋转角度
* 1             0°
* 3             180°
* 6             顺时针90°
* 8             逆时针90°
*/

function base64ToArrayBuffer(base64) {
  base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '')
  var binary = atob(base64)
  var len = binary.length
  var buffer = new ArrayBuffer(len)
  var view = new Uint8Array(buffer)
  for (var i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i)
  }
  return buffer
}
function getStringFromCharCode(dataView, start, length) {
  var str = '';
  var i;
  for (i = start, length += start; i < length; i++) {
    str += String.fromCharCode(dataView.getUint8(i));
  }
  return str;
}
function getOrientation(arrayBuffer) {
  /* eslint-disable */
  if (!isIos) return 1
  var dataView = new DataView(arrayBuffer);
  var length = dataView.byteLength;
  var orientation;
  var exifIDCode;
  var tiffOffset;
  var firstIFDOffset;
  var littleEndian;
  var endianness;
  var app1Start;
  var ifdStart;
  var offset;
  var i;
  // Only handle JPEG image (start by 0xFFD8)
  if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
    offset = 2;
    while (offset < length) {
      if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
        app1Start = offset;
        break;
      }
      offset++;
    }
  }
  if (app1Start) {
    exifIDCode = app1Start + 4;
    tiffOffset = app1Start + 10;
    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
      endianness = dataView.getUint16(tiffOffset);
      littleEndian = endianness === 0x4949;

      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
        if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
          firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

          if (firstIFDOffset >= 0x00000008) {
            ifdStart = tiffOffset + firstIFDOffset;
          }
        }
      }
    }
  }
  if (ifdStart) {
    length = dataView.getUint16(ifdStart, littleEndian);

    for (i = 0; i < length; i++) {
      offset = ifdStart + i * 12 + 2;
      if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {

        // 8 is the offset of the current tag's value
        offset += 8;

        // Get the original orientation value
        orientation = dataView.getUint16(offset, littleEndian);

        // Override the orientation with its default value for Safari (#120)
        // if (IS_SAFARI_OR_UIWEBVIEW) {
        //   dataView.setUint16(offset, 1, littleEndian);
        // }
        break;
      }
    }
  }
  return orientation;
}
function isIos() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

// 上传前对图片角度校正
export default function (file) {
  if (!file || !file.type.includes('image')) return Promise.resolve(file)

  let reader = new FileReader()
  reader.readAsDataURL(file)
  return new Promise(resolve => {
    reader.onload = async (e) => {
      const base64 = e.target.result
      const arrayBuffer = base64ToArrayBuffer(base64)
      const orientation = getOrientation(arrayBuffer) || 1
  
      let angleArr = new Array(9)
      angleArr.fill(0)
      angleArr[1] = 0
      angleArr[3] = 180
      angleArr[6] = 90
      angleArr[8] = -90
      let angle = angleArr[orientation]
      const blob = await correction(file, angle)
      resolve(blob)
    }
  })
}

function correction(file, angle) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const url  = URL.createObjectURL(file)
  const img = new Image()
  img.src = url
  
  return new Promise(resolve => {
    img.onload = function() {
      const {naturalWidth: w, naturalHeight: h} = img
      canvas.width = w
      canvas.height = h
      const rotate = angle * Math.PI / 180
      if (Math.abs(angle) === 90) {
        canvas.width = h
        canvas.height = w
        // ctx.rotate(rotate)
        // ctx.translate(-canvas.width, 0)
        ctx.rotate(rotate)
        if (angle < 0) {
          ctx.drawImage(img, -canvas.height, 0)
        } else {
          ctx.drawImage(img, 0,  -canvas.width)
        }
        // ctx.rotate(-rotate)
      } else if (Math.abs(angle) === 180) {
        ctx.rotate(rotate)
        ctx.drawImage(img, -canvas.width, -canvas.height)
      } else {
        ctx.drawImage(img, 0, 0)
      }
      canvas.toBlob(blob => {
        resolve(blob)
      }, file.type, 1)
    }
  })
}
