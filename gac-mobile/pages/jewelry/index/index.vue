<template>
  <AppView class="jewelry-index">
    <sticky
      class="sticky"
      v-if="titleShow"
    >
      <HeaderModule />
    </sticky>
    <div class="tabs">
      <van-tabs
        v-model="active"
        swipeable
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
          >{{ tab.catName }}</div>
          <template v-if="index == 0">
            <van-swipe class="banner">
              <van-swipe-item
                v-for="(item, index) in data.banner"
                :key="index"
              >
                <div
                  class="background lazy-img-box"
                  v-lazy:background-image="setImg(item.mobilePicture, { w: 800 })"
                  @click="toBannerUrl(item)"
                ></div>
              </van-swipe-item>
            </van-swipe>
            <div class="promotion">
              <h2 class="subtitle">
                <span>限时促销</span>
                <span @click="$router.push({name: 'jewelry-product-promotionGoods'})">更多
                  <van-icon name="arrow" /></span>
              </h2>
              <div>
                <van-row gutter="10">
                  <van-col
                    span="12"
                    v-for="(item, i) in data.promotion"
                    :key="i"
                  >
                    <AppCard
                      :imgUrl="item.goodsPic"
                      :lowPrice="item.lowPrice"
                      :hightPrice="item.hightPrice"
                      :navLowPrice="item.navLowPrice"
                      :navHightPrice="item.navHightPrice"
                      :title="item.goodsName"
                      :merchantName="item.merchantName"
                      :merchantLogo="item.backgroundImg ? item.backgroundImg : item.merchantPic"
                      :catName="item.catName"
                      @click.native="$router.push({name: 'jewelry-work', query: {id: item.goodsId}})"
                    />
                  </van-col>
                </van-row>
              </div>
            </div>
            <div class="hotBrands">
              <h2 class="subtitle">
                <span>热门品牌</span>
                <span @click="$router.push({name: 'jewelry-list'})">更多
                  <van-icon name="arrow" /></span>
              </h2>
              <div>
                <Card
                  v-for="(item, index) in data.brand"
                  :key="index"
                  :data="{
							          	id: item.merchantId,
							          	logo: item.backgroundImg ? item.backgroundImg : item.merchantPic,
							            name: item.merchantName,
							            sellCount: item.saleCount,
							            merchantAddr: item.province,
                          merchantCity: item.city,
							          }"
                />
              </div>
            </div>
          </template>
          <template v-else-if="index == 1">
            <GroupGoods />
          </template>
          <template v-else-if="index == 2">
            <PromotionGoods />
          </template>
          <template v-else>
            <GoodsList
              :categoryId="categoryId"
              :entrance="2"
            />
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </AppView>
</template>
<script>
import HeaderModule from '../modules/header'
import TabsModule from '../modules/tabs'
import GroupGoods from '../product/groupGoods'
import PromotionGoods from '../product/promotionGoods'
import GoodsList from '../product'
import { setImg } from '~/utils/qiniu'
import AppCard from '~/components/common/card/item1'
import Card from '~/components/dm/card/item4'
import sticky from '~/components/common/sticky'
export default {
  head() {
    return {
      title: '去哪儿买'
    }
  },
  data() {
    return {
      data: {},
      active: 0,
      tabs: [{
        id: 0,
        catName: '推荐'
      }, {
        id: 1,
        catName: '拼团'
      }, {
        id: 2,
        catName: '促销'
      }],
      categoryId: '',
      titleShow: false
      /*,{
        id: 1184,
        catName: '黄金'
      }, {
        id: 1185,
        catName: 'K金'
      }, {
        id: 1198,
        catName: '和田玉'
      },{
        id: 1176,
        catName: '珍珠'
      }, {
        id: 1188,
        catName: '白银'
      }*/
    }
  },
  beforeMount() {
    this.$service('whereBuy').then(result => {
      this.data = result.data
      this.data.brand.map(item => {
        if (item.city.includes(item.province)) {
          item.province = ''
        }
      })
    })
    this.$service('jewelryCategoriesSecondHot').then(data => {
      this.tabs = this.tabs.concat(data.data)
    })
    if (this.$native.isApp()) {
      this.$native.getTitle('去哪儿买')
    }

  },
  updated() {
    if (this.$native.isApp()) {
      this.$native.getTitle('去哪儿买')
    }
    //  this.$native.getTitle('去哪儿买')
  },
  activated() {
    if (!this.$native.isApp() && !window.navigator.userAgent.includes('MicroMessenger')) {
      this.titleShow = true
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setImg,
    back() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    tabClick(item) {
      this.categoryId = item.id
    },
    toBannerUrl(data) {
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
    }
  },
  components: {
    HeaderModule,
    TabsModule,
    GroupGoods,
    PromotionGoods,
    GoodsList,
    AppCard,
    Card,
    sticky
  }
}
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
