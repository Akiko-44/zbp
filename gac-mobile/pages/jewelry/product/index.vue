<template>
  <AppView
    class="Base-goods-list"
    :title="title"
  >
    <div
      class="goods-list-search"
      :class="{'h5Class' : inH5}"
      v-if="!type"
    >
      <AppFilter>
        <div
          class="app-filter-item"
          @click="synthesis"
          :class="query.goodsSort === 0 ? 'sort' : ''"
        >
          <div class="item-name">
            综合排序
          </div>
        </div>
        <div
          class="app-filter-item"
          @click="isBySalesCount"
          :class="query.goodsSort === 1 ? 'sort' : ''"
        >
          <div class="item-name">
            销量优先
            <!-- <i class="ico-down"></i> -->
          </div>
        </div>
        <div
          class="app-filter-item price-filter-item"
          @click="isByPrice"
        >
          <div class="item-name">
            价格
            <!-- <i class="ico-down"></i> -->
            <img
              v-if="query.goodsSort === 3"
              src="../../../assets/images/arrow-up.png"
              alt=""
            >
            <img
              v-else-if="query.goodsSort === 4"
              src="../../../assets/images/arrow-down.png"
              alt=""
            >
            <img
              v-else
              src="../../../assets/images/arrow-default.png"
              alt=""
            >
          </div>
        </div>
        <AppFilterItem
          name="筛选"
          :data="filterObj"
          :categoryId="categoryId"
          :styleId="styleId"
          :fromWherebuy="paramsFromWherebuy"
          @confirm="confirm"
        />
      </AppFilter>
    </div>
    <AppList
      :query="query"
      :postData="postData"
      :getData="() => this.$service('getGoodsResultFilter', { data: this.query, params: this.postData })"
      ref="list"
      :class="{'goods-list' : !type}"
    >
      <template slot-scope="{ list }">
        <van-row gutter="10">
          <van-col
            span="12"
            v-for="(item, i) in list"
            :key="i"
            class="goods-item"
          >
            <AppCard
              :imgUrl="item.goodsPic"
              :appBigIcon="item.appBigIcon"
              :discount="item.discount"
              :lowPrice="item.lowPrice ? item.lowPrice : 0"
              :hightPrice="item.hightPrice ? item.hightPrice : 0"
              :navLowPrice="item.navLowPrice ? item.navLowPrice : 0"
              :navHightPrice="item.navHightPrice ? item.navHightPrice : 0"
              :title="item.goodsName"
              :merchantName="item.merchantName"
              :merchantLogo="item.merchantPic"
              :catName="item.catName"
              @click.native="goToNextPage(item.goodsId)"
            />
          </van-col>
        </van-row>
      </template>
    </AppList>
  </AppView>
</template>

<script>
import AppFilter from '~/components/common/filterMulti'
import AppFilterItem from '~/components/common/filterMulti/item'
import AppCard from '~/components/common/card/item1'
import AppList from './list'

