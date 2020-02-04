<template>
<AppView class="agreement" :clickLeft="onClickLeft">
  <div ><img src="./images/auction.jpg"/></div>
</AppView>
</template>

<script>
export default {
  methods: {
    onClickLeft () {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
  .agreement{
    min-height: 100%;
    & img{
      width: 100%;
    }
  }
</style>