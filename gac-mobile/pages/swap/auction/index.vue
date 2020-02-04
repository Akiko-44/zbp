<template>
  <AppView class="Base-goods-list">
    <div class="list-header-wrap">
      <div class="list-header">
        <AppHeaderSearch />
        <AppFilter>
          <AppFilterItem
            name="价格"
            :data="price"
            :props="{ label: 'name', value: 'value' }"
            v-model="query.marketPrice"
            @confirm="confirm"
          />
          <AppFilterItem
            name="分类"
            :data="categories"
            :props="{ label: 'catName', value: 'id' }"
            v-model="query.categoryId"
            @confirm="confirm"
          />
          <AppFilterItem
            name="拍卖状态"
            :data="status"
            :props="{label: 'name', value: 'value'}"
            v-model="query.goodsStatus"
            @confirm="confirm"
          />
        </AppFilter>
      </div>
    </div>
    <AppList
      :query="query"
      :getData="() => this.$service('swapAuctionList', { data: this.query })"
      ref="list"
    >
      <template slot-scope="{ list }">
        <van-row gutter="10">
          <van-col span="12" v-for="(item, i) in list" :key="i">
            <AppCard
              :imgUrl="item.imgUrl"
              :price="item.presentPrice"
              :info="item.offerConut + '次出价'"
              :describe="'结束时间: ' + item.auctionEndTime"
              :title="item.goodsName"
              @click.native="$router.push({ name: 'swap-auction-detail', query: { id: item.id } })"
            />
          </van-col>
        </van-row>
      </template>
    </AppList>
  </AppView>
</template>

<script>
import AppHeaderSearch from '~/components/swap/goodsList/search'
import AppFilter from '~/components/common/filter'
import AppFilterItem from '~/components/common/filter/item'
import AppCard from '~/components/common/card/item1'
import AppList from '~/components/common/list'

export default {
  components: {
    AppHeaderSearch,
    AppFilter,
    AppFilterItem,
    AppCard,
    AppList
  },
  data () {
    if (this.$data) return
    return {
      price: [{
        name: '从高到低',
        value: 0
      }, {
        name: '从低到高',
        value: 1
      }],
      status: [{
        value: 2,
        name: '即将开始'
      }, {
        value: 10,
        name: '拍卖中'
      }, {
        value: 11,
        name: '竞拍成功'
      }, {
        value: 12,
        name: '竞拍失败'
      }],
      sort: [],
      query: {
        offset: 1,
        limit: 20,
        marketPrice: undefined,
        categoryId: undefined
      }
    }
  },
  computed: {
    categories () {
      return this.$store.state.data.swapCategories
    }
  },
  created () {
    this.$store.commit('swap/set', { name: 'searchType', data: 2 })
  },
  beforeMount () {
    this.$store.dispatch('data/get', {
      name: 'swapCategories',
      service: this.$service('swapCategories')
    })
  },
  methods: {
    confirm () {
      this.getList()
    },
    getList () {
      this.query.offset = 1
      this.$refs.list.onRefresh()
    }
  }
}
</script>

<style lang="postcss">
@import "../../../assets/css/swap/goodsList.css";
</style>
