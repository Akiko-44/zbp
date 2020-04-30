<template>
  <div>
    <van-action-sheet
      v-model="h5ShareShow"
      title="分享至"
    >
      <div class="share-row">
        <van-row gutter="10">
          <!-- <van-col span="6"
                   @click.native="shareWeixin">
            <div class="share-item">
              <i class="weixin"></i>
            </div>
          </van-col>
          <van-col span="6"
                   @click.native="shareFriend">
            <div class="share-item">
              <i class="friend"></i>
            </div>
          </van-col>
          <van-col span="6"
                   @click.native="shareQQ">
            <div class="share-item">
              <i class="qq"></i>
            </div>
          </van-col> -->
          <van-col
            span="6"
            @click.native="shareWeibo"
          >
            <div class="share-item">
              <i class="weibo"></i>
              <span>微博</span>
            </div>
          </van-col>
          <van-col
            span="6"
            @click.native="shareQqZone"
          >
            <div class="share-item">
              <i class="qqZone"></i>
              <span>QQ空间</span>
            </div>
          </van-col>
          <van-col
            span="6"
            @click.native="shareLink"
          >
            <div
              class="share-item"
              id="codeBtn"
              :data-clipboard-text="info.link"
            >
              <i class="link"></i>
              <span>复制链接</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-action-sheet>
    <transition name="van-fade">
      <div
        v-if="showGuide"
        class="guide"
        :class="isWeixin ? 'wx' : 'mobile'"
        @click="showGuide = false"
      >
      </div>
    </transition>
  </div>
</template>

<script>
import { browser } from '~/utils/shared'
import weixin from '~/utils/wxsdk'

export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      h5ShareShow: false,
      showGuide: false,
      isWeixin: browser && browser.weixin
    }
  },
  watch: {
    info(info) {
      if (info.title) {
        weixin.share(info)
      }
    }
  },
  beforeMount() {
    this.isWeixin = browser.weixin
  },
  methods: {
    show() {
      this.info.title = this.info.title || '中宝协（云平台）'
      this.info.desc = this.info.desc || '中宝协云平台-中国珠宝行业垂直云平台，聚集珠宝爱好者！最新珠宝新资讯，商品涵盖钻石、黄金、彩宝、翡翠玉石、珍珠琥珀等珍贵材质、独特设计、给您精致奢华精彩呈现。'
      this.info.imgUrl = this.info.imgUrl || 'http://192.168.8.229/group1/M00/00/14/wKgI5l3c_uOAOD08AAAxTxhB-bo117.png'
      if (this.$native.isApp() || this.$native.isACity() == 2) {
        this.info.link = this.delQueStr(this.info.link, 'token')
        this.$native.share(this.info.link, this.info.title, this.info.desc, this.info.imgUrl)
      } else {
        this.h5ShareShow = true
      }
    },
    showGuideFn() {
      this.h5ShareShow = false
      this.showGuide = true
    },
    shareWeixin() {
      this.showGuideFn()
    },
    shareFriend() {
      this.showGuideFn()
    },
    shareQQ() {
      this.showGuideFn()
    },
    shareWeibo() {
      let link = this.info.link.includes('localhost') ? this.info.link.replace('localhost:3002', '219.134.137.178:83') : this.info.link
      let title = this.info.title
      let img = this.info.imgUrl
      window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(link) + '&sharesource=weibo&title=' +
        this.info.title + '&pic=' + encodeURIComponent(img) + '&summary=' + this.info.desc + '&appkey=1742873256')
    },
    shareQqZone() {
      let link = this.info.link.includes('localhost') ? this.info.link.replace('localhost:3002', '219.134.137.178:83') : this.info.link
      let title = this.info.title
      let img = this.info.imgUrl

      window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(link) + '&sharesource=qzone&title=' +
        title + '&pics=' + encodeURIComponent(img) + '&summary=' + this.info.desc)
    },
    shareLink() {
      //实例化clipboard
      let clipboard = new this.clipboard('#codeBtn')
      clipboard.on("success", e => {
        this.h5ShareShow = false
        this.$toast('复制成功！')
        e.clearSelection()
      })
      clipboard.on("error", e => {
        this.h5ShareShow = false
        this.$toast('该浏览器不支持，请手动复制网址链接!')
      })
    },
    //删除指定参数值
    delQueStr(url, ref) {
      var str = "";

      if (url.indexOf('?') != -1)
        str = url.substr(url.indexOf('?') + 1);
      else
        return url;
      var arr = "";
      var returnurl = "";
      var setparam = "";
      if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (let i in arr) {
          if (arr[i].split('=')[0] != ref) {
            returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
          }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
      } else {
        arr = str.split('=');
        if (arr[0] == ref)
          return url.substr(0, url.indexOf('?'));
        else
          return url;
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.share-row {
  width: 90%;
  margin: 10px auto;
}

.share-item {
  text-align: center;
  height: 58px;
  & i {
    display: block;
    height: 38px;
    /* height: 100%; */
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100%;
  }
  & span {
    font-size: 12px;
    line-height: 20px;
  }
}

.weixin {
  background-image: url("./images/share-wx.svg");
}

.friend {
  background-image: url("./images/share-tl.svg");
}

.qq {
  background-image: url("./images/share-qq.svg");
}

.weibo {
  background-image: url("./images/weibo.svg");
}

.qqZone {
  background-image: url("./images/qqZone.svg");
}

.link {
  background-image: url("./images/link.svg");
}

>>> .van-popup {
  /*background: transparent;*/
}

.guide {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2001;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  background-repeat: no-repeat;
  &.wx {
    background-image: url("./images/weinxin_share_dialog.png");
    background-position: right top;
    background-size: 80% auto;
  }
  &.mobile {
    background-image: url("./images/guidewxf.png");
    background-position: 50% 80%;
    background-size: 80% auto;
  }
}
</style>
