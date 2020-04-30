<template>
  <div class="success-box text-center">
    <img src="../../../assets/image/user/success.png" alt="" />
    <p class="success-info text-gray">密码修改成功，请牢记您的新密码！</p>
    <p class="text-light-gray font">
      {{ seccond }}S后自动跳转到登录页，若未跳转，可<span
        class="orange pointer"
      >
        点击跳转
      </span>
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
        path: '/login'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.success-box {
  margin-top: 130px;
  .success-info {
    margin: 36px 0 16px;
    font-size: 20px;
  }
  .orange {
    color: #df735a;
  }
}
</style>
