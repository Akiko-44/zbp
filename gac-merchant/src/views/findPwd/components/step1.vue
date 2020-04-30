<template>
  <div>
    <el-form
      class="step-form"
      :model="form"
      ref="form"
      :rules="rules"
    >
      <div class="setp-tips text-gray font-md line-h-md mb-4 ">
        <p>请输入您注册时的手机号码，</p>
        <p>我们会将验证信息发送至您的手机号码</p>
      </div>
      <el-form-item prop="mobilePhone">
        <el-input
          v-model.trim="form.mobilePhone"
          placeholder="请输入手机号码"
          maxlength="11"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="dynamicVerifyCode">
        <el-col :span="14">
          <el-input
            type="text"
            v-model.trim="form.dynamicVerifyCode"
            autoComplete="on"
            placeholder="请输入验证码"
          />
        </el-col>
        <el-col :span="1">
          <div style="display:inline-block;width:100%;"></div>
        </el-col>
        <el-col :span="9">
          <el-button
            class="code-btn"
            v-show="sendAuthCode"
            type="primary"
            :loading="codeLoading"
            @click.native.prevent="codeBtn"
          >获取验证码</el-button>
          <el-button
            class="code-btn"
            v-show="!sendAuthCode"
            type="primary"
            disabled
          >已发送({{ authTime }})</el-button>
        </el-col>
      </el-form-item>
      <el-form-item
        prop="verifyCode"
        v-if="form.verify === 0"
      >
        <el-col :span="14">
          <el-input
            name="code"
            type="text"
            v-model.trim="form.verifyCode"
            autoComplete="on"
            placeholder="请输入图形验证码"
          />
        </el-col>
        <el-col :span="1">
          <div style="display:inline-block;width:100%;"></div>
        </el-col>
        <el-col
          :span="9"
          style="border:2px solid #f4f4f4;"
        >
          <img
            @click="code = getVerifyCode()"
            :src="code.url"
            style="display: block;height:56px;margin:0 auto;"
          />
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button
          class="next-btn"
          type="primary"
          style=""
          :loading="submitLoading"
          @click.native.prevent="submitBtn"
        >下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getVerifyCode } from '@/api/admin/login'
import { resetPasswordPre } from '@/api/admin/user'
import { getCode } from '@/api/makeMerchant/center'

export default {
  data() {
    return {
      codeLoading: false,
      submitLoading: false,
      form: {
        mobilePhone: '',
        codeUuid: '',
        verifyCode: '',
        verify: 1,
        dynamicVerifyCode: '',
        msgId: '123456'
      },
      nextNum: 0,
      code: getVerifyCode(),
      sendAuthCode: true,
      authTime: 0,
      rules: {
        mobilePhone: [
          {
            required: true,
            trigger: 'blur',
            pattern: /^\d{11}$/,
            message: '请输入正确的手机号'
          }
        ],
        verifyCode: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入验证码'
          }
        ],
        dynamicVerifyCode: [
          {
            required: true,
            pattern: /^\d{6}$/,
            message: '请输入正确的短信验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    getVerifyCode,
    codeBtn() {
      const self = this
      this.form.codeUuid = this.code.uuid
      this.$refs.form.validateField('mobilePhone', valid => {
        if (!valid) {
          self.codeLoading = true
          getCode(self.form)
            .then(data => {
              self.form.msgId = data.data
              if (data.success) {
                self.sendAuthCode = false
                self.authTime = 2 * 60
                var auth_timetimer = setInterval(() => {
                  self.authTime--
                  if (self.authTime <= 0) {
                    self.sendAuthCode = true
                    clearInterval(auth_timetimer)
                  }
                }, 1000)
              }
              self.codeLoading = false
            })
            .catch(() => {
              self.codeLoading = false
            })
        }
      })
    },
    submitBtn() {
      const self = this
      this.$refs.form.validate(valid => {
        if (valid) {
          self.submitLoading = true
          this.form.codeUuid = this.code.uuid
          resetPasswordPre(this.form)
            .then(data => {
              self.clearAll()
              this.$emit('submit', data.data)
            })
            .catch(() => {
              self.submitLoading = false
              if (this.nextNum >= 3) {
                this.form.verify = 0
                this.code = getVerifyCode()
              } else {
                this.nextNum++
              }
            })
        }
      })
    },
    clearAll() {
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

<style rel="stylesheet/scss" lang="scss" scoped>
.step-form {
  margin: 50px auto 0;
  width: 378px;
  .code-btn {
    margin: 0;
    width: 100%;
    height: 60px;
    background: #418afd;
    border-radius: 0;
    font-size: 16px;
  }
  .next-btn {
    width: 100%;
    height: 52px;
    border-radius: 0;
    border: 0;
    background: linear-gradient(
      87deg,
      rgba(102, 180, 255, 1) 0%,
      rgba(61, 134, 253, 1) 100%
    );
  }
}
/deep/ .el-input {
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    height: 60px;
    font-size: 16px;
    border: 2px solid #f4f4f4;
  }
}
</style>
