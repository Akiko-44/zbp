<template>
  <AppView
    class="tip"
    title="消息提示"
  >
    <van-tabs
      v-model="active"
      swipeable
    >

      <van-tab title="系统通知">
        <div class="tab-content">
          <AppList
            name="userMessage"
            ref="list"
          >
            <template slot-scope="{ list }">
              <div
                class="notice-box"
                v-for="(item, i) in list"
                :key="i"
                @click="toDetail(item,0)"
              >
                <p class="time">{{item.sendTime}}</p>
                <div class="notice-box-body">
                  <p class="title">{{item.title}}</p>
                  <p
                    class="info"
                    v-lazy-container="{ selector: 'img' }"
                    v-html="lazyImgHtml(item.content)"
                  ></p>
                </div>
              </div>
            </template>
          </AppList>
        </div>
      </van-tab>

      <van-tab title="订单提醒">
        <div class="tab-content">
          <AppList
            name="userOrderMes"
            :postData="{offset: 1, limit: 10}"
            ref="orderList"
          >
            <template slot-scope="{ list }">
              <div
                class="order-box"
                v-for="(item, i) in list"
                :key="i"
                @click="toDetail(item,1)"
              >
                <p class="time">{{item.createTime}}</p>
                <div class="order-box-body">

                  <!-- <img
                    :src="setImg(item.orderGoodVOList[0].skuMainPic, { w: 40 })"
                    alt=""
                  > -->
                  <p class="info">{{item.orderMessage}}</p>
                  <p class="title">{{item.goodsName}}</p>
                  <!-- <p
                    class="info"
                    v-if="item.state===5"
                  >您购买的{{item.orderGoodVOList[0].skuName}}已发货</p>
                  <p
                    class="info"
                    v-else-if="item.state===10"
                  >您购买的{{item.orderGoodVOList[0].skuName}}退款中</p>
                  <p
                    class="info"
                    v-else-if="item.state===11"
                  >您购买的{{item.orderGoodVOList[0].skuName}}已经退款成功了</p>
                  <p
                    class="info"
                    v-else-if="item.state===12"
                  >卖家{{item.sellUserName}}拒绝了您的退款申请</p> -->
                </div>
              </div>
            </template>
          </AppList>
        </div>
      </van-tab>
    </van-tabs>
  </AppView>
</template>

<script>
import AppList from '~/components/common/list'
import { orderState } from '~/utils/status'
import { setImg } from '~/utils/qiniu'
import { lazyImgHtml } from '~/utils/filters'

export default {
  components: {
    AppList
  },
  data() {
    return {
      orderState,
      active: 0
    }
  },
  async beforeMount() {
    await this.$store.dispatch('user/checkLogin', this.$router)
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setImg,
    lazyImgHtml,
    toDetail(item, index) {
      let data = {}
      // data.title = index === 0 ? item.title : this.orderState[item.state]
      data.time = item.createTime
      if (index === 0) {
        data.title = item.title
        data.content = item.content
        this.$router.push({
          name: 'user-tip-details',
          query: {
            data: JSON.stringify(data)
          }
        })
      } else {
        // data.title = this.orderState[item.orderState]
        // data.orderNumber = item.orderNumber
        // data.content = item.orderMessage
        // if (item.state === 5) {
        //   data.content = `<p>您购买的【${item.goodsName}】已发货</p>`
        // } else if (item.state === 10) {
        //   data.content = `<p>您购买的【${item.goodsName}】退款中</p>`
        // }
        // if (item.state === 11) {
        //   data.content = `<p>您购买的【${item.goodsName}】已经退款成功了</p>`
        // }
        // if (item.state === 12) {
        //   data.content = `<p>卖家【${item.sellUserName}】拒绝了您的退款申请</p>`
        // }
        const normalOrderStateList = [1, 2, 5, 6, 8]
        if (normalOrderStateList.includes(item.orderState)) {
          this.$router.push({ name: 'swap-order-detail', query: { orderNumber: item.orderNumber, type: item.type } })
        } else {
          this.$router.push({ name: 'user-orderRefund-detail', query: { id: item.refundOrderId } })
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  z-index: 99;
  width: 100%;
}

.notice-box {
  padding: 12px 38px 0;
  font-size: 12px;
  color: #666;
  & .time {
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  & .notice-box-body {
    padding: 17px 28px 20px 34px;
    background: #fff;
    border-radius: 10px;
    & .title {
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 1.5em;
      color: #333;
    }
    & .info {
      overflow: hidden;
      height: 40px;
      line-height: 20px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.order-box {
  padding: 12px 55px 0;
  font-size: 12px;
  color: #666;
  & .time {
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  & .order-box-body {
    position: relative;
    /* margin-left: 40px; */
    padding: 8px 13px 11px 21px;
    background: #fff;
    border-radius: 10px;
    & img {
      position: absolute;
      top: 0;
      left: -66px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    & .title {
      margin-bottom: 10px;
      line-height: 1.5em;
      font-size: 14px;
      color: #333;
    }
    & .info {
      overflow: hidden;
      height: 40px;
      line-height: 20px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.tab-content {
  margin-top: 46px;
}
</style>