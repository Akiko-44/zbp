<template>
  <AppView title="申请仲裁">
    <div class="applyArbitrate">
      <textarea placeholder="请输入仲裁原因，200字以内"
                :maxlength="200"
                v-model="form.comments"></textarea>
      <div class="upload-title">上传凭证</div>
      <VUpload class=""
               ref="picUploader"
               :imgs="imgs"
               :limit=9
               :props="{src: 'imgUrl'}">
      </VUpload>
      <p class="tip">支持jpg\jpeg\png格式，单张图片不超过2m</p>
    </div>
    <van-button type="primary"
                class="submit"
                @click="save">提交</van-button>

  </AppView>
</template>

<script>
import VUpload from '~/components/common/upload'
import { setImg } from '~/utils/qiniu'
export default {
  components: {
    VUpload
  },
  data() {
    return {
      imgs: [],
      form: {
        comments: '',
        refundOrderId: '',
        picList: [],
        arbitrationType: 1
      }
    }
  },
  deactivated() {
    this.$destroy()
  },
  created() {
    this.form.refundOrderId = this.$route.query.id
  },
  methods: {
    save() {
      if (!this.form.comments) {
        this.$toast('中宝平：输入信息不能为空')
        return false
      }
      this.imgs.forEach(data => {
        this.form.picList.push(data.imgUrl)
      })
      this.$service('userApplyArbitrate', { data: this.form }).then(result => {
        if (result.success) {
          this.$router.push({ name: 'user-orderRefund-list' })
          setTimeout(() => {
            this.$toast('中宝平：发起仲裁，请等待审核')
          }, 200)
        } else {
          this.$toast(result.msg)
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.applyArbitrate {
  font-size: 12px;
  padding: 10px 12px;
}
textarea {
  width: 351px;
  box-sizing: border-box;
  height: 148px;
  resize: none;
  padding: 15px;
  background: #ffffff;
  border: 0;
  border-radius: 5px;
}
.upload-title {
  font-size: 15px;
  margin: 20px 0 10px;
}
.tip {
  overflow: hidden;
  width: 100%;
  line-height: 20px;
  font-size: 13px;
  color: #aaaaaa;
}
>>> .VUpload-area.min {
  width: 86px;
  height: 86px;
  border-radius: 3px;
}
.submit.van-button {
  /* position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0;
  background: #c2a374;*/
  margin: 20px 12px 0;
  width: 351px;
  border-radius: 4px;
  font-size: 16px;
  border-color: #DF735A;
  background: #DF735A;
}
</style>
