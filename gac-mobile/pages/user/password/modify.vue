<template>
  <AppView
    class="password"
    title="修改密码"
  >
    <validator
      v-if="!status"
      ref="form"
      :model="form"
      :rules="rules"
      class="form"
    >
      <template slot-scope="{ error, check }">
        <div class="block">
          <div class="input-row">
            <!-- <label>原密码:</label> -->
            <div class="border-input">
              <input
                v-model="form.oldPassword"
                @blur="check('oldPassword')"
                autoComplete="on"
                type="password"
                placeholder="请输入旧密码"
              >
              <p class="msg error">{{error.oldPassword}}</p>
            </div>
          </div>
          <div class="input-row">
            <!-- <label>新密码:</label> -->
            <div class="border-input">
              <input
                v-model="form.newPassword"
                @blur="check('newPassword')"
                autoComplete="on"
                type="password"
                placeholder="请输入新密码，6-16位数字/大小写字母"
              >
              <p class="msg error">{{error.newPassword}}</p>
            </div>
          </div>
          <div class="input-row">
            <!-- <label>确认密码:</label> -->
            <div class="border-input">
              <input
                v-model="form.confirmPassword"
                @blur="check('confirmPassword')"
                autoComplete="on"
                type="password"
                placeholder="请再次输入新密码"
              >
              <p class="msg error">{{error.confirmPassword}}</p>
            </div>
          </div>
        </div>
        <van-button
          type="primary"
          block
          class="primary-btn block"
          @click="submit"
          :loading="loading"
        >确定修改</van-button>
        <p
          style="margin-top:10px;text-align:right;font-size:13px;color:#666;"
          @click="$router.push({name: 'user-password-forget'})"
        >忘记密码
          <van-icon
            name="arrow"
            size="10"
            style="vertical-align: top;"
          />
        </p>
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
  beforeMount() {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  data() {
    const validatePasswordAgain = (rule, value) => {
      if (value === '') return '请再次输入密码'
      if (value !== this.form.newPassword) return '两次输入密码不一致'
    }
    return {
      form: {
        needOldPassword: 1,
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
    submit() {
      if (this.$refs.form.checkAll()) {
        this.loading = true
        this.$service('userChangePassword', { data: this.form })
          .then(this.success)
          .catch(this.fail)
      }
    },
    success() {
      this.loading = false
      this.$store.commit('user/removeToken')
      this.$toast({
        type: 'success',
        message: '修改成功，请重新登录'
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
.form {
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
</style>
