<template>
  <AppView title="完善付款信息">
    <div class="returnGoods">
      <p class="tip">付款前请先完善物流信息</p>
      <van-cell
        title="快递公司："
        :value="form.expressCompany"
        is-link
        @click="showPopup = true"
      />

      <van-field
        label="快递单号："
        input-align="right"
        v-model="form.expressNum"
        placeholder="请填写快递单号"
      />
    </div>
    <div class="design-address">
      <div class="title">设计师收货地址<span class="theme-color">（请与设计师确认收货地址）</span></div>
      <div class="receiving-address-bar">
        <img
          class="icon-address"
          src="../../../assets/images/icon/address_icon.png"
        />
        <div class="receiving-info">
          <p class="recipients">
            <span class="recipients-name">王语嫣</span>
            <span>13648573241</span>
          </p>
          <p class="receiving-address">
            <span>广东省深圳市福田区车公庙创新科技广场1期B座1508C室</span>
          </p>
        </div>
      </div>
    </div>

    <van-button
      type="primary"
      class="submit"
      @click="save"
    >立即支付</van-button>
    <van-popup
      v-model="showPopup"
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
export default {
  data() {
    return {
      addr: "",
      consignee: "",
      mobileNum: "",
      form: {
        expressCompany: "",
        expressNum: "",
        remark: "",
        orderId: ""
      },
      showPopup: false,
      columns: []
    };
  },
  deactivated() {
    this.$destroy();
  },
  created() {
    this.form.orderId = this.$route.query.id;
    let sellUserId = this.$route.query.sellUserId;
    // this.$service("userRefundAddr", { resources: [sellUserId] })
    //   .then(result => {
    //     this.addr = result.data.addr;
    //     this.consignee = result.data.consignee;
    //     this.mobileNum = result.data.mobileNum;
    //   })
    //   .catch(() => {});
    this.$service("userExpress", { data: {} })
      .then(result => {
        this.columns = result.data;
        this.form.expressCompany = this.columns[0];
      })
      .catch(() => { });
  },
  methods: {
    save() {
      if (!this.form.expressNum) {
        this.$toast("请填写快递单号");
        return false;
      } else {
        if (!/^[0-9a-zA-Z]{1,}$/.test(this.form.expressNum)) {
          this.$toast("请填写正确的物流单号");
          return false;
        }
        this.$service("userSaveExpress", { data: this.form }).then(result => {
          if (result.success) {
            if (this.$native.isApp()) {
              this.$native.goToPay({
                billID: this.detail.payBillId,
                payOrderType: 0
              });
            } else {
              if (this.$native.isACity() == 2) {
                this.$native.goToPay({
                  billID: this.detail.payBillId,
                  payOrderType: 0
                })
              } else {
                this.$router.push({
                  name: "swap-order-pay",
                  query: { id: this.detail.payBillId }
                })
              }
            }
          } else {
            this.$toast(result.msg);
          }
        });
      }
    },
    onCancel() {
      this.showPopup = false;
    },
    onConfirm(value, index) {
      this.showPopup = false;
      this.form.expressCompany = value;
    }
  }
};
</script>

<style lang="postcss" scoped>
.returnGoods {
  font-size: 12px;
  background: #ffffff;
  margin: 10px;
  border-radius: 5px;
  & .tip {
    color: #999999;
    font-size: 14px;
    padding: 17px 16px 5px;
  }
}
.submit.van-button {
  margin: 50px 12px 0;
  width: 351px;
  border-radius: 4px;
}
.design-address {
  margin: 10px;
  margin-top: 0;
  padding: 0 10px;
  width: 355px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 5px;
  & .title {
    padding-top: 15px;
    font-size: 14px;
    color: #333333;
  }
}
.receiving-address-bar {
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  & .icon-address {
    width: 34px;
    height: 34px;
    margin-right: 13px;
  }
  & .receiving-info {
    width: calc(100% - 40px);
    line-height: 20px;
    font-size: 13px;
    color: #999999;
  }
  & .recipients {
    margin-bottom: 5px;
    font-size: 14px;
    color: #666666;
    line-height: 16px;
    & .recipients-name {
      margin-right: 10px;
      font-size: 16px;
    }
  }
}
.theme-color {
  color: #df735a;
}
</style>
