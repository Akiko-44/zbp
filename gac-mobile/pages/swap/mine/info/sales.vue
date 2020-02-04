<template>
<AppView class="InfoSales">
	<AppHeader title="销售信息管理"/>
  <van-tabs
    sticky
    @click="click"
  >
    <van-tab v-for="(tab, index) in tabs" :title="tab.name" :key="index">
      <div class="tab-content">
        <AppList
          name="swapUserSalesList"
          :query="{ offset: 1, limit: 20, goodsStatus: tab.state }"
          :ref="'list' + index"
        >
          <template slot-scope="{ list }">
            <InfoItem
              v-for="(item, i) in list"
              :key="i"
              :data="{
                item: item,
                imgUrl: item.imgUrl,
                name: '',
                price: '￥' + item.price,
                keyword: '',
                describe: item.categoryName + ' ' + item.brandName + ' ' + item.deprecition + '成新',
                title: item.goodsName,
                important: '',
                to: {name: 'swap-release-general', query: {id: item.id, type: 2}},
                state: item.goodsStatus
              }"
            />
          </template>
        </AppList>
      </div>
    </van-tab>
  </van-tabs>
  <!--<van-button round type="danger" style="position: fixed;bottom: 5px;left: 50%;margin-left: -30px;"
  	@click="$router.push({ name: 'swap-release-general',query: { type:2 } })">添加</van-button>-->
</AppView>
</template>

<style lang="postcss">
.InfoSales {
  min-height: 100%;
  background-color: var(--light-gray);
  & .tab-content {
    margin-top: 3px;
  }
}
</style>

<script>
import AppHeader from '~/components/dm/navbar'
import { tabsList } from '~/utils/mixins'
import AppList from '~/components/common/list'
import InfoItem from '~/components/swap/infoItem'
import { goodsState } from '~/utils/status'

export default {
  components: {
  	AppHeader,
    AppList,
    InfoItem
  },
  mixins: [tabsList],
  middleware: 'auth',
  beforeMount () {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  data () {
    const tabs = []
    Object.keys(goodsState).forEach(key => {
      key = +key
      if (key <= 3) {
        tabs.push({ state: key, name: goodsState[key] })
      }
    })
    return {
      tabs
    }
  },
  methods: {
    click (index) {
//    this.removeEvent(index)
    }
  }
}
</script>
