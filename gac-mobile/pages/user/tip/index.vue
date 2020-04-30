<template>
  <AppView
    class="tip"
    title="消息提示"
  >
    <van-tabs
      v-model="active"
      swipeable
      :border="false"
      :class="{'h5-tab' : inH5}"
    >

      <van-tab title="订单消息">
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

                  <i
                    class="isread"
                    v-if="item.buyUserRead == 1"
                  ></i>
                  <!-- <img
                    :src="setImg(item.orderGoodVOList[0].skuMainPic, { w: 40 })"
                    alt=""
                  > -->
                  <p class="info">{{item.orderMessage}}</p>
                  <div class="order-detail">
                    <img :src="item.pic" />
                    <div>
                      <p class="title">{{item.goodsName}}</p>
                      <p class="num">共{{item.goodsNum}}件商品</p>
                      <p class="price"><i>合计¥</i>{{item.totalPrice}}</p>
                      <button>查看订单</button>
                    </div>
                  </div>
                  <!-- <p class="title">{{item.goodsName}}</p> -->
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

      <van-tab title="系统消息">
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
                <!-- <p class="time">{{item.sendTime}}</p> -->
                <div class="notice-box-body">
                  <i
                    class="isread"
                    v-if="item.isRead == 1"
                  ></i>
                  <p class="title">{{item.title}}</p>
                  <div class="operate">
                    <p class="sendtime">{{item.sendTime}}</p>
                    <p class="readmore">查看详情<van-icon name="arrow"></van-icon>
                    </p>
                  </div>
                  <!-- <p
                    class="info"
                    v-lazy-container="{ selector: 'img' }"
                    v-html="lazyImgHtml(item.content)"
                  ></p> -->
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
      active: 0,
      inH5: true
    }
  },
  async beforeMount() {
    await this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated() {
    //	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
    }
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
        // 系统消息已读接口调用
        this.$service("messageSystemRead", { data: { id: item.id } })
          .then(() => { })
          .catch(() => { })
        data.title = item.title
        data.time = item.sendTime
        data.content = item.content
        this.$router.push({
          name: 'user-tip-details',
          query: {
            id: item.id
          }
        })
      } else {
        // 订单消息已读接口调用
        if (item.sellUserRead === 1) {
          this.$service("messageOrderRead", { data: { orderMessageId: item.id } })
            .then(() => { })
            .catch(() => { })
        }
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
  top: 0;
  z-index: 99;
  width: 100%;
}
/deep/ .h5-tab .van-tabs__wrap {
  top: 46px;
}
/deep/ .van-tabs__nav {
  background: #f2f2f2;
}

.notice-box {
  padding: 10px 10px 0;
  font-size: 12px;
  color: #666;
  & .time {
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  & .notice-box-body {
    position: relative;
    padding: 15px 10px 15px 15px;
    background: #fff;
    border-radius: 10px;
    & .isread {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 2px;
      background: #df735a;
      left: 5px;
      top: 22px;
    }
    & .title {
      margin-bottom: 10px;
      font-size: 15px;
      line-height: 1.5em;
      color: #333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    & .operate {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 13px;
      color: #aaa;
      & .readmore {
        color: #2d68c2;
        & >>> .van-icon {
          vertical-align: top;
        }
      }
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
  padding: 10px 10px 0;
  font-size: 12px;
  color: #666;
  & .time {
    height: 20px;
    line-height: 20px;
    text-align: center;
    margin: 15px auto;
    background: #ccc;
    color: #fff;
    width: 135px;
    border-radius: 2px;
  }
  & .order-box-body {
    position: relative;
    /* margin-left: 40px; */
    padding: 10px;
    background: #fff;
    border-radius: 6px;
    & .isread {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 2px;
      background: #df735a;
      left: 3px;
      top: 15px;
    }
    /* & img {
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
    } */
    & .info {
      font-size: 14px;
      /* overflow: hidden;
      height: 40px;
      line-height: 20px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; */
    }
    & .order-detail {
      display: flex;
      margin-top: 10px;
      position: relative;
      & img {
        width: 90px;
        height: 90px;
        margin-right: 10px;
      }
      & > div {
        flex: 1;
      }
      & .title {
        overflow: hidden;
        height: 40px;
        line-height: 20px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      & .num {
        font-size: 12px;
        color: #999;
        margin: 12px 0 8px;
      }
      & .price {
        font-size: 16px;
        color: #df735a;
        & i {
          font-size: 12px;
          letter-spacing: 1px;
        }
      }
      & button {
        width: 99px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        border: 0.0267rem solid;
        color: #df735a;
        font-size: 0.3733rem;
        border-radius: 0.08rem;
        position: absolute;
        right: 0;
        bottom: 0;
        background: transparent;
      }
    }
  }
}

.tab-content {
  margin-top: 46px;
}
</style>
