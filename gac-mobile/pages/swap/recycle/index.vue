<template>
  <AppView class="Base-goods-list">
    <div class="list-header-wrap">
      <div class="list-header">
        <AppHeaderSearch />
        <AppFilter>
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
      :getData="() => this.$service('swapRecycleList', { data: this.query })"
      ref="list"
    >
      <template slot-scope="{ list }">
        <van-row gutter="10">
          <van-col span="12" v-for="(item, i) in list" :key="i">
            <AppCard
              :imgUrl="item.imgUrl | setImg"
              :price="''"
              :info="''"
              :describe="item.cityName + ' · ' + item.userName"
              :title="item.recycleName"
              @click.native="$router.push({ name: 'swap-recycle-detail', query: { id: item.id } })"
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
      query: {
        offset: 1,
        limit: 20,
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
    this.$store.commit('swap/set', { name: 'searchType', data: 3 })
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
