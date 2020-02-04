<template>
  <van-swipe class="app-swipe">
    <van-swipe-item v-for="(item, index) in imgs" :key="index" @click.native="linkTo(item)">
      <div class="background lazy-img-box" v-lazy:background-image="$setImg(item.pcUrl, { w: 800 })"></div>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    imgs: Array
  },
  methods: {
    linkTo (item) {
      location.href = item.bannerUrl
    }
  }
}
</script>

<style lang="postcss">
.app-swipe {
  position: relative;
  height: 154px;
  background-color: var(--light-gray);
  & .background {
    height: 100%;
    width: 100%;
  }
}
</style>
