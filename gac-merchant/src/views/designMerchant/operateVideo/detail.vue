<template>
  <div class="app-container calendar-list-container">
    <div class="video-box">
      <div class="video-list">
        <div class="title">商家操作视频列表</div>
        <div class="video-info"
             v-for="(item,index) in videoList"
             :key="index"
             :class="{active: item.isActive}"
             @click="selectVideo(index)">
          <span class="video-index">{{index+1}}</span>
          <img class="video-img"
               :src="item.imgUrl"
               alt="">
          <span>{{item.title}}</span>
        </div>
      </div>
      <video v-if="videoUrl"
             controls="controls"
             :src="videoUrl"
             style="width: 575px; height: 427px;object-fit: fill">
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
      id: this.$route.query.id,
      videoUrl: '',
      videoList: [
        {
          id: '1',
          imgUrl: '../../../../static/img/video_1.png',
          videoUrl: 'http://image.gacjc.com/designer-video/1Ph3ab2miIImd6d',
          title: '发布商品',
          isActive: false
        },
        {
          id: '2',
          imgUrl: '../../../../static/img/video_2.png',
          videoUrl: 'http://image.gacjc.com/designer-video/1PhX8ffzRPljV0s',
          title: '发起提现',
          isActive: false
        },
        {
          id: '3',
          imgUrl: '../../../../static/img/video_3.png',
          videoUrl: 'http://image.gacjc.com/designer-video/1PhXdVBg6P54580',
          title: '退款退货及仲裁',
          isActive: false
        }
      ]
    }
  },
  created() {
    if (this.id) {
      this.videoList.forEach(element => {
        if (this.id === element.id) {
          this.videoUrl = element.videoUrl
          element.isActive = true
        }
      })
    }
  },
  methods: {
    selectVideo(i) {
      console.log(74)
      this.videoUrl = this.videoList[i].videoUrl
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
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 0 28px 61px 0;
  width: 858px;
  height: 427px;
  border-radius: 6px;
  background-size: cover;
  border: 1px solid #ccc;
}
.video-main {
  width: 575px;
  height: 427px;
}
.video-list {
  position: absolute;
  right: 0;
  width: 283px;
  height: 427px;
  color: #fff;
  font-size: 12px;
  background: #2f2f2f;
}
.video-list .title {
  padding-left: 17px;
  line-height: 39px;
}
.video-list .video-info {
  height: 77px;
  vertical-align: middle;
  background: #1a1a1a;
  cursor: pointer;
}
.video-list .video-info.active {
  background: #212121;
}
.video-list .video-info:hover {
  background: #212121;
}
.video-list .video-img {
  margin-right: 11px;
  width: 68px;
  height: 43px;
  vertical-align: middle;
}
.video-list .video-info span {
  line-height: 77px;
}
.video-list .video-info .video-index {
  display: inline-block;
  padding: 0 17px;
}
</style>
