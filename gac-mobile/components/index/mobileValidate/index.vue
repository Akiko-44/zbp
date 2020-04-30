<template>
  <validator
    ref="form"
    :model="form"
    :rules="rules"
    class="form first-step"
  >
    <template slot-scope="{ error, check }">
      <div class="block">
        <!-- <h4 class="title">第一步  验证手机号</h4> -->
        <div class="input-row">
          <!--<label>手机号:</label>-->

          <div v-if="isBindPhone">
            原手机号码：{{form.mobilePhone}}
          </div>
          <div
            class="border-input"
            v-else
          >
            <input
              v-model="form.mobilePhone"
              @blur="check('mobilePhone')"
              type="tel"
              maxlength="11"
              placeholder="请输入手机号"
            >
            <p class="msg error">{{error.mobilePhone}}</p>
          </div>
        </div>
        <div
          class="input-row"
          v-show="form.verify == 0"
        >
          <div class="border-input">
            <input
              v-model="form.verifyCode"
              @blur="check('verifyCode')"
              type="text"
              maxlength="6"
              placeholder="请输入图形验证码"
            >
            <!-- <p class="msg">不区分大小写</p> -->
            <p class="msg error">{{error.verifyCode}}</p>
          </div>
          <CodeImage
            ref="codeImage"
            @refresh="refresh"
          />
        </div>
        <div class="input-row">
          <!--<label>动态验证码:</label>-->
          <div class="border-input">
            <input
              v-model="form.dynamicVerifyCode"
              @blur="check('dynamicVerifyCode')"
              type="text"
              maxlength="6"
              placeholder="请输入短信验证码"
            >
            <p class="msg error">{{error.dynamicVerifyCode || error.msgId}}</p>
          </div>
          <CodeBtn
            :form="form"
            @fail="checkFail"
            :isClick="true"
          />
        </div>
      </div>
      <van-button
        :loading="loading"
        type="primary"
        block
        class="primary-btn"
        @click="checkMobile"
      >下一步</van-button>
    </template>
  </validator>
</template>

<script>
import CodeImage from '~/components/common/verifyCode/codeImage'
import CodeBtn from '~/components/common/verifyCode/codeBtn'
import Validator from '~/components/common/validator'

export default {
  props: {
    serviceName: String,
    isBindPhone: {
      type: Boolean,
      default: true
    }
  },
  components: {
    CodeImage,
    CodeBtn,
    Validator
  },
  data() {
    return {
      form: {
        codeUuid: '123456',
        mobilePhone: '',
        verifyCode: '123456',
        dynamicVerifyCode: '',
        msgId: '',
        verify: 1
      },
      nextNum: 0,
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
  activated() {
    this.$service('userInfo').then((result) => {
      this.form.mobilePhone = result.data.mobilePhone
    })
  },
  methods: {
    checkMobile() {
      if (this.$refs.form.checkAll()) {
        this.loading = true
        this.$service(this.serviceName, { data: this.form })
          .then(this.checkSuccess)
          .catch(this.checkFail)
      }
    },
    checkSuccess(result) {
      this.$emit('success', result)
    },
    checkFail() {
      if (this.nextNum >= 2) {
        this.form.verify = 0
        this.form.verifyCode = ''
        this.$refs.codeImage.refresh()
      } else {
        this.nextNum++
      }
      this.loading = false
    },
    refresh(code) {
      this.form.codeUuid = code.uuid
    }
  }
}
</script>

<style lang="postcss" scoped>
.first-step {
  padding: 10px;
  & .block {
    background: #fff;
    border-radius: 5px;
  }
  & .input-row {
    height: 59px;
    margin-bottom: 0;
    padding: 0 15px;
    border-bottom: 1px solid #eaebf0;
  }
  & .border-input {
    padding: 0;
    border: none;
    & input {
      padding: 0;
    }
  }
  & .primary-btn {
    background: #df735a;
    border-color: #df735a;
  }
}
/* .form {
  padding: 0 20px;
}
.title {
  margin: 40px 0 35px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}
.code-btn {
  margin: 0 0 0 0.2667rem;
  border: 1px solid #e9ebf1 !important;
} */
</style>
