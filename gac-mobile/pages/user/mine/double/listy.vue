<template>
<AppView class="Info" :title="launch==true ? '' : title">
  <van-tabs
    sticky
    @click="click"
  >
    <van-tab v-for="(tab, index) in tabs" :title="tab.name" :key="index">
      <div class="tab-content">
        <AppList
          name="orderSwapPage"
          :resources="[tab.state,type]"
          :query="{ offset: 1, limit: 20 }"
          :ref="'list' + index"
        >
          <template slot-scope="{ list }">
            <OrderItem
              v-for="(item, i) in list"
              :key="i"
              :ids="item.id"
              :data="{
                swapIn: [item.swapIn],
                swapOutList:item.swapOutList,
                swapinState:orderState[item.swapinState],
                swapoutState:orderState[item.swapoutState],
                barLeftText: '订单编号：' + item.orderNumber,
                state3:item.swapoutState,
                state2:item.state,
                freightMoney: type == 1?item.swapinCautionMoney:item.swapoutCautionMoney,
                state: item.swapinState
              }"
              
            />
            <!--@click.native="$router.push({name:'swap-order-details', query: {id: item.id,orderNumber:item.orderNumber,state:item.state}})"-->
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
}
</style>

<script>
import { tabsList } from '~/utils/mixins'
import { orderState } from '~/utils/status'
import AppList from '~/components/common/list'
import OrderItem from '~/components/common/order/newList'

export default {
  components: {
    AppList,
    OrderItem
  },
  mixins: [tabsList],
  middleware: 'auth',
  async beforeMount () {
    await this.$store.dispatch('user/checkLogin', this.$router)
    if(this.$route.query.launch){
      this.launch = true
    }
  },
  deactivated () {
    this.$destroy()
  },
  data () {
    return {
      orderState,
      type: this.$route.query.type,
      launch: false,
      titleMap: {
        2: '互换订单',
        1: '互换订单',
        3: '拍卖订单',
        4: '回收订单',
      },
      tabs: [
        {name: '全部订单', state: 0},
//      {name: '待付款', state: 1},
        {name: '待发货', state: 4},
        {name: '待收货', state: 5},
        {name: '待评价', state: 6}
      ]
    }
  },
  computed: {
    title () {
      return this.titleMap[this.$route.query.type]
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
