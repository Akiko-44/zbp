<template>
  <AppView title="修改手机号">
    <MobileValidate
      v-if="step === 1"
      service-name="userMobileValidate"
      @success="checkSuccess"
    />

    <Validator
      v-if="step === 2"
      ref="form"
      :model="form"
      :rules="rules"
      class="form second-step"
    >
      <template slot-scope="{ error, check }">
        <div class="block">
          <!-- <h4 class="title">第二步  设置新手机</h4> -->
          <div class="input-row">
            <div class="border-input">
              <input
                v-model="form.mobilePhone"
                @blur="check('mobilePhone')"
                autoComplete="on"
                type="text"
                :maxlength="11"
                placeholder="请输入新手机号码"
                @input="widthCheck($event.target, 11)"
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
            <div class="border-input">
              <input
                v-model="form.dynamicVerifyCode"
                @blur="check('dynamicVerifyCode')"
                type="text"
                placeholder="请输入短信验证码"
              >
              <p class="msg error">{{error.dynamicVerifyCode || error.msgId}}</p>
            </div>
            <CodeBtn
              :form="form"
              @fail="checkFail"
              :isClick="isClick"
            />
          </div>
        </div>
        <van-button
          :loading="loading"
          type="primary"
          block
          class="primary-btn block"
          @click="changeMobile"
        >下一步</van-button>
      </template>
    </Validator>

    <transition-group name="van-fade">
      <template v-if="step === 3">
        <h4
          key="1"
          class="title"
        >修改成功</h4>
        <success
          content="设置成功,即将返回登录页面"
          to="user-login"
          key="2"
        />
      </template>
    </transition-group>
  </AppView>
</template>

<script>
import CodeBtn from '~/components/common/verifyCode/codeBtn'
import CodeImage from '~/components/common/verifyCode/codeImage'
import Success from '~/components/index/success'
import Validator from '~/components/common/validator'
import MobileValidate from '~/components/index/mobileValidate'

export default {
  components: {
    CodeBtn,
    CodeImage,
    Success,
    Validator,
    MobileValidate
  },
  middleware: 'auth',
  beforeMount() {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  data() {
    return {
      form: {
        mobilePhone: '',
        dynamicVerifyCode: '',
        verifyCode: '123456',
        msgId: '',
        codeUuid: '',
        verify: 1
      },
      nextNum: 0,
      isClick: false,
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
      step: 1,
      loading: false
    }
  },
  activated() {
    if (this.form.mobilePhone.length == 11) {
      this.isClick = true
    } else {
      this.isClick = false
    }
  },
  methods: {
    checkSuccess() {
      this.loading = false
      this.step = 2
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
    changeMobile() {
      if (this.$refs.form.checkAll()) {
        this.loading = true
        this.$service('userChangeMobile', { data: this.form })
          .then(() => {
            // this.step = 3
            this.loading = false
            this.$store.commit('user/removeToken')
            this.$toast({
              type: 'success',
              message: '修改成功，请重新登录'
            })
            setTimeout(() => {
              this.$router.replace({ name: 'user-login' })
            }, 3000)
          })
          .catch(this.checkFail)
      }
    },
    refresh(code) {
      this.form.codeUuid = code.uuid
    },
    widthCheck(str, len) {
      var temp = 0
      for (var i = 0; i < str.value.length; i++) {
        temp++
        if (temp == len) {
          this.isClick = true
        } else {
          this.isClick = false
        }
      }
      str.value = str.value.replace(/[^\d]/g, '')
    }
  }
}
</script>

<style lang="postcss" scoped>
.second-step {
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
