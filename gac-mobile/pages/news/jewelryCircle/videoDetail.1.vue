<template>
  <AppView
    class="detail"
    v-show="showDetail"
  >
    <!-- <sticky
      class="sticky"
      v-if="titleShow"
    >
      <van-nav-bar
        @click-left="back"
        left-arrow
      >
        <div slot="title">
          <h4 class="logo-text">{{title}}</h4>
        </div>
        <i
          slot="right"
          class="ico-share-circle"
          @click="share"
        ></i>
      </van-nav-bar>
    </sticky> -->
    <!--  -->
    <!-- http://192.168.8.229/group1/M00/00/13/wKgI5l3Wu2KAA_6UACH4ZGnJ0Ys743.mp4 -->
    <!-- http://image.gacjc.com/designer-video/1PhX8ffzRPljV0s -->
    <!-- http://image.gacjc.com/1572231701981.mp4 -->
    <div
      class="detail-main"
      id="detailMain"
    >
      <!-- <video
        v-show="showVideo"
        id="video"
        :src="detail.content"
        x-webkit-airplay="allow"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        webkit-playsinline
        autoplay
        muted
        playsinline
        ref="video"
      ></video> -->

      <video
        style="position: relative;  object-fit: fill;"
        webkit-playsinline="true"
        playsinline
        preload="auto"
        id="video1"
        x5-video-player-type='h5'
        :src="detail.content"
      ></video>
      <!-- <canvas
        id="myCanvas"
        width="400"
        height="400"
      ></canvas> -->
      <!-- <img
        src='../../../assets/images/backimg.png'
        id='poster'
        style='display: none;'
      > -->
      <!-- <div
        class='palyChange'
        id="palyChange"
      ></div> -->

      <div
        v-show="showPlay"
        class="play-btn"
        id="autoPlay"
        @click="autoPlay"
      >
        <van-icon name="play-circle-o" />
      </div>
      <div
        class="nav-bar"
        v-if="titleShow"
      >
        <div class="title">
          详情
        </div>
        <i
          class="ico-back-white back"
          @click="back"
        ></i>
        <i
          class="ico-share-white share"
          @click="$refs.share.show()"
        ></i>
      </div>
      <div class="recommend">
        <div class="recommend-list">
          <div
            class="recommend-item"
            v-for="(item,i) in detail.goodsList"
            :key="i"
            @click="toGoodsDetail(item.goodsId)"
          >
            <div class="title">
              <span class="label">推荐</span>
              <span class="goods-name text-hidden">{{ item.goodsName }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="video-name">{{ detail.title }}</div>
      <div class="bottom">
        <div class="bottom-box">
          <div
            class="content"
            @click="showComment = true"
          >
            <i class="ico-edit-white"></i>
            <span style="margin-left: 10px;">说点什么···</span>
          </div>
          <van-row class="card-number">
            <van-col span="8">
              <i class="ico-view-white"></i> {{detail.viewNumber}}
            </van-col>
            <van-col span="8">
              <i class="ico-like-white"></i> {{detail.likeNumber}}
            </van-col>
            <van-col
              span="8"
              @click="showAllComment = true"
            >
              <i class="ico-comment-white"></i> {{detail.commentNumber}}
            </van-col>
          </van-row>

        </div>
      </div>
      <van-popup
        class="form-list"
        v-model="showAllComment"
        closeable
        close-icon="cross"
        position="bottom"
      >
        <div class="comment">
          <div class="total">共15条评论</div>
          <div class="comment-list">
            <!-- <div class="comment-item">
              <img
                src="http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png"
                alt=""
              >
              <div class="item-info">
                <div class="name">总有刁民想害朕</div>
                <div class="data">挑了好几款，最终决定这款。吊坠很小很精致。送了红绳，不过自己配了条链子。可以，蛮好看。</div>
                <div class="date">2019-11-18</div>
              </div>
            </div> -->
            <div class="no-comment">
              <img
                src="../../../assets/images/no-comment.png"
                alt=""
              >
              <p>暂无评价</p>
            </div>
          </div>
          <div class="expance">
            <div
              class="content"
              @click="showComment = true"
            >
              <i class="ico-edit-32"></i>
              <span style="margin-left: 10px;">说点什么···</span>
            </div>
          </div>
        </div>
      </van-popup>
      <SendComment
        v-if="showComment"
        @cancel="showComment=false"
        @success="getList"
      />
      <Share
        :info="info"
        ref="share"
      />
    </div>
  </AppView>
</template>
<script>
import Card from './modules/cardItem'
import { setImg } from '~/utils/qiniu'
import AppList from '~/components/common/list'
import sticky from '~/components/common/sticky'
import SendComment from './modules/comment'
import Share from '~/components/common/share'

export default {
  head() {
    return {
      title: this.title
    }
  },
  // props: {
  //   id: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data() {
    return {
      title: '详情',
      id: '',
      detail: {},
      list: [],
      showDetail: false,
      showVideo: false,
      showPlay: false,
      showAllComment: false,
      showComment: false,
      titleShow: true,
      info: {}
    }
  },
  beforeMount() {
    this.getList()

    // this.$service('jewelryProductList', { data: { offset: 1, limit: 4 } }).then(result => {
    //   this.list = result.data.records
    // })
  },
  mounted() {
    if (!this.$native.isApp()) {
      this.showPlay = true
    }
    //--创建页面监听，等待微信端页面加载完毕 触发音频播放
    // document.addEventListener('DOMContentLoaded', function () {
    //   function audioAutoPlay() {
    //     var audio = document.getElementById('video');
    //     audio.play();
    //     document.addEventListener("WeixinJSBridgeReady", function () {
    //       alert(218)
    //       audio.play();
    //     }, false);
    //   }
    //   audioAutoPlay();
    // });
    // //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
    // document.addEventListener('touchstart', function () {
    //   function audioAutoPlay() {
    //     var audio = document.getElementById('video');
    //     audio.play();
    //   }
    //   audioAutoPlay();
    // });

    // document.addEventListener("WeixinJSBridgeReady", function () {
    //   // var audio = document.getElementById('video1');
    //   // audio.play();
    // }, false);
    // wx.ready(function () {
    //   var audio = document.getElementById('video1');
    //   audio.play();
    // })


    // var timer = null;
    // var video = document.getElementById('video1');
    // // var poster = document.getElementById('poster'); //用于视频初始化poster图片
    // var canvas = document.getElementById("myCanvas");
    // var context = canvas.getContext("2d");
    // // canvas.width = window.innerWidth * 2;  //获取屏幕宽度作为canvas的宽度  这个设置的越大，画面越清晰（相当于绘制的图像大，然后被css缩小）
    // // canvas.height = window.innerHeight * 2;
    // canvas.width = document.querySelector('video').videoWidth;  //获取屏幕宽度作为canvas的宽度  这个设置的越大，画面越清晰（相当于绘制的图像大，然后被css缩小）
    // canvas.height = document.querySelector('video').videoHeight;
    // // context.drawImage(poster, 0, 0, canvas.width, canvas.height);//canvas上绘制postere图片 也可以点击播放后隐藏图片无需绘制
    // function draw1() {//绘制视频
    //   // video.play();
    //   timer = setInterval(function () {
    //     context.drawImage(video, 0, 0, canvas.width, canvas.height);//绘制视频
    //   }, 40);
    // };
    // var isplay = false;//视频播放状态

    // draw1()

    // video.addEventListener('play', function () {
    //   draw1()
    // }, false);
    // video.addEventListener('pause', function () {
    //   draw1()
    // }, false);
    // video.addEventListener('ended', function () {
    //   window.clearInterval(time);
    // }, false);




    // //模拟click事件
    // //获取btn
    // var btn = document.querySelector("#autoPlay");
    // //创建event
    // var event = document.createEvent("MouseEvents");
    // // //初始化event
    // event.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    // //click事件绑定事件处理程序
    // btn.onclick = function () {
    //   video.play();
    //   draw1();
    //   alert(285)
    // }
    // //触发事件,一定要延迟触发，等到视频加载完成之后。
    // setTimeout(function () {
    //   btn.dispatchEvent(event);
    //   alert(290)
    // }, 2000)





    // $('#myCanvas').on('touchstart', function (e) {
    //   var e = e || event;
    //   e.preventDefault();
    //   if (!isplay) {
    //     isplay = true;
    //     video.pause();
    //     $('.palyChange').show();
    //     clearInterval(timer)
    //   } else {
    //     video.play();
    //     $('.palyChange').hide();
    //     isplay = false;
    //     draw1()
    //   }
    // })
    // $('.palyChange').click(function () { //初始化暂停状态下 点击播放（开始绘制视频） 
    //   video.play();
    //   $('.palyChange').hide();
    //   isplay = false;
    //   draw1();
    // });


    // if (window.navigator.userAgent.includes('MicroMessenger')) {
    //   this.titleShow = false
    // }
    // setTimeout(() => {
    //   const vW = document.querySelector('video').videoWidth
    //   const vH = document.querySelector('video').videoHeight
    //   const cW = document.body.clientWidth
    //   const cH = document.body.clientHeight
    //   if (vW > vH || (vW / vH > cW / cH)) {
    //     document.querySelector('video').style.top = '50%'
    //     document.querySelector('video').style.transform = 'translateY(-50%)'
    //   }
    //   this.showVideo = true
    // }, 1000)
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setImg,
    getList() {
      this.id = this.$route.query.id
      this.$service('jewelryCircleDetail', { data: { id: this.id } }).then(result => {
        this.detail = result.data
        this.info.title = this.detail.title
        this.info.link = location.href
        this.info.imgUrl = this.detail.thumbnail
      })
    },
    autoPlay() {
      // alert(331)
      document.getElementById('video1').play()
      // document.getElementById('autoPlay').style.display = 'none'
      this.showPlay = false
      // timer = setInterval(function () {
      //   context.drawImage(document.getElementById('video1'), 0, 0, window.innerWidth * 2, window.innerHeight * 2);//绘制视频
      // }, 40);
    },
    show() {
      this.showDetail = true
    },
    back() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    share() {
      this.$router.push({
        name: 'jewelrySearch-wordSearch',
      })
    },
    toGoodsDetail(id) {
      this.$router.push({ name: 'jewelry-work', query: { id: id } })
    }
  },
  components: {
    AppList,
    Card,
    sticky,
    SendComment,
    Share
  }
}
</script>

