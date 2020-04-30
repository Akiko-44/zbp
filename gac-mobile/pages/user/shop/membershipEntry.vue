<template>
  <AppView
    class="shop"
    :title="title"
  >
    <div v-if="!success">
      <validator
        :rules="rules"
        :model="form"
        ref="form"
      >
        <van-cell-group class="margin">
          <van-field
            class="van-cell--required"
            v-model="form.companyName"
            label="企业名称"
            placeholder="30字以内，与营业执照上保持一致"
            rows="3"
            autosize
          />
          <van-cell
            title="中宝协会员等级"
            is-link
            :value="form.level"
            @click="memberPickerShow = true"
          />
          <van-field
            class="van-cell--required"
            v-model="form.name"
            label="店铺名称"
            placeholder="请输入店铺名称，30字以内"
            maxlength="30"
            rows="1"
            autosize
          />
          <van-cell
            class="van-cell--required"
            title="店铺类型"
            is-link
            :value="form.type"
            @click="typePickerShow = true"
          />
          <van-cell
            class="van-cell--required"
            title="店铺LOGO"
            label="尺寸500*500，大小1.5M（兆）以内，支持jpg/jpeg/png/gif格式"
            title-class="min-width"
          >
            <div class="img-upload">
              <img
                v-if="form.logo"
                :src="form.logo | setImg({ w: 150 })"
              />
              <img
                v-else
                src="../../../assets/images/uploadImg.png"
              />
              <VUpload
                :width="400"
                :height="400"
                @success="uploadSuccessLogo"
              />
            </div>
          </van-cell>
          <van-cell
            class="van-cell--required"
            title="店铺背景图"
            label="尺寸710*350，大小1.5M（兆）以内，支持jpg/jpeg/png/gif格式"
            title-class="min-width"
          >
            <div class="img-upload">
              <img
                v-if="form.backgroundImg"
                :src="form.backgroundImg | setImg({ w: 150 })"
              />
              <img
                v-else
                src="../../../assets/images/uploadImg.png"
              />
              <VUpload
                :width="355"
                :height="175"
                @success="uploadSuccessBg"
              />
            </div>
          </van-cell>
          <van-field
            class="van-cell--required"
            v-model="form.linkName"
            label="联系人"
            placeholder="请输入联系人"
            rows="3"
            autosize
          />
          <van-field
            class="van-cell--required"
            v-model="form.mobilePhone"
            :maxlength="11"
            label="手机号码"
            placeholder="请输入手机号码"
          >
            <CodeBtn
              slot="button"
              :form="form"
            />
          </van-field>
          <van-field
            class="van-cell--required"
            v-model="form.dynamicVerifyCode"
            :maxlength="6"
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
          </van-field>
          <van-field
            class="van-cell--required"
            v-model="form.passWord"
            :maxlength="16"
            label="密码设置"
            placeholder="6-16位，由数字或大小写字母组成"
          >
          </van-field>
        </van-cell-group>
      </validator>
      <van-popup
        v-model="memberPickerShow"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="memberColumns"
          @cancel="memberCancel"
          @confirm="memberConfirm"
        />
      </van-popup>
      <van-popup
        v-model="typePickerShow"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="typeColumns"
          @cancel="typeCancel"
          @confirm="typeConfirm"
        />
      </van-popup>
      <van-button
        type="primary"
        block
        class="primary-btn submit-btn block"
        @click="submit"
      >提交</van-button>
      <div class="tip">
        <p>*温馨提示：专属入驻通道截止时间为2019年12月20日。</p>
        <p>
          注：本平台为开放平台，不做商品审核，如发布了违法违规商品，责任由商家自行承担。
        </p>
      </div>
    </div>
    <div
      class="success-container"
      v-show="success"
    >
      <img
        src="../../../assets/images/submitSuccess.png"
        width="200"
      />
      <div class="info">
        <p>恭喜您成功入驻中宝平</p>
        <p>复制下方链接，在电脑端登录商家后台看看吧</p>
      </div>
      <p
        class="link"
        v-if="form.merchantType === 1"
      >
        http://admin.gacjc.com/usrManager/jewelry/
      </p>
      <p
        class="link"
        v-if="form.merchantType === 2"
      >
        http://admin.gacjc.com/designMerchant.html
      </p>
      <p
        class="link"
        v-if="form.merchantType === 3"
      >
        http://admin.gacjc.com/makeMerchant.html
      </p>
    </div>
  </AppView>
</template>

