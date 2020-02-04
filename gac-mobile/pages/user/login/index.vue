<template>
  <div class="login">
    <div class="logo">
      <!--<img src="./images/logOne.png" width="160"/>-->
      <img
        src="./images/logo1.png"
        width="66"
      />
      <p style="margin-top: 20px;">中宝平</p>
    </div>
    <AppView
      class="registered"
      title=" "
      :clickLeft="back"
    >
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
            <div class="input-row agreement">
              <van-checkbox
                v-model="mobileForm.checked"
                :click="check('checked')"
              ></van-checkbox>
              <div
                class="border-input dark-gray"
                style="border: none;margin-left: 15px;background: none;"
              >
                我已阅读和接受
                <a @click="$router.push({name:'user-agreement', query: {verifyCode: mobileForm.dynamicVerifyCode}})">《中宝平用户注册协议》</a>
                <p
                  class="msg error"
                  style="background: none;"
                >{{error.checked}}</p>
              </div>
            </div>
            <van-button
              @click="login"
              :loading="loading"
              block
              class="save"
            >注册/登录</van-button>

            <div class="tc">
              <a
                class="loginQqBtn"
                @click="openQQ"
                href="javascript:;"
                v-if="showLoginQqBtn"
              >
                <img
                  src="../../../assets/images/qq.png"
                  width="30px"
                  height="30px"
                >
              </a>
              <a
                class="loginWbBtn"
                :href="weiboUrl"
              >
                <img
                  src="../../../assets/images/weibo.png"
                  width="30px"
                  height="30px"
                >
              </a>
            </div>

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
import axios from 'axios'
import { getToken } from '~/utils/auth'
const AccountNameKey = 'AccountName'

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
  // activated() {
  //   document.title = '登录'
  // },
  data() {
    return {
      fromUrl: '',
      loading: false,
      isFormal: false,
      qqUrl: '',
      weiboUrl: '',
      //				testRedirectUri: 'http://219.134.137.178:83/user/login',
      testRedirectUri: 'http://192.168.8.62:3002/user/login',
      formalRedirectUri: 'http://m.gacjc.com/user/login',

      redirectUri: '',
      nextNum: 0,
      mobileForm: {
        codeUuid: '123456',
        mobilePhone: getAccountName(),
        verifyCode: '123456',
        dynamicVerifyCode: this.$route.query.verifyCode || '',
        loginType: '2',
        msgId: '',
        verify: 1,
        loginMethod: 1,
        checked: false
      },
      showLoginQqBtn: true,
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
        }],
        checked: [{
          required: true,
          message: '请同意珠宝云平用户注册协议'
        }]
      }

    }
  },
  watch: {
    'mobileForm.dynamicVerifyCode': function (val) {
      if (val === '190326') {
        this.mobileForm.msgId = '123456'
      }
    }
  },
  activated() {
    if (this.$native.isACity() === '2') {
      this.showLoginQqBtn = false
    }
    this.fromUrl = localStorage.getItem('fromUrl')
    document.title = '登录'
    this.isFormal = location.host === 'm.gacjc.com'
    if (this.isFormal) {
      this.redirectUri = this.formalRedirectUri
    } else {
      this.redirectUri = this.testRedirectUri
    }

    let qqAppId = '101770824'
    let qqAppKey = 'cd5a4477988f85e1b7bff5d3a14d2c8d'
    //			let qqRedirectUri = this.redirectUri
    let qqRedirectUri = this.formalRedirectUri
    let weiboAppId = '1742873256'
    let weiboSecret = '79951d03326308eb2c8376cc0b62016e'
    let weiboRedirectUri = this.formalRedirectUri

    // this.qqUrl = `http://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&pt_3rd_aid=${qqAppId}&daid=383&pt_skey_valid=0&style=35&s_url=http%3A%2F%2Fconnect.qq.com&refer_cgi=authorize&which=&response_type=code&client_id=${qqAppId}&redirect_uri=${qqRedirectUri}&state=qq`
    this.qqUrl = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${qqAppId}&redirect_uri=${qqRedirectUri}&state=qq&display=mobile`
    this.weiboUrl = `https://api.weibo.com/oauth2/authorize?client_id=${weiboAppId}&response_type=code&redirect_uri=${weiboRedirectUri}&state=weibo`

    let urlParameters = window.location.hash ? window.location.hash.substring(1) : window.location.search.substring(1)
    let map = toParamMap(urlParameters)

    if (map.state == 'qq') {
      this.$toast.loading({
        message: '登录中...',
        duration: 0
      })
      let params = {
        grant_type: 'authorization_code',
        client_id: qqAppId,
        client_secret: qqAppKey,
        code: map.code,
        redirect_uri: qqRedirectUri
      }
      axios.get('/oauth2.0/token', {
        params
      }).then(response => {
        let qqMaq = toParamMap(response.data)
        let accessToken = qqMaq.access_token
        axios.get('/oauth2.0/me', {
          params: {
            access_token: accessToken,
            unionid: 1
          }
        }).then(res => {
          let num1 = res.data.indexOf('(')
          let num2 = res.data.indexOf(')')
          let resultData = JSON.parse(res.data.substring(num1 + 1, num2))
          let openid = resultData['openid']
          let unionid = resultData['unionid']

          axios.post('/api/userCenter/third-login', {
            //							uid: openid,
            uid: unionid,
            loginType: '1'
          }).then(result => {
            this.$toast.clear()
            if (!result.data.success) {
              if (result.data.msg.includes('QQ未绑定') || result.data.msg.includes('微博未绑定') || result.data.msg.includes('微信未绑定')) {
                this.$router.push({
                  path: '/user/login/bindPhone',
                  query: {
                    accessToken: accessToken,
                    openid: openid,
                    unionid: unionid,
                    loginType: 1
                  }
                })
              }
            } else {
              this.success(result.data)
            }
          }).catch(error => {
            console.log(error)
          })
        })
      }).catch(error => {
        console.log(error)
      })
    }

    if (map.state == 'weibo') {
      this.$toast.loading({
        message: '登录中...',
        duration: 0
      })
      axios.post('/oauth2/access_token?client_id=' + weiboAppId +
        '&client_secret=' + weiboSecret +
        '&grant_type=authorization_code' +
        '&code=' + map.code +
        '&redirect_uri=' + weiboRedirectUri).then(response => {

          axios.post('/api/userCenter/third-login', {
            uid: response.data.uid,
            loginType: '3'
          }).then(result => {
            this.$toast.clear()
            if (!result.data.success) {
              if (result.data.msg.includes('QQ未绑定') || result.data.msg.includes('微博未绑定') || result.data.msg.includes('微信未绑定')) {
                this.$router.push({
                  path: '/user/login/bindPhone',
                  query: {
                    accessToken: response.data.access_token,
                    openid: response.data.uid,
                    loginType: 3
                  }
                })
              }
            } else {
              this.success(result.data)
            }
          }).catch(error => {
            console.log(error)
          })
        })
    }

    if (this.mobileForm.mobilePhone.length == 11) {
      this.isClick = true
    } else {
      this.isClick = false
    }
    window.addEventListener("popstate", this.back, false)
  },
  deactivated() {
    this.$destroy()
    window.removeEventListener("popstate", this.back, false)
  },
  methods: {
    check(formName) {
      return this.$refs[formName].checkAll(error => this.$toast(error[0]))
    },
    login() {
      const type = this.type
      if (this.check('mobileForm')) {
        this.loading = true
        const data = this['mobileForm']

        this.$service('userMobileLogin', {
          data
        })
          .then(this.success)
          .catch(this.fail)
        setAccountName(data.mobilePhone || data.name)
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
      /* if (this.fromUrl) {
        location.replace(this.fromUrl)
      } else {
        this.$router.push({
          path: '/user/mine'
        })
      } */
      if (this.fromUrl && (!this.fromUrl.endsWith('/user/login'))) {
        location.replace(this.fromUrl)
      } else {
        this.$router.replace({
          path: '/user/mine'
        })
      }
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
    },
    back() {
      if (!localStorage.getItem('fromUrl')) {
        this.$router.replace({
          name: 'index'
        })
      } else if ((localStorage.getItem('fromUrl').endsWith('/swap/cart') && !getToken()) || (localStorage.getItem('fromUrl').endsWith('/user/mine') && !getToken()) || (localStorage.getItem('fromUrl').endsWith('/user/login') && !getToken())) {
        this.$router.replace({
          name: 'index'
        })
      } else if (localStorage.getItem('fromUrl').endsWith('/complaints') || localStorage.getItem('fromUrl').endsWith('/complaints/list')) {
        this.$router.replace({
          name: 'jewelrySearch-attackFake'
        })
      } else {
        this.$router.go(-1)
        // location.replace(localStorage.getItem('fromUrl'))
      }

      localStorage.removeItem('fromUrl')
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
    openQQ() {
      location.href = this.qqUrl
    },
    validateMobile(rule, value) {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(value) ? '' : '请输入正确的手机号'
    },
    validateDynamicVerifyCode(rule, value) {
      return /^[0-9]*$/.test(value) ? '' : '请输入正确的验证码'
    }
  }
}
</script>

<style lang="postcss" scoped>
.login {
  padding: 50px 20px 10px;
  box-sizing: border-box;
  height: 100vh;
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
  background: none;
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

.tc {
  position: relative;
  top: 20px;
  & a {
    margin: 0 20px;
  }
}
</style>
