<template>
  <div class="app-order-item">
    <div @click="toOrderDetail">
      <div class="card-bar row-between vertical">
        <p>
          <img
            class="icon-shop"
            src="../../../assets/images/icon/shop.png"
            alt=""
          />
          <span>{{ data.sellUserName }}</span>
          <img
            class="icon-more"
            src="../../../assets/images/icon/more.png"
            alt=""
          />
        </p>
        <p
          class="red"
          v-if="data.state == 6 && data.isCommented == 2"
        >
          已评价
        </p>
        <p
          class="red"
          v-else
        >{{ orderState[data.state] }}</p>
      </div>
      <div
        class="card-header flex-row"
        v-for="(goods, index) in data.goodsList"
        :key="index"
      >
        <div
          class="card-image lazy-img-box"
          v-lazy:background-image="setImg(goods.skuMainPic, { w: 400 })"
        ></div>
        <div class="card-info">
          <div class="row-between">
            <div class="card-name">{{ goods.skuName }}</div>
            <div
              v-if="data.keyword"
              class="card-keyword red"
            >
              {{ data.keyword }}
            </div>
          </div>
          <div class="card-title">{{ data.title }}</div>
          <div class="card-describe">
            <p
              class="gray goods-sku-box"
              v-if="data.goodsList"
            >
              <template v-for="(item, i) in data.goodsList">
                <template v-if="item.skuExplain">
                  <span
                    v-for="(skuitem, skui) in item.skuExplain"
                    :key="skui"
                  >{{ skuitem.specsName }}：{{ skuitem.attrValue
                  }}<span v-if="skui !== item.skuExplain.length - 1">；</span></span>
                </template>
              </template>
            </p>
            <p class="card-unit-price">
              ￥{{ goods.unitPrice
              }}<span class="card-number">x{{ goods.goodsNumber }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="card-line"></div>
      <div class="card-footer row-between">
        <p>
          <span>共{{ data.goodsList.length }}件商品 合计：</span>
          <span class="card-price red">{{ data.price }}</span>
          <span> (运费:￥{{ data.freightMoney }})</span>
        </p>
      </div>
      <div class="card-footer row-between card-action-box">
        <div class="card-actions">
          <button
            v-if="allowCancelOrder(data.state, data.revokeState)"
            @click.stop="cancelOrder"
            class="card-actions-btn"
          >
            取消订单
          </button>
          <button
            v-if="allowCancelCancel(data.state)"
            @click.stop="cancelCancel(data.id)"
            class="card-actions-btn"
          >
            撤销取消订单
          </button>
          <button
            v-if="data.state === 3"
            class="card-actions-btn card-disabled-btn"
            disabled
          >
            去付款
          </button>
          <button
            v-if="allowPayOrder(data.state)"
            @click.stop="payOrder"
            class="card-actions-btn card-warning-btn"
          >
            去付款
          </button>
          <button
            v-if="allowConfirmGoods(data.state)"
            @click.stop="confirmGoods"
            class="card-actions-btn card-warning-btn"
          >
            确认收货
          </button>
          <button
            v-if="allowLogistics(data.state)"
            @click.stop="logistics"
            class="card-actions-btn"
          >
            查看物流
          </button>
          <button
            v-if="
              allowdelayedReceipt(data.delayedReceipt) &&
                allowConfirmGoods(data.state)
            "
            @click.stop="delayedReceipt(data.id)"
            class="card-actions-btn"
          >
            延迟收货
          </button>
          <button
            v-if="allowComment(data.state) && data.isCommented == 1"
            @click.stop="comment"
            class="card-actions-btn"
          >
            评价
          </button>
          <button
            v-if="allowRefund(data.state, $route.query.type, data.revokeState)"
            @click.stop="AfterSales"
            class="card-actions-btn"
          >
            申请退款
          </button>
          <button
            v-if="
              allowReturnGoods(data.state, $route.query.type, data.revokeState)
            "
            @click.stop="AfterSales"
            class="card-actions-btn"
          >
            申请退货
          </button>
          <button
            v-if="allowCancelRefund(data.state, data.revokeState)"
            @click.stop="CancelRefund(data.orderRefundId)"
            class="card-actions-btn"
          >
            撤销退款
          </button>
          <button
            v-if="allowCancelReturnGoods(data.state, data.revokeState)"
            @click.stop="cancelReturnGoods(data.orderRefundId)"
            class="card-actions-btn"
          >
            撤销退货
          </button>
        </div>

      </div>
      <p
        class="tr tip"
        v-if="data.state === 3"
      >提示：需要等待设计师确认订单后才可以进行付款</p>
    </div>
    <van-popup
      v-model="showPopup"
      position="bottom"
    >
      <div
        style="margin: 10px;"
        v-if="data.state == 4"
      >
        <p>温馨提示：</p>
        <p>
          待发货订单，取消订单后，需商家同意后，方可退款；如商家在您取消订单7天内仍未同意，系统将会自动退款。
        </p>
      </div>
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        @touchmove.native.stop="pikerMove"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import { setImg } from "~/utils/qiniu";
import { Dialog } from "vant";
import { orderState } from "~/utils/status";
import {
  allowCancelOrder,
  allowCancelCancel,
  allowCancelReturnGoods,
  allowPayOrder,
  allowLogistics,
  allowConfirmGoods,
  allowComment,
  allowDeleteOrder,
  allowAfterSales,
  allowNoApplication,
  allowNoDetails,
  allowCancelRefund,
  allowdelayedReceipt,
  allowRefund,
  allowReturnGoods
} from "~/utils/status";

export default {
  props: {
    data: Object,
    ids: [String, Number]
  },
  data() {
    return {
      orderState,
      show: false,
      showPopup: false,
      columns: ["不想买了", "信息有误", "重新拍", "商家缺货", "其他原因"]
    };
  },
  methods: {
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
    allowCancelRefund,
    allowdelayedReceipt,
    allowRefund,
    allowReturnGoods,
    allowCancelReturnGoods,
    setImg,
    onConfirm(value, index) {
      this.showPopup = false;
      let that = this;
      let bunber = this.data.barLeftText.split("订单编号：")[1];
      that
        .$service("orderCancel", {
          resources: [bunber, value]
        })
        .then(res => {
          Toast("取消成功");

          that.$router.push({
            name: "swap-order-detail",
            query: {
              id: this.data.id,
              orderNumber: this.data.orderNumber,
              state: 8,
              type: this.data.type,
              img: this.data.img
            }
          });
        });
    },
    onCancel() {
      this.showPopup = false;
    },
    handler(e) {
      e.preventDefault();
    },
    cancelOrder() {
      this.showPopup = true;
      let tabulW = document.querySelectorAll(".van-pull-refresh__track");
      for (let i = 0; i < tabulW.length; i++) {
        tabulW[i].style.transform = "none";
      }

      /*let that = this
      let bunber = this.data.barLeftText.split('订单编号：')[1];
      Dialog.confirm({
        title: '是否取消订单',
        //message: '弹窗内容'
      }).then(() => {
        that.$service('orderCancel', {
          resources: [bunber]
        }).then(res => {
            that.$router.push({
              name:'swap-order-detail',
              query: {id: this.data.id,orderNumber:this.data.orderNumber,state:8,type:this.data.type,img:this.data.img}
            })
        })
      }).catch(() => {

      });*/
    },
    payOrder() {
      let bunber = this.data.barLeftText.split("订单编号：")[1];
      this.$service("orderPayInTime", { resources: [bunber] }).then(result => {
        if (this.$native.isApp()) {
          this.$native.goToPay({
            billID: result.data.id,
            payOrderType: 0
          });
        } else {
          if (this.$native.isACity() == 2) {
            this.$native.goToPay({
              billID: result.data.id,
              payOrderType: 0
            });
          } else {
            this.$router.push({
              name: "swap-order-pay",
              query: { id: result.data.id }
            });
          }
        }
      });
    },
    logistics() {
      this.$router.push({
        name: "swap-order-logistics",
        query: {
          bar: this.ids,
          goods: this.data.goodsList[0].skuMainPic
        }
      });
    },
    confirmGoods() {
      let that = this;
      let bunber = this.data.barLeftText.split("订单编号：")[1];
      Dialog.confirm({
        title: "请确定您已收到商品"
        //message: '弹窗内容'
      })
        .then(() => {
          // on confirmo
          this.$service("orderReceive", {
            resources: [bunber]
          }).then(res => {
            that.$router.push({
              name: "swap-order-detail",
              query: {
                id: this.data.id,
                orderNumber: this.data.orderNumber,
                state: this.data.state,
                type: this.data.type,
                img: this.data.img
              }
            });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    comment() {
      // 评论
      this.$router.push({
        name: "swap-order-comment",
        query: { id: this.ids, orderNumber: this.data.orderNumber }
      });
    },
    AfterSales() {
      let bunber = this.data.barLeftText.split("订单编号：")[1];
      this.$router.push({
        name: "afterSale",
        query: {
          orderId: this.ids,
          orderNumber: bunber
        }
      });
    },
    CancelRefund(refundeId) {
      //撤销退款
      let that = this;
      Dialog.confirm({
        title: "确认撤销取消退款申请？",
        message: "撤销取消退款申请后，不可再次发起退款申请"
      })
        .then(() => {
          this.$service("orderRefundCancel", {
            resources: [refundeId]
          }).then(res => {
            that.$router.push({
              name: "swap-order-detail",
              query: {
                id: this.data.id,
                orderNumber: this.data.orderNumber,
                state: this.data.state,
                type: this.data.type,
                img: this.data.img
              }
            });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    cancelReturnGoods(refundeId) {
      let that = this;
      Dialog.confirm({
        title: "确认撤销取消退货申请？",
        message: "撤销取消退货申请后，不可再次发起退货申请"
      })
        .then(() => {
          this.$service("orderRefundCancel", {
            resources: [refundeId]
          }).then(res => {
            that.$router.push({
              name: "swap-order-detail",
              query: {
                id: this.data.id,
                orderNumber: this.data.orderNumber,
                state: this.data.state,
                type: this.data.type,
                img: this.data.img
              }
            });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    cancelCancel(id) {
      //撤销取消订单
      let that = this;
      Dialog.confirm({
        title: "确认撤销取消订单申请？",
        message: "撤销取消订单申请后，不可再次发起取消订单"
      })
        .then(() => {
          this.$service("orderCancelCancel", {
            resources: [id]
          }).then(res => {
            that.$router.push({
              name: "swap-order-detail",
              query: {
                id: this.data.id,
                orderNumber: this.data.orderNumber,
                state: this.data.state,
                type: this.data.type,
                img: this.data.img
              }
            });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    delayedReceipt(id) {
      //延迟收货
      let that = this;
      Dialog.confirm({
        title: "确认延迟收货时间？",
        message: "每笔订单可延迟7天收货"
      })
        .then(() => {
          // on confirmo
          this.$service("orderDelayedReceipt", {
            resources: [id]
          }).then(res => {
            this.$router.go(0);
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    toOrderDetail() {
      this.$router.push({
        name: "swap-order-detail",
        query: {
          id: this.data.id,
          orderNumber: this.data.orderNumber,
          state: this.data.state,
          type: this.data.type,
          img: this.data.goodsList[0].skuMainPic
        }
      });
    },
    pikerMove() { },
    deleteOrder() { }
  }
};
</script>

<style lang="postcss">
.app-order-item {
  margin: 10px;
  font-size: 12px;
  color: var(--black);
  background-color: white;
  line-height: 18px;
  border-radius: 6px;
  & .card-bar,
  & .card-header {
    padding: 10px;
  }
  & .card-bar img {
    margin-right: 9px;
    height: 13px;
    vertical-align: middle;
    &.icon-more {
      margin-left: 13px;
      height: 9px;
    }
  }
  & .card-image {
    width: 90px;
    height: 90px;
    border-radius: 3px;
  }
  & .card-info {
    flex: 1;
    margin-left: 10px;
  }
  & .card-name {
    flex: 1;
    margin-bottom: 5px;
  }
  & .card-keyword {
    margin-left: 5px;
    width: 90px;
    text-align: right;
  }
  & .card-describe {
    line-height: 22px;
  }
  & .goods-sku-box {
    height: 22px;
  }
  & .card-unit-price {
    margin-top: 5px;
    font-size: 13px;
    color: #333333;
    & .card-number {
      float: right;
      color: #999999;
      font-size: 10px;
    }
  }
  & .card-price {
    font-size: 15px;
  }
  & .card-line {
    margin: 0 10px;
    height: 1px;
    background: #f4f5f6;
  }
  & .card-footer {
    padding: 10px;
    align-items: center;
    justify-content: flex-end;
    &.card-action-box {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  & .card-actions-btn {
    /* margin-right: 5px; */
    margin: 5px 5px 10px 0;
    padding: 4px 14px;
    background-color: #ffffff;
    border: 1px solid #999999;
    border-radius: 4px;
    line-height: normal;
    color: #666666;
    &.card-warning-btn {
      color: #df735a;
      border-color: #df735a;
    }
    &.card-disabled-btn {
      color: #ffffff;
      border-color: #aaaaaa;
      background-color: #aaaaaa;
    }
    &:after {
      border-radius: 36px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  & .tip {
    padding-bottom: 15px;
    padding-right: 10px;
    color: #999999;
  }
}
.van-popup.van-popup--bottom {
  z-index: 2004;
}
.van-picker__cancel {
  color: #666666;
}
.van-picker__confirm {
  color: #df735a;
}
</style>
