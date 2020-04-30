<template>
  <div class="login-container">
    <el-form
      class="login-form"
      @keyup.enter.native="handleLogin"
      autoComplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{title}}</h3>
        <lang-select class="set-language"></lang-select>
      </div>
      <el-form-item prop="name">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          name="name"
          type="text"
          v-model="loginForm.name"
          autoComplete="on"
          placeholder="用户名/手机号"
          :maxlength="20"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          name="password"
          :type="passwordType"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.password"
          autoComplete="on"
          placeholder="密码"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="verifyCode">
        <el-col :span="2">
          <span class="svg-container">
            <svg-icon icon-class="picture" />
          </span>
        </el-col>
        <el-col :span="16">
          <el-input
            name="code"
            type="text"
            v-model="loginForm.verifyCode"
            autoComplete="on"
            placeholder="验证码"
          />
        </el-col>
        <el-col :span="6">
          <img
            @click="code = getVerifyCode()"
            :src="code.url"
            style="display: block;float: right; border-radius: 0 5px 5px 0; height: 47px;"
          />
        </el-col>
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;margin-bottom:20px;"
        :loading="loading"
        @click.native.prevent="handleLogin"
      >{{$t('login.logIn')}}</el-button>

      <div
        class="forget"
        v-if="loginType != 1"
      >
        <span @click="findPwd">忘记密码</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import { getVerifyCode } from '@/api/admin/login'
import { isDesignMerchant, isMakeMerchant } from '@/utils/auth'

export default {
  props: {
    title: {
      type: String,
      default: 'GAC 公共登录平台'
    },
    loginType: {
      type: Number,
      default: 1
    }
  },
  components: { LangSelect },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('请输入正确的用户名/手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位数'))
      } else {
        callback()
      }
    }
    const validateVerifyCode = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        name: '',
        password: '',
        verifyCode: '',
        codeUuid: '',
        loginType: this.loginType,
        flag: isDesignMerchant()
          ? 1
          : isMakeMerchant()
            ? 2
            : undefined
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        verifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      code: getVerifyCode()
    }
  },
  methods: {
    getVerifyCode,
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.loginForm.codeUuid = this.code.uuid
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
            this.code = getVerifyCode()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    findPwd() {
      this.$router.push({ path: '/findPwd' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #fff;
$light_gray: #333;

/* reset element-ui css */
.login-container {
  width: 100%;
  height: 100%;
  /*background-image: url('http://7jptea.com1.z0.glb.clouddn.com/login.png');*/
  background-size: cover;
  background-position: center;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $light_gray !important;
      }
    }
  }
  .el-form-item {
    background: #fff;
    border-radius: 5px;
    border: 1px solid #dcdcdc;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background: rgba(255, 255, 255, 0.9);
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $dark_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      color: #409eff;
    }
    .set-language {
      color: $dark_gray;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .forget {
    font-size: 14px;
    text-align: right;
    span {
      cursor: pointer;
    }
  }
}
</style>
