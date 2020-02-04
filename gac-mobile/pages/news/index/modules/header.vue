<template>
  <div class="header">
    <van-nav-bar @click-left="back"
                 left-arrow>
      <div slot="title">
        <h4 class="logo-text">热点资讯</h4>
      </div>
      <van-icon name="more-o"
                slot="right"
                @click="classify" />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    classify() {
      this.$router.push({
        name: 'news-classify',
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.logo-text {
  font-size: 18px;
  display: inline-block;
  vertical-align: -1px;
}
</style>
