<template>
  <AppView class="registered">
  	<div class="container">
	    <validator ref="mobileForm" :rules="rules" :model="mobileForm" class="mobileForm">
	      <template>
	      	<div class="logo">
		    		<img src="./images/logo2.png"/>
		    	</div>
		    	<div class="tc">
		    		<p style="margin-bottom: 10px;font-size: 18px;">中宝协云平台</p>
		    		<p style="color: #999999;font-size: 12px;margin-bottom: 30px;">您身边的珠宝专家</p>
		    	</div>
		    	<div class="input-container">
	        	<div class="border-div" style="padding-right: 100px;">
		          <label class="iconRow iconRow-phone"></label>
		          <div>
		            <input class="input" v-model="mobileForm.mobilePhone" type="tel" placeholder="请输入手机号">
		          </div>
		        </div>
	        </div>
		    	<div class="input-container">
	        	<div class="border-div" style="padding-right: 100px;">
		          <label class="iconRow iconRow-code3"></label>
		          <div>
		            <input v-model="mobileForm.verifyCode" type="text" placeholder="" style="width: 100px;">
		            <CodeImage ref="mobileCodeImage" @refresh="refresh" />
		          </div>
		        </div>
	        </div>
	        <div class="input-container">
	        	<div class="border-div" style="padding-right: 100px;">
		          <label class="iconRow iconRow-code2"></label>
		          <div>
		            <input v-model="mobileForm.dynamicVerifyCode" type="text" placeholder="" style="width: 100px;">
		            <CodeBtn :form="mobileForm" @fail="fail"/>
		          </div>
		        </div>
	        </div>
	        <p style="color: #808080;font-size: 12px;text-align: right;margin-top: 13px;">
	        	<span @click="$router.push({name: 'user-registered-extension'})">我要注册</span>
	        </p>
	        <van-button @click="login" :loading="loading" block class="save">登录</van-button>
	        <p class="tc" style="color: #941616;margin-top: 25px;font-size: 15px;">汇聚全球珠宝，让您放眼世界</p>
	      </template>
	    </validator>
	  </div>
  </AppView>
</template>

<script>
import CodeImage from '~/components/common/verifyCode/codeImage'
import CodeBtn from '~/components/common/verifyCode/codeBtnExtension'
import OtherLogin from './modules/otherLogin'
import Validator from '~/components/common/validator'

const AccountNameKey = 'AccountName'

function getAccountName () {
  if (process.server) return ''
  return localStorage[AccountNameKey] || ''
}

function setAccountName (name) {
  localStorage[AccountNameKey] = name
}

export default {
  components: {
    CodeImage,
    CodeBtn,
    OtherLogin,
    Validator
  },
  activated () {
    document.title = '登录'
  },
  data () {
    return {
      mobileForm: {
        codeUuid: '',
        mobilePhone: getAccountName(),
        verifyCode: '',
        dynamicVerifyCode: '',
        loginType: '2',
        msgId: '',
        loginMethod: 1
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码' }
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
  methods: {
    check (formName) {
      return this.$refs[formName].checkAll(error => this.$toast(error[0]))
    },
    login () {
      const type = this.type

      if (this.check('mobileForm')) {
        this.loading = true
        const data = this['mobileForm']

        this.$service('userMobileLogin', { data })
          .then(this.success)
          .catch(this.fail)

        setAccountName(data.mobilePhone || data.name)
      }
    },
    success (result) {
      this.loading = false
      this.$store.commit('user/setToken', result.data.accessToken)

      this.$toast({ type: 'success', message: '登录成功' })
    },
    fail () {
      this['mobileForm'].verifyCode = ''
      this.$refs['mobileCodeImage'].refresh()
      this.loading = false
    },
    refresh (code) {
      this['mobileForm'].codeUuid = code.uuid
    }
  }
}
</script>

<style lang="postcss" scoped>
.container{
	padding-top: 80px;
	background: #FFFFFF url(./images/bg_pic.png) no-repeat;
  background-size: 100% auto;
}
.mobileForm {
	width: 80%;
  padding: 50px 15px 15px;
  box-sizing: border-box;
  margin: 0 auto;
  background: #FFFFFF;
  border-radius: 15px;
  position: relative;
}
.logo{
	box-sizing: border-box;
	width: 90px;
	height: 90px;
	padding: 20px;
	background: #FFFFFF;
	border-radius: 50%;
	position: absolute;
	left: 50%;
	top: -45px;
	margin-left: -45px;
	& img{
		width: 50px;
	}
}
input{
	border: none;
	height: 36px;
}
.border-div{
	box-sizing: border-box;
	padding-left: 30px;
	padding-top: 5px;
	padding-bottom: 5px;
	position: relative;
	border-bottom: 1px solid #E0E0E0;
}
.border-div .iconRow{
	display: inline-block;
	position: absolute;
	left: 0;
	top: 16px;
}
.iconRow-phone{
	width: 18px;
	height: 18px;
	background: url(./images/icon_phone.png) no-repeat;
	background-size: 100% auto;
}
.iconRow-code2{
	width: 18px;
	height: 18px;
	background: url(./images/icon_code2.png) no-repeat;
	background-size: 100% auto;
}
.iconRow-code3{
	width: 18px;
	height: 18px;
	background: url(./images/icon_code3.png) no-repeat;
	background-size: 100% auto;
}
.code-image, .code-btn{
	position: absolute;
	top: 5px;
	right: 0;
}
.code-btn{top: 10px;}
.save{
	height: 40px;
	border-radius: 20px;
	background: #941616;
	color: #FFFFFF;
	margin-top: 34px;
}
</style>
