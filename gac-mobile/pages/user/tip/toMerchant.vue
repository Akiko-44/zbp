<template>
  <AppView
    class="tip"
    title="中宝平"
  >
    <div class="container">
      <img
        src="../../../assets/images/logo.png"
        width="66"
      />
      <div class="info">
        <p>请复制下方网址</p>
        <p>在电脑端登录中宝平商户管理后台处理</p>
      </div>
      <p
        class="link"
        v-if="type == 1"
      >http://admin.gacjc.com/usrManager/jewelry/</p>
      <p
        class="link"
        v-if="type == 5"
      >http://admin.gacjc.com/designMerchant.html</p>
      <p
        class="link"
        v-if="type == 6"
      >http://admin.gacjc.com/makeMerchant.html </p>
    </div>

  </AppView>
</template>

<script>
export default {
  data() {
    return {
      type: ''
    }
  },
  activated() {
    this.type = this.$route.query.type || 1
  }
}
</script>
<style lang="postcss" scoped>
.container {
  padding: 40px 0;
  text-align: center;
  & .info {
    margin-top: 20px;
    line-height: 30px;
  }
  & .link {
    margin-top: 30px;
  }
}
</style>