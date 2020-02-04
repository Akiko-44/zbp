<template>
  <AppView class="registered" title="账号注册">
    <validator ref="form" :model="form" :rules="rules" class="form" v-show="!successState">
      <template slot-scope="{ error, check }">
        <div class="input-row">
          <label>手机号:</label>
          <div class="border-input">
            <input v-model="form.mobilePhone" @blur="check('mobilePhone')" type="tel" placeholder="请输入手机号">
            <p class="msg error">{{error.mobilePhone}}</p>
          </div>
        </div>
        <div class="input-row">
          <label>验证码:</label>
          <div class="border-input">
            <input v-model="form.verifyCode" @blur="check('verifyCode')" type="text" placeholder="">
            <p class="msg">不区分大小写</p>
            <p class="msg error">{{error.verifyCode}}</p>
          </div>
          <CodeImage ref="codeImage" @refresh="refresh" />
        </div>
        <div class="input-row">
          <label>动态验证码:</label>
          <div class="border-input">
            <input v-model="form.dynamicVerifyCode" @blur="check('dynamicVerifyCode')" type="text" placeholder="">
            <p class="msg error">{{error.dynamicVerifyCode || error.msgId}}</p>
          </div>
          <CodeBtn :form="form" @fail="fail" />
        </div>
        <div class="input-row">
          <label>设置密码:</label>
          <div class="border-input">
            <input v-model="form.password" @blur="check('password')" autoComplete="on" type="password" placeholder="请设置密码">
            <p class="msg error">{{error.password}}</p>
          </div>
        </div>
        <div class="input-row">
          <label>确认密码:</label>
          <div class="border-input">
            <input v-model="form.confirmPassword" @blur="check('confirmPassword')" autoComplete="on" type="password" placeholder="请确认密码">
            <p class="msg error">{{error.confirmPassword}}</p>
          </div>
        </div>
        <div class="input-row agreement">
          <van-checkbox v-model="form.checked" @click.native="check('checked')"></van-checkbox>
          <div class="border-input dark-gray" style="border: none;margin-left: 15px;">
            我已阅读和接受<a href="javascript:;">《中宝协云平台用户注册协议》</a>
            <p class="msg error">{{error.checked}}</p>
          </div>
        </div>
        <van-button :loading="loading" type="primary" block class="primary-btn block" @click="submit">注册</van-button>
      </template>
    </validator>
    <transition name="van-fade">
      <success
        content="注册成功！即将跳转到登录页"
        btnText="立即返回"
        to="user-login"
        v-if="successState"
      />
    </transition>
  </AppView>
</template>

<script>
import CodeImage from '~/components/common/verifyCode/codeImage'
import CodeBtn from '~/components/common/verifyCode/codeBtn'
import Success from '~/components/index/success'
import Validator from '~/components/common/validator'

export default {
  components: {
    Success,
    Validator,
    CodeImage,
    CodeBtn
  },
  data () {
    const validatePasswordAgain = (rule, value) => {
      if (value === '') return '请再次输入密码'
      if (value !== this.form.password) return '两次输入密码不一致'
    }
    return {
      loading: false,
      successState: false,
      form: {
        codeUuid: '',
        confirmPassword: '',
        dynamicVerifyCode: '',
        mobilePhone: '',
        verifyCode: '',
        password: '',
        msgId: '',
        checked: false
      },
      rules: {
        mobilePhone: [
          { required: true, message: '请输入手机号' }
        ],
        verifyCode: [
          { required: true, message: '请输入图形验证码' }
        ],
        dynamicVerifyCode: [
          { required: true, message: '请输入短信验证码' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, message: '请输入6位数以上的密码' }
        ],
        confirmPassword: [
          { validator: validatePasswordAgain }
        ],
        checked: [
          { required: true, message: '请同意使用协议和服务条款' }
        ],
        msgId: [
          { required: true, message: '短信验证码有误' }
        ]
      }
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.checkAll()) {
        this.loading = true
        this.$service('userRegister', { data: this.form })
          .then(this.success)
          .catch(this.fail)
      }
    },
    success () {
      this.successState = true
      this.loading = false
    },
    fail () {
      this.$refs.codeImage.refresh()
      this.loading = false
      this.form.verifyCode = ''
    },
    refresh (code) {
      this.form.codeUuid = code.uuid
    }
  }
}
</script>

<style lang="postcss" scoped>
.form {
  padding: 25px 15px 15px;
  box-sizing: border-box;
}
.agreement {
  font-size: 12px;
  line-height: 18px;
  & a {
    color: #2391d1;
  }
}
>>> .van-checkbox {
  display: inline;
  vertical-align: 2px;
}
>>> .van-checkbox--round {
  border-radius: 0;
  width: 16px;
  height: 16px;
  line-height: 16px;
}
>>> .van-checkbox--checked {
  border-color: var(--red);
  background-color: var(--red);
}
</style>
