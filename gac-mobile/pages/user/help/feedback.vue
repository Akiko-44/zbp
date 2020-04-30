<template>
  <AppView title="问题反馈">
    <div class="feedback">
      <validator
        :rules="rules"
        :model="form"
        ref="form"
      >
        <van-field
          v-model="form.content"
          type="textarea"
          placeholder="请输入反馈内容，300字以内"
          maxlength="300"
          :border="false"
          show-word-limit
        />
      </validator>
      <div class="img-list">
        <div class="upload-title">上传图片</div>
        <!-- <VUpload
          class=""
          ref="picUploader"
          :imgs="imgs"
          :limit=9
          :props="{src: 'imgUrl'}"
        >
        </VUpload> -->
        <CUploadList
          ref="picUploader"
          :imgs="imgs"
          :limit=9
          :props="{src: 'imgUrl'}"
          @success="uploadSuccess"
        >
        </CUploadList>
        <p class="tip">格式:jpg、png、gif、jpeg单张大小5m以内</p>
      </div>
      <div>
        <van-button
          class="subbtn"
          type="warning"
          size="small"
          @click="release"
        >提交</van-button>
      </div>
    </div>
  </AppView>
</template>
<script>
import Validator from '~/components/common/validator'
import VUpload from '~/components/common/upload'
import CUploadList from '~/components/common/upload/customList'
import { setImg } from '~/utils/qiniu'
export default {
  components: {
    Validator,
    VUpload,
    CUploadList
  },
  data() {
    return {
      imgs: [],
      form: {
        //title: '意见反馈',
        content: '',
        pic: ''
      },
      rules: {
        content: [{
          required: true,
          message: '请输入反馈内容'
        }]
      }
    }
  },
  methods: {
    uploadSuccess(imgs) {
      this.form.pic = imgs
    },
    release() {
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        /* let imgArr = []
        this.imgs.forEach(item => {
          imgArr.push(item.imgUrl)
        })
        this.form.pic = imgArr.join(',') */
        this.$service('feedback', {
          data: this.form
        })
          .then(this.success)
      }
    },
    success() {
      this.$toast({
        type: 'success',
        message: '发布成功'
      })
      this.$router.push({
        name: 'user-settings'
      })
    }
  }
}
</script>
<style lang="postcss" scoped>
.feedback {
  padding: 10px;
  & >>> .van-field {
    border-radius: 5px;
  }
  & >>> textarea {
    height: 124px;
  }
  & .upload-title {
    font-size: 15px;
    padding: 20px 0 10px;
  }
  & >>> .VUpload {
    overflow: hidden;
  }
  & >>> .tip {
    font-size: 14px;
    color: #999;
  }
  & .subbtn {
    margin-top: 50px;
    width: 100%;
    height: 44px;
    background: #df735a;
    border-color: #df735a;
    font-size: 16px;
  }
  & .img-list {
    background: #fff;
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
  }
}
</style>
