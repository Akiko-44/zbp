<template>
  <div>
    <el-form
      class="step-form"
      :model="form"
      ref="form"
      :rules="rules"
      label-position="left"
    >
      <div class="setp-tips text-gray font-md line-h-md mb-4 ">
        <p>
          <i
            class="el-icon-warning mr-1"
            style="color:#FF0703"
          ></i>请设置您新的密码，6-16位的大小写字母或数字
        </p>
      </div>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入新密码"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          type="password"
          v-model="form.confirmPassword"
          placeholder="请再次输入新密码"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          class="next-btn"
          type="primary"
          @click="save()"
        >
          完成
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { resetPassword } from '@/api/admin/user'

export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        password: '',
        confirmPassword: ''
      },
      rules: {
        password: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '密码长度最少为6位',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '密码长度最少为6位',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    save() {
      const set = this.$refs
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          // this.form.uuid = this.$route.query.uuid
          resetPassword(this.form)
            .then(data => {
              this.editStatus = false
              this.$emit('submit')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.step-form {
  margin: 50px auto 0;
  width: 378px;
  .code-btn {
    margin: 0;
    width: 100%;
    height: 60px;
    background: #418afd;
    border-radius: 0;
    font-size: 16px;
  }
  .next-btn {
    width: 100%;
    height: 52px;
    border-radius: 0;
    border: 0;
    background: linear-gradient(
      87deg,
      rgba(102, 180, 255, 1) 0%,
      rgba(61, 134, 253, 1) 100%
    );
  }
}
/deep/ .el-input {
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    height: 60px;
    font-size: 16px;
    border: 2px solid #f4f4f4;
  }
}
</style>
