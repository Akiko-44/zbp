<template>
  <div class="login">
    <div class="logo">
    	<!--<img src="./images/logOne.png" width="160"/>-->
    	<img src="./images/logo.png" width="66"/>
    	<p style="margin-top: 20px;">中宝平</p>
    </div>
    <AppView class="registered">
	  	<div class="container">
		    <validator ref="mobileForm" :rules="rules" :model="mobileForm" class="mobileForm">
		      <template slot-scope="{ error, check }">
			    	<div class="input-container">
		        	<div class="border-div" style="padding-right: 100px;">
			          <label class="iconRow iconRow-phone"></label>
			          <div>
			            <input class="input" v-model="mobileForm.mobilePhone" type="tel" placeholder="请输入手机号">
			          </div>
			        </div>
		        </div>
		        <div class="input-container" v-show="mobileForm.verify == 0">
		        	<div class="border-div" style="padding-right: 100px;">
			          <label class="iconRow iconRow-code"></label>
			          <div>
			            <input v-model="mobileForm.verifyCode" type="text" placeholder="请输入验证码" style="width: 100px;">
			            <CodeImage ref="mobileCodeImage" @refresh="refresh" />
			          </div>
			        </div>
		        </div>
		        <div class="input-container">
		        	<div class="border-div" style="padding-right: 100px;">
			          <label class="iconRow iconRow-code"></label>
			          <div>
			            <input v-model="mobileForm.dynamicVerifyCode" type="text" placeholder="请输入验证码" style="width: 100px;">
			            <CodeBtn :form="mobileForm" @fail="fail"/>
			          </div>
			        </div>
		        </div>
		        <div class="input-row agreement">
		          <van-checkbox v-model="mobileForm.checked" @click.native="check('checked')"></van-checkbox>
		          <div class="border-input dark-gray" style="border: none;margin-left: 15px;">
		            <p @click="$router.push({name:'user-agreement'})">我已阅读和接受<a>《中宝平用户注册协议》</a></p>
		            <p class="msg error">{{error.checked}}</p>
		          </div>
		        </div>
		        <van-button @click="login" :loading="loading" block class="save">注册</van-button>
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
    Validator
  },
  activated () {
    document.title = '注册'
  },
  data () {
    return {
    	nextNum: 0,
      mobileForm: {
        codeUuid: '123456',
        mobilePhone: getAccountName(),
        verifyCode: '123456',
        dynamicVerifyCode: '',
        loginType: '2',
        msgId: '',
        verify: 1,
        checked: true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码' }
        ],
        dynamicVerifyCode: [
          { required: true, message: '请输入短信验证码' }
        ],
        verifyCode: [
          { required: true, message: '请输入图形验证码' }
        ],
        msgId: [
          { required: true, message: '短信验证码有误' }
        ],
        checked: [
          { required: true, message: '请同意珠宝云平用户注册协议' }
        ]
      },
      loading: false
    }
  },
  computed: {
    
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
    	let self = this
    	if(result.data.loginType == 0){
	      this.loading = false
	      this.$store.commit('user/setToken', result.data.accessToken)
	      this.$toast({ type: 'success', message: '成功' })
	      setTimeout(function(){
	      	self.$router.push({name: 'user-regOrLogin-success'})
	      },1000)
      }else{
      	this.$toast('该用户已注册')
      	this.fail()
      }
    },
    fail () {
    	if(this.nextNum >= 4){
    		this.mobileForm.verify = 0
    		this['mobileForm'].verifyCode = ''
      	this.$refs['mobileCodeImage'].refresh()
    	}else{
    		this.nextNum++
    	}
      this.loading = false
    },
    refresh (code) {
      this['mobileForm'].codeUuid = code.uuid
    }
  }
}
</script>

<style lang="postcss" scoped>
.login {
  min-height: 100vh;
  padding: 50px 20px 10px;
  box-sizing: border-box;
  background: #FFFFFF;
}
.logo {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 4px;
}

.container{
	margin-top: 81px;
}
.mobileForm {
	width: 86%;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
}
input{
	border: none;
	height: 36px;
	font-size: 14px;
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
	background: url(./images/vip.png) no-repeat;
	background-size: 100% auto;
}
.iconRow-code{
	width: 18px;
	height: 18px;
	background: url(./images/vip2.png) no-repeat;
	background-size: 100% auto;
}
.code-image, .code-btn{
	position: absolute;
	top: 5px;
	right: 0;
}
.code-btn{top: 10px;}
.save{
	height: 44px;
	border-radius: 6px;
	background: #890F1C;
	color: #FFFFFF;
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
