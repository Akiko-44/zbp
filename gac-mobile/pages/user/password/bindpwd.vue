<template>
  <AppView
    class="password"
    :title="title"
  >
    <MobileValidate
      v-if="step === 1"
      service-name="userResetPassword"
      @success="checkSuccess"
      :isBindPhone="false"
    />

    <Validator
      v-if="step === 2"
      ref="form"
      :model="form"
      :rules="rules"
      class="form forget-pwd"
    >
      <template slot-scope="{ error, check }">
        <!-- <h4 class="title">第二步  修改密码</h4> -->
        <div class="block">
          <div class="input-row">
            <!-- <label>设置密码:</label> -->
            <div class="border-input">
              <input
                v-model="form.newPassword"
                @blur="check('newPassword')"
                autoComplete="on"
                type="password"
                placeholder="请设置密码"
              >
              <p class="msg error">{{error.newPassword}}</p>
            </div>
          </div>
          <div class="input-row">
            <!-- <label>确认新密码:</label> -->
            <div class="border-input">
              <input
                v-model="form.confirmPassword"
                @blur="check('confirmPassword')"
                autoComplete="on"
                type="password"
                placeholder="请确认密码"
              >
              <p class="msg error">{{error.confirmPassword}}</p>
            </div>
          </div>
        </div>
        <van-button
          type="primary"
          block
          class="primary-btn block"
          @click="resetPassword"
        >确定</van-button>
      </template>
    </Validator>

    <transition-group name="van-fade">
      <template v-if="step === 3">
        <h4
          key="1"
          class="title"
        >第三步 修改成功</h4>
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
  data() {
    const validatePasswordAgain = (rule, value) => {
      if (value === '') return '请再次输入密码'
      if (value !== this.form.newPassword) return '两次输入密码不一致'
    }
    return {
      title: '绑定手机号',
      form: {
        needOldPassword: 2,
        newPassword: '',
        confirmPassword: ''
        // password: '',
        // confirmPassword: ''
      },
      rules: {
        newPassword: [
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
    checkSuccess() {
      this.loading = false
      this.step = 2
      this.title = "设置密码"
    },
    resetPassword() {
      if (this.$refs.form.checkAll()) {
        this.loading = true
        this.$service('userChangePassword', { data: this.form })
          .then(this.success)
          .catch(this.fail)
      }
      // if (this.$refs.form.checkAll()) {
      //   this.step = 3
      //   this.$toast({
      //     type: 'success',
      //     message: '操作成功'
      //   })
      //   setTimeout(() => {
      //     this.$router.push({ name: 'user-settings' })
      //   }, 1000)
      // }
    },
    success() {
      this.loading = false
      this.$store.commit('user/removeToken')
      this.$toast({
        type: 'success',
        message: '设置成功，请重新登录'
      })
      setTimeout(() => {
        this.$router.replace({ name: 'user-login' })
      }, 1000)
    },
    fail() {
      this.loading = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.forget-pwd {
  padding: 10px;
  & .block {
    background: #fff;
    border-radius: 5px;
  }
  & .input-row {
    height: 59px;
    margin-bottom: 0;
    padding: 0 15px;
    border-bottom: 1px solid #eaebf0;
  }
  & .border-input {
    padding: 0;
    border: none;
    & input {
      padding: 0;
    }
  }
  & .primary-btn {
    height: 44px;
    margin: 50px 0 0;
    background: #df735a;
    border-color: #df735a;
  }
}
.title {
  margin: 40px 0 35px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}
</style>
