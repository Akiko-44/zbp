<template>
  <AppView
    title="打假保真"
    :clickLeft="goHome"
  >
    <div class="bg"></div>
    <div class="main-body">
      <div class="attack-fake-text">
        查到诚信企业排名、消费者投诉情况、投诉处理等情况。
      </div>
      <div class="attack-fake-info">
        <div
          class="attack-fake-item"
          @click="toCreditEnterprise"
        >
          <img
            src="../../../assets/images/icon_enterprise.png"
            alt=""
          >
          <p>诚信企业</p>
        </div>
        <div
          class="attack-fake-item"
          @click="toBusinessDirectory"
        >
          <img
            src="../../../assets/images/icon_directory.png"
            alt=""
          >
          <p>企业名录</p>
        </div>
        <div
          class="attack-fake-item"
          @click="toComplaints"
        >
          <img
            src="../../../assets/images/icon_entrance.png"
            alt=""
          >
          <p>投诉入口</p>
        </div>
        <div
          class="attack-fake-item"
          @click="toComplaintsList"
        >
          <img
            src="../../../assets/images/icon_publicity.png"
            alt=""
          >
          <p>处理公示</p>
        </div>
        <div
          class="attack-fake-item"
          @click="toFakeQuery"
        >
          <img
            src="../../../assets/images/icon_query.png"
            alt=""
          >
          <p>打假查询</p>
        </div>
      </div>
    </div>
    <div class="foot tc">
      <img src="../../../assets/images/foot_logo.png">
    </div>
  </AppView>
</template>

<script>
export default {
  head() {
    return {
      title: '打假保真'
    }
  },
  // middleware: 'auth',
  data() {
    return {
      inWechat: false
    }
  },
  beforeMount() {
    if (window.navigator.userAgent.includes('MicroMessenger')) {
      this.$nextTick(() => {
        this.inWechat = true
      })
    }
  },
  activated() {
    if (window.navigator.userAgent.includes('MicroMessenger')) {
      this.$nextTick(() => {
        this.inWechat = true
      })
    }
  },
  methods: {
    toCreditEnterprise() {
      this.$router.push({
        name: 'creditEnterprise-index'
      })
    },
    toBusinessDirectory() {
      this.$router.push({
        name: 'jewelrySearch-businessDirectory'
      })
    },
    toComplaints() {
      this.$router.push({
        name: 'complaints'
      })
    },
    toComplaintsList() {
      this.$router.push({
        name: 'complaints-list'
      })
    },
    toFakeQuery() {
      this.$router.push({
        name: 'jewelrySearch-jewelryID'
      })
    },
    goHome() {
      this.$router.push({
        name: 'index'
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.bg {
  width: 100%;
  /* height: calc(100vh - 46px); */
  height: 310px;
  text-align: center;
  background-image: url(../../../assets/images/counterfeit_fidelity_bg.png);
  background-size: cover;
  background-repeat: no-repeat;
}
.main-body {
  position: relative;
  z-index: 1;
  margin: -133px 16px 0;
  border-radius: 8px;
  background: #fff;
  & .attack-fake-text {
    margin: 0 10px;
    padding: 12px 12px 28px;
    line-height: 36px;
    font-size: 17px;
    color: #333333;
    border-bottom: 1px dashed #ffdfd4;
  }
  & .attack-fake-info {
    box-sizing: border-box;
    display: flex;
    padding-top: 23px;
    height: 180px;
    line-height: 24px;
    font-size: 12px;
    color: #666666;
    white-space: nowrap;
    & .attack-fake-item {
      flex: 1;
      text-align: center;
      & img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
.foot {
  position: fixed;
  bottom: 15px;
  left: 0;
  right: 0;
  & img {
    width: 189px;
  }
}
</style>