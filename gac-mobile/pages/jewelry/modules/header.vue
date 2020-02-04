<template>
  <div class="header">
    <van-nav-bar
      @click-left="back"
      left-arrow
    >
      <div slot="title">
        <h4 class="logo-text">去哪儿买</h4>
      </div>
      <!-- <van-icon name="search"
                slot="right"
                @click="search" /> -->
      <img
        src="../../../assets/images/icon/search-30.png"
        width="18"
        slot="right"
        style="vertical-align: middle;"
        @click="search"
      >
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
    search() {
      this.$router.push({
        name: 'jewelrySearch-wordSearch',
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
