<template>
  <div class="app-order-item">
    <div @click="toOrderDetail">
      <div class="card-bar row-between vertical van-hairline--bottom">
        <p>{{data.barLeftText}}</p>
        <p class="red">{{refundStateText}}</p>
      </div>
      <div
        class="card-header flex-row"
        v-for="(goods, index) in data.revoList"
        :key="index"
      >
        <div
          class="card-image lazy-img-box"
          v-lazy:background-image="setImg(goods.skuMainPic, { w: 400 })"
        ></div>
        <div class="card-info">
          <div class="row-between">
            <div class="card-name">{{goods.skuName}}</div>
            <div
              v-if="data.keyword"
              class="card-keyword red"
            >{{data.keyword}}</div>
          </div>
          <div class="card-title">{{data.title}}</div>
          <div class="card-describe">
            <p
              class="gray"
              v-if="data.revoList"
            >
              <template v-for="(item, i) in data.revoList">
                <span
                  v-for="(skuitem, skui) in item.skuExplain"
                  :key="skui"
                >{{skuitem.specsName}}：{{skuitem.attrValue}} &nbsp;&nbsp;</span>
              </template>
            </p>
            <p class="red">￥{{goods.unitPrice}}</p>
          </div>
        </div>
      </div>
      <div class="card-footer row-between">
        <p>
          <span>共{{data.revoList.length}}件商品 合计：</span>
          <span class="card-price red">{{data.refundAmount}}</span>
          <!-- <span> (含运费:￥{{data.freightMoney}})</span> -->
        </p>
      </div>
      <div
        class="card-footer row-between van-hairline--top"
        v-if="showBtns"
      >
        <div class="card-actions">
          <!-- <button v-if="data.auditState == 6"
                  @click.stop="checkRefuse"
                  class="card-actions-btn van-hairline--surround">查看拒绝原因</button> -->
          <button
            v-if="(data.auditState === 0 || data.auditState === 1 || data.auditState === 8) && (data.refundType === 1)"
            @click.stop="refundCancel(data.id)"
            class="card-actions-btn van-hairline--surround"
          >撤销退款</button>
          <button
            v-if="(data.auditState === 0 || data.auditState === 1 || data.auditState === 8) && (data.refundType === 2)"
            @click.stop="refundCancel(data.id)"
            class="card-actions-btn van-hairline--surround"
          >撤销退货</button>
          <button
            v-if="data.auditState === 2"
            @click.stop="logistics"
            class="card-actions-btn van-hairline--surround"
          >查看物流</button>
          <button
            v-if="(data.auditState === 1 || data.auditState === 8) && (data.refundType === 2)"
            @click.stop="returnGoods(data.id,data.sellUserId)"
            class="card-actions-btn van-hairline--surround"
          >寄回商品</button>
          <button
            v-if="data.auditState === 6 || data.auditState === 11"
            @click.stop="applyArbitrate(data.id)"
            class="card-actions-btn van-hairline--surround"
          >申请仲裁</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { setImg } from '~/utils/qiniu'
import { Dialog } from 'vant'
import { refundState } from '~/utils/status'

export default {
  props: {
    data: Object,
    ids: [String, Number]
  },
  data() {
    return {
      refundState,
      refundStateText: '',
      show: false,
      showBtns: true
    }
  },
  mounted() {
    this.refundStateText = this.refundState[this.data.auditState]
    if (this.data.refundType === 2) {
      if (this.data.auditState === 0) {
        this.refundStateText = '退货申请中'
      } else if (this.data.auditState === 3) {
        this.refundStateText = '退货成功'
      } else if (this.data.auditState === 4 || this.data.auditState === 6 || this.data.auditState === 9) {
        this.refundStateText = '退货失败'
      } else if (this.data.auditState === 7) {
        this.refundStateText = '退货仲裁中'
      } else if (this.data.auditState === 8) {
        this.refundStateText = '同意退货'
      }
    }
  },
  methods: {
    setImg,
    refundCancel(id) {
      Dialog.confirm({
        title: '撤销申请',
        message: '您确定撤销申请吗？撤销后不可再次申请！'
      }).then(() => {
        this.$service('userRefundCancel', {
          resources: [id]
        }).then(res => {
          this.showBtns = false
          Toast('中宝平：撤销成功')
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
    logistics() {
      this.$router.push({
        name: 'swap-order-logistics',
        query: {
          bar: this.ids,
          goods: this.data.revoList[0].skuMainPic,
          from: 'refund'
        }
      })
    },
    toOrderDetail() {
      this.$router.push({ name: 'user-orderRefund-detail', query: { id: this.data.id, orderNumber: this.data.orderNumber, state: this.data.state, type: this.data.type, img: this.data.revoList[0].skuMainPic } })
    }
  }
}
</script>

<style lang="postcss" scoped>
.app-order-item {
  margin-top: 10px;
  font-size: 12px;
  color: var(--black);
  background-color: white;
  line-height: 18px;
  & .card-bar,
  & .card-header {
    padding: 10px;
  }
  & .card-image {
    width: 100px;
    height: 100px;
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
  & .card-price {
    font-size: 15px;
  }
  & .card-footer {
    padding: 10px;
    align-items: center;
    justify-content: flex-end;
  }
  & .card-actions-btn {
    margin-right: 5px;
    padding: 4px 14px;
    background-color: #ffffff;
    border: none;
    border-radius: 3px;
    line-height: normal;
    color: #c2a374;
    &:after {
      border-radius: 36px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

.van-popup.van-popup--bottom {
  z-index: 2004;
}
</style>