<template>
<AppView class="Info" title="收藏管理">
  <van-tabs
    sticky
    @click="click"
  >
    <van-tab v-for="(tab, index) in tabs" :title="tab.name" :key="index">
      <div class="tab-content">
        <AppList
          name="swapUserSalesList"
          :query="{ offset: 1, limit: 20 }"
          :ref="'list' + index"
        >
          <template slot-scope="{ list }">
            <AppCard
              v-for="(item, i) in list"
              class="app-collect-item"
              :key="i"
              :data="{
                imgUrl: item.imgUrl,
                name: '',
                price: '￥' + item.price,
                keyword: '',
                describe: item.categoryName + ' ' + item.brandName + ' ' + item.deprecition + '成新',
                title: item.goodsName,
                important: '',
              }"
            >
              <template slot="btns">
                <button @click="remove" class="card-actions-btn van-hairline--surround">删除</button>
              </template>
            </AppCard>
          </template>
        </AppList>
      </div>
    </van-tab>
  </van-tabs>
</AppView>
</template>

<style lang="postcss" scoped>
.Info {
  min-height: 100%;
  background-color: var(--light-gray);
  & .tab-content {
    margin-top: 3px;
  }
  & .app-collect-item {
    margin-top: 10px;
  }
}
</style>

<script>
import { tabsList } from '~/utils/mixins'
import AppList from '~/components/common/list'
import AppCard from '~/components/common/card/item3'

export default {
  components: {
    AppList,
    AppCard
  },
  mixins: [tabsList],
  middleware: 'auth',
  beforeMount () {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  data () {
    return {
      tabs: [{name: '销售'}, {name: '互换'}, {name: '拍卖'}, {name: '回收'}]
    }
  },
  methods: {
    click (index) {
//    this.removeEvent(index)
    },
    remove () {}
  }
}
</script>
