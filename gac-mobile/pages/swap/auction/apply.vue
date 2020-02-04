<template>
  <AppView class="apply">
    <DefaultAddress />
    <van-cell-group class="padding">
      <van-cell>
        需缴纳保证金：<span class="red large">￥{{price}}</span>
      </van-cell>
      <van-cell class="desc">
        <p>1. 竞拍不成功，保证金将全额退还</p>
        <p>2. 竞品成功，保证金如果小于成交价，将转为货款的一部分</p>
        <p>3. 请在48小时以内支付尾款，逾期将扣除保证金</p>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="padding pay">
      <van-cell>
        <van-button
          :loading="loading"
          @click="submit"
          class="primary-btn"
          type="primary"
          style="margin-bottom: 10px"
        >
          确认并支付保证金
        </van-button>
        <van-checkbox v-model="form.checked">
          <p class="agreement">我已阅读并同意<span class="blue" @click="$router.push({ name: 'swap-auction-agreement' })">《用户竞拍协议》</span></p>
        </van-checkbox>
      </van-cell>
    </van-cell-group>
  </AppView>
</template>

<script>
import DefaultAddress from '~/components/swap/defaultAddress'

export default {
  components: {
    DefaultAddress
  },
  data () {
    return {
      form: {
        checked: false
      },
      price: '',
      loading: false
    }
  },
  middleware: 'auth',
  async beforeMount () {
    await this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated () {
    // 商品详情
    this.$loading(this.$service('swapAuctionDetail', { resources: [this.$route.query.id] }))
      .then(data => data.data)
      .then(detail => {
        this.price = detail.deposit
      })
    if (this.$native.isApp()) {
    	this.$native.getTitle('支付保证金')
    }
  },
  methods: {
    submit () {
      if (!this.form.checked) return this.$toast('请同意《用户竞拍协议》')
      this.loading = true
      this.$service('swapAuctionJoin', {
        data: {goodsId: this.$route.query.id}
      })
        .then(result => {
          this.loading = false
          this.$toast({ type: 'success', message: '报名成功' })
          this.$native.goToIOSPay({
            billID: result.data.id,
            payOrderType: 1
          })
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.apply {
  min-height: 100%;
  background-color: var(--light-gray);
}
.padding {
  margin-top: 10px;
}
.large {
  font-size: 16px;
}
.desc {
  font-size: 12px;
  color: var(--gray);
}
.pay {
  & >>> .van-cell__value--alone {
    text-align: center;
  }
}
.agreement {
  color: var(--drak-gray);
  font-size: 12px;
}
</style>
