<template>
  <AppView
    class="Base-goods-list"
    :title="title"
  >
    <AppList
      :query="query"
      :postData="postData"
      :getData="() => this.$service('promotionGoods', { data: this.query, params: this.postData })"
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
              :appBigIcon="item.appBigIcon"
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
import AppCard from '~/components/common/card/item1'
import AppList from './list'

export default {
  components: {
    AppCard,
    AppList
  },
  head() {
    return {
      title: this.title
    }
  },
  data() {
    if (this.$data) return
    return {
      title: '',
      postData: {
        offset: 1,
        limit: 20,
      },
      query: {

      }
    }
  },
  computed: {

  },
  mounted() {

  },
  activated() {
    this.title = this.$route.query.title || '限时促销'
    if (!this.$native.isApp() && this.$route.name === 'jewelry-product-promotionGoods') {
      this.title = this.title
    }
    if (this.$native.isApp()) {
      this.$native.getTitle(this.title)
    }
  },
  methods: {
    getList() {
      this.query.offset = 1
      this.$refs.list.onRefresh()
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
.list {
  padding-top: 10px;
}
.goods-list-search {
  /*position: fixed;*/
  position: absolute;
  height: 74px;
  width: 100%;
  top: 0;
  z-index: 500;
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
