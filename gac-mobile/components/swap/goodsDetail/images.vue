<template>
  <header class="app-goods-detail-images">
    <!--<div class="bar row-between">
      <div class="bar-left">
        <i class="ico-back" @click="$router.go(-1)"></i>
      </div>
      <div class="bar-right">
        <i class="ico-cart" @click="$router.push({ name: 'swap-cart' })"></i>
        <i class="ico-share" @click="$refs.share.show()"></i>
      </div>
    </div>-->
    <van-swipe class="detail-swipe">
      <van-swipe-item v-for="(img, index) in imgs"
                      :key="index"
                      @click.native="swipeClick(img)">
        <div class="background lazy-img-box"
             v-lazy:background-image="setImg(img.imgUrl, { w: 800 })"></div>
      </van-swipe-item>
    </van-swipe>
    <!--<Share :info="info" ref="share" />-->
  </header>
</template>

<script>
import { setImg } from '~/utils/qiniu'
import Share from '~/components/common/share'

export default {
  components: {
    Share
  },
  props: {
    info: {
      type: Object
    },
    imgs: {
      type: Array
    },
    title: {
      type: String
    }
  },
  head() {
    return {
      title: this.title || ''
    }
  },
  methods: {
    setImg,
    swipeClick(item) {
    }
  }
}
</script>

<style lang="postcss">
.app-goods-detail-images {
  position: relative;
  height: 375px;
  & .bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    z-index: 2;
    & i {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  & .detail-swipe {
    position: relative;
    height: 100%;
    background-color: var(--light-gray);
    & .background {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
