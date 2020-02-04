<template>
  <AppView class="registered">
  	<div class="container">
	    <validator ref="form" :model="form" :rules="rules" class="form" v-show="!successState">
	      <template slot-scope="{ error, check }">
	      	<div class="logo">
		    		<img src="./images/logo.png"/>
		    	</div>
		    	<div class="tc">
		    		<p style="margin-bottom: 10px;font-size: 18px;">中宝协云平台</p>
		    		<p style="color: #999999;font-size: 12px;margin-bottom: 30px;">您身边的珠宝专家</p>
		    	</div>
	        <div class="input-container">
	        	<div class="border-div">
		          <label class="iconRow iconRow-phone"></label>
		          <div>
		            <input v-model="form.mobilePhone" @blur="check('mobilePhone')" type="tel" placeholder="请输入手机号"> 
		          </div>
	          </div>
	          <p class="msg error">{{error.mobilePhone}}</p>
	        </div>
	        <div class="input-container">
	        	<div class="border-div" style="padding-right: 100px;">
		          <label class="iconRow iconRow-code3"></label>
		          <div>
		            <input v-model="form.verifyCode" @blur="check('verifyCode')" type="text" placeholder="" style="width: 100px;">
		            <CodeImage ref="codeImage" @refresh="refresh" />
		          </div>
		        </div>
		        <p class="msg error">{{error.verifyCode}}</p>
	        </div>
	        <div class="input-container">
	        	<div class="border-div" style="padding-right: 100px;">
		          <label class="iconRow iconRow-code2"></label>
		          <div>
		            <input v-model="form.dynamicVerifyCode" @blur="check('dynamicVerifyCode')" type="text" placeholder="" style="width: 100px;">
		            <CodeBtn :form="form" @fail="fail" />
		          </div>
		        </div>
		        <p class="msg error">{{error.dynamicVerifyCode || error.msgId}}</p>
	        </div>
	        <div class="input-container">
	        	<div class="border-div">
		          <label class="iconRow iconRow-code1"></label>
		          <div>
		            <input v-model="form.password" @blur="check('password')" autoComplete="on" type="password" placeholder="请设置密码">
		          </div>
	          </div>
	          <p class="msg error">{{error.password}}</p>
	        </div>
	        <div class="input-container">
	        	<div class="border-div">
		          <label class="iconRow iconRow-code1"></label>
		          <div>
		            <input v-model="form.confirmPassword" @blur="check('confirmPassword')" autoComplete="on" type="password" placeholder="请确认密码">
		          </div>
	          </div>
	          <p class="msg error">{{error.confirmPassword}}</p>
	        </div>
	        <p style="color: #808080;font-size: 12px;text-align: right;margin: 13px auto;">
	        	<span @click="$router.push({name: 'user-login-extension'})">我要登录</span>
	        </p>
	        <div class="input-row agreement">
	          <van-checkbox v-model="form.checked" @click.native="check('checked')"></van-checkbox>
	          <div class="border-input dark-gray" style="border: none;margin-left: 15px;">
	            我已阅读和接受<a href="javascript:;">《珠宝云平台网络服务使用协议》</a>和
	            <a href="javascript:;">《珠宝云平台免费服务条款》</a>
	            <p class="msg error">{{error.checked}}</p>
	          </div>
	        </div>
	        <div>
	        	<van-button :loading="loading" block class="save" @click="submit">注&emsp;册</van-button>
	        </div>
	      </template>
	    </validator>
	  </div>
  </AppView>
</template>

<script>
import CodeImage from '~/components/common/verifyCode/codeImage'
import CodeBtn from '~/components/common/verifyCode/codeBtnExtension'
import Validator from '~/components/common/validator'

export default {
  components: {
    Validator,
    CodeImage,
    CodeBtn
  },
  data () {
    const validatePasswordAgain = (rule, value) => {
      if (value === '') return '请再次输入密码'
      if (value !== this.form.password) return '两次输入密码不一致'
    }
    return {
      loading: false,
      successState: false,
      form: {
        codeUuid: '',
        confirmPassword: '',
        dynamicVerifyCode: '',
        mobilePhone: '',
        verifyCode: '',
        password: '',
        msgId: '',
        checked: false
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
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, message: '请输入6位数以上的密码' }
        ],
        confirmPassword: [
          { validator: validatePasswordAgain }
        ],
        checked: [
          { required: true, message: '请同意使用协议和服务条款' }
        ],
        msgId: [
          { required: true, message: '短信验证码有误' }
        ]
      }
    }
  },
  head () {
    return {
      title: '注册'
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.checkAll()) {
        this.loading = true
        this.$service('userRegister', { data: this.form })
          .then(this.success)
          .catch(this.fail)
      }
    },
    success () {
      this.successState = true
      this.loading = false
      this.$toast({ type: 'success', message: '注册成功' })
    },
    fail () {
      this.$refs.codeImage.refresh()
      this.loading = false
      this.form.verifyCode = ''
    },
    refresh (code) {
      this.form.codeUuid = code.uuid
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
.form {
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
.agreement {
  font-size: 12px;
  line-height: 18px;
  & a {
    color: #2391d1;
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
.iconRow-code1{
	width: 18px;
	height: 18px;
	background: url(./images/icon_code1.png) no-repeat;
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
	top: 0;
	right: 0;
}
.code-btn{top: 10px;}
.save{
	height: 40px;
	border-radius: 20px;
	background: #941616;
	color: #FFFFFF;
}
.msg{
	width: 100%;
	height: 20px;
	line-height: 20px;
	font-size: 14px;
	color: #FF0000;
}
</style>
