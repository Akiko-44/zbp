<template>
  <AppView>
    <div class="container">
      <img
        src="../../../assets/images/submitSuccess.png"
        width="100"
      />
      <div class="info">
        <p>提交成功</p>
      </div>
      <p class="link">工作人员将会在3个工作日内联系您，请耐心等待</p>
    </div>

  </AppView>
</template>

<script>
export default {
  head() {
    return {
      title: '中宝平'
    }
  },
  mounted() {
    document.title = '中宝平'
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
    font-size: 14px;
  }
}
</style>