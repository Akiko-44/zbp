<template>
  <van-swipe class="banner">
    <van-swipe-item v-for="(item, index) in imgs" :key="index">
      <div class="background lazy-img-box" v-lazy:background-image="setImg(item.mobilePicture, { w: 800 })" @click="toUrl(item.mobileUrl)"></div>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { setImg } from '~/utils/qiniu'
export default {
  data () {
    return {
      imgs: []
    }
  },
  watch:{
  	$route(){
  		this.$service('whereBuy')
      .then(result => {
        this.imgs = result.data.banner
      })
  	}
  },
  beforeMount () {
    this.$service('whereBuy')
      .then(result => {
        this.imgs = result.data.banner
      })
  },
  methods: {
    setImg,
    toUrl (url){
      if(url){
	      location.href=url
	    }
    }
  }
}
</script>

<style lang="postcss" scoped>
.banner {
  position: relative;
  height: 150px;
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
