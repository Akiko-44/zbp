<template>
  <div class="app-order-item">
    <div class="card-bar row-between vertical van-hairline--bottom">
      <p v-if="data.barLeftText">{{data.barLeftText}}</p>
      <p class="red">{{data.barRightText}}</p>
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
          <div class="card-name">{{goods.skuName}}</div>
        </div>
        <div class="card-title">{{data.title}}</div>
        <div class="card-describe">
          <p class="red">￥{{goods.unitPrice}}</p>
        </div>
      </div>
    </div>
    <div class="card-footer row-between van-hairline--top">
      <p>
        <span class="card-price red">{{data.price}}</span>
      </p>
      <div class="card-actions">
        <button
          @click="lookBtn"
          v-if="data.auditState == 6"
          class="card-actions-btn van-hairline--surround"
        >查看拒绝原因</button>
        <button
          @click="getRefundAddrBtn"
          v-if="data.auditState == 1"
          class="card-actions-btn van-hairline--surround"
        >查看退货地址</button>
        <button
          @click="refundBtn"
          v-if="data.auditState == 1"
          class="card-actions-btn van-hairline--surround"
        >退货</button>
        <button
          @click="cancelBtn"
          v-if="data.auditState == 1 || data.auditState == 0"
          class="card-actions-btn van-hairline--surround"
        >取消申请</button>
        <button
          @click="toDetail"
          class="card-actions-btn van-hairline--surround"
        >服务详情</button>
      </div>
    </div>

  </div>

</template>

<script>
import { setImg } from '~/utils/qiniu'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    id: [String, Number],
    refundLog: String,
    sellUserId: [String, Number]
  },
  data() {
    return {
      refundAddrDetail: {}
    }
  },
  methods: {
    setImg,
    lookBtn() {
      this.$toast(this.refundLog)
    },
    getRefundAddrBtn() {
      this.showAddr = true
      this.$service('refundAddr', { resources: [this.sellUserId] })
        .then(result => {
          this.refundAddrDetail = result.data
          this.refundAddr()
        })
        .catch(() => ([]))
    },
    refundAddr() {
      this.$emit('refundAddr', JSON.parse(JSON.stringify(this.refundAddrDetail)))
    },
    cancelBtn() {
      this.$service('refundCancel', { resources: [this.id] })
        .then(result => {
          if (this.$native.isApp()) {
            this.$native.goToHome()
          } else {
            this.$router.push({
              name: 'user-mine-double'
            })
          }
        })
        .catch(() => ([]))
    },
    toDetail() {
      this.$router.push({
        name: 'refund-detail',
        query: { id: this.id }
      })
    },
    refundBtn() {
      this.$router.push({
        name: 'refund-refundGoods',
        query: { id: this.id, sellUserId: this.sellUserId }
      })
    }
  }
}
</script>

<style lang="postcss">
.app-order-item {
  border-top: 10px solid #f8f8f8;
  font-size: 13px;
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
  }
  & .card-actions-btn {
    margin-right: 5px;
    padding: 4px 8px;
    background-color: var(--light-gray);
    border: none;
    border-radius: 3px;
    line-height: normal;
    &:after {
      border-radius: 4px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>