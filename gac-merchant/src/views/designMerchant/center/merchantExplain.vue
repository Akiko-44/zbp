<template>
  <div class="app-container calendar-list-container">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-position="left"
      label-width="100px"
    >
      <el-form-item
        label="店铺Logo"
        prop="merchantLogo"
      >
        <el-card
          v-if="form.merchantLogo"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.merchantLogo | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="form.merchantLogo = ''"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button
          v-else
          @click="cropShow = true"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="cropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="400"
          :height="400"
          prefix="merchantLogo"
          @crop-upload-success="uploadSuccess"
        />
        <div>1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸400*400</div>
      </el-form-item>

      <el-form-item
        label="店铺背景图"
        prop="backgroundImg"
      >
        <el-card
          v-if="form.backgroundImg"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.backgroundImg | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="form.backgroundImg = ''"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button
          v-else
          @click="backgroundCropShow = true"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="backgroundCropper"
          v-model="backgroundCropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="355"
          :height="175"
          :maxSize="1.5"
          prefix="backgroundImg"
          @crop-upload-success="backgroundUploadSuccess"
        />
        <div>1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸355*175</div>
      </el-form-item>

      <el-form-item
        label="商家简介"
        prop="merchantExplain"
      >
        <el-input
          type="textarea"
          :rows="3"
          v-model="form.merchantExplain"
          :maxlength="300"
          placeholder="300字以内，内容完整通畅、无特殊符号或者微信、QQ、微博、手机号等联系方式"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="add-btn">
          <el-button
            type="primary"
            class="submit-btn"
            :loading="loading"
            @click="save"
          >
            提交
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMerchantExplain, putMerchantExplain } from '@/api/makeMerchant/center'
import ImageCropper from '@/components/ImageCropper'

export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      loading: false,
      cropShow: false,
      backgroundCropShow: false,
      form: {
        id: undefined,
        merchantLogo: '',
        backgroundImg: '',
        merchantExplain: ''
      },
      rules: {
        merchantExplain: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        merchantLogo: [{
          required: true,
          message: '请上传Logo',
          trigger: 'blur'
        }],
        backgroundImg: [{
          required: true,
          message: '请上传背景图',
          trigger: 'blur'
        }]
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const data = await getMerchantExplain()
    next(vm => {
      vm.merchantExplain = data.data.merchantExplain
      vm.form = data.data
    })
  },
  methods: {
    // 上传图片
    uploadSuccess(key) {
      this.form.merchantLogo = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    backgroundUploadSuccess(key) {
      this.form.backgroundImg = key
      this.backgroundCropShow = false
      this.$refs.backgroundCropper.setStep(1)
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          putMerchantExplain(this.form).then(data => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              name: 'merchantInfo'
            })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

