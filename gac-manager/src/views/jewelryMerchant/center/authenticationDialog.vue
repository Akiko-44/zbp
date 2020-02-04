<template>

  <el-dialog
    :title="title"
    :visible.sync="dialogTableVisible"
  >
    <el-form
      style="padding-right: 200px;"
      :model="authenticationForm"
      :rules="rules"
      ref="authenticationForm"
      label-width="100px"
    >
      <el-form-item
        label="姓名"
        prop="linkName"
      >
        <el-input
          v-model="authenticationForm.linkName"
          :maxlength="30"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="身份证号"
        prop="idCard"
      >
        <el-input
          v-model="authenticationForm.idCard"
          :maxlength="18"
        ></el-input>
      </el-form-item>
      <el-form-item prop="facePhoto">
        <el-card
          v-if="authenticationForm.facePhoto"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="authenticationForm.facePhoto | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="authenticationForm.facePhoto = ''"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!authenticationForm.facePhoto"
          :multiple="false"
          prefix="facePhoto"
          @successCBK="facePhotoUploadSuccess"
        />
        <span>示例：</span>
        <img
          src="../../../assets/image/sfz2.png"
          alt=""
        >
        <!-- <div>1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸不限</div> -->
      </el-form-item>
      <el-form-item prop="backPhoto">
        <el-card
          v-if="authenticationForm.backPhoto"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="authenticationForm.backPhoto | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="authenticationForm.backPhoto = ''"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!authenticationForm.backPhoto"
          :multiple="false"
          prefix="backPhoto"
          @successCBK="backPhotoUploadSuccess"
        />
        <span>示例：</span>
        <img
          src="../../../assets/image/sfz1.png"
          alt=""
        >
        <!-- <div>1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸不限</div> -->
      </el-form-item>
      <el-form-item>
        <div>注：1.真实姓名、身份证号码、及正反面照片需与身份证上保持一致</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;2.身份证照片单张在1.5兆（M）以内，2张</div>
        <div>&nbsp;&nbsp;&nbsp;3.格式支持jpg\jpeg\png，尺寸不限，建议手持身份证拍摄</div>
        <div>&nbsp;&nbsp;&nbsp;4.目前仅支持中国大陆身份信息</div>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="authentication"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'

export default {
  name: 'authentication',
  directives: {
    waves
  },
  components: {
    ImageUpload
  },
  data() {
    return {
      dialogTableVisible: false,
      title: '实名认证',
      authenticationForm: {
        linkName: '',
        idCard: '',
        facePhoto: '',
        backPhoto: '',
        status: 1
      },
      rules: {
        linkName: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        facePhoto: [{
          required: true,
          message: '请上传身份证正反面照片',
          trigger: 'blur'
        }],
        backPhoto: [{
          required: true,
          message: '请上传身份证正反面照片',
          trigger: 'blur'
        }],
        idCard: [{
          required: true,
          pattern: /^[0-9a-zA-Z]+$/,
          message: '请输入身份证号',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    authentication() {
      // this.dialogTableVisible = false
      // this.$emit('authentication', this.authenticationForm)
      this.$refs.authenticationForm.validate(valid => {
        if (valid) {
          this.dialogTableVisible = false
          this.$emit('authentication', this.authenticationForm)
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          })
          return false
        }
      })
    },
    facePhotoUploadSuccess(imgs) {
      this.authenticationForm.facePhoto = imgs[imgs.length - 1]
    },
    backPhotoUploadSuccess(imgs) {
      this.authenticationForm.backPhoto = imgs[imgs.length - 1]
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
  display: inline-block;
}
.upload-container {
  display: inline-block;
}
img {
  width: 250px;
}
</style>
