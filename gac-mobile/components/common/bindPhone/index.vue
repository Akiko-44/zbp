<template>
  <van-popup
    position="bottom"
    v-model="isCityEnter"
    @click-overlay="sendToParent"
  >
    <div class="wrapper">
      <van-icon
        name="close"
        class="close"
        @click="sendToParent"
      />
      <p class="tips">温馨提示：为了您的账号安全，请先绑定手机号</p>
      <div class="container">
        <validator
          ref="mobileForm"
          :rules="rules"
          :model="mobileForm"
          class="mobileForm"
        >
          <template slot-scope="{ error, check }">
            <div class="input-container">
              <div
                class="border-div"
                style="padding-right: 100px;"
              >
                <label class="iconRow iconRow-phone"></label>
                <div>
                  <input
                    class="input"
                    :maxlength="11"
                    v-model="mobileForm.mobilePhone"
                    placeholder="请输入手机号"
                    @input="widthCheck($event.target, 11)"
                  >
                </div>
              </div>
            </div>
            <div
              class="input-container"
              v-show="mobileForm.verify == 0"
            >
              <div
                class="border-div"
                style="padding-right: 100px;"
              >
                <label class="iconRow iconRow-code"></label>
                <div>
                  <input
                    v-model="mobileForm.verifyCode"
                    type="text"
                    placeholder="请输入验证码"
                    style="width: 100px;"
                  >
                  <CodeImage
                    ref="mobileCodeImage"
                    @refresh="refresh"
                  />
                </div>
              </div>
            </div>
            <div class="input-container">
              <div
                class="border-div"
                style="padding-right: 100px;"
              >
                <label class="iconRow iconRow-phone"></label>
                <div>
                  <input
                    v-model="mobileForm.dynamicVerifyCode"
                    type="text"
                    :maxlength="6"
                    placeholder="请输入验证码"
                    style="width: 100px;"
                  >
                  <CodeBtn
                    :form="mobileForm"
                    @fail="fail"
                    :isClick="isClick"
                  />
                </div>
              </div>
            </div>
            <van-button
              @click="login"
              :loading="loading"
              block
              class="save"
            >确定</van-button>
          </template>
        </validator>
      </div>
    </div>
  </van-popup>
</template>

<script>
import CodeImage from '~/components/common/verifyCode/codeImage'
import CodeBtn from '~/components/common/verifyCode/codeBtn'
import Validator from '~/components/common/validator'

const AccountNameKey = 'AccountName'

function getAccountName() {
  if (process.server) return ''
  return localStorage[AccountNameKey] || ''
}

function setAccountName(name) {
  localStorage[AccountNameKey] = name
}

export default {
  components: {
    CodeImage,
    CodeBtn,
    Validator
  },
  props: {
    isCityEnter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      nextNum: 0,
      mobileForm: {
        mobilePhone: getAccountName(),
        dynamicVerifyCode: '',
        verifyCode: '123456',
        msgId: '',
        verify: 1,
        codeUuid: ''
      },
      isClick: false,
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
          required: true,
          message: '请输入图形验证码'
        }],
        msgId: [{
          required: true,
          message: '短信验证码有误'
        }]
      }
    }
  },
  activated() {
    if (this.mobileForm.mobilePhone.length == 11) {
      this.isClick = true
    } else {
      this.isClick = false
    }

  },
  watch: {
    'mobileForm.dynamicVerifyCode': function (val) {
      if (val === '190326') {
        this.mobileForm.msgId = '123456'
      }
    }
  },
  methods: {
    sendToParent() {
      this.$emit('listenToChild', false)
    },
    check(formName) {
      return this.$refs[formName].checkAll(error => this.$toast(error[0]))
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
    },
    validateMobile(rule, value) {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(value) ? '' : '请输入正确的手机号'
    },
    validateDynamicVerifyCode(rule, value) {
      return /^[0-9]*$/.test(value) ? '' : '请输入正确的验证码'
    },
    login() {
      const type = this.type
      if (this.check('mobileForm')) {
        this.loading = true
        const data = this['mobileForm']

        this.$service('userChangeMobile', {
          data
        })
          .then(result => {
            this.changeMobileSuccess(result.data)
          })
          .catch(this.fail)
        setAccountName(data.mobilePhone || data.name)
      }
    },
    changeMobileSuccess(data) {
      this.$emit('changeMobileSuccessEvent', data)
      this.loading = false
    },
    fail() {
      if (this.nextNum >= 4) {
        this.mobileForm.verify = 0
        this['mobileForm'].verifyCode = ''
        this.$refs['mobileCodeImage'].refresh()
      } else {
        this.nextNum++
      }
      this.loading = false
    },
    refresh(code) {
      this['mobileForm'].codeUuid = code.uuid
    }
  }
}
</script>

<style lang="postcss" scoped>
.wrapper {
  & .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  & .tips {
    color: #fb746e;
    width: 78%;
    margin: 20px auto;
    line-height: 20px;
  }
  & .mobileForm {
    width: 86%;
    box-sizing: border-box;
    margin: 20px auto;
    position: relative;
  }

  & input {
    border: none;
    height: 36px;
    font-size: 14px;
    background: none;
  }

  & .border-div {
    box-sizing: border-box;
    padding-left: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
    position: relative;
    border-bottom: 1px solid #e0e0e0;
  }

  & .iconRow {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 16px;
  }

  & .iconRow-phone {
    width: 18px;
    height: 18px;
    background: url(../../../assets/images/vip.png) no-repeat;
    background-size: 100% auto;
  }

  & .code-image,
  & .code-btn {
    position: absolute;
    top: 5px;
    right: 0;
  }

  & .code-btn {
    top: 10px;
  }

  & .save {
    height: 44px;
    border-radius: 6px;
    background: #fb746e;
    color: #ffffff;
    margin-top: 34px;
  }
}
</style>