<template>
  <AppView class="Info"
           title="售后列表">
    <!-- <van-tabs @click="click"
              v-model="active">
      <van-tab v-for="(tab, index) in tabs"
               :title="tab.name"
               :key="index">
        <div class="tab-content"> -->
    <AppList name="userOrderRefund"
             :query="{ offset: 1, limit: 20 }"
             ref="list">
      <template slot-scope="{ list }">
        <OrderItem v-for="(item, i) in list"
                   :key="i"
                   :ids="item.id"
                   :data="{
              	id: item.id,
                sellUserId: item.sellUserId,
              	img: item.revoList[0].skuMainPic,
                revoList: item.revoList,
                barLeftText: '订单编号：' + item.orderNumber,
                barRightText: orderState[item.state],
                refundAmount: '￥' + item.refundAmount,
                freightMoney: item.freightMoney,
                auditState: item.auditState,
                refundType: item.refundType,
                revokeState: item.revokeState,
                orderNumber: item.orderNumber,
                delayedReceipt: item.delayedReceipt,
                isCommented: item.isCommented
              }" />
      </template>
    </AppList>
    <!-- </div>
      </van-tab>
    </van-tabs> -->
  </AppView>
</template>

<script>
import { tabsList } from '~/utils/mixins'
import { orderState } from '~/utils/status'
import AppList from '~/components/common/list'
import OrderItem from '~/components/common/order/refundItem'

export default {
  components: {
    AppList,
    OrderItem
  },
  mixins: [tabsList],
  middleware: 'auth',
  async beforeMount() {
    await this.$store.dispatch('user/checkLogin', this.$router)
  },
  deactivated() {
    this.$destroy()
  },
  data() {
    return {
      orderState,
      type: this.$route.query.type,
      active: 0,
      tabs: [
        { name: '全部订单', state: 0 },
        //      {name: '待付款', state: 1},
        { name: '待发货', state: 4 },
        { name: '待收货', state: 5 },
        { name: '待评价', state: 6 }
      ]
    }
  },
  created() {
    this.active = this.$route.query.tabIndex || 0
  },
  methods: {
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    click(index) {
      this.$router.replace({
        name: 'user-mine-double-list',
        query: {
          type: this.type,
          tabIndex: index
        }
      })
//    this.removeEvent(index)
    },
    toOrderDetail(item) {
      this.$router.push({ name: 'swap-order-detail', query: { id: item.id, orderNumber: item.orderNumber, state: item.state, type: this.type, img: item.orderGoodVOList[0].skuMainPic } })
    },
    remove() { }
  }
}
</script>

<style lang="postcss" scoped>
.Info {
  min-height: 100%;
  & .tab-content {
    margin-top: 3px;
  }
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
}
</style>
