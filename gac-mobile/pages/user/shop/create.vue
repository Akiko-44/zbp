<template>
  <AppView
    class="create"
    id="create"
    :title="title"
    :clickLeft="goBack"
  >
    <template v-if="!success">
      <step1
        v-show="step === 1"
        @submit="submit"
        :merchantType="merchantType"
        :form1="form"
      />
      <step2
        ref="step2"
        v-show="step === 2"
        @submit="submit"
        :merchantType="merchantType"
        :form2="form"
        :registType="registType"
      />
      <step3
        v-show="step === 3"
        @submit="submit"
        :merchantType="merchantType"
        :form3="form"
        :registType="registType"
      />
      <step4
        v-show="step === 4"
        @submit="submit"
        :merchantType="merchantType"
        :form4="form"
        :registType="registType"
      />
      <step5
        v-show="step === 5"
        @submit="submit"
        :merchantType="merchantType"
        :form5="form"
        :mobile="mobile"
        :registType="registType"
        :nextNumProp="nextNumProp"
      />
    </template>
    <transition name="van-fade">
      <template v-if="success">
        <success to="user-shop-createShop" />
      </template>
    </transition>
  </AppView>
</template>

<script>
import Step1 from "./modules/createStep1.vue";
import Step2 from "./modules/createStep2.vue";
import Step3 from "./modules/createStep3.vue";
import Step4 from "./modules/createStep4.vue";
import Step5 from "./modules/createStep5.vue";
import Success from "~/components/index/applySuccess";

export default {
  middleware: "auth",
  beforeMount() {
    this.$store.dispatch("user/checkLogin", this.$router);
  },
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      success: false,
      title: "中宝平",
      merchantType: "",
      registType: "",
      step: +this.$route.query.step,
      form1: {},
      form2: {},
      form3: {},
      form4: {},
      form5: {},
      form: {},
      nextNumProp: 0,
      mobile: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.merchantType = to.query.merchantType;
    this.step = +to.query.step;
    next();
  },
  mounted() {
    this.merchantType = this.$route.query.merchantType;
    this.$service("userInfo").then(result => {
      this.mobile = result.data.mobilePhone;
      this.form.mobile = this.mobile;
      localStorage.setItem("mobile", this.mobile);
      if (result.data.userType !== 1) {
        this.$service("merchantInfo")
          .then(result => {
            if (result.success) {
              this.form = result.data;
              this.$refs.step2.getSecondCategoryList()
            }
          })
          .catch(err => { });
      }
    });
  },
  activated() {
    this.merchantType = this.$route.query.merchantType;
    if (this.merchantType == 1) {
      this.title = "珠宝店认证";
    } else if (this.merchantType == 2) {
      this.title = "设计师认证";
    } else if (this.merchantType == 3) {
      this.title = "制造间认证";
    }
    this.form = JSON.parse(localStorage.getItem("form"));
  },
  watch: {
    title(val) {
      this.title = val;
    }
  },
  methods: {
    submit(form, step) {
      form.registType = JSON.parse(localStorage.getItem("form")).registType;
      let formone = "";
      if (step == 1) {
      } else if (step == 2) {
        if (form.linkmanList.length == 0) {
          form.linkmanList = [
            {
              linkName: "",
              idCard: "",
              facePhoto: "",
              backPhoto: "",
              status: 1
            }
          ];
        }
      } else if (step == 3) {
        this.mobile = localStorage.getItem("mobile");
      } else if (step == 4) {
        this.form = JSON.parse(localStorage.getItem("form"));
      }

      Object.assign(this.form, form);
      localStorage.setItem(
        "form",
        JSON.stringify(Object.assign(this.form, form))
      );
      this.registType = this.form.registType;
      this.merchantType = localStorage.getItem("merchantType");
      document.getElementById("create").scrollIntoView();
      if (step === 5) {
        this.form.merchantType = localStorage.getItem("merchantType");
        this.$loading(this.$service("merchantInfoUpdate", { data: this.form }))
          .then(this.openSuccess)
          .catch(this.fail);
      } else {
        this.$router.push({
          query: {
            merchantType: this.merchantType,
            step: +step + 1
          }
        });
      }
    },
    openSuccess(result) {
      this.success = true;
      localStorage.removeItem("form");
      localStorage.removeItem("mobile");
      localStorage.removeItem("merchantType");
    },
    fail() {
      this.nextNumProp++;
    },
    goBack() {
      this.$router.push({ name: "user-shop" });
    }
  },
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Success
  }
};
</script>

<style lang="postcss" scoped>
.create {
  position: relative;
  padding-bottom: 20px;
  & >>> .title {
    /*position: fixed;*/
    top: 0;
    width: 100%;
    z-index: 1;
    padding: 20px 0;
    font-size: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: white; */
  }
  & >>> .title.h5class {
    top: 46px;
  }
  & >>> .validator {
    /*margin-top: 80px;*/
  }
}
>>> .van-cell__value {
  font-size: 12px;
}
>>> .step {
  flex: 1;
  position: relative;
  color: #cccccc;
  font-size: 14px;
  & .step-circle {
    width: 18px;
    height: 18px;
    line-height: 18px;
    background: #cccccc;
    border-radius: 50%;
    text-align: center;
    margin: 0 auto 8px;
    color: white;
  }
  & .step-line {
    width: 54px;
    height: 2px;
    background: #cccccc;
    position: absolute;
    left: -28px;
    top: 8px;
  }
  &.active {
    color: #df735a;
    & .step-circle {
      position: relative;
      background: #df735a;
    }
    & .step-line {
      background: #df735a;
    }
    & .step-circle:after {
      content: "";
      position: absolute;
      left: -3px;
      top: -3px;
      width: 22px;
      height: 22px;
      border: 1px solid #df735a;
      border-radius: 50%;
    }
  }
}
>>> .van-button {
  color: white;
  background: #df735a;
  border-color: #df735a;
}
</style>
