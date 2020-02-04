<template>
  <header class="app-goods-detail-images">
    <div class="bar row-between">
      <div class="bar-left">
        <!-- <i class="ico-back-goods"
           @click="$router.go(-1)"></i> -->
      </div>
      <div class="bar-right">
        <!-- <i class="ico-cart"
           @click="$router.push({ name: 'swap-cart' })"></i> -->
        <!-- <i class="ico-share-good"
           @click="$refs.share.show()"></i> -->
      </div>
    </div>
    <van-swipe ref="detailSwipe"
               class="detail-swipe"
               :show-indicators="false"
               @change="onChange">
      <van-swipe-item v-if="videoUrl">
        <video :src="videoUrl"
           style="width:100%;height:100%;object-fit: fill"
           x5-video-player-type="h5"
           webkit-playsinline
           controls
           playsinline
           ref="video"
           :poster="imgs[0].imgUrl"></video>
      </van-swipe-item>
      <van-swipe-item v-for="(img, index) in imgs"
                      :key="index"
                      @click.native="swipeClick(index)">
        <div class="background lazy-img-box"
             v-lazy:background-image="setImg(img.imgUrl, { w: 800 })"></div>
      </van-swipe-item>
    </van-swipe>
    <div class="toggle-indicator"
         v-if="videoUrl">
      <span class="video-indicator"
            :class="{toggleActive:toggleActive==='video'}"
            @click="toggleVideo">视频</span>
      <span class="picture-indicator"
            :class="{toggleActive:toggleActive==='picture'}"
            @click="togglePicture">图片</span>
    </div>
    <div class="custom-indicator"
         v-if="!videoUrl">
      {{ current + 1 }}/{{imgs.length}}
    </div>
    <div class="custom-indicator"
         v-if="videoUrl && toggleActive === 'picture'">
      {{ current }}/{{imgs.length}}
    </div>
    <Share :info="info"
           ref="share" />
  </header>
</template>

<script>
import { setImg } from '~/utils/qiniu'
import Share from '~/components/common/share'
// import { ImagePreview } from 'vant'

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
    },
    videoUrl: {
      type: String
    }
  },
  head() {
    return {
      title: this.title || ''
    }
  },
  data() {
    return {
      current: 0,
      toggleActive: 'video'
    }
  },
  methods: {
    setImg,
    swipeClick(i) {
      // let imgList = this.imgs.map(element => {
      //   return element.imgUrl
      // })
      // ImagePreview(imgList)
    },
    onChange(index) {
      this.current = index
      if (this.videoUrl) {
        this.toggleActive = this.current === 0 ? 'video' : 'picture'
      }
      if(this.$refs.video) {
      	this.$refs.video.pause()
      }
    },
    toggleVideo() {
      this.$refs.detailSwipe.swipeTo(0)
      this.toggleActive = 'video'
    },
    togglePicture() {
      this.$refs.detailSwipe.swipeTo(1)
      this.toggleActive = 'picture'
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
    padding: 6px 10px;
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
      width: 100%;
      height: 100%;
      object-fit: cover;
      touch-action: none;
    }
  }
}
.custom-indicator {
  position: absolute;
  bottom: 13px;
  right: 20px;
  opacity: 0.3;
  width: 44px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #fff;
  background: #363636ff;
  border-radius: 10px;
}
.toggle-indicator {
  position: absolute;
  bottom: 30px;
  left: 139px;
  text-align: center;
  font-size: 12px;
  & span {
    display: inline-block;
    width: 44px;
    line-height: 20px;
  }
  & .toggleActive {
    color: #fff;
    background: #fb807bff;
    border-radius: 10px;
  }
}
</style>
