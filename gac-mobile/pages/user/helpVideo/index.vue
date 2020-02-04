<template>
  <AppView
    class="help"
    title="帮助视频"
  >
    <div
      class="video-box"
      v-for="(item,index) in videoList"
      :key="index"
    >
      <div
        class="video"
        :style="{ 'background-image': 'url('+item.imgUrl+')'}"
        @click="toVideoDetail(index, item.videoUrl)"
      >
        <img
          class="video-play"
          src="../../../assets/images/videoPlay.png"
        >
        <span class="video-info">{{ item.title }}</span>
      </div>
      <!-- <video
        v-show="item.isActive"
        :id="'video'+index"
        class="video"
        controls
        :src="item.videoUrl"
      >
      </video> -->
    </div>
  </AppView>
</template>

<script>
export default {
  data() {
    return {
      videoList: [
        {
          imgUrl: require('../../../assets/images/jewelryVideo.png'),
          videoUrl: 'http://image.gacjc.com/%E7%8F%A0%E5%AE%9D%E5%BA%97%EF%BC%88%E4%BC%81%E4%B8%9A%EF%BC%89.mp4',
          title: '珠宝店（企业）认证帮助视频',
          isActive: false
        },
        {
          imgUrl: require('../../../assets/images/jewelryVideo.png'),
          videoUrl: 'http://image.gacjc.com/%E7%8F%A0%E5%AE%9D%E5%BA%97%EF%BC%88%E4%B8%AA%E4%BA%BA.mp4',
          title: '珠宝店（个人）认证帮助视频',
          isActive: false
        },
        {
          imgUrl: require('../../../assets/images/designVideo.png'),
          videoUrl: 'http://image.gacjc.com/%E8%AE%BE%E8%AE%A1%E5%B8%88%EF%BC%88%E4%B8%AA%E4%BA%BA%EF%BC%89.mp4',
          title: '设计师认证帮助视频',
          isActive: false
        },
        {
          imgUrl: require('../../../assets/images/makerVideo.png'),
          videoUrl: 'http://image.gacjc.com/%E5%88%B6%E9%80%A0%E9%97%B4%EF%BC%88%E4%BC%81%E4%B8%9A%EF%BC%89.mp4',
          title: '制造间认证帮助视频',
          isActive: false
        }
      ],
      videoUrl: ''
    }
  },
  mounted() {
    // let myVideo = document.getElementsByTagName('video')
    // this.videoList.map((item, i) => {
    //   myVideo[i].addEventListener('play', () => {
    //     this.videoList.map((subItem, subI) => {
    //       if (i !== subI) {
    //         myVideo[subI].pause()
    //       }
    //     })
    //   })
    // })

  },
  methods: {
    toVideoDetail(i, videoUrl) {
      // this.videoList[i].isActive = true
      // let myVideo = document.getElementById(`video${i}`)
      // myVideo.play()
      this.$router.push({ name: 'user-helpVideo-video', query: { url: videoUrl } })
    }
  }
}
</script>

<style scoped lang="postcss">
.video-box {
  position: relative;
  margin: 10px 10px 16px;
  & .video {
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  & .video-play {
    position: absolute;
    top: 73px;
    left: 145px;
    width: 48px;
    height: 48px;
  }
  & .video-info {
    position: absolute;
    bottom: 16px;
    left: 16px;
    color: #fff;
    font-size: 14px;
  }
}
</style>
