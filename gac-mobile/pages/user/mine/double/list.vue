<template>
  <AppView
    class="Info"
    :title="title"
    :clickLeft="clickLeft"
  >
    <!--<div class="app-nav-bar-span">
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="clickLeft"
      >
      </van-nav-bar>
    </div>-->
    <van-tabs
      :class="{ 'h5-list-tab': inH5 }"
      @click="click"
      v-model="active"
      :swipe-threshold="5"
    >
      <van-tab
        v-for="(tab, index) in tabs"
        :name="tab.state"
        :title="tab.name"
        :key="index"
      >
        <div class="tab-content">
          <AppList
            name="orderPage"
            :resources="[active, 0]"
            :query="{ offset: 1, limit: 20 }"
            :ref="'list' + index"
          >
            <template slot-scope="{ list }">
              <OrderItem
                v-for="(item, i) in list"
                :key="i"
                :ids="item.id"
                :data="{
                  id: item.id,
                  orderRefundId: item.orderRefundId,
                  img: item.orderGoodVOList[0].skuMainPic,
                  goodsList: item.orderGoodVOList,
                  barLeftText: '订单编号：' + item.orderNumber,
                  sellUserName: item.sellUserName,
                  sellUserId: item.sellUserId,
                  barRightText: orderState[item.state],
                  price: '￥' + item.payMoney,
                  freightMoney: item.freightMoney,
                  state: item.state,
                  revokeState: item.revokeState,
                  type: type,
                  orderNumber: item.orderNumber,
                  delayedReceipt: item.delayedReceipt,
                  isCommented: item.isCommented
                }"
                v-if="item.orderGoodVOList.length > 0"
              />
            </template>
          </AppList>
        </div>
      </van-tab>
    </van-tabs>
  </AppView>
</template>

<script>
import { tabsList } from "~/utils/mixins";
import { orderState } from "~/utils/status";
import AppList from "~/components/common/list";
import OrderItem from "~/components/common/order/item";

export default {
  components: {
    AppList,
    OrderItem
  },
  mixins: [tabsList],
  middleware: "auth",
  async beforeMount() {
    await this.$store.dispatch("user/checkLogin", this.$router);
  },
  deactivated() {
    this.$destroy();
  },
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      orderState,
      type: 2,
      titleMap: {
        2: "",
        // 1: '互换订单',
        1: "去哪儿买订单",
        3: "拍卖订单",
        4: "回收订单",
        5: "找设计师订单",
        6: "寻代工订单"
      },
      title: "订单列表",
      active: 0,
      tabs: [
        { name: "全部", state: 0 },
        { name: "待付款", state: 1 },
        { name: "待发货", state: 2 },
        { name: "待收货", state: 5 },
        { name: "待评价", state: 6 }
      ],
      inH5: true
    };
  },
  computed: {
    // title() {
    // return this.titleMap[this.type]
    // }
  },
  beforeMount() {
    this.type = +this.$route.query.type;
    this.active = +this.$route.query.tabIndex || 0;
    if (
      this.$native.isApp() ||
      window.navigator.userAgent.includes("MicroMessenger")
    ) {
      this.inH5 = false;
    }
    if (this.$native.isApp()) {
      this.$native.getTitle(this.title);
    }
  },
  methods: {
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome();
      } else {
        this.$router.go(-1);
      }
    },
    click(index) {
      this.$router.replace({
        name: "user-mine-double-list",
        query: {
          type: this.type,
          tabIndex: index
        }
      });
      //    this.removeEvent(index)
    },
    toOrderDetail(item) {
      this.$router.push({
        name: "swap-order-detail",
        query: {
          id: item.id,
          orderNumber: item.orderNumber,
          state: item.state,
          type: this.type,
          img: item.orderGoodVOList[0].skuMainPic
        }
      });
    },
    remove() { }
  }
};
</script>

<style lang="postcss" scoped>
.Info {
  min-height: 100%;
  & .tab-content {
    margin-top: 44px;
  }
}
>>> .van-tabs__nav {
  background: #f2f2f2;
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  &:after {
    border: 0;
  }
}
/deep/ .h5-list-tab .van-tabs__wrap {
  top: 46px;
}

/deep/ .van-tab span {
  line-height: 53px;
}
</style>
