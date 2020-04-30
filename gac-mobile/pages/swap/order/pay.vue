<template>
  <AppView
    class="confirm-order"
    title="选择支付方式"
  >
    <van-radio-group v-model="payChannel">
      <van-cell-group>
        <van-cell
          title="微信支付"
          clickable
          v-if="isFromWeiXinFlag"
        >
          <i
            class="ico-wechat"
            slot="icon"
          ></i>
          <van-radio
            slot="right-icon"
            name="20"
            checked-color="#df735a"
          />
        </van-cell>
        <van-cell
          title="支付宝支付"
          clickable
          v-else
        >
          <i
            class="ico-alipay"
            slot="icon"
          ></i>
          <van-radio
            slot="right-icon"
            name="10"
            checked-color="#df735a"
          />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div style="padding: 30px 10px 0;">
      <van-button
        type="primary"
        size="small"
        @click="gotopay"
        block
      >立即支付</van-button>
    </div>
  </AppView>
</template>

<script>
export default {
  data() {
    return {
      billID: "",
      payChannel: "",
      isFromWeiXinFlag: false
    }
  },
  activated() {
    this.billID = this.$route.query.id
    this.isFromWeiXin()
  },
  methods: {
    gotopay() {
      let param = {
        id: this.billID,
        payChannel: this.payChannel // 10 支付宝       20 微信
      }
      if (this.payChannel == 10) {
        this.$service("appPay", { params: param }).then(result => {
          var payData = JSON.parse(result.data.appPayData)
          var path = payData.qrCode

          // 调起支付
          // self.location.href = path;
          this.$router.replace({
            name: 'swap-order-payInfo',
            query: {
              bid: this.billID
            }, params: {
              path: payData.qrCode,
            }
          })
        })
      } else {
        this.$service("wechatPay", { params: param }).then(result => {
          window.location.href = result.data
        })
      }
    },
    isFromWeiXin() {
      if (window.navigator.userAgent.includes('MicroMessenger')) {
        this.isFromWeiXinFlag = true;
        this.payChannel = "20"
      } else {
        this.isFromWeiXinFlag = false;
        this.payChannel = "10"
      }
    }
  }
}
</script>

<style>
</style>