<template>
  <AppView class="Gac-index">
    <div
      class="top-box"
      :style="{background: (background.wholeType === 1 && background.wholeColor) ? background.wholeColor : (background.wholeType === 2 && background.wholeImg) ? 'url(' + background.wholeImg + ')' : '#f2f2f2'}"
    >
      <sticky class="sticky">
        <template v-if="isACity">
          <div
            class="header_two"
            style="display: flex; align-items: center;"
            :style="{background: (background.appTopColor ? background.appTopColor : '#ffffff')}"
          >
            <van-icon
              class="btn-back"
              name="arrow-left"
              @click="goBack"
            />
            <div class="app-search vertical">
              <div
                class="input-box"
                @click="$router.push({name: 'jewelrySearch-wordSearch'})"
              >
                <img
                  :src="background.appTopSearchIcon ? background.appTopSearchIcon : searchBaseImg"
                  height="16"
                  style="vertical-align: middle;"
                >
                <span
                  style="margin-left: 8px;vertical-align: middle;"
                  :style="{color: (background.appTopSearchFontColor ? background.appTopSearchFontColor : '#333333')}"
                >请输入关键字搜索</span>
              </div>
              <div
                class="location"
                :style="{color: (background.appTopLocationFontColor == 1 ? '#ffffff' : '#333333')}"
                @click="$router.push({name: 'jewelrySearch-citySearch', query: {chooseCity: chooseCity}})"
              >
                <span v-if="chooseCity">{{chooseCity}}</span>
                <img
                  class="icon-pulldown"
                  :src="background.appTopLocationIcon ? background.appTopLocationIcon : locationBaseImg"
                  width="12"
                >
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="header"
            :style="{background: (background.appTopColor ? background.appTopColor : '#ffffff')}"
          >
            <div class="app-search vertical">
              <div
                class="location"
                :style="{color: (background.appTopLocationFontColor == 1 ? '#ffffff' : '#333333')}"
                @click="$router.push({name: 'jewelrySearch-citySearch', query: {chooseCity: chooseCity}})"
              >
                <span
                  v-if="chooseCity"
                  class="choose-City"
                >{{chooseCity}}</span>
                <!-- <i class="ico-pulldown"></i> -->
                <img
                  class="icon-pulldown"
                  :src="background.appTopLocationIcon ? background.appTopLocationIcon : locationBaseImg"
                  width="12"
                >
              </div>
              <div
                class="input-box"
                :style="{background: (background.appTopSearchColor ? background.appTopSearchColor : '#f0f0f0')}"
                @click="$router.push({name: 'jewelrySearch-wordSearch'})"
              >
                <!-- <van-icon
                  class="item-center"
                  name="search"
                  color="#999"
                /> -->
                <img
                  :src="background.appTopSearchIcon ? background.appTopSearchIcon : searchBaseImg"
                  height="16"
                  style="vertical-align: middle;"
                >
                <span
                  style="margin-left: 8px;vertical-align: middle;"
                  :style="{color: (background.appTopSearchFontColor ? background.appTopSearchFontColor : '#333333')}"
                >请输入关键字搜索</span>
              </div>
            </div>
          </div>
        </template>
      </sticky>
      <div class="banner">
        <van-swipe
          class="index-swipe"
          v-if="loadTabbar"
          :show-indicators="false"
          :autoplay="4000"
        >
          <van-swipe-item
            v-for="(item, index) in imgs"
            :key="index"
          >
            <div
              class="background lazy-img-box"
              v-lazy:background-image="setImg(item.mobilePicture, { w: 800 })"
              @click="linkTo(item)"
            ></div>
            <!--<div
              class="background"
              style="background-image:url('http://app.gacjc.com/app/download/banner.png');"
              @click="$router.push({name: 'jewelrySearch-homeBanner'})"
            ></div>-->
          </van-swipe-item>
        </van-swipe>
        <van-row class="btn-group">
          <van-col span="8"><button
              :style="{backgroundImage: 'url(' + (background.appBannerImg ? background.appBannerImg : bannerBaseImg) + ')', backgroundSize:'cover', backgroundColor:'transparent'}"
              @click="$router.push({name: 'jewelrySearch-jewelryID'})"
            >查珠宝身份证</button></van-col>
          <van-col span="8"><button
              :style="{backgroundImage: 'url(' + (background.appBannerImg ? background.appBannerImg : bannerBaseImg) + ')', backgroundSize:'cover', backgroundColor:'transparent'}"
              @click="$router.push({name: 'jewelrySearch-jewelryPrice'})"
            >查珠宝价格</button></van-col>
          <van-col span="8"><button
              :style="{backgroundImage: 'url(' + (background.appBannerImg ? background.appBannerImg : bannerBaseImg) + ')', backgroundSize:'cover', backgroundColor:'transparent'}"
              @click="$router.push({name: 'jewelrySearch-attackFake'})"
            >打假保真</button></van-col>
        </van-row>
      </div>
      <div
        class="notice"
        :style="{background: (background.appNoticeColor ? background.appNoticeColor : '#fff'), color: (background.appNoticeFontColor ? background.appNoticeFontColor : '#585859')}"
      >
        <van-swipe
          class="assemble-swipe"
          :touchable="false"
          :show-indicators="false"
          :autoplay="3000"
          vertical
          v-if="loadTabbar"
        >
          <van-swipe-item
            v-for="(item,i) in marqueeList"
            :key="i"
            @click.native="$router.push({name: 'notice', query: {id: item.id}})"
          >
            <!-- <i class="ico-proclamation"></i>{{item.noticeName}} -->
            <img
              :src="background.appNoticeIcon ? background.appNoticeIcon : noticeBaseImg"
              height="13"
              style="vertical-align:middle;"
            >
            <span style="margin-left:6px;vertical-align:middle;">{{item.noticeName}}</span>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="items">
        <van-swipe
          :loop="false"
          v-if="loadTabbar"
        >
          <!-- 第一栏 -->
          <van-swipe-item>
            <van-row class="item-group">
              <van-col
                span="6"
                v-for="(item,i) in menu"
                :key="i"
                v-if="i < 4"
                @click.native="gotoAction(item.tag,item.path)"
              >
                <!-- <nuxt-link :to="{name: item.path}"> -->
                <!-- <i :class="item.icon"></i> -->
                <img
                  class="middle-icon"
                  :src="item.icon ? item.icon : item.baseIcon"
                  width="41"
                >
                <p>{{item.name ? item.name : item.defaultName}}</p>
                <!-- </nuxt-link> -->
              </van-col>
            </van-row>
          </van-swipe-item>
          <van-swipe-item v-if="menu.length > 4">
            <van-row class="item-group">
              <van-col
                span="6"
                v-for="(item,i) in menu"
                :key="i"
                v-if="i > 3"
                @click.native="gotoAction(item.tag,item.path)"
              >
                <!-- <nuxt-link :to="{name: item.path}"> -->
                <img
                  class="middle-icon"
                  :src="item.icon ? item.icon : item.baseIcon"
                  width="41"
                >
                <p>{{item.name ? item.name : item.defaultName}}</p>
                <!-- </nuxt-link> -->
              </van-col>
            </van-row>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="guide-price">
      <div class="block-header row-between">
        <div>
          <strong class="block-title">今日指导价</strong>
          <span class="block-subtitle">({{today}})</span>
        </div>
        <nuxt-link
          class="more"
          :to="{name: 'jewelrySearch-guidance'}"
        > 更多</nuxt-link>
      </div>
      <div class="guide">
        <van-swipe
          class="assemble-swipe"
          :show-indicators="false"
          v-if="loadTabbar"
        >
          <van-swipe-item
            v-for="(item,i) in guidePriceList"
            :key="i"
          >
            <div
              class="assemble-item"
              @click="$router.push({name: 'jewelrySearch-guidance'})"
            >
              <p class="item-name">{{item.name}}</p>
              <div>
                <p class="item-unit">{{item.todayGuidedPriceVOS[0].price}}{{item.priceUnit}}</p>
                <p
                  class="item-state"
                  style="padding-top: 6px;"
                >零售均价</p>
              </div>
              <div>
                <div
                  class="echart"
                  ref="echarts"
                >
                  <span
                    v-for="(subItem, subIndex) in item.todayGuidedPriceVOS"
                    :key="subIndex"
                  ><i></i>{{subItem.price}}</span>
                </div>
                <p class="item-state">近7日走势</p>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div
      class="guide-price jewelry-circle"
      v-if="jewelryList && jewelryList.length"
    >
      <div class="block-header row-between">
        <div>
          <strong class="block-title">珠宝知识</strong>
        </div>
        <nuxt-link
          class="more"
          :to="{name: 'news-jewelryCircle'}"
        > 更多</nuxt-link>
      </div>
      <div
        class="main-item"
        v-for="(item,i) in jewelryList"
        :key="i"
        @click="toDetail(item.type,item.id)"
      >
        <img
          :src="item.thumbnail"
          width="60"
          height="60"
        >
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <van-row class="item-number">
            <van-col
              span="8"
              class="tl"
            >
              浏览 {{item.viewNumber}}
            </van-col>
            <van-col
              span="8"
              class="tc"
            >
              评论 {{item.commentNumber}}
            </van-col>
            <van-col
              span="8"
              class="tr"
            >
              点赞 {{item.likeNumber}}
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div class="group-goods">
      <div class="block-title">拼团<span>1</span>折起</div>
      <!-- <div id="myEchart"></div> -->
      <div class="goods">
        <AppList
          :query="query"
          :isDisabled="true"
          :postData="postData"
          :getData="() => this.$service('groupGoods', { data: this.query, params: this.postData })"
          ref="list"
        >
          <template slot-scope="{ list }">
            <van-row gutter="10">
              <van-col
                span="12"
                v-for="(item, i) in list"
                :key="i"
              >
                <AppCard
                  :imgUrl="item.goodsPic"
                  :lowPrice="item.lowPrice"
                  :hightPrice="item.hightPrice"
                  :navLowPrice="item.navLowPrice ? item.navLowPrice : 0"
                  :navHightPrice="item.navHightPrice ? item.navHightPrice : 0"
                  :title="item.goodsName"
                  :merchantName="item.merchantName"
                  :merchantLogo="item.merchantPic"
                  :discount="item.discount"
                  @click.native="$router.push({name: 'jewelry-work', query: {id: item.goodsId}})"
                />
              </van-col>
            </van-row>
          </template>
        </AppList>
      </div>
    </div>
    <AppTabbar
      :activeIndex="0"
      v-if="loadTabbar"
    />
  </AppView>
