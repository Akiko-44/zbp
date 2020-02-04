<template>
  <AppView
    class="help"
    title="帮助视频"
  >
    <div
      id="video-container"
      style="margin: 0px;"
    ></div>
  </AppView>
</template>

<script>
export default {
  data() {
    return {
      videoUrl: ''
    }
  },
  mounted() {
    this.videoUrl = this.$route.query.url
    var width = window.innerWidth
    var height = window.innerHeight
    if (!window.navigator.userAgent.includes("MicroMessenger")) {
      height = height - 46
    }
    var options = {
      mp4: this.videoUrl,
      autoplay: true,
      width: width,
      height: height,
      x5_type: "h5",
      volume: 0.5,
      // controls: "none",
      wording: {
        1: "网络错误，请检查网络配置或者播放链接是否正确",
        2: "网络错误，请检查网络配置或者播放链接是否正确",
        3: "视频解码错误",
        4: "当前系统环境不支持播放该视频格式"
      }
    }
    window.tcplayer = new TcPlayer("video-container", options);
  },
  deactivated() {
    this.$destroy();
  },
  beforeDestroy() {
    if (document.querySelector("video")) {
      document.querySelector("video").pause();
    }
  },
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