export default {
  props: {
    categoryId: {
      type: [String, Number]
    },
    styleId: {
      type: [String, Number]
    },
    zoneId: {
      type: [String, Number]
    },
    fromWherebuy: {
      type: [String, Number]
    },
    entrance: {
      type: [String, Number]
    },
    type: {
      type: [String, Number]
    }
  },
  components: {
    AppFilter,
    AppFilterItem,
    AppCard,
    AppList
  },
  head() {
    return {
      title: '商品列表'
    }
  },
  data() {
    if (this.$data) return
    return {
      title: '',
      filter: {},
      filterObj: {},
      postData: {
        offset: 1,
        limit: 20
      },
      query: {
        goodsSort: 0,
        lowPrice: undefined,
        hightPrice: undefined,
        brandId: undefined,
        styleId: this.styleId,
        categoryId: this.categoryId,
        searchWord: undefined,
        provice: undefined,
        city: undefined,
        entrance: this.$route.query.entrance || 1,
        zoneId: this.$route.query.zoneId,
        gram: undefined,
        chainLength: undefined,
        circle: undefined,
        diameter: undefined,
        weight: undefined
      },
      bySale: false,
      byPrice: false,
      inH5: false,
      paramsFromWherebuy: ''
    }
  },
  computed: {

  },
  mounted() {
    this.paramsFromWherebuy = this.$route.query.fromWherebuy ? this.$route.query.fromWherebuy : this.fromWherebuy
    this.query.entrance = this.fromWherebuy || this.entrance
    if (!this.type) {
      this.getFilterList()
    }
  },
  activated() {
    this.query.searchWord = decodeURIComponent(this.$route.query.searchWord) == 'undefined' ? '' : decodeURIComponent(this.$route.query.searchWord)
    this.query.entrance = this.fromWherebuy || this.entrance
    if (!this.type) {
      this.getFilterList()
    }
    if (!this.query.categoryId) {
      this.query.categoryId = decodeURIComponent(this.$route.query.categoryId) == 'undefined' ? '' : decodeURIComponent(this.$route.query.categoryId)
      this.filter.categoryId = this.query.categoryId
    }
    if (!this.$native.isApp() && (this.$route.name === 'jewelry-product' || this.$route.name === 'jewelry-index') && !window.navigator.userAgent.includes('MicroMessenger')) {
      this.title = '商品列表'
      this.inH5 = true
    }
    if (this.$native.isApp()) {
      this.$native.getTitle('商品列表')
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    synthesis() {
      this.query.goodsSort = 0
      this.getList()
    },
    isBySalesCount() {
      this.bySale = !this.bySale
      // if (this.bySale) {
      //   this.query.goodsSort = 2
      // } else {
      //   this.query.goodsSort = 1
      // }
      this.query.goodsSort = 1
      this.getList()
    },
    isByPrice() {
      this.byPrice = !this.byPrice
      if (this.byPrice) {
        this.query.goodsSort = 3
      } else {
        this.query.goodsSort = 4
      }
      this.getList()
    },
    clearSearch() {
      this.query.searchWord = undefined
      this.getList()
    },
    searchByWord(e) {
      if (e.currentTarget.value) {
        this.getList()
      }
    },
    confirm(data) {
      this.query.lowPrice = data.lowPrice
      this.query.hightPrice = data.hightPrice
      this.query.provice = data.provice
      this.query.city = data.city
      this.query.goodsSort = data.goodsSort
      this.query.gram = data.gram
      this.query.chainLength = data.chainLength
      this.query.circle = data.circle
      this.query.diameter = data.diameter
      this.query.weight = data.weight
      data.brandId ? this.query.brandId = data.brandId : this.query.brandId = undefined
      data.styleId ? this.query.styleId = data.styleId : this.query.styleId = undefined
      data.categoryId ? this.query.categoryId = data.categoryId : this.query.categoryId = undefined
      this.getFilterList()
      this.getList()
    },
    getList() {
      this.query.offset = 1
      this.$refs.list.onRefresh()
    },
    getFilterList() {
      this.query.entrance = this.query.entrance || this.$route.query.entrance
      this.$service('getGoodsFilter', { data: this.query }).then(result => {
        this.filterObj = result.data
      })
    },
    goToNextPage(id) {
      if (this.$native.isApp()) {
        let data = {}
        data.url = 'jewelry/work?id=' + id
        data.type = 1
        this.$native.goToNextPage(data)
      } else {
        this.$router.push({
          path: '/jewelry/work',
          query: {
            id: id
          }
        })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../../../assets/css/swap/goodsList.css";
.goods-list {
  padding-top: 37px;
}
.goods-list-search {
  position: absolute;
  height: 37px;
  width: 100%;
  z-index: 1;
  &.h5Class {
    top: 46px;
  }
  & .app-goods-list-search {
    position: absolute;
    top: 0;
    width: 100%;
    & .search-main {
      padding: 8px 80px 8px 20px;
      & .app-search {
        position: relative;
        width: 100%;
        background: white;
        box-sizing: border-box;
        & input {
          display: block;
          width: 100%;
          line-height: normal;
          margin: 0;
          padding: 6px 10px 8px 25px;
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
          display: flex;
        }
      }
    }
  }
  & .price-filter-item {
    & img {
      width: 8px;
    }
  }
  & .sort {
    color: #d5735a;
    & .ico-down {
      transform: rotate(180deg);
      transform-origin: 50% 36%;
    }
  }
}
.btn-search-cancel {
  display: inline-block;
  width: 53px;
  height: 28px;
  line-height: 28px;
  background: #d57e6a;
  color: #fefefe;
  vertical-align: middle;
  border-radius: 14px;
  font-size: 12px;
}
</style>