<style lang="postcss" scoped>
/* video::-webkit-media-controls-enclosure {
  display: none !important;
} */
.detail {
  background-color: #000;
  height: 700px;
}
video {
  position: fixed;
  width: 100%;
  height: auto;
  object-fit: fill;
}
canvas {
  width: 100%;
  height: 100%;
} /*这里是将下面canvas绘制放大后的视频缩小为设备的大小*/
video {
  /* display: none; */
}
.play-btn {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  font-size: 50px;
  color: #fff;
}
.app-search {
  position: relative;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;

  & .input-box {
    position: relative;
    display: block;
    width: 100%;
    line-height: normal;
    margin: 0;
    padding: 6px;
    font-size: 12px;
    border-radius: 15px;
    color: var(--black);
    background: #fff;
    box-sizing: border-box;
    border: none;
  }
  & input {
    display: block;
    width: 100%;
    line-height: normal;
    margin: 0;
    padding: 6px 10px 6px 30px;
    font-size: 12px;
    border-radius: 15px;
    color: var(--black);
    background: #f0f0f0;
    box-sizing: border-box;
    border: none;
  }
  & .van-icon {
    position: absolute;
    width: 30px;
    height: 100%;
    font-size: 14px;
    left: 0;
    top: 0;
    display: flex;
  }
  & .search-type {
    position: absolute;
    left: 0;
    height: 100%;
    & p {
      padding-left: 15px;
      font-size: 12px;
      height: 100%;
    }
    & .ico-down {
      transition: 0.3s transform;
      transform-origin: 50% 45%;
      margin-top: 1px;
      &.active {
        transform: rotate(180deg);
      }
    }
  }
}
.active-detail {
  padding: 10px 20px 30px;
  background: #fff;
  & .active-header {
    & h3 {
      color: #333333;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }
  }
  & .active-time {
    margin: 20px auto;
    color: #a9a9a9;
    font-size: 14px;
    text-align: center;
  }
  & .active-content {
    & p {
      color: #585858;
      line-height: 23px;
      & img {
        width: 100%;
      }
    }
  }
}
.comment {
  background: #fff;
  font-size: 14px;
  & .total {
    border-bottom: 1px solid #e5e5e5;
    color: #2d68c2;
    line-height: 44px;
    text-align: center;
    font-size: 15px;
  }
  & .comment-list {
    padding: 0 10px;
    height: 448px;
    overflow-y: scroll;
  }
  & .comment-item {
    overflow: hidden;
    padding: 10px 0;
    & img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      float: left;
    }
    & .item-info {
      margin-left: 5px;
      float: left;
      width: 315px;
      line-height: 20px;

      & .name {
        color: #999;
        font-size: 13px;
        line-height: 26px;
      }
      & .data {
        color: #333;
      }
      & .date {
        color: #aaa;
        font-size: 12px;
        line-height: 26px;
      }
    }
  }
  & .no-comment {
    padding-top: 70px;
    text-align: center;
    font-size: 15px;
    color: #999;
    & img {
      width: 330px;
    }
  }
  & .expance {
    padding: 10px;
    & .content {
      display: inline-block;
      padding-left: 10px;
      width: 345px;
      height: 32px;
      line-height: 32px;
      color: #aaa;
      background: #f2f2f2;
      border-radius: 16px;
    }
  }
}
.bottom-box {
  position: fixed;
  bottom: 0;
  padding: 10px;
  width: 355px;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  border-top: 1px solid #e5e5e5;

  & .content {
    display: inline-block;
    padding-left: 10px;
    width: 140px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 16px;
  }
  & .card-number {
    display: inline-block;
    padding-left: 16px;
    width: 189px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    vertical-align: top;
  }
}
.nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  & .back {
    position: absolute;
    top: 15px;
    left: 15px;
  }
  & .share {
    position: absolute;
    top: 15px;
    right: 15px;
  }
}
.recommend {
  color: #fff;
  position: fixed;
  width: 100%;
  bottom: 80px;
  & .recommend-list {
    padding: 10px;
    line-height: 24px;
    & .recommend-item {
      padding-top: 15px;
      overflow: hidden;
      vertical-align: middle;
      & .title {
        font-size: 17px;
        & .label {
          display: inline-block;
          padding: 0 8px;
          background: #fb746e;
          border-radius: 5px;
          font-size: 12px;
        }
        & .goods-name {
          margin-left: 5px;
          width: 300px;
          font-size: 18px;
        }
        & .date {
          float: right;
          font-size: 12px;
        }
      }
      & .item-info {
        line-height: 20px;
        font-size: 13px;
      }
    }
  }
}
.video-name {
  padding-left: 10px;
  color: #fff;
  position: fixed;
  width: 365px;
  bottom: 50px;
  line-height: 40px;
  font-size: 13px;
}
>>> .van-popup__close-icon {
  color: #2d68c2;
}
</style>