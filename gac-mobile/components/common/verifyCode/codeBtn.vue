<template>
  <van-button
    :disabled="disabled"
    :loading="loading"
    @click="getCode"
    type="primary"
    class="primary-btn code-btn"
    :class="isClick ? 'code-btn2' : ''"
  >
    {{ text || "获取验证码" }}
  </van-button>
</template>

<script>
import { isMobile } from '@/utils/validate'

const SECONDS = 60

export default {
  props: {
    isClick: {
      type: Boolean
    },
    form: {
      type: Object,
      default() {
        return {
          mobilePhone: '',
          codeUuid: '',
          verifyCode: '123456',
          msgId: '',
          verify: 1
        }
      }
    }
  },
  data() {
    return {
      seconds: SECONDS,
      text: '',
      timer: null,
      disabled: false,
      loading: false
    }
  },
  computed: {
    validation() {
      return {
        mobile: isMobile(this.form.mobilePhone),
        verifyCode: this.form.verifyCode && this.form.verifyCode.trim()
      }
    }
  },
  methods: {
    success(result) {
      const vm = this
      clearTimeout(vm.timer)

      vm.seconds = SECONDS
      vm.text = `${vm.seconds}秒重发`
      vm.disabled = true
      vm.loading = false
      vm.form.msgId = result.data

      start()

      function start() {
        vm.timer = setTimeout(() => {
          if (vm.seconds === 0) {
            vm.reset()
          } else {
            vm.seconds--
            vm.text = `${vm.seconds}秒重发`
            start()
          }
        }, 1000)
      }
    },
    fail() {
      this.reset()
      this.$emit('fail')
    },
    getCode() {
      if (this.form.verify == 0) {
        if (!this.validation.mobile) return this.$toast('手机号错误')
        if (!this.validation.verifyCode) return this.$toast('图形验证码错误')
      }

      this.disabled = true
      this.loading = true

      this.$service('userSmscode', {
        data: this.form
      })
        .then(this.success)
        .catch(this.fail)
    },
    reset() {
      clearTimeout(this.timer)
      this.disabled = false
      this.loading = false
      this.text = ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.code-btn {
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: none;
  background: #f5f5f5;
  font-size: 12px;
  color: #494949;
  border-radius: 3px;
}
body .form .code-btn {
  /* width: 100px;
		height: 30px;
		line-height: 30px; */
  width: 75px;
  height: 24px;
  line-height: 24px;
  border: none;
  background: #f5f5f5;
  font-size: 12px;
  color: #494949;
  border-radius: 3px;
}

body .form .code-btn2 {
  background: #df735a;
  color: #ffffff;
}
.code-btn2 {
  background: #df735a;
  color: #ffffff;
}
</style>
