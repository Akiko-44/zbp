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
                :style="{color: background.appTopLocationFontColorString}"
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
                :style="{color: background.appTopLocationFontColorString}"
                @click="$router.push({name: 'jewelrySearch-citySearch', query: {chooseCity: chooseCity}})"
              >
                <span
                  v-if="chooseCity"
                  class="choose-City"
                >{{chooseCity}}</span>
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
        v-if="!hideNotice"
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
            <img
              :src="background.appNoticeIcon ? background.appNoticeIcon : noticeBaseImg"
              height="13"
              style="vertical-align:middle;"
            >
            <span style="margin-left:6px;vertical-align:middle;">{{item.noticeName}}</span>
          </van-swipe-item>
        </van-swipe>
        <span
          class="close-notice"
          @click="hideNoticeHandler"
        ></span>
      </div>
      <div class="items">
        <van-swipe
          :loop="false"
          :show-indicators="menu.length > 4"
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
                <img
                  class="middle-icon"
                  :src="item.icon ? item.icon : item.baseIcon"
                  width="41"
                >
                <p>{{item.name ? item.name : item.defaultName}}</p>

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
                <img
                  class="middle-icon"
                  :src="item.icon ? item.icon : item.baseIcon"
                  width="41"
                >
                <p>{{item.name ? item.name : item.defaultName}}</p>

              </van-col>
            </van-row>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="guide-price">
      <div class="guide-price-box">
        <div class="block-header row-between">
          <div>
            <strong class="block-title">今日指导价</strong>
            <span class="block-subtitle">({{today}})</span>
          </div>
          <nuxt-link
            class="more"
            :to="{name: 'jewelrySearch-guidance'}"
          > 更多></nuxt-link>
        </div>
        <div class="guide">
          <van-swipe
            class="assemble-swipe"
            :show-indicators="false"
            :autoplay="3000"
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
                  <p class="item-unit">{{item.todayGuidedPriceVOS[item.todayGuidedPriceVOS.length-1].price}}{{item.priceUnit}}</p>
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
    </div>

    <!-- 模块开始 -->
    <div
      v-for="(homeModuleItem, homeModuleIndex) in homeModule"
      :key="homeModuleIndex"
    >
      <template v-if="homeModuleItem.id == 1000 && homeModuleItem.goodsVOList.length">
        <div class="group-goods card-block">
          <div class="block-header row-between">
            <div class="block-title">
              {{homeModuleItem.moduleName}}
            </div>
            <nuxt-link
              class="more"
              :to="{name: 'jewelry-product-groupGoods', query:{title: homeModuleItem.moduleName}}"
            > 更多></nuxt-link>
          </div>
          <div class="goods-box">
            <div
              class="goods"
              v-for="(item, index) in homeModuleItem.goodsVOList"
              :key="index"
              @click="$router.push({name: 'jewelry-work', query: {id: item.id}})"
            >
              <div
                class="card-img lazy-img-box"
                v-lazy:background-image="setImg(item.imgUrl, { w: 400 })"
              >
                <div
                  v-if="item.appSmallIcon != ''"
                  class="card-img-icon lazy-img-box"
                  v-lazy:background-image="setImg(item.appSmallIcon, { w: 400 })"
                ></div>
              </div>
              <div class="card-info">
                <p class="price">￥{{item.groupPrice.toFixed(2)}}</p>
                <p class="pre-price">￥{{item.price.toFixed(2)}}</p>
                <h4 class="card-title text-hidden">{{item.goodsName}}</h4>
                <div class="tc">
                  <van-button
                    class="group-btn"
                    round
                    color="#FB746E"
                  >{{item.discount}}折抢购</van-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="homeModuleItem.id == 1001 && homeModuleItem.goodsVOList.length">
        <div class="new-goods card-block">
          <div class="block-header row-between">
            <div class="block-title">
              {{homeModuleItem.moduleName}}
            </div>
            <nuxt-link
              class="more"
              :to="{name: 'jewelry-product', query: {entrance: 1}}"
            > 更多></nuxt-link>
          </div>
          <div class="goods">
            <van-row gutter="10">
              <van-col
                span="12"
                v-for="(item, i) in homeModuleItem.goodsVOList"
                :key="i"
                @click="$router.push({name: 'jewelry-work', query: {id: item.id}})"
              >
                <AppCard
                  :imgUrl="item.imgUrl"
                  :appBigIcon="item.appBigIcon"
                  :lowPrice="item.price"
                  :hightPrice="item.price"
                  :title="item.goodsName"
                  :merchantName="item.merchantName"
                  :merchantLogo="item.merchantLogo"
                />
              </van-col>
            </van-row>
          </div>
        </div>
      </template>

      <template v-if="homeModuleItem.id == 1002 && homeModuleItem.contentVOList.length">
        <div class="jewelry-circle card-block">
          <div class="block-header row-between">
            <div class="block-title">
              {{homeModuleItem.moduleName}}
            </div>
            <nuxt-link
              class="more"
              :to="{name: 'jewelryCircle'}"
            > 更多></nuxt-link>
          </div>
          <van-row gutter="10">
            <van-col
              span="12"
              v-for="(item, i) in homeModuleItem.contentVOList"
              :key="i"
            >
              <div
                class="card-img lazy-img-box"
                v-lazy:background-image="setImg(item.thumbnail, { w: 400 })"
                @click="$router.push({name: 'jewelryCircle-detail', query: {id: item.id}})"
              ></div>
              <div class="item-info">
                <p class="item-title text-hidden">{{item.title}}</p>
                <van-row class="item-number">
                  <van-col
                    span="12"
                    class="tl"
                  >
                    阅读 {{item.viewNumber}}
                  </van-col>
                  <van-col
                    span="12"
                    class="tr"
                  >
                    点赞 {{item.likeNumber}}
                  </van-col>
                </van-row>
              </div>
            </van-col>
          </van-row>
        </div>
      </template>

      <template v-if="homeModuleItem.id == 1003 && homeModuleItem.merchantVOList.length">
        <div class="brand-goods card-block">
          <div class="block-header row-between">
            <div class="block-title">
              {{homeModuleItem.moduleName}}
            </div>
            <nuxt-link
              class="more"
              :to="{name: 'jewelry-list'}"
            > 更多></nuxt-link>
          </div>
          <div
            class="brand-item"
            v-for="(item, i) in homeModuleItem.merchantVOList"
            :key="i"
          >
            <div
              class="shop-box"
              @click="$router.push({name: 'jewelry-detail', query: {id: item.id}})"
            >
              <div
                class="shop-img lazy-img-box"
                v-lazy:background-image="setImg(item.merchantPic, { w: 400 })"
              ></div>
              <div class="shop-info tc">
                <h4>{{item.merchantName}}</h4>
                <p>{{item.recommendDetail}}</p>
                <van-button
                  class="shop-btn"
                  round
                  color="#FB746E"
                >进店逛逛 ></van-button>
              </div>
            </div>
            <div
              class="shop-goods"
              v-if="item.goodsVOList && item.goodsVOList.length"
            >
              <div
                class="goods-item"
                v-for="(goodsItem, goodsIndex) in item.goodsVOList"
                :key="goodsIndex"
                @click="$router.push({name: 'jewelry-work', query: {id: goodsItem.id}})"
              >
                <div
                  class="goods-img lazy-img-box"
                  v-lazy:background-image="setImg(goodsItem.imgUrl, { w: 400 })"
                >
                  <div
                    v-if="goodsItem.appSmallIcon != ''"
                    class="goods-img-icon lazy-img-box"
                    v-lazy:background-image="setImg(goodsItem.appSmallIcon, { w: 400 })"
                  ></div>
                </div>
                <div class="goods-info tc">
                  <h4 class="price">￥{{goodsItem.price.toFixed(2)}}</h4>
                  <p class="title text-hidden">{{goodsItem.goodsName}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="homeModuleItem.id ==  1017 && promoteList.length">
        <div class="promotion-goods card-block">
          <div class="block-header row-between">
            <div class="block-title">
              {{ homeModuleItem.moduleName }}
            </div>
            <nuxt-link
              class="more"
              :to="{ name: 'jewelry-product-promotionGoods', query:{title: homeModuleItem.moduleName} }"
            >
              更多></nuxt-link>
          </div>
          <div class="goods-box">
            <div
              class="goods"
              v-for="(subItem, subIndex) in promoteList"
              :key="subIndex"
              @click="$router.push({name: 'jewelry-work', query: {id: subItem.id}})"
            >
              <div
                class="card-img lazy-img-box"
                v-lazy:background-image="setImg(subItem.imgUrl, { w: 400 })"
              >
                <div
                  v-if="subItem.appSmallIcon != ''"
                  class="card-img-icon lazy-img-box"
                  v-lazy:background-image="setImg(subItem.appSmallIcon, { w: 400 })"
                ></div>
              </div>
              <div class="card-info">
                <h4 class="card-title text-hidden">{{ subItem.goodsName }}</h4>
                <p class="price">
                  ¥<span v-if="subItem.promotionPrice">{{
                    subItem.promotionPrice.toFixed(2)
                  }}</span><del>
                    ¥<span v-if="subItem.price">{{
                      subItem.price.toFixed(2)
                    }}</span></del>
                </p>
                <van-button
                  class="promotion-btn"
                  color="#FB746E"
                >{{
                  subItem.countDown
                }}</van-button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div
        v-if="advertise[homeModuleIndex] && advertise[homeModuleIndex].mobilePicture && homeModuleIndex <3"
        class="poster-img lazy-img-box"
        v-lazy:background-image="setImg(advertise[homeModuleIndex].mobilePicture, { w: 400 })"
        @click="linkTo(advertise[homeModuleIndex])"
      ></div>
    </div>

    <div class="status">
      <div class="line">
        <p>中宝平 带你到源头买真品</p>
      </div>
    </div>

    <AppTabbar
      :activeIndex="0"
      v-show="loadTabbar"
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
import { getCurrentCityName, getLocation } from '~/utils/location'
import { getToken } from "~/utils/auth"

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
      hideNotice: false,
      isACity: false,
      today: undefined,
      imgs: [],
      marqueeList: [],
      guidePriceList: [],
      homeModule: [],
      advertise: [],
      timeOut: [],
      postData: {
        offset: 1,
        limit: 20,
      },
      query: {

      },
      chooseCity: '',
      loadTabbar: true,
      // 2: 路由跳转 1 a标签跳转 0 调用方法
      menu: [
        {
          id: "1000",
          tag: 2,
          name: "去哪儿买",
          path: "jewelry-index",
          baseIcon: require('../assets/images/icon/doubt.png')
        },
        {
          id: "1001",
          tag: 2,
          name: "找设计师",
          path: "design-index",
          baseIcon: require('../assets/images/icon/designer.png')
        },
        {
          id: "1002",
          tag: 2,
          name: "寻代工",
          path: "maker-index",
          baseIcon: require('../assets/images/icon/foundry.png')
        },
        {
          id: "1003",
          tag: 2,
          name: "珠宝圈",
          path: "jewelryCircle",
          baseIcon: require('../assets/images/icon/information.png')
        },
        {
          id: "1004",
          tag: 2,
          name: "珠宝展",
          path: "jewelryFair-index",
          baseIcon: require('../assets/images/icon/doubt.png')
        }
      ],
      jewelryList: [],
      background: {},
      promoteList: [],
      locationBaseImg: require('../assets/images/icon/pulldown.png'),
      searchBaseImg: require('../assets/images/icon/search.png'),
      bannerBaseImg: require('../assets/images/icon/btn-bg.png'),
      noticeBaseImg: require('../assets/images/icon/proclamation.png')
    }
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
    this.hideNotice = sessionStorage.getItem('hideNotice')
  },
  activated() {
    this.loadTabbar = false
    document.title = '中宝平'

    history.pushState(null, null, location.href)

    // JCK获取权限后判断
    this.getUserType()

    this.$nextTick(() => {
      this.loadTabbar = true
      this.getHomePage()
    })

    if (this.$route.query.chooseCity) {
      this.chooseCity = this.$route.query.chooseCity
    } else {
      this.getLoc()
    }
  },
  deactivated() {
    this.$destroy()
  },
  beforeDestroy() {
    this.timeOut.map(item => {
      item && clearInterval(item);
    });
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
            if (item.id == subItem.id) {
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
    getCurrentCityName,
    getHomePage() {
      if (localStorage.getItem('marqueeList')) {
        this.marqueeList = JSON.parse(localStorage.getItem('marqueeList'))
      }
      if (localStorage.getItem('imgs')) {
        this.imgs = JSON.parse(localStorage.getItem('imgs'))
      }
      if (localStorage.getItem('guidePriceList')) {
        this.guidePriceList = JSON.parse(localStorage.getItem('guidePriceList'))
      }
      if (localStorage.getItem('homeModule')) {
        this.homeModule = JSON.parse(localStorage.getItem('homeModule'))
      }
      if (localStorage.getItem('advertise')) {
        this.advertise = JSON.parse(localStorage.getItem('advertise'))
      }
      this.$service('homePage').then((data) => {
        this.marqueeList = data.data.platformNotice.records
        this.imgs = data.data.banner
        this.guidePriceList = data.data.todayGuidePrice
        this.homeModule = data.data.homeModule
        this.advertise = data.data.advertise

        localStorage.setItem('marqueeList', JSON.stringify(this.marqueeList))
        localStorage.setItem('imgs', JSON.stringify(this.imgs))
        localStorage.setItem('guidePriceList', JSON.stringify(this.guidePriceList))
        localStorage.setItem('homeModule', JSON.stringify(this.homeModule))
        localStorage.setItem('advertise', JSON.stringify(this.advertise))
        this.homeModule.map(item => {
          if (item.id == "1017") {
            this.promoteList = item.goodsVOList;
            this.promoteList.map((goodsItem, goodsIndex) => {
              goodsItem.countDown = goodsItem.endTime;
              this.getCountDown(goodsItem.endTime, goodsIndex);
            });
          }
        })
      }).catch(() => { })
    },
    getCountDown(time, index) {
      let finishTime = +new Date(Date.parse(time.replace(/-/g, "/")));
      let diferentTime = this.leftTimer(finishTime - new Date());
      this.promoteList[index].countDown = diferentTime;
      this.timeOut[index] = setInterval(() => {
        let finishTime = +new Date(Date.parse(time.replace(/-/g, "/")));
        let diferentTime = this.leftTimer(finishTime - new Date());
        this.promoteList[index].countDown = diferentTime;
        this.$forceUpdate();
      }, 1000);
    },
    getBackground() {
      if (localStorage.getItem('appHomeTheme')) {
        this.background = JSON.parse(localStorage.getItem('appHomeTheme'))
      }
    },
    async getLoc() {
      getCurrentCityName().then((city) => {
        this.chooseCity = city.replace('市', '')
      })
    },
    getJewelryCircle() {
      this.$service("circleRecommend").then(data => {
        this.jewelryList = data.data
      })
    },
    toDetail(type, id) {
      if (type === 1) {
        this.$router.push({ name: 'jewelryCircle-detail', query: { id: id } })
      } else {
        if (this.$native.isApp()) {
          this.$native.goToJewelryVideo(id);
        } else {
          this.$router.push({
            name: "jewelryCircle-videoDetail",
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
          name: "jewelryCircle-detail",
          query: {
            id: data.linkTypeId
          }
        })
      } else if (data.linkType === 4) {
        this.$router.push({
          name: "jewelryCircle-weMidea",
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
    async getUserType() {
      if (getToken()) {
        const userInfo = await this.$store.dispatch("user/getUserInfo");
        // JCK根据角色显示菜单 1个人 2商家
        if (userInfo.userType == 1) {
          this.menu.splice(2, 1)
        }
      } else {
        this.menu.splice(2, 1)
      }
    },
    //点击返回调用原生方法
    goBack() {
      this.$native.goToHome()
    },
    pushHistory() {
      let state = {
        title: "title",
        url: "#"
      }
      window.history.pushState(state, "title", "#")
    },
    closeWeixinPage() {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        WeixinJSBridge.call('closeWindow'); //微信
      }
    },
    // 隐藏公告
    hideNoticeHandler() {
      this.hideNotice = true
      sessionStorage.setItem('hideNotice', this.hideNotice)
    },
    leftTimer(leftTime) {
      var text = "";
      var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
      var minutes = parseInt((leftTime / 1000 / 60) % 60, 10); //计算剩余的分钟
      var seconds = parseInt((leftTime / 1000) % 60, 10); //计算剩余的秒数
      if (seconds < 0) {
        this.isPromoteSale = false;
      }
      days = this.checkTime(days);
      hours = this.checkTime(hours);
      minutes = this.checkTime(minutes);
      seconds = this.checkTime(seconds);
      if (days) {
        text = days + "天" + hours + "时" + minutes + "分";
      } else {
        text = hours + "时" + minutes + "分" + seconds + "秒";
      }
      return text;
    },
    checkTime(i) {
      //将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../assets/css/index/sprite.css";
.Gac-index {
  padding-bottom: 50px;
  min-height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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

>>> .card-price {
  margin-bottom: 10px;
}
>>> .app-card-item1 strong {
  font-weight: bold;
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
    & .background {
      height: 100%;
      width: 100%;
      /* background-size: 100% 175px; */
      background-size: cover;
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
      white-space: nowrap;
    }
  }
}

.notice {
  overflow: hidden;
  height: 30px;
  /* background: white; */
  padding: 0 10px;
  position: relative;
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
  & .close-notice {
    position: absolute;
    padding: 7px;
    width: 15px;
    height: 15px;
    background: url(../assets/images/icon/closeproclamation.png) no-repeat
      center;
    right: 0;
    top: 0;
    background-size: 15px;
  }
}

.items {
  margin: 10px 10px 0;
  /* height: 100px; */
  padding-top: 15px;
  background: white;
  text-align: center;
  font-size: 12px;
  box-sizing: border-box;
  border-radius: 5px;
  & .van-swipe {
    height: 75px;
  }
  & /deep/ .van-swipe__indicators {
    bottom: 8px;
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
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
  & .guide-price-box {
    height: 100px;
    background: #fff;
    border-radius: 5px;
  }
  & .block-header {
    padding: 10px;
  }
  & .block-title {
    font-size: 16px;
    color: var(--black);
    font-weight: bold;
  }
  & .block-subtitle {
    font-size: 13px;
    color: var(--dark-gray);
  }
  & .more {
    font-size: 12px;
    color: #666;
  }
  & .guide {
    & .assemble-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* height: 89px;
      width: 350px;
      height: 76px;*/
      width: 355px;
      padding: 0 10px 0 20px;
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
      padding-top: 10px;
    }
  }
  & .echart {
    width: 80px;
    height: 26px;
  }
}

.jewelry-circle {
  & .card-img {
    width: 100%;
    height: 172px;
    background-color: var(--light-gray);
    border-radius: 5px 5px 0px 0px;
  }
  & .item-title {
    margin: 12px 0 7px;
    font-size: 15px;
    color: #333333;
  }
  & .item-number {
    margin-bottom: 15px;
    font-size: 12px;
    color: #999999;
  }
}

.card-block {
  padding: 0 10px;
  background: #fff;
  margin: 10px;
  border-radius: 5px;
  & .block-title {
    padding: 15px 0 10px;
    font-size: 16px;
    color: var(--black);
    font-weight: bold;
  }
  & .more {
    font-size: 12px;
    color: #666666;
    padding-top: 18px;
  }
}

.group-goods {
  padding-bottom: 15px;
  white-space: nowrap;
  & .goods-box {
    overflow-x: scroll;
    overflow-y: hidden;
    height: 185px;
    & .goods {
      display: inline-block;
      margin-right: 5px;
      width: 95px;
      font-size: 12px;
      & .card-img {
        width: 100%;
        height: 95px;
        border-radius: 2px;
        position: relative;
        & span {
          line-height: 16px;
          padding: 1px 2px 1px 3px;
          background: #fb746e;
          top: 14px;
          font-size: 10px;
          color: #fff;
          position: absolute;
          right: 0;
          border-bottom-left-radius: 9px;
          border-top-left-radius: 9px;
        }
      }
      & .card-img-icon {
        height: 100%;
        background-size: 100% 100%;
      }
      & .price {
        margin-top: 8px;
        font-weight: bold;
        font-size: 15px;
        color: #fb746e;
      }
      & .pre-price {
        padding-top: 4px;
        font-size: 12px;
        color: #999999;
        text-decoration: line-through;
      }
      & .card-title {
        margin: 8px 0 6px;
      }
      & .group-btn {
        padding: 0;
        width: 75px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
}

.promotion-goods {
  padding-bottom: 15px;
  white-space: nowrap;
  & .goods-box {
    width: 335px;
    overflow-x: scroll;
    min-height: 184px;
    & .goods {
      display: inline-block;
      margin-right: 5px;
      width: 104px;
      & .card-img {
        width: 100%;
        height: 104px;
        border-radius: 5px;
      }
      & .card-img-icon {
        height: 100%;
        background-size: 100% 100%;
      }
      & .card-title {
        padding-top: 12px;
        font-size: 14px;
      }
      & .price {
        margin: 8px 0 10px;
        font-size: 12px;
        color: #333333;
        & del {
          font-size: 11px;
          color: #cccccc;
        }
      }
      & .promotion-btn {
        padding: 0;
        /* width: 75px; */
        width: 90px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        border-radius: 5px;
      }
    }
  }
}

.brand-goods {
  padding-bottom: 5px;
  & .brand-item {
    padding-bottom: 6px;
    & .shop-box {
      display: inline-block;
      width: 135px;
      vertical-align: top;
      & .shop-img {
        width: 100%;
        height: 196px;
        background-color: var(--light-gray);
      }
      & .shop-info {
        padding-top: 10px;
        height: 80px;
        font-size: 14px;
        color: #333333;
        background: #f2f2f2;
        & p {
          margin: 7px 0 13px;
          font-size: 12px;
          color: #666666;
        }
        & .shop-btn {
          padding: 0;
          width: 87px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
        }
      }
    }
    & .shop-goods {
      display: inline-block;
      width: 200px;
      vertical-align: top;
      & .goods-item {
        padding: 2px 2px 8px;
        display: inline-block;
        width: 95px;
        &:nth-child(2) {
          border-left: 1px solid #f2f2f2;
        }
        &:nth-child(3) {
          border-top: 1px solid #f2f2f2;
        }
        &:nth-child(4) {
          border-top: 1px solid #f2f2f2;
          border-left: 1px solid #f2f2f2;
        }
      }
      & .goods-img {
        width: 95px;
        height: 95px;
      }
      & .goods-img-icon {
        height: 100%;
        background-size: 100% 100%;
      }
      & .goods-info {
        padding: 0 10px;
      }
      & .price {
        margin: 6px 0;
        color: #fb746e;
        font-size: 14px;
        font-weight: bold;
      }
      & .title {
        font-size: 12px;
        color: #666666;
      }
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

.poster-img {
  width: 355px;
  height: 75px;
  margin: 15px 10px;
}

.finish-line {
  position: relative;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 12px;
  color: var(--dark-gray);
  &::before {
    position: absolute;
    content: "";
    height: 1px;
    width: 280px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--dark-gray);
  }
  & span {
    position: absolute;
    display: inline-block;
    width: 150px;
    background: var(--bg);
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
  }
}
.status {
  position: relative;
  /* z-index: -1; */
  width: 100%;
  padding: 20px 0;
  line-height: 15px;
  text-align: center;
  font-size: 12px;
  color: var(--gray);
  & .line {
    position: relative;
    display: inline-block;
    &::before,
    &::after {
      position: absolute;
      content: "";
      width: 80px;
      height: 1px;
      top: 50%;
    }
    &::before {
      left: -90px;
      background: linear-gradient(to left, #ddd, transparent);
    }
    &::after {
      right: -90px;
      background: linear-gradient(to right, #ddd, transparent);
    }
  }
}
</style>
