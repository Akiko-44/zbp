<template>
  <div>
    <el-form
      class="step-form"
      :model="form"
      ref="form"
      :rules="rules"
      label-width="110px"
    >
      <el-form-item label="原手机号码：">
        <span class="text-gray">{{mobilePhone}}</span>
      </el-form-item>
      <el-form-item
        prop="dynamicVerifyCode"
        label="短信验证码："
      >
        <div class="d-flex a-center">
          <el-input
            type="text"
            v-model.trim="form.dynamicVerifyCode"
            autoComplete="on"
            placeholder="请输入验证码"
            style="width:148px;"
            class="mr-1"
          />
          <el-button
            class="primary-btn-sm code-btn"
            v-show="sendAuthCode"
            type="primary"
            :loading="codeLoading"
            @click.native.prevent="codeBtn"
          >获取验证码</el-button>
          <el-button
            class="primary-btn-sm code-btn"
            v-show="!sendAuthCode"
            type="primary"
            disabled
          >已发送({{ authTime }})</el-button>
        </div>
      </el-form-item>
      <el-form-item
        v-if="form.verify === 0"
        prop="verifyCode"
        label="图形验证码："
      >
        <div class="d-flex a-center">
          <el-input
            name="code"
            type="text"
            v-model.trim="form.verifyCode"
            autoComplete="on"
            placeholder="请输入图形验证码"
            style="width:148px"
            class="mr-1"
          />
          <div style="border:2px solid #f4f4f4;">
            <img
              @click="code = getVerifyCode()"
              :src="code.url"
              style="display: block;width:80px;height:30px;margin:0 auto;"
            />
          </div>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          class="next-btn"
          type="primary"
          :loading="submitLoading"
          @click.native.prevent="submitBtn"
        >下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getVerifyCode } from '@/api/admin/login'
import { getCode, validatePhone } from '@/api/makeMerchant/center'

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
  computed: {
    ...mapGetters([
      'mobilePhone'
    ])
  },
  methods: {
    getVerifyCode,
    codeBtn() {
      this.form.codeUuid = this.code.uuid
      this.form.mobilePhone = this.mobilePhone
      this.codeLoading = true
      getCode(this.form).then(data => {
        this.form.msgId = data.data
        if (data.success) {
          this.sendAuthCode = false
          this.authTime = 2 * 60
          var auth_timetimer = setInterval(() => {
            this.authTime--
            if (this.authTime <= 0) {
              this.sendAuthCode = true
              clearInterval(auth_timetimer)
            }
          }, 1000)
        }
        this.codeLoading = false
      }).catch(() => {
        this.codeLoading = false
      })
    },
    submitBtn() {
      const self = this
      this.$refs.form.validate(valid => {
        if (valid) {
          self.submitLoading = true
          this.form.codeUuid = this.code.uuid
          validatePhone(this.form)
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
  .code-btn.primary-btn-sm {
    margin: 0;
  }
  .next-btn {
    width: 156px;
  }
}
</style>
