<template>
  <AppView class="password" title="修改密码">
    <validator v-if="!status" ref="form" :model="form" :rules="rules" class="form">
      <template slot-scope="{ error, check }">
        <div class="input-row">
          <label>原密码:</label>
          <div class="border-input">
            <input v-model="form.oldPassword" @blur="check('oldPassword')" autoComplete="on" type="password" placeholder="请输入原密码">
            <p class="msg error">{{error.oldPassword}}</p>
          </div>
        </div>
        <div class="input-row">
          <label>新密码:</label>
          <div class="border-input">
            <input v-model="form.newPassword" @blur="check('newPassword')" autoComplete="on" type="password" placeholder="请输入新密码">
            <p class="msg error">{{error.newPassword}}</p>
          </div>
        </div>
        <div class="input-row">
          <label>确认密码:</label>
          <div class="border-input">
            <input v-model="form.confirmPassword" @blur="check('confirmPassword')" autoComplete="on" type="password" placeholder="请确认新密码">
            <p class="msg error">{{error.confirmPassword}}</p>
          </div>
        </div>
        <van-button type="primary" block class="primary-btn block" @click="submit" :loading="loading">确定修改</van-button>
      </template>
    </validator>

    <transition-group name="van-fade">
      <template v-if="status">
        <success
          content="修改成功,即将返回登录页面"
          to="user-login"
          key="2"
        />
      </template>
    </transition-group>
  </AppView>
</template>

<script>
import Validator from '~/components/common/validator'
import Success from '~/components/index/success'

export default {
  components: {
    Validator,
    Success
  },
  middleware: 'auth',
  beforeMount () {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  data () {
    const validatePasswordAgain = (rule, value) => {
      if (value === '') return '请再次输入密码'
      if (value !== this.form.newPassword) return '两次输入密码不一致'
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码' },
          { min: 6, message: '请输入6位数以上的密码' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码' },
          { min: 6, message: '请输入6位数以上的密码' }
        ],
        confirmPassword: [
          { validator: validatePasswordAgain }
        ]
      },
      loading: false,
      status: false
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.checkAll()) {
        this.loading = true
        this.$service('userChangePassword', { data: this.form })
          .then(this.success)
          .catch(this.fail)
      }
    },
    success () {
      this.loading = false
      this.status = true
      this.$store.commit('user/removeToken')
    },
    fail () {
      this.loading = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.form {
  padding: 30px 20px 0;
}
</style>
