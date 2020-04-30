<template>
  <div class="VUpload">
    <ul class="VUpload-list">
      <li
        class="VUpload-item"
        v-for="(img, index) in imgs"
        :key="index"
      >
        <img :src="(img.objectUrl || img[props.src]) | setImg({ w: 200 })">
        <div
          class="VUpload-close"
          @click="removeImg(index)"
        >
          <!-- <i class="ico-recovery"></i> -->
          x
        </div>
        <transition name="van-fade">
          <van-circle
            v-show="img.progress !== undefined && img.progress < 100"
            class="VUpload-progress"
            v-model="img.progress"
            :rate="img.progress"
            :text="img.progress + '%'"
            color="#03A9F4"
            layer-color="#e9e9e9"
            fill="rgba(255,255,255,0.7)"
            :stroke-width="50"
          />
        </transition>
        <slot
          name="item"
          :item="img"
        />
      </li>
      <li
        class="VUpload-area min"
        v-show="limit === 0 || imgs.length < limit"
      >
        <!-- <div class="item-center flex-column">
          <i class="icon"></i>
          <p>添加图片</p>
        </div> -->
        <div class="item-center flex-column upload-btn">

        </div>
        <input
          type="file"
          @change="onChange($event)"
          class="VUpload-input"
          :accept="accept"
        >
      </li>
    </ul>
    <no-ssr>
      <Crop
        style="position: relative; z-index: 9999;"
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
import { upload, getKey, uploadSectionFile } from '~/utils/qiniu'
import { Toast } from 'vant'
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
    imgs: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 0
    },
    prefix: {
      type: String,
      default: 'pic'
    },
    props: {
      type: Object,
      default() {
        return { src: 'src' }
      }
    },
    extendFields: {
      type: Array,
      default: () => []
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
      options: {}
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
      this.file = e.target.files[0]
      e.target.value = ''
    },
    onCancle(crop) {
      this.file = null
      crop.hide()
    },
    onConfirm(crop) {
      const src = crop.get({ format: 'objectUrl', width: 500, quality: 0.7 })
      debugger
      let imgs = { objectUrl: src, progress: 0 }
      this.extendFields.forEach(data => {
        imgs = Object.assign({}, imgs, data)
      })
      this.imgs.push(imgs)
      this.file = null

      loadImage(src, img => {
        const file = crop.get({ format: 'file', width: 500, quality: 0.7 })
        const type = file.type.split('/')[1]
        const key = getKey(this.prefix, img, type)
        const index = this.imgs.length - 1
        upload(file, progress => {
          /*upload(key, file, progress => {*/
          this.imgs[index].progress = progress
        })
          .then(result => {
            /*this.imgs[index][this.props.src] = 'http://image.gacjc.com/' + result.data.key*/
            this.imgs[index][this.props.src] = result.data.data.picUrl
            this.$emit('success', this.imgs[index], index)
          })
          .catch(() => {
            this.removeImg(index)
            this.$toast({ type: 'fail', message: '上传错误' })
          })
      })

      setTimeout(() => {
        crop.hide()
      })
    },
    onError(error) {
      this.$toast(error)
    },
    removeImg(index) {
      this.imgs.splice(index, 1)
      this.$emit('remove', index)
    },
    check() {
      const finished = this.imgs.every(img => (img.progress === undefined || img.progress === 100))
      if (!finished) this.$toast('请等待上传完成')
      return finished
    }
  }
}
</script>

<style lang="postcss">
.VUpload-list {
  float: left;
}
.VUpload-area {
  margin-bottom: 10px;
  float: left;
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: #e5e5e5; */
  text-align: center;
  & .item-center {
    width: 100%;
    height: 100%;
  }
  & .icon {
    display: block;
    width: 100%;
    height: 55px;
    background-image: url("./camera.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  & p {
    color: var(--dark-gray);
    padding-top: 15px;
    font-weight: bold;
    font-size: 14px;
  }
  &.min {
    width: 84px;
    height: 84px;
    & .upload-btn {
      position: relative;
      background: #fff;
      border-radius: 5px;
      &::before {
        content: "";
        width: 50px;
        height: 6px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -25px;
        margin-top: -3px;
        background: #e8e8e8;
        border-radius: 3px;
      }
      &::after {
        content: "";
        width: 6px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -3px;
        margin-top: -25px;
        background: #e8e8e8;
        border-radius: 3px;
      }
    }
    & .icon {
      width: 18px;
      height: 16px;
    }
    & p {
      padding-top: 0;
      font-size: 12px;
    }
  }
}
.VUpload-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 5;
}
.VUpload-close {
  position: absolute;
  right: 0;
  top: 0;
  width: 25px;
  height: 25px;
  line-height: 25px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  color: white;
  font-size: 17px;
  text-align: center;
}
.VUpload-item {
  margin-right: 3px;
  margin-bottom: 10px;
  float: left;
  position: relative;
  width: 84px;
  height: 84px;
  & img {
    width: 100%;
    height: 100%;
  }
}
.VUpload-progress {
  position: absolute;
  z-index: 3;
  width: 90% !important;
  height: 90% !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
>>> .crop-handle {
  top: 0 !important;
  background: rgba(0, 0, 0, 0.5) !important;
}
</style>
