<template>
  <AppView class="password" title="忘记密码">
    <MobileValidate v-if="step === 1" service-name="userResetPassword" @success="checkSuccess" />

    <Validator v-if="step === 2" ref="form" :model="form" :rules="rules" class="form">
      <template slot-scope="{ error, check }">
        <h4 class="title">第二步  修改密码</h4>
        <div class="input-row">
          <label>设置密码:</label>
          <div class="border-input">
            <input v-model="form.password" @blur="check('password')" autoComplete="on" type="password" placeholder="请设置密码">
            <p class="msg error">{{error.password}}</p>
          </div>
        </div>
        <div class="input-row">
          <label>确认新密码:</label>
          <div class="border-input">
            <input v-model="form.confirmPassword" @blur="check('confirmPassword')" autoComplete="on" type="password" placeholder="请确认密码">
            <p class="msg error">{{error.confirmPassword}}</p>
          </div>
        </div>
        <van-button type="primary" block class="primary-btn block" @click="resetPassword">下一步</van-button>
      </template>
    </Validator>

    <transition-group name="van-fade">
      <template v-if="step === 3">
        <h4 key="1" class="title">第三步  修改成功</h4>
        <success
          content="设置成功,即将返回登录页面"
          to="user-login"
          key="2"
        />
      </template>
    </transition-group>
  </AppView>
</template>

<script>
import Success from '~/components/index/success'
import Validator from '~/components/common/validator'
import MobileValidate from '~/components/index/mobileValidate'

export default {
  components: {
    Success,
    Validator,
    MobileValidate
  },
  data () {
    const validatePasswordAgain = (rule, value) => {
      if (value === '') return '请再次输入密码'
      if (value !== this.form.password) return '两次输入密码不一致'
    }
    return {
      form: {
        password: '',
        confirmPassword: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, message: '请输入6位数以上的密码' }
        ],
        confirmPassword: [
          { validator: validatePasswordAgain }
        ]
      },
      step: 1,
      loading: false
    }
  },
  methods: {
    checkSuccess () {
      this.loading = false
      this.step = 2
    },
    resetPassword () {
      if (this.$refs.form.checkAll()) {
        this.step = 3
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.form {
  padding: 0 20px;
}
.title {
  margin: 40px 0 35px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}
</style>
