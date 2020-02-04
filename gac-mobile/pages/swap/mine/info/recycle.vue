<template>
<AppView class="InfoRecycle" title="回收信息管理">
  <van-tabs
    sticky
    @click="click"
  >
    <van-tab v-for="(tab, index) in tabs" :title="tab.name" :key="index">
      <div class="tab-content">
        <AppList
          name="swapUserRecycleList"
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
                price: '',
                keyword: '',
                describe: item.provinceName + '' + item.cityName + ' ' + item.userName,
                title: item.recycleName,
                important: '',
                to: {name: 'swap-release-recycle', query: { id: item.id }},
                state: item.goodsStatus
              }"
            />
          </template>
        </AppList>
      </div>
    </van-tab>
  </van-tabs>
  <van-button round type="danger" style="position: fixed;bottom: 5px;left: 50%;margin-left: -30px;"
  	@click="$router.push({ name: 'swap-release-recycle' })">添加</van-button>
</AppView>
</template>

<style lang="postcss">
.InfoRecycle {
  min-height: 100%;
  background-color: var(--light-gray);
  & .tab-content {
    margin-top: 3px;
  }
}
</style>

<script>
import { tabsList } from '~/utils/mixins'
import AppList from '~/components/common/list'
import InfoItem from '~/components/swap/infoItem'
import { goodsState } from '~/utils/status'

export default {
  components: {
    AppList,
    InfoItem
  },
  mixins: [tabsList],
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
