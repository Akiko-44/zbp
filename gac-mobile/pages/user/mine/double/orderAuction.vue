<template>
<AppView class="Info" :title="title">
  <van-tabs
    sticky
    @click="click"
  >
    <van-tab v-for="(tab, index) in tabs" :title="tab.name" :key="index">
      <div class="tab-content">
        <AppList
          name="orderAuctionPage"
          :query="{ offset: 1, limit: 20, state: tab.state }"
          :ref="'list' + index"
        >
          <template slot-scope="{ list }">
            <OrderItem
              v-for="(item, i) in list"
              :key="i"
              :ids="item.id"
              :data="{
                goodsList: item.orderGoodVOList,
                barLeftText: '订单编号：' + item.orderNumber,
                barRightText: orderState[item.state],
                price: '￥' + item.payMoney,
                freightMoney: item.freightMoney,
                state: item.state
              }"
              @click.native="$router.push({name:'swap-order-details', query: {id: item.id,orderNumber:item.orderNumber,state:item.state,img:item.orderGoodVOList[0].skuMainPic}})"
            />
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
import OrderItem from '~/components/common/order/operation'

export default {
	data(){
		return {

		}
	},
  components: {
    AppList,
    OrderItem
  },
  mixins: [tabsList],
  middleware: 'auth',
  async beforeMount () {
    await this.$store.dispatch('user/checkLogin', this.$router)
  },
  deactivated () {
    this.$destroy()
  },
  data () {
    return {
      orderState,
      type: this.$route.query.type,
      titleMap: {
        2: '购买订单',
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
      this.removeEvent(index)
    },
    remove () {}
  }
}
</script>
