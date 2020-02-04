<template>
  <AppView class="Base-goods-list" title="商品列表">
    <AppFilter>
      <AppFilterItem
        name="价格"
        :data="price"
        :props="{ label: 'name', value: 'value' }"
        v-model="query.fixedPrice"
        @confirm="confirm"
      />
      <AppFilterItem
        name="销量"
        :data="saleDesc"
        :props="{ label: 'name', value: 'value' }"
        v-model="query.saleDesc"
        @confirm="confirm"
      />
      <AppFilterItem
        name="分类"
        :data="categories"
        :props="{ label: 'name', value: 'id' }"
        v-model="query.categoryId"
        @confirm="confirm"
      />
    </AppFilter>
    <!--<div class="list-header-wrap">
      <div class="list-header">
      	<AppHeaderSearch />
        
      </div>
    </div>-->
    <AppList
      :query="query"
      :postData="postData"
      :getData="() => this.$service('designerProduct', { data: this.query, postData: this.postData })"
      ref="list"
    >
      <template slot-scope="{ list }">
        <van-row gutter="10">
          <van-col span="12" v-for="(item, i) in list" :key="i">
            <AppCard
              :imgUrl="item.mainPic"
              :price="item.price"
              :title="item.caseName"
              :caseType="item.caseType"
              :designerName="item.designerName"
              :merchantLogo="item.merchantLogo"
              @click.native="$router.push({ name: 'design-work', query: { id: item.caseId } })"
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
import AppCard from '~/components/common/card/item6'
import AppList from './list'

export default {
  components: {
  	AppHeaderSearch,
    AppFilter,
    AppFilterItem,
    AppCard,
    AppList
  },
  head () {
    return {
      title: '商品列表'
    }
  },
  data () {
    if (this.$data) return
    return {
      price: [{
        name: '0-499',
        value: '0-499'
      }, {
        name: '500-999',
        value: '500-999'
      },{
        name: '1000-4999',
        value: '1000-4999'
      },{
        name: '5000-9999',
        value: '5000-9999'
      },{
        name: '1万-5万',
        value: '10000-50000'
      },{
        name: '5万-10万',
        value: '50000-100000'
      },{
        name: '10万-50万',
        value: '100000-500000'
      },{
        name: '50万-100万',
        value: '500000-1000000'
      }],
      saleDesc:[{
      	name: '从低到高',
      	value: 1
      },{
      	name: '从高到低',
      	value: 0
      }],
      categories:[],
      postData: {
      	offset: 1,
        limit: 10,
      },
      query: {
        categoryId: undefined,
        designerId: undefined,
        fixedPrice: undefined,
        goodsSource: 5,
        merchantId: undefined,
        priceDesc: undefined,
        saleDesc: undefined,
        search: '',
        searchWord: ''
      }
    }
  },
  computed: {
    
  },
  mounted(){
    
  },
  beforeMount () {
		this.$loading(this.$service('designerCategories',{}))
      .then(result => {
        this.categories = result.data
      })
    this.query.search = decodeURIComponent(this.$route.query.search) == 'undefined' ? '':decodeURIComponent(this.$route.query.search)
    this.query.categoryId = decodeURIComponent(this.$route.query.searchWord) == 'undefined' ? '':decodeURIComponent(this.$route.query.searchWord)
    if (this.$native.isApp()) {
    	this.$native.getTitle('商品列表')
    }
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
