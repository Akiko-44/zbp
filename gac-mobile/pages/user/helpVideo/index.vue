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
          videoUrl: 'http://app.gacjc.com/app/download/help/agfdgu.mp4',
          title: '我要开店',
          isActive: false
        },
        {
          imgUrl: require('../../../assets/images/jewelryVideo.png'),
          videoUrl: 'http://app.gacjc.com/app/download/help/gsxdkyug.mp4',
          title: '珠宝店（企业）认证帮助视频',
          isActive: false
        },
        {
          imgUrl: require('../../../assets/images/jewelryVideo.png'),
          videoUrl: 'http://app.gacjc.com/app/download/help/gyusefv.mp4',
          title: '珠宝店（个人）认证帮助视频',
          isActive: false
        },
        {
          imgUrl: require('../../../assets/images/designVideo.png'),
          videoUrl: 'http://app.gacjc.com/app/download/help/fygfuy.mp4',
          title: '设计师认证帮助视频',
          isActive: false
        },
        {
          imgUrl: require('../../../assets/images/makerVideo.png'),
          videoUrl: 'http://app.gacjc.com/app/download/help/cgdsuy.mp4',
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
  display: inline-block;
  width: 173px;
  height: 134px;
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
  background: #fff;
  & .video {
    width: 100%;
    height: 98px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  & .video-play {
    position: absolute;

    top: 50%;
    left: 50%;
    margin-left: -16px;
    margin-top: -30px;
    width: 32px;
    height: 32px;
  }
  & .video-info {
    position: absolute;
    bottom: 10px;
    left: 7px;
    color: #666;
    font-size: 10px;
    text-align: center;
  }
}
</style>
