<template>
  <AppView title="订单详情">
    <div
      class="Order-detail-page"
      v-if="detail.orderNumber"
    >
      <!--<div class="detail-title">
				<div class="t-cont">
					<p class="t-title">{{detail.state | orderState}}</p>
				</div>
			</div>-->

      <div
        class="assemble-bar assemble-success"
        v-if="detail.state === 24"
      >
        <span class="success-info">拼团成功</span>
        <div class="img-box master">
          <img :src="detail.groupUserList[0].userLogo" />
          <span class="img-label master">团长</span>
        </div>
        <div class="img-box">
          <img :src="detail.groupUserList[1].userLogo" />
          <span class="img-label member">团员</span>
        </div>
      </div>
      <div
        class="assemble-bar assemble-wait"
        v-if="detail.state === 23"
      >
        <p>系统拼团中，还差一人成团...</p>
        <p>若{{countDown}}内组团失败，自动取消订单</p>
      </div>

      <div class="receiving-address-bar">
        <i class="ico-address"></i>
        <div class="receiving-info">
          <p class="recipients">
            <span class="recipients-name">{{detail.userInfoVO.username}}</span>
            <span>{{detail.userInfoVO.mobile}}</span>
          </p>
          <p class="receiving-address">
            <span>收货地址：</span>
            <span>{{detail.userInfoVO.shippingAddr}}</span>
          </p>
        </div>
      </div>
      <div class="goods">
        <div class="merchant-info">
          <img
            class="merchant-logo"
            :src="detail.sellUserLogo"
          />
          <span class="merchant-name">{{detail.sellUserName}}</span>
        </div>
        <AppCard
          v-for="(goods, i) in detail.orderGoodVOList"
          :key="i"
          :data="{
            imgUrl: goods.skuMainPic,
            name: goods.skuName,
            unitPrice: '￥' + goods.unitPrice,
            describe: '',
            important: '',
            goodId: goods.goodId,
            source: goods.source,
            goodsNumber: goods.goodsNumber,
            skuExplain: goods.skuExplain,
            goodsType: goods.goodsType
          }"
        />
      </div>
      <div class="order-info">
        <ul class="price-detail">
          <li>
            <span>商品总价</span>
            <span class="t-right theme-color">￥{{detail.goodsTotalMoney}}</span>
          </li>
          <li>
            <span>运费</span>
            <span class="t-right theme-color">￥{{detail.freightMoney}}</span>
          </li>
          <li>
            <span>优惠金额</span>
            <span
              class="t-right theme-color"
              v-if="detail.discountPrice"
            >￥{{detail.discountPrice}}</span>
            <span
              class="t-right theme-color"
              v-else
            >￥0</span>
          </li>
          <li>
            <span>合计金额</span>
            <span class="t-right theme-color">￥{{detail.payMoney}}</span>
          </li>
          <li>
            <span>支付金额</span>
            <span class="t-right theme-color">￥{{detail.payMoney}}</span>
          </li>
        </ul>
        <div class="order-detail">
          <ul>
            <li>
              <span class="line">订单信息</span>
            </li>
            <li>
              <span>订单编号：</span>
              <span>{{detail.orderNumber}}</span>
            </li>
            <li>
              <span>订单状态：</span>
              <span
                class="theme-color"
                v-if="detail.isCommented === 1 || (detail.isCommented === 2 &&detail.state !== 6 )"
              >{{detail.state | orderState}}</span>
              <span
                class="theme-color"
                v-else
              >已评价</span>
            </li>
            <li>
              <span>创建时间：</span>
              <span>{{detail.createTime}}</span>
            </li>
            <li v-if="detail.payTime">
              <span>支付时间：</span>
              <span>{{detail.payTime}}</span>
            </li>
            <li v-if="detail.endTime">
              <span>成交时间：</span>
              <span>{{detail.endTime}}</span>
            </li>
            <!-- <li>
              <span>商家名称：</span>
              <span>{{detail.sellUserName}}</span>
            </li> -->
            <li
              v-if="!detail.message == ''"
              style="border-bottom: 6px solid #F8F8F8;"
            >
              <span>买家留言：</span>
              <span>{{detail.message}}</span>
            </li>
            <template v-if="detail.invoiceType != 0">
              <li v-if="detail.invoiceType == 1 || detail.invoiceType == 2"><span class="line">发票信息</span></li>
              <li>
                <span>发票类型</span>
                <span
                  class="t-right fr"
                  v-if="detail.invoiceType == 1"
                >企业</span>
                <span
                  class="t-right fr"
                  v-if="detail.invoiceType == 2"
                >个人</span>
              </li>
              <li>
                <span>发票抬头</span>
                <span class="t-right fr">{{detail.invoiceTitle}}</span>
              </li>
              <li>
                <span>发票内容</span>
                <span class="t-right fr">{{detail.code}}</span>
              </li>
            </template>

          </ul>
        </div>
        <div
          class="order-detail express-detail"
          v-if="allowLogistics(detail.state)"
        >
          <ul>
            <li>
              <span class="line">物流信息</span>
              <div
                class="open-express t-right"
                @click="logistics"
              >物流跟踪</div>
            </li>
            <li>
              <span>物流公司：</span>
              <span class="theme-color">{{detail.orderExpress.expressCompany}}</span>
            </li>
            <li>
              <span>物流单号：</span>
              <span>{{detail.orderExpress.expressNum}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="contact-way">
        <div
          class="bg"
          @click="xiaoneng"
        ><img src="../../../assets/images/order_service.png" />联系卖家</div>
        <div class="contact-ways">
          <div
            v-if="allowConfirmGoods(detail.state)"
            class="fillin"
            @click="Okcargo"
          >确认收货</div>
          <div
            v-if="allowPayOrder(detail.state)"
            class="fillin"
            @click="payOrder"
          >立即支付</div>
          <div
            v-if="allowCancelOrder(detail.state, detail.revokeState)"
            @click="cancelOrder"
          >取消订单</div>
          <div
            v-if="allowCancelCancel(detail.id)"
            @click.stop="cancelCancel"
          >撤销取消订单</div>
          <!-- <div v-if="allowLogistics(detail.state)"
               @click="logistics">查看物流</div> -->
          <div
            v-if="allowComment(detail.state) && detail.isCommented == 1"
            @click="comment"
          >评价</div>
          <div
            v-if="allowCancelRefund(detail.state, detail.revokeState)"
            @click.stop="CancelRefund(detail.orderRefundId)"
            class="card-actions-btn van-hairline--surround"
          >撤销退款</div>
          <div
            v-if="allowCancelReturnGoods(detail.state, detail.revokeState)"
            @click.stop="CancelRefund(detail.orderRefundId)"
            class="card-actions-btn van-hairline--surround"
          >撤销退货</div>
          <div
            v-if="allowRefund(detail.state,$route.query.type,detail.revokeState)"
            @click.stop="AfterSales"
            class="card-actions-btn van-hairline--surround"
          >申请退款</div>
          <div
            v-if="allowReturnGoods(detail.state,$route.query.type,detail.revokeState)"
            @click.stop="AfterSales"
            class="card-actions-btn van-hairline--surround"
          >申请退货</div>
          <div
            v-if="allowdelayedReceipt(detail.delayedReceipt) && allowConfirmGoods(detail.state)"
            @click="delayedReceipt(detail.id)"
            class="fillin"
          >延迟收货</div>
        </div>
      </div>
    </div>
    <van-popup
      v-model="show"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </AppView>
</template>

<script>
import AppCard from '~/components/common/card/item3'
import { Dialog } from 'vant'
import { allowCancelOrder, allowCancelCancel, allowCancelReturnGoods, allowPayOrder, allowLogistics, allowConfirmGoods, allowComment, allowDeleteOrder, allowAfterSales, allowNoDetails, allowNoApplication, allowdelayedReceipt, allowRefund, allowReturnGoods, allowCancelRefund } from '~/utils/status'
import { getToken } from "~/utils/auth"

export default {
  components: {
    AppCard
  },
  head() {
    return {
      title: '订单详情'
    }
  },
  data() {
    return {
      timeOut: null,
      countDown: '',
      canceling: false,
      editing: false,
      pdcargo: false,
      detail: {
        userInfoVO: {},
        orderGoodVOList: []
      },
      show: false,
      columns: ['不想买了', '信息有误', '重新拍', '商家缺货', '其他原因']
    }
  },
  computed: {},
  // middleware: 'auth',
  beforeMount() {
    // this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated() {
    this.weixinGetCode()
  },
  deactivated() {
    this.$destroy()
  },
  beforeDestroy() {
    this.timeOut && clearInterval(this.timeOut)
  },
  methods: {
    getOrderInfo() {
      this.$loading(this.$service('orderInfo', {
        resources: [this.$route.query.orderNumber]
      })).then(result => {
        this.detail = result.data
        this.detail.isCommented = this.detail.orderGoodVOList[0].isCommented
        this.getCountDown()
      })
      if (this.$native.isApp()) {
        this.$native.getTitle('订单详情')
      }
    },
    onConfirm(value, index) {
      this.show = false
      this.$service('orderCancel', {
        resources: [this.detail.orderNumber, value]
      }).then(res => {
        this.$router.go(-1)
        this.$toast({
          message: '操作成功'
        })
        this.detail.state = 8
      })
    },
    onCancel() {
      this.show = false
    },
    cancel() { },
    edit() { },
    comment() { // 评论
      this.$router.push({
        name: 'swap-order-comment',
        query: {
          id: this.detail.id,
          orderNumber: this.detail.orderNumber
        }
      })
    },
    xiaoneng() {
      if (this.$native.isApp()) {
        this.$native.goToXiaoNeng({
          keFuId: this.detail.keFuId
        })
      } else {
        NTKF.im_openInPageChat(this.detail.keFuId)
      }
    },
    payOrder() { // 支付
      if (this.$native.isApp()) {
        this.$native.goToPay({
          billID: this.detail.payBillId,
          payOrderType: 0
        })
      } else {
        if (this.$native.isACity() == 2) {
          this.$native.goToPay({
            billID: this.detail.payBillId,
            payOrderType: 0
          })
        } else {
          this.$router.push({ name: 'swap-order-pay', query: { id: this.detail.payBillId } })
        }
      }
    },
    cancelOrder() { // 取消订单
      let that = this
      this.show = true
      /**/
    },
    logistics() { // 查看物流
      this.$router.push({
        name: 'swap-order-logistics',
        query: {
          bar: this.detail.id,
          goods: this.detail.orderGoodVOList[0].skuMainPic
        }
      })
    },
    AfterSales() { // 申请售后
      this.$router.push({
        name: 'afterSale',
        query: {
          orderId: this.detail.id,
          orderNumber: this.detail.orderNumber
        }
      })
    },
    NoApplication() {
      this.$service('orderAppCancel', {
        resources: [this.detail.id]
      }).then(res => {
        if (res.success) {
          this.$router.go(0)
        }
      })
    },
    Okcargo() {
      let that = this
      Dialog.confirm({
        title: '请确定您已收到商品',
        //message: '弹窗内容'
      }).then(() => {
        // on confirmo
        this.$service('orderReceive', {
          resources: [this.detail.orderNumber]
        }).then(res => {
          if (res.success) {
            this.$router.go(-1)
            this.$toast({
              message: '操作成功'
            })
            this.detail.state = 6
          }
        })

      }).catch(() => {
        // on cancel
      });
    },
    CancelRefund(id) { //撤销退款
      let that = this
      Dialog.confirm({
        title: '确认撤销取消订单申请？',
        message: '撤销取消订单申请后，不可再次发起取消订单'
      }).then(() => {
        this.$service('orderRefundCancel', {
          resources: [id]
        }).then(res => {
          that.$router.push({
            name: 'swap-order-detail',
            query: {
              id: this.data.id,
              orderNumber: this.data.orderNumber,
              state: this.data.state,
              type: this.data.type,
              img: this.data.img
            }
          })
        })
      }).catch(() => {
        // on cancel
      });
    },
    cancelCancel(id) { //撤销取消订单
      let that = this
      Dialog.confirm({
        title: '确认撤销取消订单申请？',
        message: '撤销取消订单申请后，不可再次发起取消订单'
      }).then(() => {
        this.$service('orderCancelCancel', {
          resources: [id]
        }).then(res => {
          that.$router.push({
            name: 'swap-order-detail',
            query: {
              id: this.data.id,
              orderNumber: this.data.orderNumber,
              state: this.data.state,
              type: this.data.type,
              img: this.data.img
            }
          })
        })
      }).catch(() => {
        // on cancel
      });
    },
    delayedReceipt(id) { //延迟收货
      let that = this
      Dialog.confirm({
        title: '确认延迟收货时间？',
        message: '每笔订单可延迟7天收货'
      }).then(() => {
        // on confirmo
        this.$service('orderDelayedReceipt', {
          resources: [id]
        }).then(res => {
          this.$router.go(0);
        })
      }).catch(() => {
        // on cancel
      });
    },
    getCountDown() {
      let payTime = +new Date(Date.parse(this.detail.payTime.replace(/-/g, "/")))
      payTime += 24 * 3 * 60 * 60 * 1000
      let diferentTime = this.leftTimer(payTime - new Date())
      this.countDown = diferentTime
      this.timeOut = setInterval(() => {
        let payTime = +new Date(Date.parse(this.detail.payTime.replace(/-/g, "/")))
        payTime += 24 * 3 * 60 * 60 * 1000
        let diferentTime = this.leftTimer(payTime - new Date())
        this.countDown = diferentTime
      }, 1000)
    },
    leftTimer(leftTime) {
      var text = "";
      var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
      var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
      var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
      // days = this.checkTime(days)
      hours = this.checkTime(hours)
      minutes = this.checkTime(minutes)
      seconds = this.checkTime(seconds)
      if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) {
        text = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒"
      }
      return text
    },
    checkTime(i) { //将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = "0" + i
      }
      return i
    },
    //微信公众号回调地址获取code
    weixinGetCode() {
      let urlParameters = window.location.hash ? window.location.hash.substring(1) : window.location.search.substring(1)
      let map = toParamMap(urlParameters)
      if (map.state == '123' && !getToken()) {
        this.$service('getUserInfoForWeChat', {
          params: {
            'code': map.code,
            'state': '123'
          }
        })
          .then(this.success)
          .catch(this.getOrderInfo)
      } else {
        this.getOrderInfo()
      }
      function toParamMap(str) {
        var map = {};
        var segs = str.split("&");
        for (var i in segs) {
          var seg = segs[i];
          var idx = seg.indexOf('=');
          if (idx < 0) {
            continue;
          }
          var name = seg.substring(0, idx);
          var value = seg.substring(idx + 1);
          map[name] = value;
        }
        return map;
      }
    },
    success(result) {
      //微信公众号后台返回参数
      result.data.accessToken && this.$store.commit('user/setToken', result.data.accessToken)
      this.getOrderInfo()
    },
    allowCancelOrder,
    allowCancelCancel,
    allowPayOrder,
    allowLogistics,
    allowConfirmGoods,
    allowComment,
    allowDeleteOrder,
    allowAfterSales,
    allowNoApplication,
    allowNoDetails,
    allowdelayedReceipt,
    allowRefund,
    allowReturnGoods,
    allowCancelRefund,
    allowCancelReturnGoods
  }
}
</script>

