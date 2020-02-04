<template>
  <AppView title="查珠宝身份证">
    <div class="bg"></div>
    <div class="main-body">
      <div class="jewelry-id-query">
        <van-cell
          title="鉴定机构："
          :value="form.facilityName"
          is-link
          arrow-direction="down"
          @click="pickerMerchantShow = true"
        />
        <van-field
          v-model.trim="form.testNo"
          label="证书编号："
          placeholder="请输入证书编号"
          @click-icon="form.testNo = ''"
        />
        <van-field
          v-model.trim="form.queryCode"
          label="查询/防伪码："
          placeholder="请输入查询/防伪码"
          @click-icon="form.queryCode = ''"
        />

        <van-button
          @click="submit"
          :loading="loading"
          type="primary"
          block
          class="primary-btn submit-btn"
        >查询</van-button>
        <p class="queried tc">已查询{{count}}件珠宝身份信息</p>

      </div>
    </div>
    <div class="foot tc">
      <img src="../../../assets/images/foot_logo.png">
    </div>

    <van-popup
      v-model="pickerMerchantShow"
      position="bottom"
    >
      <van-picker
        :columns="merchantcolumns"
        show-toolbar
        @cancel="pickerMerchantShow = false"
        @confirm="merchantConfirm"
      />
    </van-popup>
    <AppTabbar
      :activeIndex="2"
      v-if="loadTabbar && showTabbar"
    />
  </AppView>
</template>

<script>
import Validator from '~/components/common/validator'
import AppTabbar from '~/components/swap/tabbar'

export default {
  components: {
    Validator,
    AppTabbar
  },
  head() {
    return {
      title: '查珠宝身份证'
    }
  },
  // middleware: 'auth',
  created() {
    // this.form.facilityName = '国检·NGTC'
    this.getCount()
    this.getIdentifyInstitution()
  },
  mounted() {
    // 用onresize事件监控窗口或框架被调整大小，先把一开始的高度记录下来
    const h = document.body.scrollHeight
    // 如果当前窗口小于一开始记录的窗口高度，那就让当前窗口等于一开始窗口的高度
    window.onresize = function () {
      if (document.body.scrollHeight < h) {
        document.body.style.height = h
      }
    }
    if (window.navigator.userAgent.includes('MicroMessenger')) {
      this.$nextTick(() => {
        this.inWechat = true
      })
    }
  },
  activated() {
    this.loadTabbar = false
    this.showTabbar = this.$route.params.showTabbar
    // console.log('showTabbar=', this.showTabbar)
    this.$nextTick(() => {
      this.loadTabbar = true
    })
    // this.form.facilityName = '国检·NGTC'
    this.getCount()
    this.getIdentifyInstitution()
    if (window.navigator.userAgent.includes('MicroMessenger')) {
      this.$nextTick(() => {
        this.inWechat = true
      })
    }
  },
  data() {
    return {
      form: {
        facilityName: '请选择鉴定机构',
        testFacility: '',
        testNo: '',
        queryCode: ''
      },
      pickerMerchantShow: false,
      identifyInstitution: [],
      // merchantcolumns: ['国检·NGTC', '华津国检'],
      merchantcolumns: [],
      loading: false,
      count: '',
      loadTabbar: true,
      showTabbar: false,
      inWechat: false
    }
  },
  methods: {
    getIdentifyInstitution() {
      this.$service('getIdentifyInstitution').then(result => {
        // this.count = result.data
        this.identifyInstitution = result.data
        this.merchantcolumns = this.identifyInstitution.map(item => item.name)
        // this.form.facilityName = this.merchantcolumns[0]
      }).catch((err) => { })
    },
    getCount() {
      this.$service('jewelrySearchCount').then(result => {
        this.count = result.data
      }).catch((err) => { })
    },
    merchantConfirm(value, index) {
      let self = this
      this.pickerMerchantShow = false
      this.form.facilityName = value
    },
    submit() {
      if (!this.checkFacilityName() || !this.checkTestNo() || !this.queryCode()) {
        return false
      }
      // this.loading = true
      // this.form.testFacility = this.form.facilityName === '华津国检' ? '1' : '2'
      this.identifyInstitution.map(item => {
        if (this.form.facilityName === item.name) {
          this.form.testFacility = item.code
        }
      })
      this.$router.push({
        name: 'jewelrySearch-jewelryID-list',
        query: {
          testFacility: this.form.testFacility,
          testNo: this.form.testNo,
          queryCode: this.form.queryCode
        }
      })
      // this.$service('jewelrySearchCredential', {
      //   data: this.form
      // }).then(result => {
      //   if (result.data.resp.isExist) {
      //     this.loading = false
      //     this.$router.push({
      //       name: 'jewelrySearch-jewelryID-list',
      //       query: { data: JSON.stringify(result.data) }
      //     })
      //   } else {
      //     this.loading = false
      //     this.$toast({
      //       message: '中宝平：证书编号不存在或者查询码错误'
      //     })
      //   }
      // }).catch((err) => {
      //   this.loading = false
      // })
    },
    checkFacilityName() {
      if (this.form.facilityName === '请选择鉴定机构') {
        this.$toast({
          message: '中宝平：鉴定机构不可为空'
        })
        return false
      } else {
        return true
      }
    },
    checkTestNo() {
      if (!this.form.testNo) {
        this.$toast({
          message: '中宝平：证书编号不可为空'
        })
        return false
      } else {
        return true
      }
    },
    queryCode() {
      if (!this.form.queryCode) {
        this.$toast({
          message: '中宝平：查询码不可为空'
        })
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
>>> .van-cell-group {
  &:after {
    border-top: none;
  }
}

.van-cell {
  padding-right: 0;
  padding-left: 0;
  line-height: 35px;
}

.van-cell__right-icon {
  margin-top: 5px;
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
  margin: 24px auto 15px;
  width: calc(100% - 12px);
  font-size: 18px;
  background: #d57e6a;
  border-color: #d57e6a;
  border-radius: 6px;
}

.bg {
  /* overflow: hidden;
  position: relative; */
  /* height: calc(100vh - 46px); */
  width: 100%;
  height: 310px;
  /* font-size: 15px; */
  text-align: center;
  background: url(../../../assets/images/query_idcard_bg.png) no-repeat;
  background-size: cover;
}
.main-body {
  position: relative;
  z-index: 1;
  margin: -133px 16px 0;
  border-radius: 8px;
  background: #fff;
  & .jewelry-id-title {
    margin: 35px auto 0;
    width: 295px;
    height: 40px;
  }
  & .jewelry-id-info {
    margin: 20px 18px 10px;
    padding: 25px 18px;
    line-height: 24px;
    color: #585858;
    text-align: left;
    border-radius: 8px;
    background: #fff;
  }
  & .jewelry-id-query {
    /* margin: 200px 10px 0; */
    /* padding: 20px 18px 37px; */
    padding: 0 18px 24px;
    border-radius: 8px;
    background: #fff;
  }
  & .queried {
    font-size: 15px;
    color: #999999;
  }
  & .bg-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
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