<template>
<AppView class="InfoAuction">
	<AppHeader title="拍卖信息管理"/>
  <van-tabs
    sticky
    @click="click"
  >
    <van-tab v-for="(tab, index) in tabs" :title="tab.name" :key="index">
      <div class="tab-content">
        <AppList
          name="swapUserAuctionList"
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
                name: item.goodsName,
                price: item.presentPrice ? (' 当前价: ￥' + item.presentPrice) : '',
                keyword: item.offerConut + '次出价',
                describe: item.categoryName + ' ' + item.brandName,
                title: '',
                important: '起拍价: ￥' + item.upsetPrice,
                to: {name: 'swap-release-auction', query: {id: item.id}},
                state: item.goodsStatus
              }"
            />
          </template>
        </AppList>
      </div>
    </van-tab>
  </van-tabs>
  <!--<van-button round type="danger" style="position: fixed;bottom: 5px;left: 50%;margin-left: -30px;"
  	@click="$router.push({ name: 'swap-release-auction' })">添加</van-button>-->
</AppView>
</template>

<style lang="postcss">
.InfoAuction {
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
    AppList,
    AppHeader,
    InfoItem
  },
  mixins: [tabsList],
  data () {
    const tabs = []
    Object.keys(goodsState).forEach(key => {
      key = +key
      if (key !== 4) {
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
