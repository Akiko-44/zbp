<template>
  <AppView
    :title="title"
    :clickLeft="back"
  >
    <div class="pay-content">
      <i :class="payStatus == 3 ? 'ico-paySuccess' : 'ico-payFail'"></i>
      <p class="title">支付{{payStatus == 3 ? "成功" : "失败"}}</p>
      <div class="info">
        <p>订单编号：{{payOrderNum}}</p>
        <p>订单金额：￥ {{payAmount}}</p>
      </div>
      <van-row
        type="flex"
        justify="center"
      >
        <van-col span="9">
          <van-button
            type="default"
            class="btn"
            @click="$router.push({name: 'user-mine'})"
          >个人中心</van-button>
        </van-col>
        <van-col span="9">
          <van-button
            type="default"
            class="btn btn-pri"
            @click="$router.push({name: 'index'})"
          >返回首页</van-button>
        </van-col>
      </van-row>
      <div
        v-if="luckyDrawPic != ''"
        class="lucky-draw"
        v-lazy:background-image="setImg(luckyDrawPic, { w: 400 })"
        @click="goDraw"
      ></div>
    </div>
  </AppView>
</template>
<script>
import { setImg } from '~/utils/qiniu'
export default {
  data() {
    return {
      title: '',
      payStatus: '',
      payAmount: '',
      payOrderNum: '',
      luckyDrawUrl: '',
      luckyDrawPic: ''
    }
  },
  mounted() {
    this.payStatus = this.$route.query.payStatus
    this.payAmount = this.$route.query.payAmount
    this.payOrderNum = this.$route.query.payOrderNum
    this.luckyDrawUrl = this.$route.query.luckyDrawUrl
    this.luckyDrawPic = this.$route.query.luckyDrawPic
    if (this.payStatus == '3') {
      this.title = '支付成功'
    } else {
      this.title = '支付失败'
    }
  },
  activated() {
    this.$router.go(0)
  },
  methods: {
    setImg,
    goDraw() {
      location.href = this.luckyDrawUrl
    },
    back() {
      this.$router.replace({ name: 'user-mine' })
    }
  }
}
</script>
<style lang="postcss" scoped>
.pay-content {
  text-align: center;
  & i {
    margin: 50px 0 20px;
  }
  & .title {
    font-size: 20px;
    font-weight: bold;
  }
  & .info {
    margin: 40px auto;
    width: 250px;
    font-size: 12px;
    line-height: 22px;
    text-align: left;
    color: var(--dark-gray);
  }
  & .btn {
    width: 130px;
    height: 39px;
    line-height: 39px;
    border: 1px solid #df735a;
    border-radius: 5px;
    color: #df735a;
    &.btn-pri {
      background: #df735a;
      color: #fff;
    }
  }
  & .lucky-draw {
    width: 350px;
    height: 75px;
    margin: 30px auto;
    background-size: 350px 75px;
  }
}
</style>
