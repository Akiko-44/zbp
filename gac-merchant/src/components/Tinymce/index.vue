<template>
  <div
    class="tinymce-container editor-container"
    :class="{fullscreen:fullscreen}"
  >
    <div class="mb">
      <ImageUpload
        color="#1890ff"
        class="editor-upload-btn"
        @successCBK="imageSuccessCBK"
      ></ImageUpload>
      <span class="font-12 text-light-gray ml">图片格式：jpg/jpeg/png/gif，单张图片大小：2m以内，字数500字以内；</span>
    </div>
    <textarea
      class="tinymce-textarea"
      :id="tinymceId"
    ></textarea>
    <!-- <div class="editor-custom-btn-container">
      <p>图片格式：jpg/jpeg/png/gif，单张图片大小：2m以内，字数500字以内；</p>
      <ImageUpload
        color="#1890ff"
        class="editor-upload-btn"
        @successCBK="imageSuccessCBK"
      ></ImageUpload>
    </!-->
  </div>
</template>

<script>
import ImageUpload from '@/components/Upload'
import plugins from './plugins'
import toolbar from './toolbar'
import { uploadSingleImg } from '@/api/upload'

export default {
  name: 'tinymce',
  components: { ImageUpload },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      fullscreen: false
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        readonly: this.disabled,
        // powerpaste_word_import: 'propmt', // 参数可以是propmt, merge, clear，效果自行切换对比
        powerpaste_html_import: 'propmt', // propmt, merge, clear
        powerpaste_allow_local_images: true,
        paste_data_images: true,
        // images_upload_handler: function(blobInfo, success, failure) {
        //   // 这个函数主要处理word中的图片，并自动完成上传；
        //   // ajaxUpload是自己定义的一个函数；在回调中，记得调用success函数，传入上传好的图片地址；
        //   // blobInfo.blob() 得到图片的file对象；
        //   console.log(blobInfo.blob())
        //   // ajaxUpload(blobInfo.blob()).then((data) => {
        //   //   // 上传成功后，调用success函数传入图片地址
        //   //   success(data.uploadedImageUrl)
        //   // })
        // },
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        images_upload_handler(blobInfo, success, failure) {
          // progress(0)
          // const token = _this.$store.getters.token;
          // const url = response.data.qiniu_url;
          const formData = new FormData()
          // formData.append('token', response.data.qiniu_token);
          // formData.append('key', response.data.qiniu_key);
          // console.log(blobInfo.blob())
          formData.append('file', blobInfo.blob())
          uploadSingleImg(formData).then((data) => {
            console.log(data.data.picUrl)
            success(data.data.picUrl)
            // progress(100)
          })
        }
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<p style="text-align:center"><img class="wscnph" src="${v}" ></p>`)
      })
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: -1px;
  /*z-index: 2005;*/
}
.editor-custom-btn-container > p,
.editor-custom-btn-container > div {
  display: inline;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
