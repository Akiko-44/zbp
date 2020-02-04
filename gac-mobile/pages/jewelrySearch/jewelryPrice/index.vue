<template>
  <AppView title="查珠宝价格">
    <div class="bg"></div>
    <div class="main-body">
      <div class="jewelry-price-text tc">
        <h2>查到珠宝的参考价格范围</h2>
        <p>此范围由平台“领导小组”提供规则，大数据计算出来</p>
      </div>
      <div class="jewelry-price-info">
        <div class="jewelry-price-query">
          <van-field
            v-model="form.search"
            ref="queryPriceInput"
            left-icon="search"
            placeholder="请输入商品名称/货号/条形码"
            @click-icon="form.queryCode = ''"
          >
          </van-field>
          <van-button
            @click="submit"
            type="primary"
            block
            class="primary-btn submit-btn"
          >查询</van-button>

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
      title: '查珠宝价格'
    }
  },
  // middleware: 'auth',
  data() {
    return {
      form: {
        search: ''
      },
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
    submit() {
      if (!this.form.search) {
        this.$toast({
          message: '中宝平：查询条件不可为空'
        })
        return false
      }
      this.$router.push({
        name: 'jewelry-product',
        query: { searchWord: this.form.search }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.van-cell {
  padding-right: 40px;
  padding-left: 18px;
  border-radius: 6px;
  background: #eeeeee;
}

.van-cell:not(:last-child)::after {
  left: 0;
}

>>> .van-cell__value {
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}

.van-cell-text {
  padding-right: 38px;
}
>>> .van-cell__title {
  text-align: left;
  max-width: 2.4rem;
}

.submit-btn {
  margin-top: 20px;
  width: 100%;
  font-size: 18px;
  background: #d57e6a;
  border-color: #d57e6a;
  border-radius: 6px;
}

.bg {
  /* position: relative;
  overflow: hidden; */
  width: 100%;
  /* height: calc(100vh - 46px); */
  height: 310px;
  /* font-size: 15px; */
  text-align: center;
  background-image: url(../../../assets/images/query_jewelry_price_bg.png);
  background-size: cover;
  /* background-color: #1a7aea; */
  background-repeat: no-repeat;
}
.main-body {
  position: relative;
  z-index: 1;
  margin: -133px 16px 0;
  border-radius: 8px;
  background: #fff;
  & .jewelry-price-text {
    margin: 0 10px;
    padding: 12px 12px 28px;
    font-size: 12px;
    color: #333333;
    & h2 {
      line-height: 39px;
      font-size: 20px;
    }
  }
  & .jewelry-price-info {
    box-sizing: border-box;
    /* margin: 26px 8px 54px;
    padding: 26px 22px 0; */
    /* width: calc(100% - 16px); */
    height: 192px;
    line-height: 24px;
    color: #585858;
    text-align: left;
    /*background: url("../../../assets/images/query_jewelry_price_text.png")
      no-repeat;
    background-size: contain;*/
  }
  & .jewelry-price-query {
    position: relative;
    /* margin: 70px 0 0; */
    padding: 0 15px;
    background: #fff;
    border-radius: 4px;
    & .ico-jewelry_price_scan {
      position: absolute;
      top: 14px;
      right: 15px;
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