<style scoped lang="postcss">
.Order-detail-page {
  padding-bottom: 49px;
  & .detail-title {
    width: 100%;
    height: 70px;
    background: #8b0f1a;
    display: flex;
    justify-content: center;
    align-items: center;
    & .t-icon {
      width: 34px;
      height: 34px;
      margin-right: 10px;
      & .ico-wait_time {
        width: 100%;
        height: 100%;
      }
    }
    & .t-cont {
      color: #fff;
      & .t-title {
        font-size: 18px;
      }
      & .t-desc {
        margin-top: 4px;
        font-size: 12px;
      }
    }
  }
  & .assemble-bar {
    margin: 10px 0;
    padding: 15px 0 15px 10px;
    height: 43px;
    font-size: 16px;
    line-height: 22px;
    color: #333;
    background: #fff;
    &.assemble-success {
      text-align: center;
      & .success-info {
        display: inline-block;
        margin-right: 15px;
        margin-top: -25px;
        vertical-align: middle;
      }
      & .img-box {
        position: relative;
        display: inline-block;
        margin-right: 15px;
        & img {
          width: 43px;
          height: 41px;
          border-radius: 50%;
        }
        & span {
          position: absolute;
          display: inline-block;
          top: -8px;
          left: 50%;
          width: 29px;
          line-height: 15px;
          text-align: center;
          font-size: 10px;
          color: #fff;
          border-radius: 7px;
          background: #f4b1a4;
          transform: translateX(-50%);
        }
      }
      & .img-box.master {
        & img {
          border: 1px solid #fb746e;
        }
        & span {
          background: #fb746e;
        }
      }
    }
  }
  & .receiving-address-bar {
    margin-top: 10px;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    word-wrap: break-word;
    box-sizing: border-box;
    background: #ffffff;
    margin-bottom: 10px;
    & .ico-address {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    & .receiving-info {
      width: calc(100% - 40px);
      font-size: 13px;
      color: #333;
      line-height: 15px;
      & .recipients {
        margin-bottom: 5px;
        & .recipients-name {
          margin-right: 10px;
        }
      }
      & .eceiving-address {
      }
    }
  }
  & .order-info {
    font-size: 15px;
    border-top: 1px solid #f8f8f8;
    & ul li {
      padding: 0 10px;
      line-height: 24px;
      position: relative;
    }
    & .Payment {
      position: relative;
      padding: 0 10px;
      line-height: 40px;
    }
    & .t-right {
      position: absolute;
      right: 10px;
    }
  }
  & .contact-way {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    background: #ffffff;
    height: 53px;
    padding: 12px 0;
    box-sizing: border-box;
    /*& div {
			  flex: 1;
				width: 50%;
				text-align: center;
				line-height: 40px;
				border-top: 1px solid #C2A374;
				border-bottom: 1px solid #C2A374;
				color: #C2A374;
				font-size: 15px;
			}*/
    & .bg {
      flex: 1;
      align-items: center;
      padding-left: 12px;
      font-size: 12px;
      line-height: 29px;
      color: #666666;
      box-sizing: border-box;
      & img {
        margin-right: 5px;
        width: 23px;
        height: 23px;
        vertical-align: middle;
      }
    }
    & .contact-ways {
      flex: 3;
      align-items: center;
      text-align: right;
      padding-right: 10px;
      & div {
        display: inline-block;
        margin-left: 10px;
        padding: 0 4px;
        width: 63px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #aaaaab;
        border-radius: 5px;
        color: #585859;
        font-size: 13px;
        &.fillin {
          color: #d57e6a;
          border-color: #d57e6a;
        }
      }
    }
  }
  & .Recommend {
    line-height: 50px;
    color: #333;
    font-size: 18px;
    text-align: center;
  }
  & .goods {
    /*margin-bottom: 10px;*/
    & .merchant-info {
      padding-left: 10px;
      line-height: 50px;
      background: #fff;
      border-bottom: 1px solid #f8f8f8;
      & .merchant-logo {
        margin-right: 9px;
        width: 30px;
        height: 30px;
        vertical-align: middle;
        border-radius: 50%;
      }
    }
  }
  & .app-card-item3 .card-footer {
    padding: 0;
  }
  & .actions {
    padding: 20px 0;
    text-align: center;
  }
  & .line {
    color: #333333;
    margin-bottom: 10px;
    &:before {
      content: "";
      display: inline-block;
      margin-right: 5px;
      width: 3px;
      height: 13px;
      background: #d57e6a;
    }
  }
  & .price-detail {
    padding: 10px 0;
    background: #fff;
    margin-bottom: 6px;
    font-size: 14px;
    color: #373737;
  }
  & .order-detail {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    color: #585859;
    background: #ffffff;
    & li:first-child {
      line-height: 40px;
      font-size: 17px;
      color: #26273c;
      /* border-bottom: 6px solid #f8f8f8; */
    }
    & .open-express {
      display: inline-block;
      margin-top: 14px;
      width: 68px;
      font-size: 13px;
      text-align: center;
      line-height: 30px;
      color: #585859;
      border: 1px solid #aaaaab;
      border-radius: 15px;
    }
  }
  & .needpay {
    font-size: 12px;
    color: #333;
    & .t-right {
      color: #8b0f1a;
    }
  }
}

.theme-color {
  color: #fb746e;
}
</style>
