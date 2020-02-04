<template>
  <div class="app-goods-list-search">
    <div class="van-hairline--bottom van-nav-bar" style="z-index: 999;">
      <div class="van-nav-bar__left" @click="back">
        <i class="van-icon van-icon-arrow van-nav-bar__arrow"></i>
      </div>
      <div class="search-main">
        <AppSearch />
      </div>
      <div class="van-nav-bar__right"></div>
    </div>
  </div>
</template>

<script>
import AppSearch from '~/components/swap/search'

export default {
  components: {
    AppSearch
  },
  methods: {
    back () {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="postcss">
.app-goods-list-search {
  & .van-nav-bar__title {
    max-width: 75%;
  }
  & .app-search {
    line-height: normal;
    top: 8px;
  }
  & .search-main {
    margin-left: 42px;
    margin-right: 20px;
  }
}
</style>
