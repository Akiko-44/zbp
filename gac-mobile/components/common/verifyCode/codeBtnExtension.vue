<template>
<van-button
  :disabled="disabled"
  :loading="loading"
  @click="getCode"
  class="code-btn"
>
  {{ text || "获取验证码" }}
</van-button>
</template>

<script>
import { isMobile } from '@/utils/validate'

const SECONDS = 60

export default {
  props: {
    form: {
      type: Object,
      default () {
        return {
          mobilePhone: '',
          codeUuid: '',
          verifyCode: '',
          msgId: ''
        }
      }
    }
  },
  data () {
    return {
      seconds: SECONDS,
      text: '',
      timer: null,
      disabled: false,
      loading: false
    }
  },
  computed: {
    validation () {
      return {
        mobile: isMobile(this.form.mobilePhone),
        verifyCode: this.form.verifyCode && this.form.verifyCode.trim()
      }
    }
  },
  methods: {
    success (result) {
      const vm = this
      clearTimeout(vm.timer)

      vm.seconds = SECONDS
      vm.text = `${vm.seconds}秒重发`
      vm.disabled = true
      vm.loading = false
      vm.form.msgId = result.data

      start()

      function start () {
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
    fail () {
      this.reset()
      this.$emit('fail')
    },
    getCode () {
      if (!this.validation.mobile) return this.$toast('手机号错误')
      if (!this.validation.verifyCode) return this.$toast('图形验证码错误')

      this.disabled = true
      this.loading = true

      this.$service('userSmscode', { data: this.form })
        .then(this.success)
        .catch(this.fail)
    },
    reset () {
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
	height: 28px !important;
	line-height: 28px !important;
  border-radius: 14px !important;
  font-size: 12px;
  border-color: #941616;
  color: #941616;
  
}
</style>
