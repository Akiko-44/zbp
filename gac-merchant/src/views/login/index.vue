<template>
  <div class="login-container">
    <div class="main-login-container">
      <div class="login-bg"></div>
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
          <h3 class="title">中宝平商家管理后台</h3>
        </div>
        <p class="form-item-label">手机号码</p>
        <el-form-item prop="name">
          <el-input
            name="name"
            type="text"
            v-model="loginForm.name"
            autoComplete="on"
            placeholder="用户名/手机号"
            :maxlength="20"
          />
        </el-form-item>
        <p class="form-item-label">密码</p>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="passwordType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="密码"
          />
        </el-form-item>
        {{ loginForm.verify }}
        <!-- 后台还没实现验证码选填暂时先放出来 -->
        <!-- <template v-if="loginForm.verify === 0"> -->
        <p class="form-item-label">验证码</p>
        <el-form-item prop="verifyCode">
          <div class="code-input-box d-flex j-sb">
            <div class="code-input">
              <el-input
                name="code"
                type="text"
                v-model="loginForm.verifyCode"
                autoComplete="on"
                placeholder="验证码"
              />
            </div>
            <div class="code-box">
              <img
                @click="code = getVerifyCode()"
                :src="code.url"
                style="height: 56px;"
              />
            </div>
          </div>
        </el-form-item>
        <!-- </template> -->

        <div
          class="forget"
          v-if="loginType != 1"
        >
          <span @click="findPwd">忘记密码?</span>
        </div>

        <el-button
          type="primary"
          class="login-btn"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >{{ $t("login.logIn") }}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getVerifyCode } from '@/api/admin/login'
import { isDesignMerchant, isMakeMerchant } from '@/utils/auth'

export default {
  props: {
    loginType: {
      type: Number,
      default: 1
    }
  },
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
        verify: 1,
        loginType: this.loginType,
        flag: isDesignMerchant() ? 1 : isMakeMerchant() ? 2 : undefined
      },
      nextNum: 0,
      loginRules: {
        name: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        verifyCode: [
          { required: true, trigger: 'blur', validator: validateVerifyCode }
        ]
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
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
              if (this.nextNum >= 3) {
                this.loginForm.verify = 0
                this.code = getVerifyCode()
              } else {
                this.nextNum++
              }
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
$white: #fff;
$black: #333;

/* reset element-ui css */
.login-container {
  .el-input {
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $black;
      height: 60px;
      border: 2px solid #f4f4f4;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $white inset !important;
        -webkit-text-fill-color: $black !important;
      }
    }
  }
  .el-form-item {
    width: 405px;
    background: #fff;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  position: fixed;
  width: 100%;
  height: 100%;
  // background-size: cover;
  // background-position: center;
  background-image: url('../../assets/image/user/bj.png');
  .main-login-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1353px;
    font-size: 0;
    .login-bg {
      display: inline-block;
      width: 774px;
      height: 754px;
      vertical-align: top;
      background-image: url('../../assets/image/user/picture.png');
    }
  }
  .login-form {
    display: inline-block;
    padding: 122px 92px 0 82px;
    width: 579px;
    height: 754px;
    background: #fff;
  }
  .title-container {
    .title {
      margin: 0px auto 58px 2px;
      font-size: 26px;
      color: #333;
    }
  }
  .form-item-label {
    margin-bottom: 10px;
    font-size: 16px;
  }
  .code-input {
    width: 234px;
  }
  .code-box {
    border: 2px solid #f4f4f4;
    height: 60px;
    width: 150px;
    text-align: center;
  }
  .forget {
    color: #428cfd;
    font-size: 14px;
    text-align: right;
    span {
      cursor: pointer;
    }
  }
  .login-btn {
    margin-top: 59px;
    width: 100%;
    height: 60px;
    font-size: 16px;
    border: 0;
    border-radius: 0;
    background: linear-gradient(
      87deg,
      rgba(102, 180, 255, 1) 0%,
      rgba(61, 134, 253, 1) 100%
    );
  }
}
</style>
