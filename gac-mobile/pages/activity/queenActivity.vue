<template>
  <AppView :title="title">
    <div class="queenbox">
      <div class="bg">
        <div
          class="pa share1"
          @click="share()"
        ></div>
        <div
          class="pa goods1"
          @click="toDetail(6021)"
        ></div>
        <div
          class="pa goods2"
          @click="toDetail(5239)"
        ></div>
        <div
          class="pa goods3"
          @click="toDetail(6433)"
        ></div>
        <div
          class="pa goods4"
          @click="toDetail(6438)"
        ></div>
        <div
          class="pa goods5"
          @click="toDetail(6022)"
        ></div>
        <div
          class="pa goods6"
          @click="toDetail(6444)"
        ></div>
        <div
          class="pa goods7"
          @click="toDetail(6436)"
        ></div>
        <div
          class="pa goods8"
          @click="toDetail(6440)"
        ></div>
        <div
          class="pa goods9"
          @click="toDetail(4676)"
        ></div>
        <div
          class="pa goods10"
          @click="toDetail(6468)"
        ></div>
        <div
          class="pa goods11"
          @click="toDetail(6432)"
        ></div>
        <div
          class="pa goods12"
          @click="toDetail(6434)"
        ></div>
        <div
          class="pa share2"
          @click="share()"
        ></div>
      </div>
      <Share
        :info="info"
        ref="share"
      />
    </div>
    <div
      class="wechat"
      v-if="show"
    >
      <img
        class="pig"
        src="../../assets/images/queen/pig.png"
      />
      <p>请点击右上角...<br />进行分享</p>
      <img
        class="arrow"
        src="../../assets/images/queen/arrow.png"
      />
      <img
        class="know"
        src="../../assets/images/queen/know.png"
        @click="closewechat"
      />
    </div>
  </AppView>
</template>

<script>
import { getToken } from "~/utils/auth"
import Share from "~/components/common/share"
export default {
  head() {
    return {
      title: "3.8女王节"
    };
  },
  components: {
    Share
  },
  data() {
    return {
      title: '',
      info: {},
      show: false
    }
  },
  async beforeMount() {
    this.info.link = location.href
    this.info.title = '女王价到'
    this.info.desc = '珠宝拼团专场1折起'

    this.info.imgUrl = 'http://pic.gacjc.com/group1/M00/00/56/rBUAD15jQVKAF8a0AAHRCp5cyE870.jpeg'
    /* if (getToken()) {
      // 分享出去的链接加上userId 为之后注册时添加
      this.info.link = location.href;
      if (this.info.link.includes("&userId")) {
        this.info.link =
          this.info.link.substring(0, this.info.link.indexOf("&userId")) +
          `&userId=${this.userId}`;
      } else {
        this.info.link += `&userId=${this.userId}`;
      }
    } */
    if (this.$native.isApp()) {
      this.title = ''
    } else {
      this.title = '3.8女王节'
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        path: '/jewelry/work',
        query: {
          id: id
        }
      })
    },
    share() {
      if (window.navigator.userAgent.includes('MicroMessenger')) {
        // van-overflow-hidden
        this.show = true
        document.getElementsByTagName('body')[0].className = 'van-overflow-hidden'
      } else {
        this.$refs.share.show()
      }
    },
    closewechat() {
      this.show = false
      document.getElementsByTagName('body')[0].className = ''
    }
  }
}
</script>

<style lang="postcss" scope>
.queenbox {
  width: 100%;
  & .bg {
    position: relative;
    width: 375px;
    height: 2700px;
    background: url(../../assets/images/queen/bg.png) no-repeat;
    background-size: 375px 2700px;
  }
  & .pa {
    position: absolute;
    background-repeat: no-repeat;
  }
  & .share1 {
    width: 89px;
    height: 30px;
    top: 14px;
    background: url(../../assets/images/queen/share1.png) no-repeat;
    background-size: 89px 30px;
  }
  & .goods1,
  & .goods2,
  & .goods3,
  & .goods4 {
    width: 173px;
    height: 228px;
    background-size: 173px 228px;
  }
  & .goods1 {
    left: 10px;
    top: 330px;
    background-image: url(../../assets/images/queen/1.png);
  }
  & .goods2 {
    left: 192px;
    top: 330px;
    background-image: url(../../assets/images/queen/2.png);
  }
  & .goods3 {
    left: 10px;
    top: 567px;
    background-image: url(../../assets/images/queen/3.png);
  }
  & .goods4 {
    left: 192px;
    top: 567px;
    background-image: url(../../assets/images/queen/4.png);
  }
  & .goods5 {
    width: 194px;
    height: 270px;
    left: 10px;
    top: 940px;
    background-image: url(../../assets/images/queen/5.png);
    background-size: 194px 270px;
  }
  & .goods6 {
    width: 160px;
    height: 271px;
    left: 205px;
    top: 940px;
    background-image: url(../../assets/images/queen/6.png);
    background-size: 160px 271px;
  }
  & .goods7 {
    width: 151px;
    height: 270px;
    left: 10px;
    top: 1226px;
    background-image: url(../../assets/images/queen/7.png);
    background-size: 151px 270px;
  }
  & .goods8 {
    width: 194px;
    height: 271px;
    left: 173px;
    top: 1226px;
    background-image: url(../../assets/images/queen/8.png);
    background-size: 194px 271px;
  }
  & .goods9,
  & .goods10,
  & .goods11,
  & .goods12 {
    width: 173px;
    height: 259px;
    background-size: 173px 259px;
  }

  & .goods9 {
    left: 10px;
    top: 1687px;
    background-image: url(../../assets/images/queen/9.png);
  }
  & .goods10 {
    left: 193px;
    top: 1687px;
    background-image: url(../../assets/images/queen/10.png);
  }
  & .goods11 {
    left: 10px;
    top: 1956px;
    background-image: url(../../assets/images/queen/11.png);
  }
  & .goods12 {
    left: 193px;
    top: 1956px;
    background-image: url(../../assets/images/queen/12.png);
  }
  & .share2 {
    width: 110px;
    height: 36px;
    left: 133px;
    bottom: 41px;
    background-image: url(../../assets/images/queen/share2.png);
    background-size: 110px 36px;
  }
}
.wechat {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);

  & .pig {
    position: absolute;
    top: 130px;
    left: 68px;
  }
  & p {
    position: absolute;
    top: 161px;
    left: 163px;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
  }
  & .arrow {
    position: absolute;
    right: 20px;
    top: 60px;
  }
  & .know {
    position: absolute;
    top: 366px;
    left: 110px;
  }
}
</style>
