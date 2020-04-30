<template>
  <div class="CUploadList">
    <ul class="CUpload-list">
      <li
        class="CUpload-item"
        v-for="(img, index) in imgs"
        :key="index"
      >
        <img :src="(img || img[props.src]) | setImg({ w: 200 })">
        <div
          class="CUpload-close"
          @click="removeImg(index)"
        >
          x
        </div>
      </li>
      <li
        class="CUpload-area min"
        v-show="limit === 0 || imgs.length < limit"
      >
        <van-uploader
          :max-count="limit"
          :before-read="beforeRead"
          :after-read="afterRead"
          :before-delete="beforeDelete"
          :accept="accept"
        >
          <div class="bg"></div>
        </van-uploader>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { customUpload, getKey, uploadSectionFile } from '~/utils/qiniu'

export default {
  props: {
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
    },
    limit: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      file: null,
      uploading: false,
      imgs: []
    }
  },
  methods: {
    beforeRead(file) {
      if (this.accept.indexOf(file.type) === -1) {
        this.$toast("请上传 jpg/png/gif 格式图片");
        return false;
      }
      return true;
    },
    afterRead(file) {
      if (this.compress) {
        uploadSectionFile(file.file, this.maxSize).then((res) => {
          customUpload(res)
            .then(response => {
              const result = response.data;
              this.imgs.push(result.data.picUrl);
              this.imgs = [...new Set(this.imgs)];
              this.$emit('success', this.imgs, this.index)
            })
            .catch(() => {
              this.$toast({ type: "fail", message: "上传错误" });
            });
        })
      } else {
        if (file.file.size > this.maxSize * 1024 * 1024) {
          this.$toast('图片大小不得超过' + this.maxSize + '兆（M）');
          return false
        }
        customUpload(file)
          .then(response => {
            setTimeout(() => {
              const result = response.data;
              this.imgs.push(result.data.picUrl);
              this.imgs = [...new Set(this.imgs)];
              this.$emit('success', this.imgs, this.index)
            }, 300)
          })
          .catch(() => {
            this.$toast({ type: 'fail', message: '上传错误' })
          })
      }
    },
    beforeDelete(file, detail) {
      let index;
      this.imgs.map((item, i) => {
        if (item.file && item.file.name == file.file.name) {
          index = i;
        } else if (item.url && item.url == file.url) {
          index = i;
        }
      });
      this.imgs.splice(index, 1);
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
.bg {
  width: 84px;
  height: 84px;
  background: #fff url(../../../assets/images/icon_uploadadd.png) no-repeat
    center;
  background-size: 50px;
}
.CUploadList {
  overflow: hidden;
}
.CUpload-list {
  float: left;
}
.CUpload-area {
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
.CUpload-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 5;
}
.CUpload-close {
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
.CUpload-item {
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
.CUpload-progress {
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
