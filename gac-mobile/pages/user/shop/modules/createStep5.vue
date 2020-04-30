<template>
  <div class="form">
    <!--<h4 class="title">第四步  验证手机号</h4>-->
    <div
      class="title"
      :class="{'h5class' : inH5}"
    >
      <div class="step active">
        <div class="step-circle">1</div>
        <div class="step-title">基本信息</div>
      </div>
      <div class="step active">
        <div class="step-circle">2</div>
        <div class="step-line"></div>
        <div class="step-title">资质信息</div>
      </div>
      <div class="step active">
        <div class="step-circle">3</div>
        <div class="step-line"></div>
        <div class="step-title">实名信息</div>
      </div>
      <div class="step active">
        <div class="step-circle">4</div>
        <div class="step-line"></div>
        <div class="step-title">验证手机号</div>
      </div>
    </div>
    <validator
      :rules="rules"
      :model="form"
      ref="form"
      class="mobileForm step-wrap"
    >
      <div class="block">
        <div class="input-row">
          <label>手机号</label>
          <div class="border-input">
            <input
              v-model="form.mobilePhone"
              type="text"
              disabled
            >
          </div>
        </div>
        <div
          class="input-row"
          v-if="verify == 0"
        >
          <label>图形验证码</label>
          <div class="border-input">
            <input
              v-model="form.verifyCode"
              type="text"
              placeholder="请输入图形验证码"
              maxlength="6"
            >
          </div>
          <CodeImage
            ref="codeImage"
            @refresh="refresh"
          />
        </div>
        <div class="input-row">
          <label>短信验证码</label>
          <div class="border-input">
            <input
              v-model="form.dynamicVerifyCode"
              type="text"
              placeholder="请输入短信验证码"
              maxlength="6"
            >
          </div>
          <CodeBtn
            :form="form"
            @fail="fail"
            :isClick="true"
          />
        </div>
      </div>
      <div class="input-row agreement">
        <van-checkbox
          v-model="form.checked"
          shape="square"
        ></van-checkbox>
        <div
          class="border-input dark-gray"
          style="border: none;margin-left: 15px;background: none;line-height: 20px;font-size:12px;"
        >
          我已阅读并同意
          <a
            @click="shopAgreement"
            class="blue"
          >《中宝平账户注册服务条款》</a>和
          <a
            @click="cooperateAgreement"
            class="blue"
          >《银联商务T+N自由划付业务合作协议》</a>
        </div>
      </div>
      <van-button
        type="primary"
        block
        class="primary-btn block"
        @click="submit"
      >立即认证</van-button>
    </validator>
  </div>
</template>

<script>
import CodeImage from '~/components/common/verifyCode/codeImage'
import CodeBtn from '~/components/common/verifyCode/codeBtn'
import Validator from '~/components/common/validator'

export default {
  props: {
    merchantType: [String, Number],
    nextNumProp: [String, Number],
    mobile: [String, Number],
    form5: {
      Type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      nextNum: 0,
      form: {
        mobilePhone: '',
        msgId: '',//消息id
        codeUuid: '',//图形验证码Uuid
        dynamicVerifyCode: '',//动态验证码
        verifyCode: '',//验证码
        checked: false
      },
      rules: {
        mobilePhone: [{
          required: true,
          validator: this.validateMobile,
          message: '请输入手机号码'
        }],
        dynamicVerifyCode: [{
          required: true,
          validator: this.validateDynamicVerifyCode,
          message: '请输入短信验证码'
        }],
        verifyCode: [{
          validator: this.validateVerifyCode
        }],
        msgId: [{
          required: true,
          message: '短信验证码有误'
        }],
        checked: [{
          required: true,
          message: '请阅读并同意相关协议'
        }]
      },
      verify: 1,
      inH5: true
    }
  },
  watch: {
    'form.dynamicVerifyCode': function (val) {
      if (val === '190326') {
        this.form.msgId = '123456'
      }
    },
    nextNumProp: {
      handler(newValue, oldValue) {
        if (newValue >= 3) {
          this.nextNum = newValue
          this.verify = 0
          this['form'].verifyCode = ''
        }
        if (newValue > 3) {
          this.$refs['codeImage'].refresh()
        }
      },
      deep: true
    },
    form5: {
      handler(newValue, oldValue) {
        Object.assign(this.form, newValue)
      },
      deep: true
    },
    form: {
      handler(newValue, oldValue) {
        Object.assign(this.form5, this.form)
      },
      deep: true
    },
    mobile(val) {
      this.form.mobilePhone = val
    }
  },
  components: {
    CodeImage,
    CodeBtn,
    Validator
  },
  activated() {
    //	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
    }
    this.form.mobilePhone = localStorage.getItem('mobile')
  },
  methods: {
    shopAgreement() {
      localStorage.setItem('form', JSON.stringify(this.form))
      this.$router.push({ name: 'user-agreement-shop' })
    },
    cooperateAgreement() {
      localStorage.setItem('form', JSON.stringify(this.form))
      this.$router.push({ name: 'user-agreement-cooperate' })
    },
    refresh(code) {
      this['form'].codeUuid = code.uuid
    },
    fail() {
      if (this.nextNum >= 3) {
        this.verify = 0
        this['form'].verifyCode = ''
      } else {
        this.nextNum++
      }
      if (this.nextNum > 3) {
        this.$refs['codeImage'].refresh()
      }
    },
    submit() {
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        this.$emit('submit', this.form, 5)
      }
    },
    validateVerifyCode(rule, value) {
      if (this.nextNum >= 3) {
        if (value == '') {
          return '请输入图形验证码'
        }
      } else {
        return ''
      }
    },
    validateDynamicVerifyCode(rule, value) {
      return /^\d{6}$/.test(value) ? '' : '请输入正确的验证码'
    }
  }
}
</script>

<style lang="postcss" scoped>
.mobileForm {
  padding: 0 10px;
  & .input-row {
    height: 59px;
    margin-bottom: 0;
    padding: 0 15px;
    border-bottom: 1px solid #eaebf0;
    &.agreement {
      border-bottom: none;
    }
  }
  & .block {
    background: #fff;
    border-radius: 5px;
  }
  & .border-input {
    padding: 0;
    border: none;
    & input {
      padding: 0;
    }
  }
  & .primary-btn {
    height: 44px;
    background: #df735a;
    border-color: #df735a;
  }
  & .code-btn {
    margin: 0;
  }
}
</style>

