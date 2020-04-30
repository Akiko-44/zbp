<template>
  <div>
    <AppView
      :title="title"
      v-if="isShow"
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
          v-if="luckyDrawPic"
          class="lucky-draw"
          v-lazy:background-image="setImg(luckyDrawPic, { w: 400 })"
          @click="goDraw"
        ></div>
      </div>
    </AppView>
    <iframe
      :src="path"
      width="100%"
      height="1000vh"
      frameborder="0"
      scrolling="auto"
      v-if="!isShow"
    ></iframe>
  </div>
</template>
<script>
import { setImg } from '~/utils/qiniu'
export default {
  data() {
    return {
      isShow: false,
      path: '',
      bid: '',
      title: '',
      payStatus: '',
      payAmount: '',
      payOrderNum: '',
      luckyDrawUrl: '',
      luckyDrawPic: ''
    };
  },
  mounted() {
    this.path = this.$route.params.path
    // this.bid = this.$route.query.bid
    // if (window.history && window.history.replaceState) {
    //   // 向历史记录中插入了当前页
    //   history.replaceState(null, null, document.URL)
    //   window.addEventListener("popstate", this.goBack, false)
    // }
  },
  activated() {
    let exp = this.$route.params.path
    if (!exp) {
      this.goBack()
    } else {
      window.location.href = this.$route.params.path
      window.addEventListener("pageshow", this.goBack, false)
      // location.reload()
      //   this.$router.replace({name: 'swap-order-payInfo',query:{
      //     bid:this.$route.query.bid
      //   }})
    }
  },
  deactivated() {
    window.removeEventListener("pageshow", this.goBack, false)
    this.$destroy()
  },
  // destroyed() {
  // window.removeEventListener("popstate", this.goBack, false)
  // },
  methods: {
    setImg,
    goDraw() {
      location.href = this.luckyDrawUrl
    },
    goBack() {
      this.$service("appPayInfo", { resources: [this.$route.query.bid] }).then(result => {
        /**
         * 1- 待支付
         * 2- 支付中
         * 3- 支付成功
         * 4- 支付失败
         * 5- 支付取消
         *
         *
         * payAmount： 订单金额
         * payStatus： 订单编号
         */
        var tag = result.data.payStatus;
        switch (tag) {
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;

          default:
            break;
        }
        // 查询后跳转到详情页
        /* this.$router.replace({name: 'swap-order-payResult',query:{
          payAmount: result.data.payAmount,
          payStatus: result.data.payStatus,
          payOrderNum: result.data.billId
          }}); */
        this.payStatus = result.data.payStatus
        this.payAmount = result.data.payAmount
        this.payOrderNum = result.data.billId
        this.luckyDrawUrl = result.data.luckyDrawUrl
        this.luckyDrawPic = result.data.luckyDrawPic
        if (this.payStatus == '3') {
          this.title = '支付成功'
        } else {
          this.title = '支付失败'
        }
        this.isShow = true
      })
    },
    reload() {
      location.reload()
    }
  }
};
</script>

<style lang="postcss" scoped>
#__layout {
  background: #fff;
}
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
