<template>
  <div>
    <input
      type="file"
      @change="onChange($event)"
      class="upload-input"
      :accept="accept"
    >
    <no-ssr>
      <Crop
        style="position: relative; z-index: 999999;"
        :file="file"
        :options="options"
        @on-cancle="onCancle"
        @on-confirm="onConfirm"
        @on-error="onError"
        ref="crop"
      />
    </no-ssr>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { upload, getKey, uploadSectionFile } from '~/utils/qiniu'
const Crop = process.browser ? require('xcrop/src/components/VueCrop').default : {}

function loadImage(url, cb) {
  const img = new Image()
  img.onload = function () {
    cb && cb(img)
  }
  img.src = url
}

export default {
  props: {
    prefix: {
      type: String,
      default: 'pic'
    },
    // 设置裁剪图片宽高，默认为容器宽的80%
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
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
  components: {
    Crop
  },
  data() {
    return {
      file: null,
      options: {},
      uploading: false
    }
  },
  methods: {
    onChange(e) {
      if (this.accept.indexOf(e.target.files[0].type) === -1) {
        Toast('请上传jpg/jpeg/png格式图片')
        return false
      }
      if (this.compress) {
        uploadSectionFile(e.target.files[0], this.maxSize).then((res) => {
          if (res.size > this.maxSize * 1024 * 1024) {
            this.$toast('图片大小不得超过' + this.maxSize + '兆（M）');
            return false
          }
          this.file = res
        })
      } else {
        if (e.target.files[0].size > this.maxSize * 1024 * 1024) {
          this.$toast('图片大小不得超过' + this.maxSize + '兆（M）');
          return false
        }
        this.file = e.target.files[0]
      }

      const crop = this.$refs.crop[0]
      const size = {}
      this.width && (size.width = this.width)
      this.height && (size.height = this.height)
      crop.setBorder(size)
      e.target.value = ''
    },
    onCancle(crop) {
      this.file = null
      crop.hide()
    },
    onConfirm(crop) {
      if (this.uploading) return

      const src = crop.get({ format: 'objectUrl' })

      this.file = null
      this.uploading = true

      loadImage(src, img => {
        const file = crop.get({ format: 'file' })
        const type = file.type.split('/')[1]
        const key = getKey(this.prefix, img, type)

        this.$emit('beforeUpload', file, src)

        const toast = Toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '0%'
        })
        upload(file, progress => {
          toast.message = progress + '%'
          this.$emit('progress', progress)
        })
          .then(response => {
            setTimeout(() => {
              const result = response.data
              crop.hide()
              Toast.clear()
              this.uploading = false
              this.$emit('success', result.data.picUrl)
            }, 300)
          })
          .catch(() => {
            this.uploading = false
            this.$toast({ type: 'fail', message: '上传错误' })
          })
      })
    },
    onError(error) {
      this.$toast(error)
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
