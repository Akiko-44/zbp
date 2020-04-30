<template>
  <div class="app-container calendar-list-container">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-position="left"
      label-width="120px"
    >
      <el-form-item
        label="原密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入原密码"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="newPassword"
      >
        <el-input
          type="password"
          v-model="form.newPassword"
          placeholder="请输入新密码"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认新密码"
        prop="newPasswordConfirm"
      >
        <el-input
          type="password"
          v-model="form.newPasswordConfirm"
          placeholder="请再次输入新密码"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          :loading="loading"
          type="primary"
          @click="save()"
        >
          提交
        </el-button>
        <el-button
          size="small"
          :loading="loading"
          @click="$router.go(-1)"
        >
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { weMediaUserUpdatePwd } from '@/api/public/merchant'
import Cookies from 'js-cookie'

export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        id: Cookies.get('userId'),
        password: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
      rules: {
        password: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
        },
        {
          min: 6,
          message: '密码长度最少为6位',
          trigger: 'blur'
        }
        ],
        newPassword: [{
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
        newPasswordConfirm: [{
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
          weMediaUserUpdatePwd(this.form).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '密码修改成功，请重新登录',
              type: 'success',
              duration: 2000
            })
            this.$store.dispatch('LogOut').then(() => {
              setTimeout(() => {
                location.reload()// In order to re-instantiate the vue-router object to avoid bugs
              }, 500)
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          /* this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          }) */
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

