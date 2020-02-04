<template>
  <AppView title="寄回商品">
    <div class="returnGoods">
      <div class="returnInfos">
        <p>退货地址：{{addr}}</p>
        <p>收货人：{{consignee}}</p>
        <p>联系电话：{{mobileNum}}</p>
      </div>
      <van-cell :value="form.expressCompany"
                is-link
                arrow-direction="down"
                @click="showPopup = true" />
      <van-field v-model="form.expressNum"
                 placeholder="请输入物流单号" />
      <textarea placeholder="请输入备注信息"
                :maxlength="200"
                v-model="form.remark"></textarea>
    </div>
    <van-button type="primary"
                class="submit"
                @click="save">提交</van-button>
    <van-popup v-model="showPopup"
               position="bottom">
      <van-picker show-toolbar
                  :columns="columns"
                  @cancel="onCancel"
                  @confirm="onConfirm" />
    </van-popup>

  </AppView>
</template>

<script>
export default {
  data() {
    return {
      addr: '',
      consignee: '',
      mobileNum: '',
      form: {
        expressCompany: '',
        expressNum: '',
        remark: '',
        orderId: '',
      },
      showPopup: false,
      columns: []
    }
  },
  deactivated() {
    this.$destroy()
  },
  created() {
    this.form.orderId = this.$route.query.id
    let sellUserId = this.$route.query.sellUserId
    this.$service('userRefundAddr', { resources: [sellUserId] }).then(result => {
      this.addr = result.data.addr
      this.consignee = result.data.consignee
      this.mobileNum = result.data.mobileNum
    }).catch(() => { })
    this.$service('userExpress', { data: {} }).then(result => {
      this.columns = result.data
      this.form.expressCompany = this.columns[0]
    }).catch(() => { })
  },
  methods: {
    save() {
      if (!this.form.expressNum) {
        this.$toast('中宝平：请输入物流单号')
        return false
      } else {
        if (!/^[0-9a-zA-Z]{1,}$/.test(this.form.expressNum)) {
          this.$toast('中宝平：请输入正确的物流单号')
          return false
        }
        this.$service('userSaveExpress', { data: this.form }).then(result => {
          if (result.success) {
            this.$router.push({ name: 'user-orderRefund-list' })
            setTimeout(() => {
              this.$toast('中宝平：提交成功')
            }, 200)
          } else {
            this.$toast(result.msg)
          }
        })
      }
    },
    onCancel() {
      this.showPopup = false
    },
    onConfirm(value, index) {
      this.showPopup = false
      this.form.expressCompany = value
    },
  }
}
</script>

<style lang="postcss" scoped>
.returnGoods {
  font-size: 12px;
  padding: 10px;
  & .returnInfos {
    margin-left: 10px;
    margin-bottom: 10px;
    line-height: 20px;
  }
}
.van-cell {
  margin-bottom: 10px;
  background: var(--bg);
  font-size: 12px;
}
textarea {
  width: 355px;
  box-sizing: border-box;
  height: 150px;
  resize: none;
  padding: 10px;
  background: var(--bg);
  border: 1px solid rgb(204, 204, 204);
}
.submit.van-button {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0;
  background: #c2a374;
}
</style>
