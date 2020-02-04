<template>
  <AppView title="售后详情">
    <div
      class="Order-detail-page"
      v-if="detail.orderNumber"
    >
      <!--<div class="detail-title">
				<div class="t-cont">
					<p class="t-title">{{detail.state | orderState}}</p>
				</div>
			</div>-->

      <!-- <div class="receiving-address-bar">
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
      </div> -->

      <div class="refuseReason">
        <p>{{refundStateText}}</p>
        <p>{{refundTextInfo}}</p>
      </div>

      <div class="goods">
        <AppCard
          v-for="(goods, i) in detail.revoList"
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
        <div class="order-detail">
          <ul>
            <li>
              <span class="line">退款详情</span>
            </li>
            <li>
              <span>退款原因：</span>
              <span>{{detail.comment}}</span>
            </li>
            <li v-if="detail.refundAmount">
              <span>退款金额：</span>
              <span>￥{{detail.refundAmount.toFixed(2)}}</span>
            </li>
            <li>
              <span>申请时间：</span>
              <span>{{detail.payTime}}</span>
            </li>
            <li>
              <span>退货编号：</span>
              <span>{{detail.orderNumber}}</span>
            </li>
          </ul>
        </div>
        <div
          class="order-detail"
          v-if="detail.auditState === 7 ||detail.auditState === 8 ||detail.auditState === 9 ||detail.auditState === 10"
        >
          <ul>
            <li>
              <span class="line">仲裁详情</span>
            </li>
            <li>
              <span>仲裁编号：</span>
              <span>{{detail.orderNumber}}</span>
            </li>
            <li>
              <span>申请时间：</span>
              <span>￥{{detail.arbitrationTime}}</span>
            </li>
            <li>
              <span>申请原因：</span>
              <span>{{detail.arbitationReason}}</span>
            </li>
            <li>
              <span>相关凭证：</span>
              <!-- <span>{{detail.orderNumber}}</span> -->
              <div>
                <div
                  class="card-image lazy-img-box"
                  v-for="(item,index) in detail.arbitrationPic"
                  :key="index"
                  v-lazy:background-image="setImg(item, { w: 400 })"
                ></div>
              </div>
            </li>
            <li v-if="detail.arbitrationLogList && detail.arbitrationLogList.length">
              <span>仲裁人员：</span>
              <span>{{detail.arbitrationLogList[0].auditName}}</span>
            </li>
            <li v-if="detail.arbitrationLogList && detail.arbitrationLogList.length">
              <span>处理时间：</span>
              <span>{{detail.arbitrationLogList[0].createTime}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="contact-way">
        <!-- <div class="bg"
             @click="xiaoneng"><img src="../../../assets/images/order_service.png" />联系卖家</div> -->
        <div class="contact-ways">
          <div
            v-if="(detail.auditState === 0 || detail.auditState === 1 || detail.auditState === 8) && (detail.refundType === 1)"
            class="fillin"
            @click="refundCancel(detail.id)"
          >撤销退款</div>

          <div
            v-if="(detail.auditState === 0 || detail.auditState === 1 || detail.auditState === 8) && (detail.refundType === 2)"
            class="fillin"
            @click="refundCancel(detail.id)"
          >撤销退货</div>

          <div
            v-if="detail.auditState === 2"
            @click="logistics(detail.id)"
          >查看物流</div>

          <div
            v-if="(detail.auditState === 1 || detail.auditState === 8) && (detail.refundType === 2)"
            @click.stop="returnGoods(detail.id,detail.sellUserId)"
          >寄回商品</div>

          <div
            v-if="detail.auditState === 6 || detail.auditState === 11"
            @click="applyArbitrate(detail.id)"
          >申请仲裁</div>
        </div>
      </div>
    </div>
  </AppView>
</template>

<script>
import AppCard from '~/components/common/card/item3'
import { setImg } from '~/utils/qiniu'
import { Dialog } from 'vant'
import { refundState } from '~/utils/status'
import { getToken } from "~/utils/auth"

export default {
  components: {
    AppCard
  },
  data() {
    return {
      refundState,
      refundStateText: '',
      refundTextInfo: '',
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
    }
  },
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
  methods: {
    setImg,
    getRefundInfo() {
      this.$loading(this.$service('userRefundInfo', {
        resources: [this.$route.query.id]
      })).then(result => {
        this.detail = result.data
        this.detail.id = this.$route.query.id
        this.refundStateText = this.refundState[this.detail.auditState]
        switch (this.detail.auditState) {
          case 0:
            this.refundStateText = this.detail.refundType === 2 ? "您已成功发起退货申请" : "您已成功发起退款申请"
            this.refundTextInfo = "请耐心等待商家处理"
            break
          case 1:
            this.refundStateText = this.detail.refundType === 2 ? "商家同意退货" : "商家同意退款"
            break;
          case 2:
            tvRespOne.setText("您已成功寄回商品")
            tvRespTwo.setText("请耐心等待商家确认收货")
            setMessage(tvMessage, refundInfoBean)
            break
          case 3:
            this.refundStateText = this.detail.refundType === 2 ? "退货成功" : "退款成功"
            this.refundTextInfo = "退款金额 ¥" + this.detail.refundAmount + "已原路返回"
            break
          case 4:
            this.refundStateText = this.detail.refundType === 2 ? "平台拒绝退货" : "商家拒绝了退款申请"
            this.refundTextInfo = this.detail.refundType === 2 ? "原因:请耐心等待平台处理" : "原因:请耐心等待商家处理"
            break;
          case 5:
            this.refundStateText = "您已撤销退款/货申请"
            break;
          case 6:
            this.refundStateText = this.detail.refundType === 2 ? "商家拒绝退货" : "商家拒绝退款"
            if (this.detail.auditLogList.length) {
              this.refundTextInfo = "原因:" + this.detail.auditLogList[0].opinion
            }
            break;
          case 7:
            this.refundStateText = this.detail.refundType === 2 ? "退货仲裁中" : this.data.arbitrationType === 1 ? "您已成功发起退款仲裁申请" : "商家成功发起退款仲裁申请"
            this.refundTextInfo = "请耐心等待平台工作人员处理"
            break
          case 8:
            this.refundStateText = this.detail.refundType === 2 ? "平台同意退货" : "退款成功"
            if (this.detail.refundType === 1) {
              this.refundTextInfo = "退款金额 ¥" + this.detail.refundAmount + "已原路返回"
            }
            break
          case 9:
            this.refundStateText = this.detail.refundType === 2 ? "平台拒绝退货" : "平台拒绝了退款申请"
            if (this.detail.refundType === 1) {
              if (this.detail.arbitrationLogList.length) {
                this.refundTextInfo = "原因:" + this.detail.arbitrationLogList[0].opinion
              }
            } else {
              if (this.detail.auditLogList.length) {
                this.refundTextInfo = "原因: " + this.detail.auditLogList[0].opinion
              }
            }
            break
          case 10:
            this.refundStateText = "仲裁退回"
            if (this.arbitrationLogList.length) {
              this.refundTextInfo = "原因:" + this.detail.arbitrationLogList[0].opinion
            }
            break
          case 11:
            this.refundStateText = "商家拒绝收货"
            if (this.detail.auditLogList.length) {
              this.refundTextInfo = "原因:" + this.detail.auditLogList[0].opinion
            }
            break
          case 12:
            this.refundStateText = "退货仲裁中"
            this.refundTextInfo = "请耐心等待平台工作人员处理"
            break
          case 13:
            this.refundStateText = this.detail.refundType === 2 ? "商家拒绝退货" : "商家拒绝退款"
            if (this.detail.auditLogList.length) {
              this.refundTextInfo = "原因:" + this.detail.auditLogList[0].opinion
            }
            break
          case 14:
            this.refundStateText = "商家拒绝收货"
            if (this.detail.auditLogList.length) {
              this.refundTextInfo = "原因:" + this.detail.auditLogList[0].opinion
            }
            break
        }
      })
    },
    refundCancel(id) {
      Dialog.confirm({
        title: '撤销申请',
        message: '您确定撤销申请吗？撤销后不可再次申请！'
      }).then(() => {
        this.$service('userRefundCancel', {
          resources: [id]
        }).then(res => {
          this.$router.push({ name: 'user-orderRefund-list' })
          setTimeout(() => {
            this.$toast('中宝平：撤销成功')
          }, 200)
        })
      }).catch(() => { })
    },
    returnGoods(id, sellUserId) {
      this.$router.push({
        name: 'user-orderRefund-returnGoods',
        query: { id: id, sellUserId: sellUserId }
      })
    },
    applyArbitrate(id) {
      this.$router.push({
        name: 'user-orderRefund-applyArbitrate',
        query: { id: id }
      })
    },
    logistics(id) {
      this.$router.push({
        name: 'swap-order-logistics',
        query: {
          bar: id,
          goods: this.detail.revoList[0].skuMainPic,
          from: 'refund'
        }
      })
    },
    xiaoneng() {
      this.$native.goToXiaoNeng({ keFuId: this.detail.keFuId, id: '' })
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
          .catch(this.getRefundInfo)
      } else {
        this.getRefundInfo()
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
      this.getRefundInfo()
    },
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
    padding: 15px 10px;
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
  & .refuseReason {
    margin: 10px 0;
    padding: 10px;
    line-height: 22px;
    background: #fff;
  }
  & .card-image {
    display: inline-block;
    margin-right: 10px;
    width: 100px;
    height: 100px;
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