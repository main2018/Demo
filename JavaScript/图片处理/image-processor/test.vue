<template lang='pug'>
    .test
      input(type="file", @change="test")
</template>

<script type='text/ecmascript-6'>
  import ImageProcessor from './index.js'

  export default {
    methods: {
      test(e) {
        let img = e.target.files[0]
        let ratio = 0.5 // 图片压缩比例
        let processor = new ImageProcessor()
        processor.getBlobAndBase64FromFile(img, ratio, (base64) => {
          let pic = base64.replace('data:image/jpeg;base64,', '')
  //        let url = `${window.protocol}://up-z2.qiniu.com/putb64/-1`
          let url = `https://up-z2.qbox.me/putb64/-1`

          this.post('/qiniu/token', {}, (resp) => { // 从后台获取七牛token
            this.xhrPost(url, pic, resp.token)
          })
        })
      },
      xhrPost (url, pic, token) {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText !== '') {
            let json = JSON.parse(xhr.responseText)
            this.$emit('getKey', json.data.key) // 发送七牛返回的待拼接key
            this.$emit('end')
            this.imgShow = true
          }
        }
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-Type', 'application/octet-stream')
        xhr.setRequestHeader('Authorization', `UpToken ${token}`)
        xhr.send(pic)
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

 
</style>
