<template>
  <AppView title="查询结果">
    <div v-if="(form.testFacility == '2') && success">
      <div
        class="result-item"
        v-for="(item,index) in detail"
        :key="index"
      >
        <p
          class="result-title"
          v-if="item.CHName !== '　'"
        >{{item.CHName}}：</p>
        <img
          :src="item.value"
          alt=""
          v-if="item.value.includes('http')"
        >
        <p
          class="result-info"
          v-else
        >{{item.value}}</p>
      </div>
    </div>
    <div
      v-if="form.testFacility == '1' && success"
      class="result-img"
    >
      <iframe
        :src="backgroundImageUrl"
        frameborder="0"
      ></iframe>
    </div>
    <div
      class="result-item"
      v-if="platform && success"
    >
      <p class="result-title">出售平台：</p>
      <p class="result-info">{{platform}}</p>
    </div>
    <div
      class="err-tip"
      v-show="!success"
    >
      <!-- <p>证书编号不存在或者查询码错误</p> -->
      <!-- <img
        src="../../../../assets/images/noResult.png"
        alt=""
      > -->
      <img src="../../../../assets/images/emptylist.png" />
      <p>无查询结果</p>
    </div>
  </AppView>
</template>

<script>
export default {
  head() {
    return {
      title: '查询结果'
    }
  },
  data() {
    return {
      form: {
        testFacility: '',
        testNo: '',
        queryCode: ''
      },
      detail: [],
      backgroundImageUrl: '',
      platform: '',
      success: true,
    }
  },
  mounted() {
    this.form.testFacility = this.$route.query.testFacility
    this.form.testNo = this.$route.query.testNo
    this.form.queryCode = this.$route.query.queryCode
    if (this.form.testFacility && this.form.testNo && this.form.queryCode) {
      this.getList()
    } else {
      this.success = false
    }
  },
  activated() {
    this.form.testFacility = this.$route.query.testFacility
    this.form.testNo = this.$route.query.testNo
    this.form.queryCode = this.$route.query.queryCode
    // this.getList()
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    getList() {
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      this.$service('jewelrySearchCredential', {
        data: this.form
      }).then(result => {
        this.$toast.clear()
        if (this.form.testFacility == '2') {
          if (result.data.resp.isExist) {
            this.detail = result.data.resp.certData
            let imgObj = {}
            this.detail.map((item, i) => {
              if (item.status == 1) {
                imgObj = item
                this.detail.splice(i, 1)
              }
            })
            this.detail.unshift(imgObj)
            this.platform = result.data.exist ? '中国珠宝云平台' : '其他'
          } else {
            this.showErrTip()
          }
        } else {
          if (result.data.resp.success) {
            this.backgroundImageUrl = result.data.resp.data.orderInfo.HtmlUrl
            this.platform = result.data.exist ? '中国珠宝云平台' : '其他'
          } else {
            this.showErrTip()
          }
        }
      }).catch((err) => {
        this.$toast.clear()
        this.showErrTip()
      })
    },
    showErrTip() {
      this.success = false
      // this.$toast({
      //   message: '中宝平：证书编号不存在或者查询码错误'
      // })
    }
  },
}
</script>

<style lang="postcss" scope>
.result-item {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background: #fff;
  font-size: 12px;
  line-height: 12px;
  color: #585858;
  & .result-title {
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }
  & img {
    width: 100%;
  }
}
.result-img iframe {
  width: 100%;
  height: 750px;
}
.platform {
  margin-bottom: 18px;
  padding-left: 14px;
  font-size: 12px;
  color: #585858;
}
.err-tip {
  text-align: center;
  & img {
    margin-top: 100px;
    width: 100%;
  }
  & p {
  }
}
</style>