<script>
import VUpload from "~/components/common/upload/base";
import Validator from "~/components/common/validator";
import CodeBtn from "~/components/common/verifyCode/codeBtn";
export default {
  head() {
    return {
      title: this.title
    };
  },
  components: {
    VUpload,
    Validator,
    CodeBtn
  },
  data() {
    return {
      success: false,
      title: "中宝协会员入驻专属通道",
      memberPickerShow: false,
      typePickerShow: false,
      passwordType: "password",
      form: {
        name: "",
        linkName: "",
        companyName: "",
        type: "",
        merchantType: undefined,
        level: "",
        merchantLevel: undefined,
        logo: "",
        backgroundImg: "",
        mobilePhone: "",
        dynamicVerifyCode: "",
        msgId: "",
        passWord: "",
        setshopType: 4 //开店入口方式：1APP-安卓、2APP-苹果、3PC、4H5、5招商短信
      },
      memberColumns: [
        "副会长单位",
        "常务理事单位",
        "理事单位",
        "普通单位会员",
        "无"
      ],
      typeColumns: ["珠宝店", "设计师", "制造间"],
      rules: {
        companyName: [
          {
            required: true,
            message: "请输入企业名称，30字以内，与营业执照上保持一致"
          }
        ],
        merchantLevel: [
          { required: true, message: '请选择中宝协会员等级' }
        ],
        name: [{ required: true, message: "请输入店铺名称，30字以内" }],
        type: [{ required: true, message: "请请选择店铺类型" }],
        logo: [{ required: true, message: "请上传店铺logo" }],
        backgroundImg: [{ required: true, message: "请上传店铺背景图" }],
        linkName: [{ required: true, message: "请输入联系人" }],
        mobilePhone: [
          {
            required: true,
            validator: this.validateMobile,
            message: "请输入手机号码"
          }
        ],
        dynamicVerifyCode: [
          {
            required: true,
            validator: this.validateDynamicVerifyCode,
            message: "请输入短信验证码"
          }
        ],
        msgId: [
          {
            required: true,
            message: "短信验证码有误"
          }
        ],
        passWord: [
          {
            required: true,
            message: "请填写密码，6-16位，由数字或大小写字母组成"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      if (!!window.Android) {
        this.form.setshopType = 1
      } else if (!!window.webkit) {
        this.form.setshopType = 2
      } else if (this.$route.query.setshopType === 5) {
        this.form.setshopType = 5
      }
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        console.log(this.form);
        this.$loading(this.$service("openShop", { data: this.form }))
          .then(() => {
            this.success = true;
          })
          .catch();
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    memberCancel() {
      this.memberPickerShow = false;
    },
    memberConfirm(val, index) {
      this.form.level = val;
      this.form.merchantLevel = index + 1;
      this.memberPickerShow = false;
    },
    typeCancel() {
      this.typePickerShow = false;
    },
    typeConfirm(val, index) {
      this.form.type = val;
      this.form.merchantType = index + 1;
      this.typePickerShow = false;
    },
    uploadSuccessLogo(key) {
      this.form.logo = key;
    },
    uploadSuccessBg(key) {
      this.form.backgroundImg = key;
    },
    validateMobile(rule, value) {
      const reg = /^\d{11}$/;
      if (value && !reg.test(value)) {
        return "请输入正确的手机号";
      } else {
        return "";
      }
    },
    validateDynamicVerifyCode(rule, value) {
      const reg = /^\d{6}$/;
      if (value && !reg.test(value)) {
        return "请输入正确的验证码";
      } else {
        return "";
      }
    }
  }
};
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
.margin {
  margin-bottom: 15px;
}
.upload-area {
  float: right;
}
.block {
  margin: 25px auto;
  width: 90%;
}
.min-width {
  min-width: 220px;
}
.img-upload {
  float: right;
  width: 100px;
  & img {
    width: 100%;
  }
}
>>> .code-btn.van-button {
  padding: 0;
  text-align: right;
  color: #2d69c3;
  background: #fff;
}
.submit-btn {
  background: #d57e6a;
  border-color: #d57e6a;
}
.tip {
  padding: 0 20px 20px;
  line-height: 20px;
  font-size: 13px;
  color: red;
}
.success-container {
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  & .info {
    margin-top: 20px;
    line-height: 30px;
  }
  & .link {
    margin-top: 30px;
    color: #2d69c3;
  }
  & .red {
    color: red;
  }
}
>>> .van-cell__value {
  overflow: visible;
}
</style>
