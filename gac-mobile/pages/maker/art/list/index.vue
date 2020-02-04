<template>
  <AppView class="Base-goods-list"
           title="工艺列表">
    <AppFilter>
      <AppFilterTreeItem name="分类"
                         :data="categories"
                         v-model="query.primaryCgyId"
                         @confirm="confirm" />
      <AppFilterTreeItem name="地区"
                         :data="area"
                         v-model="query.city"
                         @navClick="navClick"
                         @confirm="confirm" />
    </AppFilter>
    <AppList name="makerCraftList"
             :query="query"
             :postData="postData"
             ref="list">
      <template slot-scope="{ list }">
        <!-- <Card v-for="(item, index) in list"
              :key="index"
              :data="{
	        	id: item.manuid,
	          logo: item.merLogo,
	          title: item.namuName,
	          info: item.province + ' ' + item.city,
	          imgs: item.caseList
	        }" /> -->
        <van-row gutter="10">
          <van-col span="12"
                   v-for="(item, i) in list"
                   :key="i">
            <Card5 class="margin"
                   :imgUrl="item.craftLogo"
                   :title="item.craftName"
                   @click.native="$router.push({ name: 'maker-art', query: { id: item.id } })" />
          </van-col>
        </van-row>
      </template>
    </AppList>
  </AppView>
</template>

<script>
import AppFilter from '~/components/common/filter'
import AppFilterItem from '~/components/common/filter/item'
import AppFilterTreeItem from '~/components/common/filter/treeItem'
import Card5 from '~/components/dm/card/item5'
import AppList from '~/components/common/list'
const cities = {}
export default {
  components: {
    AppFilter,
    AppFilterItem,
    AppFilterTreeItem,
    Card5,
    AppList
  },
  data() {
    if (this.$data) return
    return {
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
      commentDesc: [{
        name: '不限',
        value: ''
      }, {
        name: '从低到高',
        value: 0
      }, {
        name: '从高到低',
        value: 1
      }],
      params: {
        offset: 1,
        limit: 10
      },
      categories: [],
      area: [],
      postData: {
        offset: 1,
        limit: 10
      },
      query: {
        offset: 1,
        limit: 10,
        primaryCgyId: undefined,
        provice: '',
        city: ''
      }
    }
  },
  beforeMount() {
    // 获取类别
    this.$service('productCategoryList', { resources: [2] }).then(result => {
      this.categories = result.data
      this.categories.unshift({ text: '不限', id: '', children: [] })
      this.rename(this.categories)
    })
    // 获取省
    this.getData(0).then(data => {
      this.area = data
      this.area.unshift({ text: '不限', id: '不限', children: [] })
      this.rename(this.area)
    }).catch(() => { })
  },
  methods: {
    confirm() {
      this.query.provice = this.query.provice !== '不限' ? this.query.provice : ''
      this.query.city = (this.query.city !== '不限' && this.query.city !== this.query.provice) ? this.query.city : ''
      this.getList()
    },
    getList() {
      this.query.offset = 1
      this.$refs.list.onRefresh()
    },
    navClick(i) {
      this.query.provice = this.area[i].text
      this.query.city = ''
      if (this.query.provice !== '不限') {
        let parentId = this.area[i].regionId
        this.getData(parentId).then(data => {
          if (this.area[i].children.length < 2) {
            this.area[i].children.push(...data)
            this.rename(this.area)
            let arr = JSON.parse(JSON.stringify(this.area))
            this.area = arr
          }
        }).catch(() => { })
      }
    },
    reset() {
      this.query.primaryCgyId = undefined
      this.query.provice = ''
      this.query.city = ''
      this.query.commentNumDesc = ''
      this.query.orderNumDesc = ''
      this.getList()
    },
    getData(id) {
      return cities[id]
        ? Promise.resolve(cities[id])
        : this.$service('commonAddress', { resources: [id] }).then(result => {
          const data = result.data
          cities[id] = data
          return data
        })
    },
    // 前台属性名转换
    rename(list = []) {
      if (list.length > 0) {
        list.map(item => {
          item.text = item.text ? item.text : item.name ? item.name : item.regionName
          item.id = item.id || item.id === '' ? item.id : item.text
          if (item.children && item.children.length > 0) {
            this.rename(item.children)
            if (item.children[0].text !== '不限') {
              item.children.unshift({ text: '不限', id: item.id, children: [] })
            }
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
.margin {
  margin-bottom: 10px;
}
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
