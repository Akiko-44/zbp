<template>
  <div class="success-box text-center">
    <img src="../../../../../assets/image/user/success.png" />
    <p class="text-black mt-2">
      修改成功，{{ seccond }}S后<span class="text-primary pointer">返回首页</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      seccond: 2
    }
  },
  mounted() {
    this.timer = setInterval(this.countDown, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    countDown() {
      if (this.seccond <= 1) {
        clearInterval(this.timer)
        this.toLogin()
      } else {
        this.seccond--
      }
    },
    toLogin() {
      this.$router.push({
        path: '/dashboard'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.success-box {
  margin-top: 70px;
}
</style>
