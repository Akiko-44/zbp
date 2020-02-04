<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="100px"
        class="listForm"
      >
        <el-form-item
          label="作者名称:"
          prop="name"
        >
          <el-input
            :maxlength="20"
            placeholder="请输入作者名称，20字以内"
            v-model="form.name"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="作者logo:"
          prop="userLogo"
        >
          <el-card
            v-if="form.userLogo"
            style="width:250px;"
            :body-style="{ padding: '0px' }"
          >
            <img
              :src="form.userLogo | setImg"
              class="image"
              width="100%"
            >
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button
                  type="text"
                  class="button"
                  @click="form.userLogo = ''"
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
            :width="500"
            :height="500"
            prefix="userLogo"
            @crop-upload-success="uploadSuccess"
          />
          <div>支持jpg/jpeg/png/gif格式，大小2M以内，尺寸500*500</div>
        </el-form-item>
        <el-form-item
          label="作者简介:"
          prop="description"
        >
          <el-input
            type="textarea"
            :rows="5"
            :maxlength="200"
            placeholder="请输入作者简介，200字以内"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="登录账号:"
          prop="username"
        >
          <el-input
            :maxlength="20"
            placeholder="请输入登录账号，20字以内"
            v-model="form.username"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="登录密码:"
          prop="password"
        >
          <el-input
            :maxlength="16"
            placeholder="请输入登录密码，由6-16位数字或大小写字母组成"
            v-model="form.password"
          > </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            class="btn save-btn"
            v-waves
            :loading="loading"
            @click="save"
          >保存</el-button>
          <el-button
            class="btn cancel-btn"
            v-waves
            @click="cancel"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getWeMedia, saveOrUpdateWeMedia } from '@/api/public/merchant'
import ImageCropper from '@/components/ImageCropper'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    ImageCropper
  },
  data() {
    const weMediaId = this.$route.query.id
    const validatePassword = (rule, value, callback) => {
      if (weMediaId && value === '******') {
        callback()
      } else {
        if (!(/^[0-9a-zA-Z]{6,16}$/).test(value)) {
          callback(new Error('请输入登录密码，由6-16位数字或大小写字母组成'))
        } else {
          callback()
        }
      }
    }
    return {
      loading: false,
      cropShow: false,
      form: {
        id: '',
        name: '',
        userLogo: '',
        description: '',
        username: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入作者名称，20字以内', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入作者简介，200字以内', trigger: 'blur' }
        ],
        userLogo: [
          { required: true, message: '请上传Logo', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入登录账号，20字以内', trigger: 'blur' }
        ],
        password: [
          // { required: true, message: '请输入登录密码，由6-16位数字或大小写字母组成', trigger: 'blur' }
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      }
    }
  },
  created() {
    this.form.id = this.$route.query.id
    if (!this.form.id) { return }
    getWeMedia({ id: this.form.id }).then(data => {
      this.form = data.data
      this.form.password = '******'
    })
  },
  methods: {
    // 上传图片
    uploadSuccess(key) {
      this.form.userLogo = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    cancel() {
      this.$router.go(-1)
    },
    add() {
      this.loading = true
      this.form.password = this.form.password === '******' ? '' : this.form.password
      saveOrUpdateWeMedia(this.form).then(data => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.replace({
          name: 'weMedia'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.add()
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.filter-container {
  position: relative;
}
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.button-box {
  margin-left: 100px;
}
.btn {
  width: 90px;
}
</style>
