<template>
  <AppView>
    <div class="bg">
      <img
        class="application-banner"
        src="../../../assets/images/application_banner.png"
        alt=""
      />
      <div class="application-info">
        中宝平适合珠宝加工厂、品牌珠宝店、珠宝零售商、珠宝设计工作室、个人珠宝设计师等从事珠宝行业相关的主体入驻。在下方留下您的联系方式后，将有专业的服务人员协助您完成入驻。
      </div>
      <div class="application-query">
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
          >提交</van-button
        >
      </div>
    </div>
  </AppView>
</template>

<script>
import Validator from "~/components/common/validator";
import AppTabbar from "~/components/swap/tabbar";

export default {
  components: {
    Validator
  },
  head() {
    return {
      title: "商家入驻申请"
    };
  },
  created() {},
  mounted() {
    document.title = "商家入驻申请";
  },
  activated() {
    document.title = "商家入驻申请";
  },
  data() {
    return {
      form: {
        companyName: "",
        contactsName: "",
        contactMobile: "",
        joinType: 0
      },
      loading: false
    };
  },
  methods: {
    submit() {
      if (
        !this.checkCompanyName() ||
        !this.checkContactsName() ||
        !this.checkContactMobile()
      ) {
        return false;
      }
      this.$service("addIntention", {
        data: this.form
      })
        .then(result => {
          // this.$toast({
          //   message: '中宝平：提交成功'
          // })
          this.$router.push({
            name: "jewelrySearch-residenceApplication-result"
          });
        })
        .catch(err => {});
    },
    checkCompanyName() {
      if (!this.form.companyName) {
        this.$toast({
          message: "中宝平：企业名称不可为空"
        });
        return false;
      } else {
        return true;
      }
    },
    checkContactsName() {
      if (!this.form.contactsName) {
        this.$toast({
          message: "中宝平：联系人不可为空"
        });
        return false;
      } else {
        return true;
      }
    },
    checkContactMobile() {
      if (!this.form.contactMobile) {
        this.$toast({
          message: "中宝平：手机号码不可为空"
        });
        return false;
      } else {
        return true;
      }
    }
  }
};
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
  margin: 24px auto 30px;
  background: #d57e6a;
  width: calc(100% - 12px);
}

.bg {
  overflow: hidden;
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-size: 15px;
  text-align: center;
  background: #fff;
  & .application-banner {
    width: 100%;
  }
  & .application-info {
    position: absolute;
    z-index: 1;
    margin: -55px 20px 10px;
    padding: 20px;
    line-height: 24px;
    color: #666;
    text-align: left;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 10px 10px -10px #d57e6a;
  }
  & .application-query {
    margin: 120px 0 0;
    padding: 0.5333rem 0.48rem 0.9867rem;
    border-radius: 0.2133rem;
    background: #fff;
  }
  & .queried {
    color: #58585a;
  }
  & .bg-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>
