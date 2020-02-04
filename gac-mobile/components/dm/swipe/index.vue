<template>
  <van-swipe class="dm-swipe">
    <van-swipe-item v-for="(item, index) in imgs"
                    :key="index">
      <a class="background lazy-img-box"
         v-if="item.mobileUrl"
         v-lazy:background-image="$setImg(item.mobilePic, { w: 800 })"
         :href="item.mobileUrl"></a>
      <a class="background lazy-img-box"
         v-else
         v-lazy:background-image="$setImg(item.mobilePic, { w: 800 })"></a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    serviceName: String,
    imgs: Array
  },
  data() {
    return {
      // imgs: []
    }
  },
  beforeMount() {
    // this.$service(this.serviceName).then(result => {
    //   this.imgs = result.data
    // })
  },
  methods: {
    linkTo(item) {
      if (item.bannerUrl) {
        location.href = item.bannerUrl
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.dm-swipe {
  position: relative;
  height: 175px;
  background-color: var(--light-gray);
  & .background {
    display: inline-block;
    height: 100%;
    width: 100%;
  }
}
</style>
