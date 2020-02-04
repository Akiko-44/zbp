<template>
  <van-swipe
    :autoplay="4000"
    class="banner"
  >
    <van-swipe-item
      v-for="(item, index) in imgs"
      :key="index"
    >
      <div
        class="background lazy-img-box"
        v-lazy:background-image="setImg(item.mobilePicture, { w: 800 })"
        @click="toUrl(item)"
      ></div>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { setImg } from '~/utils/qiniu'
export default {
  props: {
    imgs: {
      type: Array,
      default() {
        return []
      }
    },
  },
  methods: {
    setImg,
    toUrl(data) {
      if (data.linkType === 1) {
        this.$router.push({
          name: "jewelry-work",
          query: {
            id: data.linkTypeId
          }
        })
      } else if (data.linkType === 2) {
        this.$router.push({
          name: "jewelry-detail",
          query: {
            id: data.linkTypeId
          }
        })
      } else if (data.linkType === 3) {
        if (data.contentType === 1) {
          this.$router.push({
            name: "news-jewelryCircle-detail",
            query: {
              id: data.linkTypeId
            }
          })
        } else {
          this.$router.push({
            name: "news-jewelryCircle-videoDetail",
            query: {
              id: data.linkTypeId
            }
          })
        }
      } else if (data.linkType === 4) {
        this.$router.push({
          name: "news-jewelryCircle-weMidea",
          query: {
            id: data.linkTypeId
          }
        })
      } else if (data.mobileUrl) {
        location.href = data.mobileUrl
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.banner {
  position: relative;
  height: 170px;
  & .background {
    height: 100%;
    width: 100%;
  }
  & .text {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 27px;
    line-height: 27px;
    background: rgba(0, 0, 0, 0.24);
    color: white;
    & p {
      width: 75%;
      padding: 0 10px;
      font-size: 15px;
    }
  }
}
</style>
