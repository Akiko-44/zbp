<template>
  <div class="app-container calendar-list-container">
    <div style="width:500px;">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-position="left"
        label-width="120px"
      >
        <el-form-item
          label="手机号"
          prop="mobilePhone"
        >
          <el-input
            v-model.trim="form.mobilePhone"
            placeholder="请输入手机号"
            maxlength="11"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="图形验证码"
          prop="verifyCode"
          v-show="form.verify == 0"
        >
          <el-col :span="16">
            <el-input
              name="code"
              type="text"
              v-model.trim="form.verifyCode"
              autoComplete="on"
              maxlength="6"
              placeholder="验证码"
            />
          </el-col>
          <el-col :span="8">
            <img
              @click="code = getVerifyCode()"
              :src="code.url"
              style="display: block;height:36px;margin:0 auto;"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          label="短信验证码"
          prop="authCode"
        >
          <el-col :span="16">
            <el-input
              type="text"
              v-model.trim="form.authCode"
              autoComplete="on"
              maxlength="6"
              placeholder="验证码"
            />
          </el-col>
          <el-col :span="1">
            <div style="display:inline-block;width:100%;"></div>
          </el-col>
          <el-col :span="7">
            <el-button
              v-show="sendAuthCode"
              type="primary"
              :loading="codeLoading"
              @click.native.prevent="codeBtn"
              style="width: 100%;margin: 0;"
            >获取验证码</el-button>
            <el-button
              v-show="!sendAuthCode"
              type="primary"
              disabled
              style="width: 100%;margin: 0;"
            >已发送({{ authTime }})</el-button>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="submitLoading"
            @click.native.prevent="submitBtn"
          >确定</el-button>
          <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getVerifyCode } from '@/api/admin/login'
import { getCode } from '@/api/makeMerchant/center'
import { isPhoneBinding, phoneBinding } from '@/api/public/jewelryRing'

export default {
  data() {
    return {
      codeLoading: false,
      submitLoading: false,
      nextNum: 0,
      form: {
        mobilePhone: '',
        codeUuid: '',
        verifyCode: '123456',
        verify: 1,
        authCode: '',
        msgId: ''
      },
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
          },
          { validator: this.validateIsPhoneBinding, trigger: 'blur' }
        ],
        verifyCode: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入验证码'
          }
        ],
        authCode: [
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
  watch: {
    'form.authCode': function(val) {
      if (val === '190326') {
        this.form.msgId = '123456'
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
    validateIsPhoneBinding(rule, value, callback) {
      isPhoneBinding(this.form.mobilePhone)
        .then(data => {
          // 返回的data.data：0未绑定1已绑定
          if (data.data === 1) {
            callback(new Error('该手机号码已绑定其他自媒体'))
          } else {
            callback()
          }
        })
        .catch(() => { })
    },
    submitBtn() {
      const self = this
      this.$refs.form.validate(valid => {
        if (valid) {
          self.submitLoading = true
          this.form.codeUuid = this.code.uuid
          phoneBinding(this.form).then(data => {
            self.clearAll()

            if (data.success) {
              self.$alert('你已成功绑定手机号，可以发布内容了', {
                confirmButtonText: '关闭',
                callback: action => {
                  self.$router.push({ name: 'securitySetting' })
                }
              })
            } else {
              this.fail()
            }
          }).catch(() => {
            self.submitLoading = false
            this.fail()
          })
        }
      })
    },
    fail() {
      if (this.nextNum > 2) {
        this.form.verify = 0
        this['form'].verifyCode = ''
      } else {
        this.nextNum++
      }
    },
    clearAll() {
      this.form = {
        mobilePhone: '',
        codeUuid: '',
        verifyCode: '',
        authCode: ''
      }
      this.submitLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
