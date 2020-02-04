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
            name="品牌"
            :data="brands"
            :props="{ label: 'brandName', value: 'id' }"
            v-model="query.brandId"
            @confirm="confirm"
          />
          <AppFilterItem
            name="分类"
            :data="categories"
            :props="{ label: 'catName', value: 'id' }"
            v-model="query.categoryId"
            @confirm="confirm"
          />
        </AppFilter>
      </div>
    </div>
    <AppList
      :query="query"
      :getData="() => this.$service('swapGoodsList', { data: this.query })"
      ref="list"
    >
      <template slot-scope="{ list }">
        <van-row gutter="10">
          <van-col span="12" v-for="(item, i) in list" :key="i">
            <AppCard
              :imgUrl="item.imgUrl"
              :price="item.price"
              :describe="item.swapRemark || '-'"
              :title="item.goodsName"
              @click.native="$router.push({ name: 'swap-sales-detail', query: { id: item.id } })"
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
      query: {
        offset: 1,
        limit: 20,
        brandId: undefined,
        categoryId: undefined,
        deprecition: undefined,
        marketPrice: undefined,
        swapble: 2,
        search: '',
        searchWord: ''
      }
    }
  },
  computed: {
    categories () {
      return this.$store.state.data.swapCategories
    },
    brands () {
      return this.$store.state.data.swapBrands
    }
  },
  created () {
    this.$store.commit('swap/set', { name: 'searchType', data: 1 })
  },
  beforeMount () {
    this.$store.dispatch('data/get', {
      name: 'swapCategories',
      service: this.$service('swapCategories')
    })
    this.$store.dispatch('data/get', {
      name: 'swapBrands',
      service: this.$service('swapBrands')
    })
    this.query.search = decodeURIComponent(this.$route.query.search) == 'undefined' ? '':decodeURIComponent(this.$route.query.search)
    this.query.categoryId = decodeURIComponent(this.$route.query.searchWord) == 'undefined' ? '':decodeURIComponent(this.$route.query.searchWord)
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
