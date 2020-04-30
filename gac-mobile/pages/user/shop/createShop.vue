<template>
  <AppView
    class="shop"
    :title="title"
    :clickLeft="clickLeft"
  >
    <div v-if="hasMerchantType && loadData">
      <div
        class="success-state"
        v-if="failPassed"
      >
        <div class="imgwrap">
          <img src="../../../assets/images/nopass.gif" />
        </div>
        <h4 class="text">审核不通过 </h4>
        <p>原因：{{errorMessage}}</p>
        <van-button
          type="primary"
          class="primary-btn block"
          @click="linkTo(merchantType)"
        >编辑资料</van-button>
      </div>
      <div
        class="success-state"
        v-else
      >
        <div class="imgwrap">
          <img src="../../../assets/images/audit.gif" />
        </div>
        <h4 class="text">审核中 </h4>
        <p>审核中，请耐心等待...</p>
      </div>
    </div>
    <div
      class="type"
      v-else-if="loadData"
    >
      <div class="type-item jewelry">
        <h4>珠宝店</h4>
        <p>B2C模式，适合品牌珠宝店申请</p>
        <van-button
          type="primary"
          class="primary-btn block"
          block
          @click="linkTo(1)"
        >我要认证</van-button>
      </div>
      <div class="type-item designer">
        <h4>设计师</h4>
        <p>B2C模式，适合个人设计师申请</p>
        <van-button
          type="primary"
          class="primary-btn block"
          block
          @click="linkTo(2)"
        >我要认证</van-button>
      </div>
      <div class="type-item maker">
        <h4>制造间</h4>
        <p>B2B模式，适合珠宝加工厂申请</p>
        <van-button
          type="primary"
          class="primary-btn block"
          block
          @click="linkTo(3)"
        >我要认证</van-button>
      </div>
    </div>
    <van-dialog
      v-model="chooseShow"
      show-cancel-button
      :before-close="beforeClose"
      title="选择认证主体"
    >
      <van-radio-group
        v-model="form.registType"
        @change="radioChange"
        style="display: flex;line-height: 30px;"
      >
        <van-radio :name="2">企业</van-radio>
        <van-radio :name="1">个人</van-radio>
      </van-radio-group>
    </van-dialog>
  </AppView>
</template>

<script>
export default {
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      merchantType: '',
      errorMessage: '',
      hasMerchantType: false,
      failPassed: false,
      loadData: false,
      title: '',
      chooseShow: false,
      form: {
        registType: 2
      }
    }
  },
  middleware: 'auth',
  beforeMount() {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated() {
    this.$service("checkUser")
      .then(result => {
        if (this.$route.query.type === '4') {
          this.linkTo(result.data.merchantType)
          return
        }
        let isHide = result.data.isHide
        let isCheck = result.data.isCheck
        this.form.registType = result.data.registType
        // 审核状态isCheck0、企业认证待审核1、审核通过（待签约）2、审核不通过3、签约中4、签约成功5、入网审核中6、入网成功7、入网失败8、对公账户待验证9、风控审核中10、资料验证失败11、开店待审核12、开店成功(待企业认证)

        this.merchantType = result.data.merchantType
        this.errorMessage = result.data.errorMessage
        if (isHide == 0 && this.merchantType != 0) {
          this.hasMerchantType = true
          this.title = '审核结果'
        } else {
          this.title = '选择认证类型'
        }
        if (isHide == 0 && (isCheck === 2 || isCheck === 7 || isCheck === 10) && this.merchantType != 0) {
          this.failPassed = true
        } else {
          this.failPassed = false
        }
        this.loadData = true
      })
      .catch(err => { })
  },
  methods: {
    clickLeft() {
      this.$router.push({ name: 'user-shop' })
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        localStorage.setItem('form', JSON.stringify({ registType: this.form.registType }))
        this.$router.push({
          name: 'user-shop-create',
          query: { merchantType: 1, step: 2 }
        })
        setTimeout(done, 100)
      } else {
        done();
      }
    },
    radioChange(name) {
      localStorage.setItem('form', JSON.stringify({ registType: name }))
    },
    linkTo(merchantType) {
      localStorage.setItem('merchantType', merchantType)
      localStorage.removeItem('form')
      if (merchantType == 1) {
        // this.$router.push({
        //   name: 'user-shop-create',
        //   query: { merchantType, step: 1 }
        // })
        // localStorage.setItem('form', JSON.stringify({ registType: '' }))
        this.chooseShow = true
      } else {
        this.$router.push({
          name: 'user-shop-create',
          query: { merchantType, step: 2 }
        })
        if (merchantType == 2) {
          localStorage.setItem('form', JSON.stringify({ registType: 1 }))
        } else if (merchantType == 3) {
          localStorage.setItem('form', JSON.stringify({ registType: 2 }))
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.success-state {
  text-align: center;
  & .imgwrap {
    padding-top: 95px;
    & img {
      width: 146px;
    }
  }
  & .text {
    margin: 30px auto 16px;
    width: 100%;
    color: var(--black);
    width: 100%;
    font-size: 18px;
    font-weight: bold;
  }
  & p {
    padding: 0 20px;
    line-height: 20px;
    font-size: 15px;
    color: var(--gray);
  }
  & button {
    margin-top: 20px;
    background: #d57e6a;
  }
}
.type-item {
  height: 147px;
  border-radius: 6px;
  background: #dadada;
  font-size: 15px;
  text-align: center;
  width: 355px;
  margin: 10px auto;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  &.jewelry {
    background: url(../../../assets/images/jewelryShop.png) no-repeat center;
  }
  &.designer {
    background: url(../../../assets/images/designerShop.png) no-repeat center;
  }
  &.maker {
    background: url(../../../assets/images/makeShop.png) no-repeat center;
  }
  & h4 {
    font-size: 18px;
    font-weight: bold;
  }
  & p {
    padding: 20px 0;
  }
  & button {
    margin: 0 auto;
    width: 170px;
    height: 45px;
    color: #ffffff;
    background: #d57e6a;
    border-color: #d57e6a;
    border-radius: 3px;
  }
}
>>> .van-radio-group {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  line-height: 30px;
  margin: 15px auto;
}
>>> .van-radio__icon {
  padding: 4px;
}

/*.type {
  padding-top: 20px;
}
.item {
  padding: 35px 23px;
  margin: 0 auto;
  width: 340px;
  max-width: 100%;
  min-height: 360px;
  background-color: white;
  text-align: center;
  box-sizing: border-box;
  font-size: 15px;
  border-radius: 5px;
  & img {
    width: 75px;
    height: 75px;
  }
  & h4 {
    padding-top: 35px;
    font-weight: bold;
    font-size: 18px;
  }
  & p {
    line-height: 24px;
    color: #666;
  }
  & span {
    margin: 20px auto;
    display: block;
    height: 3px;
    width: 33px;
    background-color: var(--brown);
  }
  & .block {
    margin-top: 30px;
    border-radius: 20px;
  }
}
>>> .van-swipe {
  height: 395px;
}
>>> .van-swipe__indicator--active {
  background-color: var(--brown);
}

.van-swipe__indicator {
  display: block;
}*/
</style>
