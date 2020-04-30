<template>
  <AppView class="jewelry-index">
    <sticky
      class="sticky"
      v-if="titleShow"
      ref="header"
    >
      <HeaderModule />
    </sticky>

    <van-swipe
      class="banner"
      v-show="bannerList.length"
    >
      <van-swipe-item
        v-for="(item, index) in bannerList"
        :key="index"
      >
        <div
          class="background lazy-img-box"
          v-lazy:background-image="setImg(item.mobilePicture, { w: 800 })"
          @click="toBannerUrl(item)"
        ></div>
      </van-swipe-item>
    </van-swipe>

    <div
      class="special-area card-block"
      v-show="zoneList.length"
    >
      <div class="item-area row">
        <div
          class="span-4"
          v-for="(item, index) in zoneList"
          :key="index"
          @click="toGoodsList(item.id)"
        >
          <img
            class="area-icon"
            :src="item.zoneIcon"
            width="40"
          />
          <p>{{ item.zoneName }}</p>
        </div>
      </div>
    </div>

    <div
      v-for="(item, index) in moduleList"
      :key="index"
    >
      <template v-if="item.id === '1004' && promoteList.length">
        <div class="promotion-goods card-block">
          <div class="block-header row-between">
            <div class="block-title">
              {{ item.moduleName }}
            </div>
            <nuxt-link
              class="more"
              :to="{ name: 'jewelry-product-promotionGoods', query:{title: item.moduleName} }"
            >
              更多></nuxt-link>
          </div>
          <div class="goods-box">
            <div
              class="goods"
              v-for="(subItem, subIndex) in promoteList"
              :key="subIndex"
              @click="toGoodsDetail(subItem.id)"
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
      <template v-if="item.id === '1005' && item.goodsVOList.length">
        <div class="new-goods card-block">
          <div class="block-header row-between">
            <div class="block-title">
              {{ item.moduleName }}
            </div>
            <nuxt-link
              class="more"
              :to="{ name: 'jewelry-product', query: { entrance: 1 } }"
            >
              更多></nuxt-link>
          </div>
          <div class="goods">
            <van-row gutter="10">
              <van-col
                span="8"
                v-for="(subItem, subIndex) in item.goodsVOList"
                :key="subIndex"
                @click.native="toGoodsDetail(subItem.id)"
              >
                <div class="goods-item">
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
                    <h4 class="card-title text-hidden">
                      {{ subItem.goodsName }}
                    </h4>
                    <p class="price">
                      ¥<span v-if="subItem.price">{{
                        subItem.price.toFixed(2)
                      }}</span>
                    </p>
                    <van-row>
                      <van-col span="4"><img
                          class="merchant-logo"
                          :src="setImg(subItem.merchantLogo, { w: 20 })"
                        /></van-col>
                      <van-col
                        span="20"
                        class="merchant-name text-hidden"
                      >{{
                        subItem.merchantName
                      }}</van-col>
                    </van-row>
                  </div>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </template>
      <template v-if="item.id === '1006' && item.goodsVOList.length">
        <div class="group-goods card-block">
          <div class="block-header row-between">
            <div class="block-title">
              {{ item.moduleName }}
            </div>
            <nuxt-link
              class="more"
              :to="{ name: 'jewelry-product-groupGoods', query:{title: item.moduleName} }"
            >
              更多></nuxt-link>
          </div>
          <div class="goods">
            <van-row gutter="10">
              <van-col
                span="12"
                v-for="(subItem, subIndex) in item.goodsVOList"
                :key="subIndex"
                @click.native="toGoodsDetail(subItem.id)"
              >
                <div class="goods-item">
                  <span class="discount">{{ subItem.discount
                    }}<i style="margin-left: 4px;font-size: 13px;">折</i></span>
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
                    <h4 class="card-title text-hidden">
                      {{ subItem.goodsName }}
                    </h4>
                    <p
                      class="price"
                      v-if="subItem.groupPrice"
                    >
                      ¥{{ subItem.groupPrice.toFixed(2) }}
                      <del v-if="subItem.price">¥{{ subItem.price.toFixed(2) }}</del>
                    </p>
                    <van-row>
                      <van-col span="4"><img
                          class="merchant-logo"
                          :src="setImg(subItem.merchantLogo, { w: 20 })"
                        /></van-col>
                      <van-col
                        span="20"
                        class="merchant-name text-hidden"
                      >{{
                        subItem.merchantName
                      }}</van-col>
                    </van-row>
                  </div>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </template>
      <template v-if="item.id === '1007' && item.merchantVOList.length">
        <div class="brand-goods card-block">
          <div class="block-header row-between">
            <div class="block-title">
              {{ item.moduleName }}
            </div>
            <nuxt-link
              class="more"
              :to="{ name: 'jewelry-list' }"
            >
              更多></nuxt-link>
          </div>
          <div
            class="brand-item"
            v-for="(subItem, subIndex) in item.merchantVOList"
            :key="subIndex"
          >
            <div
              class="shop-box"
              @click="toShopDetail(subItem.id)"
            >
              <div
                class="shop-img lazy-img-box"
                v-lazy:background-image="
                  setImg(subItem.merchantPic, { w: 400 })
                "
              ></div>
              <div class="shop-info tc">
                <h4 class="text-hidden">{{ subItem.merchantName }}</h4>
                <p class="text-hidden">{{ subItem.recommendDetail }}</p>
                <van-button
                  class="shop-btn"
                  round
                  color="#FB746E"
                >进店逛逛 ></van-button>
              </div>
            </div>
            <div class="shop-goods">
              <div
                class="goods-item"
                v-for="(goodsItem, goodsIndex) in subItem.goodsVOList"
                :key="goodsIndex"
                @click="toGoodsDetail(goodsItem.id)"
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
                  <h4 class="price">￥{{ goodsItem.price }}</h4>
                  <p class="title text-hidden">{{ goodsItem.goodsName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div
        v-if="advertiseList[index] && advertiseList[index].mobilePicture"
        class="poster-img lazy-img-box"
        v-lazy:background-image="
          setImg(advertiseList[index].mobilePicture, { w: 400 })
        "
        @click="toBannerUrl(advertiseList[index])"
      ></div>
    </div>

    <div class="tabs card-block">
      <van-tabs
        v-model="active"
        swipeable
        sticky
        :swipe-threshold="5"
        :offset-top="offsetTop"
      >
        <van-tab
          v-for="(tab, index) in tabs"
          :title="tab.catName"
          :key="index"
        >
          <div
            class="tab-title"
            slot="title"
            @click="tabClick(tab)"
          >
            {{ tab.catName }}
          </div>
          <template v-if="categoryId">
            <GoodsList
              :categoryId="categoryId"
              :entrance="2"
              type="home"
            />
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </AppView>
</template>
<script>
import HeaderModule from "../modules/header";
import TabsModule from "../modules/tabs";
import GoodsList from "../product";
import { setImg } from "~/utils/qiniu";
import sticky from "~/components/common/sticky";
export default {
  head() {
    return {
      title: "去哪儿买"
    };
  },
  data() {
    return {
      data: {},
      active: 0,
      tabs: [],
      categoryId: "",
      titleShow: false,
      offsetTop: 0,
      bannerList: [],
      advertiseList: [],
      moduleList: [],
      zoneList: [],
      promoteList: [],
      timeOut: []
    };
  },
  beforeMount() {
    // this.getJewelryHome()
    this.$service("jewelryCategoriesSecondHot").then(data => {
      this.tabs = this.tabs.concat(data.data);
      this.categoryId = this.tabs[0].id;
    });
  },
  // updated() {
  //   if (this.$native.isApp()) {
  //     this.$native.getTitle('去哪儿买')
  //   }
  // },
  activated() {
    // if (this.$native.isApp()) {
    //   this.$native.getTitle('去哪儿买')
    // }
    this.getJewelryHome();
    if (
      !this.$native.isApp() &&
      !window.navigator.userAgent.includes("MicroMessenger")
    ) {
      this.titleShow = true;
      this.$nextTick(() => {
        this.offsetTop = this.$refs.header.$el.offsetHeight;
      })
    }
  },
  deactivated() {
    this.$destroy();
  },
  beforeDestroy() {
    this.timeOut.map(item => {
      item && clearInterval(item);
    });
  },
  methods: {
    setImg,
    getJewelryHome() {
      if (localStorage.getItem("jewelryHome")) {
        this.setJewelryHome(JSON.parse(localStorage.getItem("jewelryHome")));
      }
      this.$service("getJewelryHome").then(result => {
        this.setJewelryHome(result.data);
        localStorage.setItem("jewelryHome", JSON.stringify(result.data));
      });
    },
    setJewelryHome(data) {
      // console.log(data)
      this.bannerList = data.banner;
      this.moduleList = data.homeModule;
      this.zoneList = data.zone;
      let advertiseListTemp = data.advertise;
      advertiseListTemp.map((item, index) => {
        if (item.id) {
          this.advertiseList[item.position - 1] = item;
        }
      });
      // console.log(this.advertiseList)
      this.moduleList.map(item => {
        if (item.id === "1004") {
          this.promoteList = item.goodsVOList;
          this.promoteList.map((goodsItem, goodsIndex) => {
            goodsItem.countDown = goodsItem.endTime;
            this.getCountDown(goodsItem.endTime, goodsIndex);
          });
        }
      });
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
    back() {
      if (this.$native.isApp()) {
        this.$native.goToHome();
      } else {
        this.$router.go(-1);
      }
    },
    tabClick(item) {
      this.categoryId = item.id;
    },
    toGoodsList(zoneId) {
      this.$router.push({
        name: "jewelry-product",
        query: { zoneId, entrance: 1 }
      });
    },
    toGoodsDetail(id) {
      this.$router.push({ name: "jewelry-work", query: { id } });
    },
    toShopDetail(id) {
      this.$router.push({ name: "jewelry-detail", query: { id } });
    },
    toBannerUrl(data) {
      if (data.linkType === 1) {
        this.$router.push({
          name: "jewelry-work",
          query: {
            id: data.linkTypeId
          }
        });
      } else if (data.linkType === 2) {
        this.$router.push({
          name: "jewelry-detail",
          query: {
            id: data.linkTypeId
          }
        });
      } else if (data.linkType === 3) {
        this.$router.push({
          name: "jewelryCircle-detail",
          query: {
            id: data.linkTypeId
          }
        });
      } else if (data.linkType === 4) {
        this.$router.push({
          name: "jewelryCircle-weMidea",
          query: {
            id: data.linkTypeId
          }
        });
      } else if (data.mobileUrl) {
        location.href = data.mobileUrl;
      }
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
  },
  components: {
    HeaderModule,
    TabsModule,
    GoodsList,
    sticky
  }
};
</script>

<style lang="postcss" scoped>
.home {
  background-color: var(--light-gray);
}
.jewelry-index {
  & .list {
    margin-top: 15px;
    padding-bottom: 15px;
    & .head-title {
      padding: 0 20px;
      & h3 {
        color: #333333;
      }
      & .more {
        color: #999999;
        font-size: 12px;
      }
    }
  }
  & .margin {
    margin-bottom: 10px;
  }
  & .banner {
    position: relative;
    height: 175px;
    /*margin-top: 45px;*/
    & .background {
      height: 100%;
      width: 100%;
    }
  }
  & .promotion {
    & > div {
      padding: 0 10px;
    }
  }
}
.card-block {
  padding: 0 10px;
  background: #fff;
  margin: 10px;
  border-radius: 5px;
  &.tabs {
    padding: 0;
  }
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
.special-area {
  padding: 10px 0 0 !important;
  text-align: center;
  font-size: 12px;
  color: #666666;
  & .item-area {
    padding-top: 5px;
    & img {
      width: 40px;
    }
    & p {
      margin: 9px 0 15px;
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
.new-goods {
  padding-bottom: 10px;
  & .goods-item {
    overflow: hidden;
    margin-bottom: 6px;
    background: #f5f5f5;
    border-radius: 2px;
    & .card-img {
      width: 100%;
      height: 108px;
    }
    & .card-img-icon {
      height: 100%;
      background-size: 100% 100%;
    }
    & .card-info {
      padding: 8px 5px;
      font-size: 12px;
      color: #666666;
    }
    & .price {
      line-height: 26px;
      color: #d57e6a;
    }
    & .merchant-logo {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      vertical-align: middle;
      overflow: hidden;
    }
    & .merchant-name {
      padding-left: 6px;
      font-size: 10px;
    }
  }
}
.group-goods {
  padding-bottom: 10px;
  & .goods-item {
    overflow: hidden;
    margin-bottom: 6px;
    border-radius: 5px;
    position: relative;
    & .discount {
      position: absolute;
      top: 15px;
      right: 0;
      width: 51px;
      height: 20px;
      font-size: 13px;
      text-align: center;
      line-height: 20px;
      color: #ffffff;
      background: #fb746e;
      /* background: url("../../../assets/images/discount_bg.png"); */
      z-index: 1;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    & .card-img {
      width: 100%;
      height: 162px;
    }
    & .card-img-icon {
      height: 100%;
      background-size: 100% 100%;
    }
    & .card-info {
      padding: 8px 5px;
      font-size: 12px;
      color: #666666;
    }
    & .price {
      line-height: 26px;
      color: #d57e6a;
      & del {
        font-size: 11px;
        color: #cccccc;
      }
    }
    & .merchant-logo {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      vertical-align: middle;
      overflow: hidden;
    }
    & .merchant-name {
      font-size: 10px;
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
      & .price {
        margin: 6px 0;
        color: #fb746e;
        font-size: 14px;
      }
      & .title {
        font-size: 12px;
        color: #666666;
      }
    }
  }
}
.poster-img {
  width: 355px;
  height: 85px;
  margin: 15px 10px;
  border-radius: 10px;
  background-color: var(--light-gray);
}
h2.subtitle {
  line-height: 40px;
  padding: 10px 10px 0;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  font-weight: 600;
  & span:first-child {
    font-weight: bold;
  }
  & span:last-child {
    color: #999;
    font-size: 14px;
    font-weight: 400;
  }
  & i:before {
    font-size: 10px;
  }
}
>>> .tab-title {
  overflow: hidden;
  text-overflow: ellipsis;
}
/*/deep/ .van-tabs__wrap{
	position: fixed;
	z-index: 99;
}
/deep/ .van-tab.van-tab--active{
	color: var(--black);
	font-size: 15px;
	font-weight: bold;
}
/deep/ .van-tabs__line{
	background-color: var(--red);
}
.tabs /deep/ .goods-list-search{
	top: 90px;
}
.tabs /deep/ .app-filter-item .item-main{
	top: 90px;
	height: calc(100vh - 90px);
}
.tabs /deep/ .app-filter-item .item-main .item-main-wrapper{
	height: calc(100vh - 90px);
}*/
</style>
