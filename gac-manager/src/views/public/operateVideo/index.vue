<template>
  <div class="app-container calendar-list-container">
    <div class="video-box"
         v-for="(item,index) in videoList"
         :class="{active: item.isActive}"
         :key="index"
         @click="toVideoDetail(index, item.videoUrl)"
         :style="{ 'background-image': 'url(../../../../../../static/img/' + item.imgUrl + '.png)'}">
      <img class="video-play"
           src="../../../../static/img/play.png"
           alt="">
      <img class="video-ink"
           src="../../../../static/img/ink.png"
           alt="">
      <span class="video-title">{{item.title}}</span>
    </div>
    <div>
    	<video v-if="videoUrl"
             controls="controls"
             autoplay
             :src="videoUrl"
             style="width: 860px; height: 427px;object-fit: fill">
        您的浏览器不支持 html5 video 属性，下载视频查看：
        <button type="button"
                class="el-button el-button--text el-button--mini">
          <span><a :href="videoUrl"
               target="_blank">下载视频</a></span></button></video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoList: [
        {
          id: '1',
          imgUrl: 'video_1_b',
          videoUrl: 'http://image.gacjc.com/%E8%AF%9A%E4%BF%A1%E4%BC%81%E4%B8%9A.mp4',
          title: '诚信企业',
          isActive: false
        },
        {
          id: '2',
          imgUrl: 'video_2_b',
          videoUrl: 'http://image.gacjc.com/%E4%BB%8A%E6%97%A5%E6%8C%87%E5%AF%BC%E4%BB%B7.mp4',
          title: '今日指导价',
          isActive: false
        },
        {
          id: '3',
          imgUrl: 'video_3_b',
          videoUrl: 'http://image.gacjc.com/%E6%8A%95%E8%AF%89%E5%A4%84%E7%90%86.mp4',
          title: '投诉处理',
          isActive: false
        },
        {
          id: '4',
          imgUrl: 'video_4_b',
          videoUrl: 'http://image.gacjc.com/%E5%B9%B3%E5%8F%B0%E5%85%AC%E5%91%8A.mp4',
          title: '平台公告',
          isActive: false
        }
      ],
      videoUrl: ''
    }
  },
  methods: {
    toVideoDetail(i, videoUrl) {
      this.videoUrl = videoUrl
      this.videoList.forEach(element => {
        element.isActive = false
      })
      this.videoList[i].isActive = true
    }
  }
}
</script>

<style scoped lang="postcss">
.app-container {
  padding: 62px 52px;
}
.video-box {
  position: relative;
  display: inline-block;
  margin: 0 28px 61px 0;
  width: 267px;
  height: 177px;
  border-radius: 6px;
  background-size: cover;
  z-index: 1;
  cursor: pointer;
}
.video-box.active:after{
	content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.3);
  z-index: 0;
}
.video-title {
  position: absolute;
  left: 34px;
  bottom: 11px;
  font-size: 15px;
  color: #fff;
  z-index: 1;
}
.video-play {
  position: absolute;
  left: 109px;
  top: 53px;
  width: 51px;
  height: 51px;
  z-index: 1;
}
.video-ink {
  position: absolute;
  left: 11px;
  bottom: 11px;
  width: 29px;
  height: 38px;
  z-index: 1;
}
/deep/ .el-dialog.tipDialog {
  top: 50%;
  transform: translateY(-50%);
  margin-top: 0 !important;
  width: 387px;
  height: 245px;
  box-shadow: none;
  background: url(../../../../static/img/dialog_bg.png);
  background-size: cover;
}
.confirm {
  position: absolute;
  bottom: 20px;
  left: 137px;
  width: 113px;
  height: 37px;
  background-color: #ffae26;
  border-color: #ffae26;
}
</style>
