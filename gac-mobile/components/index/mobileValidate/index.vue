<template>
<validator ref="form" :model="form" :rules="rules" class="form">
  <template slot-scope="{ error, check }">
    <h4 class="title">第一步  验证手机号</h4>
    <div class="input-row">
      <!--<label>手机号:</label>-->
      <div class="border-input">
        <input v-model="form.mobilePhone" @blur="check('mobilePhone')" type="tel" placeholder="请输入手机号" readonly>
        <p class="msg error">{{error.mobilePhone}}</p>
      </div>
    </div>
    <div class="input-row">
      <!--<label>验证码:</label>-->
      <div class="border-input">
        <input v-model="form.verifyCode" @blur="check('verifyCode')" type="text" placeholder="请输入图形验证码">
        <p class="msg">不区分大小写</p>
        <p class="msg error">{{error.verifyCode}}</p>
      </div>
      <CodeImage ref="codeImage" @refresh="refresh" />
    </div>
    <div class="input-row">
      <!--<label>动态验证码:</label>-->
      <div class="border-input">
        <input v-model="form.dynamicVerifyCode" @blur="check('dynamicVerifyCode')" type="text" placeholder="请输入短信验证码">
        <p class="msg error">{{error.dynamicVerifyCode || error.msgId}}</p>
      </div>
      <CodeBtn :form="form" @fail="checkFail" />
    </div>
    <van-button :loading="loading" type="primary" block class="primary-btn block" @click="checkMobile">下一步</van-button>
  </template>
</validator>
</template>

<script>
import CodeImage from '~/components/common/verifyCode/codeImage'
import CodeBtn from '~/components/common/verifyCode/codeBtn'
import Validator from '~/components/common/validator'

export default {
  props: {
    serviceName: String
  },
  components: {
    CodeImage,
    CodeBtn,
    Validator
  },
  data () {
    return {
      form: {
        codeUuid: '',
        mobilePhone: '',
        verifyCode: '',
        dynamicVerifyCode: '',
        msgId: ''
      },
      rules: {
        mobilePhone: [
          { required: true, message: '请输入手机号' }
        ],
        verifyCode: [
          { required: true, message: '请输入图形验证码' }
        ],
        dynamicVerifyCode: [
          { required: true, message: '请输入短信验证码' }
        ],
        msgId: [
          { required: true, message: '短信验证码有误' }
        ]
      },
      loading: false
    }
  },
  activated () {
    this.$service('userInfo').then((result) => {
      this.form.mobilePhone = result.data.mobilePhone
    })
  },
  methods: {
    checkMobile () {
      if (this.$refs.form.checkAll()) {
        this.loading = true
        this.$service(this.serviceName, { data: this.form })
          .then(this.checkSuccess)
          .catch(this.checkFail)
      }
    },
    checkSuccess (result) {
      this.$emit('success', result)
    },
    checkFail () {
      this.loading = false
      this.form.verifyCode = ''
      this.$refs.codeImage.refresh()
    },
    refresh (code) {
      this.form.codeUuid = code.uuid
    }
  }
}
</script>

<style lang="postcss" scoped>
.form {
  padding: 0 20px;
}
.title {
  margin: 40px 0 35px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}
.code-btn{
  margin: 0 0 0 0.2667rem;
  border: 1px solid #e9ebf1 !important;
}
</style>
