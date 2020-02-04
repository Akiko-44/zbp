<template>
  <AppView>
    <div class="bg">
      <img
        class="application-banner"
        src="../../../assets/images/application_bg.jpg"
        alt=""
      >
      <h3 class="application-link"><span
          class="download-btn"
          @click.stop="download"
        >下载申请表</span>
        <span
          class="download-btn"
          style="background: #DF735A;"
          @click="showForm = true"
        >我要入驻</span>
      </h3>

      <van-popup
        class="form-list"
        v-model="showForm"
        position="bottom"
      >
        <div class="application-query">
          <!--<h3 class="popup-title">
            <span
              class="download-btn"
              @click="download"
            >点击下载申请表，</span>或留下联系方式
          </h3>-->
          <van-field
            v-model.trim="form.companyName"
            label="企业名称："
            placeholder="请输入企业名称"
            @click-icon="form.companyName = ''"
          />
          <van-field
            v-model.trim="form.contactsName"
            label="联系人："
            placeholder="请输入联系人"
            @click-icon="form.contactsName = ''"
          />
          <van-field
            v-model.trim="form.contactMobile"
            label="手机号码："
            placeholder="请输入手机号码"
            type="number"
            :maxlength="11"
            @click-icon="form.contactMobile = ''"
          />

          <van-button
            @click="submit"
            :loading="loading"
            type="primary"
            block
            class="primary-btn submit-btn"
          >提交</van-button>

        </div>
      </van-popup>
    </div>
  </AppView>
</template>

<script>
import Validator from '~/components/common/validator'
import AppTabbar from '~/components/swap/tabbar'

export default {
  components: {
    Validator
  },
  head() {
    return {
      title: '领导小组申请'
    }
  },
  created() {
  },
  mounted() {
    document.title = '领导小组申请'
  },
  activated() {
    document.title = '领导小组申请'
  },
  data() {
    return {
      showForm: false,
      form: {
        companyName: '',
        contactsName: '',
        contactMobile: '',
        joinType: 1
      },
      loading: false
    }
  },
  methods: {
    download() {
      let src = 'http://app.gacjc.com/app/download/application.doc'
      let form = document.createElement('form')
      form.action = src
      document.getElementsByTagName('body')[0].appendChild(form)
      form.submit()
    },
    submit() {
      if (!this.checkCompanyName() || !this.checkContactsName() || !this.checkContactMobile()) {
        return false
      }
      this.$service('addIntention', {
        data: this.form
      }).then(result => {
        // this.$toast({
        //   message: '中宝平：提交成功'
        // })
        this.showForm = false
        this.$router.push({ name: 'jewelrySearch-residenceApplication-result' })
      }).catch((err) => { })
    },
    checkCompanyName() {
      if (!this.form.companyName) {
        this.$toast({
          message: '中宝平：企业名称不可为空'
        })
        return false
      } else {
        return true
      }
    },
    checkContactsName() {
      if (!this.form.contactsName) {
        this.$toast({
          message: '中宝平：证书编号不可为空'
        })
        return false
      } else {
        return true
      }
    },
    checkContactMobile() {
      if (!this.form.contactMobile) {
        this.$toast({
          message: '中宝平：手机号码不可为空'
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
  line-height: 33px;
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
  margin: 22px auto 26px;
  background: #d57e6a;
  width: calc(100% - 12px);
}

.bg {
  overflow: hidden;
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-size: 15px;
  background: #fff;
  & .application-banner {
    width: 100%;
  }
  & .application-link {
    position: fixed;
    bottom: 0;
    /*padding-left: 10px;*/
    width: 100%;
    /*line-height: 48px;*/
    height: 60px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
    & .download-btn {
      display: inline-block;
      margin: 9px 20px;
      width: 108px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #df735a;
      border-radius: 4px;
      font-size: 17px;
      color: #ffffff;
      background: linear-gradient(
        left,
        rgba(255, 126, 95, 0.4),
        rgba(254, 180, 123, 0.4)
      );
    }
  }
  & .application-query {
    padding: 10px;
    & .popup-title {
      margin: 10px 0 16px;
      font-size: 14px;
      color: #888;
      & .download-btn {
        font-size: 16px;
        color: #0099ff;
      }
    }
  }
}
</style>
