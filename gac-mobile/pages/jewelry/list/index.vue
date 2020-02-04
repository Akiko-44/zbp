<template>
  <AppView
    class="Base-goods-list"
    title='商家列表'
  >
    <div
      class="goods-list-search"
      :class="{'h5Class' : inH5}"
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
          :class="query.goodsSort === 1?'sort':''"
        >
          <div class="item-name">
            销量优先
            <!-- <i class="ico-down"></i> -->
          </div>
        </div>
        <AppFilterItem
          name="筛选"
          :data="filter"
          @confirm="confirm"
        />
      </AppFilter>
    </div>
    <AppList
      :query="query"
      :postData="postData"
      :getData="() => this.$service('jewelryMerchant', { data: this.query, params: this.postData })"
      ref="list"
    >
      <template slot-scope="{ list }">
        <Card
          v-for="(item, index) in list"
          :key="index"
          :data="{
          	id: item.merchantId,
          	logo: item.backgroundImg ? item.backgroundImg : item.merchantLogo,
            fansNum: item.fansNum,
            name: item.merchantName,
            sellCount: item.sellingNum,
            skilld: item.skilld,
            merchantCategoryList: item.merchantCategoryList,
            merchantAddr: item.merchantAddr
          }"
        />
      </template>
    </AppList>
  </AppView>
</template>

<script>
import AppFilter from './filter'
import AppFilterItem from './filter/item'
import Card from '~/components/dm/card/item4'
import AppList from '~/components/common/list'

export default {
  components: {
    AppFilter,
    AppFilterItem,
    Card,
    AppList
  },
  head() {
    return {
      title: '商家列表'
    }
  },
  data() {
    if (this.$data) return
    return {
      filter: {},
      postData: {
        offset: 1,
        limit: 20,
      },
      query: {
        goodsSort: 0,
        brandId: undefined,
        categoryId: undefined,
        provice: undefined,
        city: undefined
      },
      bySale: false,
      inH5: true,
    }
  },
  computed: {

  },
  mounted() {

  },
  beforeMount() {
    this.$loading(this.$service('jewelryShowBrand', {}))
      .then(result => {
        this.filter.brand = result.data
      })
    this.$loading(this.$service('jewelryCategories', {}))
      .then(result => {
        this.filter.category = result.data
      })
    if (this.$native.isApp()) {
      this.$native.getTitle('商家列表')
    }
    //	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.$nextTick(() => {
        this.inH5 = false
      })
    }
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
    confirm(data) {
      this.query.provice = data.provice
      this.query.city = data.city
      this.query.goodsSort = data.goodsSort
      data.brandId ? this.query.brandId = data.brandId : this.query.brandId = undefined
      data.categoryId ? this.query.categoryId = data.categoryId : this.query.categoryId = undefined
      if (this.query.provice || this.query.city) {
        this.query.goodsSort = undefined
      }
      this.getList()
    },
    getList() {
      this.query.offset = 1
      this.$refs.list.onRefresh()
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../../../assets/css/swap/goodsList.css";
.list {
  padding-top: 37px;
}
.goods-list-search {
  /*position: fixed;*/
  position: absolute;
  height: 37px;
  width: 100%;
  top: 0;
  z-index: 98;
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
