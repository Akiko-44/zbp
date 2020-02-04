<template>
  <AppView :title="title"
           :clickLeft="back">
    <div class="pay-content">
      <i :class="payStatus == 3 ? 'ico-paySuccess' : 'ico-payFail'"></i>
      <p class="title">支付{{payStatus == 3 ? "成功" : "失败"}}</p>
      <div class="info">
        <p>订单编号：{{payOrderNum}}</p>
        <p>订单金额：￥ {{payAmount}}</p>
      </div>
      <van-row type="flex" justify="center">
        <van-col span="9">
          <van-button type="default" @click="$router.push({name: 'user-mine'})">个人中心</van-button>
        </van-col>
        <van-col span="9">
        <van-button type="default" @click="$router.push({name: 'index'})">返回首页</van-button>
        </van-col>
      </van-row>
    </div>
  </AppView>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      payStatus: '',
      payAmount: '',
      payOrderNum: ''
    }
  },
  mounted () {
    this.payStatus = this.$route.query.payStatus
    this.payAmount = this.$route.query.payAmount
    this.payOrderNum = this.$route.query.payOrderNum
    if(this.payStatus == '3') {
      this.title = '支付成功'
    }else {
      this.title = '支付失败'
    }
  },
  activated() {
    this.$router.go(0)
  },
  methods: {
    back() {
      this.$router.replace({name: 'user-mine' })
    }
  }
}
</script>
<style lang="postcss" scoped>
  .pay-content{
    text-align: center;
    & i{
      margin: 50px 0 20px;
    }
    & .title{
      font-size: 20px;
      font-weight: bold;
    }
    & .info{
      margin: 40px auto;
      width: 250px;
      font-size: 12px;
      line-height: 22px;
      text-align: left;
      color: var(--dark-gray);
    }
  }
</style>