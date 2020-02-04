<template>
<div>
  <van-uploader :before-read="beforeRead"
  	:after-read="afterRead">
  	<img :src="picUrl || src" width="100" v-if="picUrl || src">
  	<img src="../../../assets/images/uploadImg.png" width="100" v-else>
  </van-uploader>
</div>
</template>

<script>
import { Toast } from 'vant'
import { customUpload, getKey } from '~/utils/qiniu'

export default {
	props: {
		src: {
      type: String,
      default: ''
    }
	},
  data () {
    return {
      file: null,
      uploading: false,
      picUrl: ''
    }
  },
  methods: {
  	beforeRead(file) {
      if ((file.type == 'image/jpeg') || (file.type == 'image/jpg') || (file.type == 'image/png')) {
        return true
      }else {
      	Toast('请上传 jpg/jpeg/png格式图片')
        return false
      }
    },
    afterRead(file) {
    	this.file = null
      this.uploading = true
      
      if(file.file.size > (1.5*1024*1024)) {
      	Toast('图片大小不得超过1.5兆（M）')
      	return false
      }
    	customUpload(file.file)
          .then(response => {
            setTimeout(() => {
              const result = response.data
              this.uploading = false
              this.picUrl = result.data.picUrl
              this.$emit('success', this.picUrl)
            }, 300)
          })
          .catch(() => {
            this.uploading = false
            this.$toast({ type: 'fail', message: '上传错误' })
          })
    }
  }
}
</script>

<style lang="postcss" scoped>
>>> .crop-handle {
  top: 0;
}
</style>