</template>

<script>
import Cookies from 'js-cookie'
import AppSearch from '~/components/swap/search'
import AppTabbar from '~/components/swap/tabbar'
import { setImg } from '~/utils/qiniu'
import sticky from '~/components/common/sticky'
import { formatDate } from '~/utils/time'
import AppList from '~/components/common/list'
import AppCard from '~/components/common/card/item1'
import { getLocation } from '~/utils/location'
import { getToken } from "~/utils/auth"

function toParamMap(str) {
  var map = {};
  var segs = str.split("&");
  for (var i in segs) {
    var seg = segs[i];
    var idx = seg.indexOf('=');
    if (idx < 0) {
      continue;
    }
    var name = seg.substring(0, idx);
    var value = seg.substring(idx + 1);
    map[name] = value;
  }
  return map;
}

export default {
  components: {
    AppSearch,
    AppTabbar,
    sticky,
    AppCard,
    AppList
  },
  data() {
    if (this.$data) return
    return {
      isACity: false,
      today: undefined,
      imgs: [],
      /*imgs: [{
        id: 1,
        img: 'http://app.gacjc.com/app/download/banner.png',
        desc: '千度真珠宝，上中宝平'
      }],*/
      marqueeList: [],
      guidePriceList: [],
      postData: {
        offset: 1,
        limit: 20,
      },
      query: {

      },
      chooseCity: '',
      loadTabbar: true,
      // 2: 路由跳转 1 a标签跳转 0 调用方法
      menu: [{
        id: "1000",
        tag: 2,
        name: "去哪儿买",
        // icon: "icoindex-doubt",
        path: "jewelry-index",
        baseIcon: require('../assets/images/icon/doubt.png')
      },
      {
        id: "1001",
        tag: 2,
        name: "找设计师",
        // icon: "icoindex-designer",
        path: "design-index",
        baseIcon: require('../assets/images/icon/designer.png')
      },
      {
        id: "1002",
        tag: 2,
        name: "寻代工",
        // icon: "icoindex-foundry",
        path: "maker-index",
        baseIcon: require('../assets/images/icon/foundry.png')
      },
      {
        id: "1003",
        tag: 2,
        name: "珠宝圈",
        // icon: "icoindex-information",
        path: "news-jewelryCircle",
        baseIcon: require('../assets/images/icon/information.png')
      },
      {
        id: "1004",
        tag: 2,
        name: "珠宝展",
        // icon: "icoindex-exhibition",
        path: "jewelryFair-index",
        baseIcon: require('../assets/images/icon/doubt.png')
      }
      ],
      jewelryList: [],
      background: {},
      locationBaseImg: require('../assets/images/icon/pulldown.png'),
      searchBaseImg: require('../assets/images/icon/search.png'),
      bannerBaseImg: require('../assets/images/icon/btn-bg.png'),
      noticeBaseImg: require('../assets/images/icon/proclamation.png')
    }
  },
  beforeMount() {
    this.$service('notice').then((data) => {
      this.marqueeList = data.data.records
    }).catch(() => {

    })
  },
  mounted() {
    if (this.$native.isACity() == 2) {
      this.isACity = true
    }
    this.today = formatDate(new Date(), 'yyyy-MM-dd')
    // 微信首页返回时回到微信页
    this.pushHistory()
    window.addEventListener("popstate", this.closeWeixinPage, false)
    this.getBackground()
  },
  activated() {
    this.loadTabbar = false
    document.title = '中宝平'

    history.pushState(null, null, location.href)

    // JCK获取权限后判断
    this.getUserType()

    this.$service('guidePrice').then((data) => {
      this.guidePriceList = data.data
    }).catch(() => { })

    this.$service('homeBanner').then((data) => {
      this.imgs = data.data
    }).catch(() => { })

    this.getJewelryCircle()

    this.$nextTick(() => {
      this.loadTabbar = true
    })

    if (this.$route.query.chooseCity) {
      this.chooseCity = this.$route.query.chooseCity
    } else {
      this.getLoc()
    }

    //微信公众号回调地址获取code
    let urlParameters = window.location.hash ? window.location.hash.substring(1) : window.location.search.substring(1)
    let map = toParamMap(urlParameters)

    if (map.state == '123' && !getToken()) {
      this.$service('getUserInfoForWeChat', {
        params: {
          'code': map.code,
          'state': '123'
        }
      })
        .then(this.success)
        .catch(this.fail)
    }
  },
  deactivated() {
    this.$destroy()
  },
  updated() {
    if (this.$refs.echarts) {
      this.drawLine()
    }
  },
  destroyed() {
    // 清除popstate事件 否则会影响到其他页面
    window.removeEventListener("popstate", this.closeWeixinPage, false)
  },
  watch: {
    background: {
      handler(newValue, oldValue) {
        if (!Object.keys(this.background).length) return
        let menuList = []
        this.background.appMiddleNavigations.map(item => {
          this.menu.map((subItem, subIndex) => {
            if (item.id === subItem.id) {
              menuList.push(Object.assign({}, subItem, item))
            }
          })
        })
        this.menu = menuList
      },
      immediate: true
    }
  },
  methods: {
    setImg,
    getLocation,
    getBackground() {
      if (localStorage.getItem('appHomeTheme')) {
        this.background = JSON.parse(localStorage.getItem('appHomeTheme'))
      }
      this.$service("homeBackground", { data: { backgroundImgType: 4 } }).then(data => {
        this.background = data.data
        localStorage.setItem('appHomeTheme', JSON.stringify(this.background))
      })
    },
    async getLoc() {
      let [city] = await Promise.all([
        this.getLocation()
      ])
      this.chooseCity = city
    },
    getJewelryCircle() {
      this.$service("circleRecommend").then(data => {
        this.jewelryList = data.data
      })
    },
    toDetail(type, id) {
      if (type === 1) {
        this.$router.push({ name: 'news-jewelryCircle-detail', query: { id: id } })
      } else {
        if (this.$native.isApp()) {
          this.$native.goToJewelryVideo(id);
        } else {
          this.$router.push({
            name: "news-jewelryCircle-videoDetail",
            query: { id: id }
          });
        }
      }
    },
    linkTo(data) {
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
        this.$router.push({
          name: "news-jewelryCircle-detail",
          query: {
            id: data.linkTypeId
          }
        })
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
    },
    handlerGoldRecycle() {
      this.$service('goldRecycle')
        .then(result => {
          location.href = result.data
        })
    },
    drawLine() {
      let self = this
      let echartsArr = this.$refs.echarts
      echartsArr.forEach(function (item, i) {
        let myEchart = self.$echarts.init(echartsArr[i])
        let sdata = []
        self.guidePriceList[i].todayGuidedPriceVOS.forEach(function (citem, i) {
          sdata.push(citem.price)
        })
        let max = Math.max.apply(null, sdata)
        let min = Math.min.apply(null, sdata)
        myEchart.setOption({
          grid: {
            top: 5,
            left: 5,
            bottom: 5
          },
          // x轴的数据
          xAxis: {
            show: false,
            data: [1, 2, 3, 4, 5, 6, 7]
          },
          // y轴的数据
          yAxis: {
            show: false,
            min: min,
            max: max
          },
          animation: false,
          // 折线图 （写几条折线图就写几个对象；是这个{}对象）
          series: [{
            type: "line",
            symbol: "circle",
            data: sdata,
            color: "#fb746e"
          }]
        })
      })
    },
    // JCK跳转方法
    gotoAction(tag, path) {
      if (tag == 0) {
        this.handlerGoldRecycle();
      } else if (tag == 1) {
        path = "https://www.wanbaoooo.com/mobile/index/index.html";
        location.href = path;
      } else {
        this.$router.push({
          name: path
        });
      }
    },
    // JCK调用个人中心方法获取用户权限
    getUserType() {
      if (getToken()) {
        // 调用个人中心接口
        this.$service("userInfo")
          .then(result => {
            // JCK根据角色显示菜单 1个人 2商家
            if (result.data.userType == 1) {
              /*this.menu.splice(4, 1)
              this.menu.splice(2, 1)*/
              this.menu.splice(2, 1)
            }
          })
          .catch(err => { });
      } else {
        /*this.menu.splice(4, 1)
        this.menu.splice(2, 1)*/
        this.menu.splice(2, 1)
      }
    },
    //点击返回调用原生方法
    goBack() {
      this.$native.goToHome()
    },

    success(result) {
      //微信公众号后台返回参数
      result.data.accessToken && this.$store.commit('user/setToken', result.data.accessToken)
    },
    fail() {
      //微信公众号后台返回参数失败
    },
    pushHistory() {
      let state = {
        title: "title",
        url: "#"
      }
      window.history.pushState(state, "title", "#")
    },
    closeWeixinPage() {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        WeixinJSBridge.call('closeWindow'); //微信
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../assets/css/index/sprite.css";
.Gac-index {
  min-height: 100vh;
  overflow: auto;
  & /deep/ .sideMenu {
    display: none;
  }
  background: var(--bg);
  color: var(--dark-gray);
  & .header {
    padding: 10px;
    /* background-color: #ffffff; */
  }
  & .header_two {
    padding: 10px;
    /* background-color: #ffffff; */
  }
}

.top-box {
  padding-bottom: 10px;
}

.app-search {
  position: relative;
  width: 100%;
  /* background: white; */
  box-sizing: border-box;
  & .location {
    margin-left: 5px;
    min-width: 60px;
    width: 60px;
    height: 28px;
    font-size: 14px;
    color: var(--dark-gray);
    & span {
      display: inline-block;
      height: 28px;
      max-width: 42px;
      line-height: 28px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      vertical-align: middle;
    }
    & i {
      /* float: left; */
    }
  }
  & .icon-pulldown {
    margin-left: 4px;
    display: inline-block;
    vertical-align: middle;
  }
  & .input-box {
    position: relative;
    display: block;
    width: 100%;
    line-height: normal;
    margin: 0;
    padding: 7px 10px;
    font-size: 12px;
    border-radius: 15px;
    /* color: var(--black); */
    /* background: #f0f0f0; */
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

.banner {
  position: relative;
  overflow: hidden;
  & .index-swipe {
    height: 175px;
    background-color: #1a2b5d;
    & .background {
      height: 100%;
      width: 100%;
      background-size: 100% 175px;
      background-position: top;
    }
  }
  & .btn-group {
    position: absolute;
    bottom: -1px;
    width: 100%;
    text-align: center;
    & button {
      width: 115px;
      height: 35px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: #fff;
      font-size: 14px;
      border: none;
    }
  }
}

.notice {
  overflow: hidden;
  height: 30px;
  /* background: white; */
  padding: 0 10px;
  & .assemble-swipe {
    height: 100%;
    line-height: 30px;
    /* color: var(--dark-gray); */
    font-size: 13px;
  }
  & .ico-proclamation {
    margin-right: 5px;
  }
  & .van-swipe-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.items {
  margin-top: 10px;
  height: 90px;
  padding: 10px;
  background: white;
  text-align: center;
  font-size: 12px;
  box-sizing: border-box;
  & .van-swipe {
    height: 80px;
  }
  & /deep/ .van-swipe__indicators {
    & .van-swipe__indicator {
      border-radius: 2px;
      background-color: #e0e3ec;
      width: 24px;
      height: 3px;
    }
    & .van-swipe__indicator:not(:last-child) {
      margin-right: 0;
    }
    & .van-swipe__indicator--active {
      background: #fb746e;
    }
  }
  & p {
    margin-top: 5px;
    color: var(--dark-gray);
  }
}

.guide-price {
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
  & .block-header {
    margin-bottom: 15px;
    padding: 0 12px;
  }
  & .block-title {
    font-size: 17px;
    color: var(--black);
    font-weight: bold;
  }
  & .block-subtitle {
    font-size: 13px;
    color: var(--dark-gray);
  }
  & .more {
    font-size: 12px;
    color: var(--dark-gray);
  }
  & .guide {
    & .assemble-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 89px;
      width: 350px;
      margin: 0 auto;
      padding: 0 19px;
      background: white;
      border-radius: 8px;
      text-align: center;
      box-sizing: border-box;
      & .item-name {
        color: var(--black);
        font-size: 15px;
      }
      & .item-unit {
        color: var(--red);
        font-size: 17px;
      }
      & .item-state {
        color: var(--gray);
        font-size: 12px;
        line-height: 24px;
      }
    }
    & .van-swipe {
      height: 89px;
    }
  }
  & .echart {
    width: 80px;
    height: 26px;
  }
}

.jewelry-circle {
  & .main-item {
    display: flex;
    margin: 0 10px 10px 10px;
    padding: 15px;
    background: #fff;
    border-radius: 5px;
    & .item-info {
      display: inline-block;
      margin-left: 10px;
      width: 250px;
      vertical-align: top;
      & .item-title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin: 4px 0;
        height: 40px;
        line-height: 20px;
        color: #333;
        font-size: 16px;
      }
      & .item-number {
        color: #aaa;
        font-size: 12px;
      }
    }
  }
  & .main-item:last-child {
    margin-bottom: 0;
  }
}

.group-goods {
  padding: 0 10px;
  & .block-title {
    margin-bottom: 10px;
    font-size: 17px;
    color: var(--black);
    font-weight: bold;
    & span {
      font-size: 28px;
    }
  }
}

.nav {
  padding: 8px;
}

.block {
  text-align: center;
  padding: 10px 10px 20px;
  font-size: 15px;
  color: var(--black);
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  /*no*/
  border-radius: 7px;
  flex: 1;
  margin: 2px;
  & img {
    width: 50px;
    height: 50px;
  }
}

>>> .van-swipe__track {
  width: 100%;
}

#myEchart {
  height: 22px;
}

.btn-back {
  margin-right: 10px;
}
</style>
