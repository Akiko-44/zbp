<template>
  <AppView
    class="Base-goods-list"
    title="商品列表"
  >
    <AppFilter>
      <AppFilterItem
        name="综合排序"
        @click.native="reset"
      />
      <AppFilterTreeItem
        name="分类"
        :data="categories"
        v-model="query.categoryId"
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
        name="价格"
        :data="priceDesc"
        :props="{ label: 'name', value: 'value' }"
        v-model="query.priceDesc"
        @confirm="confirm"
      />
    </AppFilter>
    <AppList
      :query="query"
      :postData="postData"
      :getData="() => this.$service('designerProduct', { data: this.query, postData: this.postData })"
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
              :imgUrl="item.mainPic"
              :price="item.price"
              :title="item.caseName"
              :caseType="item.caseType"
              :designerName="item.designerName"
              :merchantLogo="item.merchantLogo"
              @click.native="$router.push({ name: 'maker-work', query: { id: item.caseId } })"
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
import AppFilterTreeItem from '~/components/common/filter/treeItem'
import AppCard from '~/components/common/card/item6'
import AppList from './list'

export default {
  components: {
    AppHeaderSearch,
    AppFilter,
    AppFilterItem,
    AppFilterTreeItem,
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
      price: [{
        name: '0-499',
        value: '0-499'
      }, {
        name: '500-999',
        value: '500-999'
      }, {
        name: '1000-4999',
        value: '1000-4999'
      }, {
        name: '5000-9999',
        value: '5000-9999'
      }, {
        name: '1万-5万',
        value: '10000-50000'
      }, {
        name: '5万-10万',
        value: '50000-100000'
      }, {
        name: '10万-50万',
        value: '100000-500000'
      }, {
        name: '50万-100万',
        value: '500000-1000000'
      }],
      saleDesc: [{
        name: '不限',
        value: ''
      }, {
        name: '从低到高',
        value: 0
      }, {
        name: '从高到低',
        value: 1
      }],
      priceDesc: [{
        name: '不限',
        value: ''
      }, {
        name: '从低到高',
        value: 0
      }, {
        name: '从高到低',
        value: 1
      }],
      categories: [],
      postData: {
        offset: 1,
        limit: 10,
      },
      query: {
        categoryId: undefined,
        designerId: undefined,
        fixedPrice: undefined,
        goodsSource: 6,
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
  mounted() {

  },
  beforeMount() {
    // 获取类别
    this.$service('productCategoryList', { resources: [1] }).then(result => {
      this.categories = result.data
      this.categories.unshift({ text: '不限', id: '', children: [] })
      this.rename(this.categories)
    })
  },
  methods: {
    confirm() {
      this.getList()
    },
    getList() {
      this.query.offset = 1
      this.$refs.list.onRefresh()
    },
    reset() {
      this.query.categoryId = undefined
      this.query.priceDesc = undefined
      this.query.saleDesc = undefined
      this.getList()
    },
    // 前台属性名转换
    rename(list = []) {
      if (list.length > 0) {
        list.map(item => {
          item.text = item.text ? item.text : item.name
          if (item.children && item.children.length > 0) {
            item.children.unshift({ text: '不限', id: item.id, children: [] })
            this.rename(item.children)
          } else {
            if (item.children) {
              item.children.unshift({ text: '不限', id: item.id })
            } else {
              item.children = []
              item.children.unshift({ text: '不限', id: item.id })
            }
          }
        })
      }
      return list
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../../../assets/css/swap/goodsList.css";
.app-filter {
  position: fixed;
  width: 100%;
  top: 46px;
}
.list {
  margin-top: 48px;
  padding: 0 10px;
}
</style>
