<template>
  <div class="login">
    <AppView class="registered">
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
                    v-model="mobileForm.mobilePhone"
                    type="number"
                    placeholder="请输入手机号"
                    @input="widthCheck($event.target, 11)"
                    maxlength="11"
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
                    placeholder="请输入验证码"
                    maxlength="6"
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
            <div class="input-row agreement">
              <van-checkbox
                v-model="mobileForm.checked"
                @click.native="check('checked')"
              ></van-checkbox>
              <div
                class="border-input dark-gray"
                style="border: none;margin-left: 15px;"
              >
                我已阅读和接受
                <a @click="$router.push({name:'user-agreement'})">《中宝平用户注册协议》</a>
                <p class="msg error">{{error.checked}}</p>
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
    </AppView>
  </div>
</template>

<script>
import CodeImage from '~/components/common/verifyCode/codeImage'
import CodeBtn from '~/components/common/verifyCode/codeBtn'
import Validator from '~/components/common/validator'
const AccountNameKey = 'AccountName'
import axios from 'axios'

function getAccountName() {
  if (process.server) return ''
  return localStorage[AccountNameKey] || ''
}

function setAccountName(name) {
  localStorage[AccountNameKey] = name
}

function toParamMap(str) {
  var map = {};
  var segs = str.split("&");
  for (var i in segs) {
    var seg = segs[i];
    var idx = seg.indexOf('=');
    if (idx < 0) {
      continue;
    }
    var name = seg.substring(0, idx);
    var value = seg.substring(idx + 1);
    map[name] = value;
  }
  return map;
}

export default {
  components: {
    CodeImage,
    CodeBtn,
    Validator
  },
  activated() {
    document.title = '绑定手机'
    if (this.mobileForm.mobilePhone.length == 11) {
      this.isClick = true
    } else {
      this.isClick = false
    }
  },
  data() {
    return {
      nextNum: 0,
      mobileForm: {
        codeUuid: '123456',
        //					mobilePhone: getAccountName(),
        mobilePhone: '',
        verifyCode: '',
        dynamicVerifyCode: '',
        loginType: '2',
        msgId: '',
        verify: 1,
        loginMethod: 1,
        checked: false
      },
      isClick: false,
      rules: {
        mobile: [{
          required: true,
          message: '请输入手机号码'
        }],
        dynamicVerifyCode: [{
          required: true,
          message: '请输入短信验证码'
        }],
        //					verifyCode: [{
        //						required: true,
        //						message: '请输入图形验证码'
        //					}],
        msgId: [{
          required: true,
          message: '短信验证码有误'
        }],
        checked: [{
          required: true,
          message: '请同意珠宝云平用户注册协议'
        }]
      },
      loading: false
    }
  },

  methods: {
    check(formName) {
      return this.$refs[formName].checkAll(error => this.$toast(error[0]))
    },
    login() {
      if (this.check('mobileForm')) {
        this.loading = true

        if (this.$route.query.loginType == 1) {

          let params = {
            access_token: this.$route.query.accessToken,
            oauth_consumer_key: '101770824',
            openid: this.$route.query.openid
          }
          axios.get('/qq/get_user_info', {
            params
          }).then(response => {
            let data = {
              profile_image_url: response.data.figureurl_qq,
              name: response.data.nickname,
              uid: this.$route.query.unionid,
              loginType: this.$route.query.loginType,
              dynamicVerifyCode: this.mobileForm.dynamicVerifyCode,
              msgId: this.mobileForm.msgId,
              mobilePhone: this.mobileForm.mobilePhone
            }
            axios.post('/api/userCenter/third-unband', data)
              .then(result => {
                if (!result.data.success) {
                  if (result.data.msg.includes('该手机号已经绑定其他QQ账号')) {
                    this.$toast({
                      type: 'success',
                      message: '该手机号已经绑定其他QQ账号'
                    })
                  }
                } else {
                  this.success(result.data)
                }
              }).catch(error => {
                console.log(error)
              })

            //						this.$service('bindPhone', {
            //							data
            //						}).then(this.success).catch(this.fail)

            setAccountName(data.mobilePhone || data.name)
          }).catch(err => { })
        } else {

          let params = {
            access_token: this.$route.query.accessToken,
            uid: this.$route.query.openid
          }
          axios.get('/2/users/show.json', {
            params
          }).then(response => {
            let data = {
              profile_image_url: response.data.profile_image_url,
              name: response.data.name,
              uid: this.$route.query.openid,
              loginType: this.$route.query.loginType,
              dynamicVerifyCode: this.mobileForm.dynamicVerifyCode,
              msgId: this.mobileForm.msgId,
              mobilePhone: this.mobileForm.mobilePhone
            }
            axios.post('/api/userCenter/third-unband', data)
              .then(result => {
                if (!result.data.success) {
                  this.$toast({
                    type: 'success',
                    message: result.data.msg
                  })

                } else {
                  this.success(result.data)
                }
              }).catch(error => {
                console.log(error)
              })

            //						this.$service('bindPhone', {
            //							data
            //						}).then(this.success).catch(this.fail)

            setAccountName(data.mobilePhone || data.name)
          }).catch(err => { })
        }
      }
    },
    success(result) {
      this.loading = false
      this.$store.commit('user/setToken', result.data.accessToken)
      if (!window.navigator.userAgent.includes('MicroMessenger')) {
        this.$native.loginOrLogout(result.data.accessToken)
      }
      this.$toast({
        type: 'success',
        message: '成功'
      })
      if (this.$route.query.from) {
        location.href = this.$route.query.from
      } else {
        this.$router.push({
          name: 'user-mine'
        })
      }
    },
    fail() {
      //				if(this.nextNum >= 4) {
      //					this.mobileForm.verify = 0
      //					this['mobileForm'].verifyCode = ''
      //					this.$refs['mobileCodeImage'].refresh()
      //				} else {
      //					this.nextNum++
      //				}
      this.loading = false
    },
    refresh(code) {
      this['mobileForm'].codeUuid = code.uuid
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
    }
  }
}
</script>

<style lang="postcss" scoped>
.login {
  padding: 10px 20px 10px;
  box-sizing: border-box;
  height: 100vh;
  background: #fff;
}

.logo {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 4px;
}

.container {
  margin-top: 81px;
}

.mobileForm {
  width: 86%;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
}

input {
  border: none;
  height: 36px;
  font-size: 14px;
}

.border-div {
  box-sizing: border-box;
  padding-left: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  position: relative;
  border-bottom: 1px solid #e0e0e0;
}

.border-div .iconRow {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 16px;
}

.iconRow-phone {
  width: 18px;
  height: 18px;
  background: url(./images/vip.png) no-repeat;
  background-size: 100% auto;
}

.code-image,
.code-btn {
  position: absolute;
  top: 5px;
  right: 0;
}

.code-btn {
  top: 10px;
}

.save {
  height: 44px;
  border-radius: 6px;
  background: #fb746e;
  color: #ffffff;
  margin-top: 34px;
}

.agreement {
  font-size: 12px;
  line-height: 18px;
  margin-top: 30px;
  & a {
    color: #2391d1;
  }
}
</style>
