<template>
  <div class="app-container calendar-list-container">
    <h4 v-if="phoneNum == 0">验证手机号</h4>
    <h4 v-if="phoneNum == 1">修改手机号</h4>
    <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="120px">
      <el-form-item label="手机号" prop="mobilePhone">
        <el-input v-model="form.mobilePhone" placeholder="请输入手机号" maxlength="11" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形验证码" prop="verifyCode">
        <el-col :span="18">
          <el-input name="code" type="text" v-model="form.verifyCode" autoComplete="on" placeholder="验证码" />
        </el-col>
        <el-col :span="6">
          <img @click="code = getVerifyCode()" :src="code.url" style="display: block;float: right; border-radius: 0 5px 5px 0; height: 47px;" />
        </el-col>
      </el-form-item>
      <el-form-item label="短信验证码">
        <el-col :span="12">
          <el-input type="text" v-model="form.dynamicVerifyCode" autoComplete="on" placeholder="验证码" />
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :loading="codeLoading" @click.native.prevent="codeBtn">获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="submitLoading" @click.native.prevent="submitBtn">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getVerifyCode } from '@/api/admin/login'
import { getCode, validatePhone, changePhone } from '@/api/makeMerchant/center'

export default {
  data() {
  	const validateVerifyCode = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
    	codeLoading: false,
    	submitLoading: false,
      form: {
      	mobilePhone: '',
      	codeUuid: '',
      	verifyCode: '',
      	dynamicVerifyCode: '',
      	msgId: ''
      },
      phoneNum: 0,
      code: getVerifyCode(),
      rules: {
        mobilePhone: [{ required: true, trigger: 'blur', validator: validateVerifyCode }],
      	verifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }]
      }
    }
  },
  methods: {
    getVerifyCode,
    codeBtn() {
    	const self = this
    	this.form.codeUuid = this.code.uuid
      this.$refs.form.validate(valid => {
        if (valid) {
        	self.codeLoading = true
		    	getCode(self.form).then(data => {
		    		self.form.msgId = data.data
		    		self.codeLoading = false
		    	}).catch(() => {
		    		self.codeLoading = false
		    	})
	    	}
      })
    },
    submitBtn() {
    	const self = this
    	this.submitLoading = true
    	if(!this.form.dynamicVerifyCode.trim()){
    		this.$notify({
          title: '警告',
          message: '短信验证码不能为空',
          type: 'warning'
        })
    		return false;
    	}
    	this.form.codeUuid = this.code.uuid
    	if(self.phoneNum == 0){
    		validatePhone(this.form).then(data => {
    			this.$notify({
	          title: '成功',
	          message: '手机号验证成功',
	          type: 'success'
	        })
    			self.phoneNum = 1
    			self.code = self.getVerifyCode()
    			self.clearAll()
    		}).catch(() => {
    			self.clearAll()
    		})
    	}else{
    		changePhone(this.form).then(data => {
    			this.$notify({
	          title: '成功',
	          message: '手机号修改成功',
	          type: 'success'
	        })
    			self.phoneNum = 0
    			self.clearAll()
    		}).catch(() => {
    			self.clearAll()
    		})
    	}
    },
    clearAll(){
    	this.form = {
				mobilePhone: '',
	      	codeUuid: '',
	      	verifyCode: '',
	      	dynamicVerifyCode: ''
			}
			this.submitLoading = false
    }
  }
}
</script>

<style scoped>
  
</style>

