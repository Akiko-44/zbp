<template>
  <div>
    <van-uploader
      :before-read="beforeRead"
      :after-read="afterRead"
      :accept="accept"
    >
      <img
        :src="picUrl || src"
        width="84"
        height="84"
        v-if="picUrl || src"
      >
      <div
        v-else
        class="uploadbg"
      >
        <!-- <img
          src="../../../assets/images/icon_uploadadd.png"
          width="50"
        > -->
      </div>
    </van-uploader>
    <van-dialog
      v-model="imgDialog"
      confirmButtonText="我知道了"
      className="img-dialog"
    >
      <div>
        <div>图片大小不得超过1.5M（兆）</div>
        <div>点击下方链接可对图片进行压缩</div>
        <div><a
            href="https://www.tuhaokuai.com/"
            target="_blank"
          >https://www.tuhaokuai.com/</a></div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { customUpload, getKey, uploadSectionFile } from '~/utils/qiniu'

export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: 5
    },
    compress: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: 'image/jpeg, image/png, image/jpg'
    }
  },
  data() {
    return {
      file: null,
      uploading: false,
      picUrl: '',
      imgDialog: false
    }
  },
  methods: {
    beforeRead(file) {
      if (this.accept.indexOf(file.type) === -1) {
        Toast('请上传jpg/jpeg/png格式图片')
        return false
      } else {
        return true
      }
    },
    afterRead(file) {
      this.file = null
      this.uploading = true

      // if (file.file.size > (1.5 * 1024 * 1024)) {
      //   // Toast('图片大小不得超过1.5兆（M）')
      //   this.imgDialog = true
      //   return false
      // }
      if (this.compress) {
        uploadSectionFile(file.file, this.maxSize).then((res) => {
          customUpload(res)
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
        })
      } else {
        if (file.file.size > (this.maxSize * 1024 * 1024)) {
          Toast('图片大小不得超过' + this.maxSize + '兆（M）')
          return false
        }
        customUpload(file)
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
}
</script>

<style lang="postcss" scoped>
>>> .crop-handle {
  top: 0;
}
.uploadbg {
  width: 84px;
  height: 84px;
  background: url(../../../assets/images/icon_uploadadd.png) no-repeat center;
  background-size: 50px;
}
>>> .img-dialog {
  padding-top: 16px;
  font-size: 14px;
  line-height: 28px;
  & .van-button {
    color: #1989fa;
    background: transparent;
    border-color: transparent;
  }
}
</style>
