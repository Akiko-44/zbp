<template>
  <div class="app-container calendar-list-container">
    <div class="findpwd">
      <!-- <div
        class="stepWrap"
        style="height: 65px;"
      >
        <ul class="clearfix">
          <li class="fl cur">
            <span>1</span>
            <p>验证手机号</p>
          </li>
          <li
            class="fl"
            style="margin-left: 160px"
          >
            <span>2</span>
            <p>修改密码</p>
          </li>
          <li class="fr">
            <span>3</span>
            <p>修改成功</p>
          </li>
        </ul>
      </div> -->
      <el-steps
        class="step"
        :active="active"
        align-center
      >
        <el-step title="验证手机号" />
        <el-step title="修改密码" />
        <el-step title="修改成功" />
      </el-steps>

      <div
        v-if="active === 0"
        class="step1"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-position="left"
          label-width="120px"
        >
          <el-form-item
            label="手机号"
            prop="mobilePhone"
          >
            <el-input
              v-model="form.mobilePhone"
              placeholder="请输入手机号"
              maxlength="11"
              auto-complete="off"
            />
          </el-form-item>
          <el-form-item
            label="短信验证码"
            prop="dynamicVerifyCode"
          >
            <el-col :span="16">
              <el-input
                v-model="form.dynamicVerifyCode"
                type="text"
                auto-complete="on"
                placeholder="验证码"
              />
            </el-col>
            <el-col :span="6">
              <el-button
                v-show="sendAuthCode"
                type="primary"
                :loading="codeLoading"
                style="margin-left: 10px;"
                @click.native.prevent="codeBtn"
              >获取验证码</el-button>
              <el-button
                v-show="!sendAuthCode"
                type="primary"
                disabled
              >已发送({{ authTime }})</el-button>
            </el-col>
          </el-form-item>
        </el-form>
        <div class="next-btn">
          <el-button
            type="primary"
            :loading="submitLoading"
            @click.native.prevent="submitBtn"
          >下一步</el-button>
        </div>
      </div>

      <div
        v-if="active === 1"
        class="step2"
      >
        <el-form
          ref="resetForm"
          :model="resetForm"
          :rules="rules"
          label-position="left"
          label-width="120px"
        >
          <el-form-item
            label="新密码"
            prop="password"
          >
            <el-input
              v-model="resetForm.password"
              type="password"
              placeholder="请输入新密码"
              auto-complete="off"
            />
          </el-form-item>
          <el-form-item
            label="确认新密码"
            prop="confirmPassword"
          >
            <el-input
              v-model="resetForm.confirmPassword"
              type="password"
              placeholder="请再次输入新密码"
              auto-complete="off"
            />
          </el-form-item>
          <div class="next-btn">
            <el-button
              type="primary"
              :loading="submitLoading"
              @click.native.prevent="resetPassword"
            >下一步</el-button>
          </div>
        </el-form>
      </div>

      <div
        v-if="active === 2"
        class="step3 next-btn"
      >
        <img
          src="../../assets/image/success.png"
          alt=""
        >
        <p>设置成功，即将返回登录页面{{ second }}秒</p>
        <div class="next-btn">
          <el-button
            type="primary"
            @click.native.prevent="success"
          >立即返回</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getSmsCode, resetPasswordPre, resetPassword } from '@/api/user'
// import { getCode, validatePhone, changePhone } from '@/api/makeMerchant/center'

export default {
  data() {
    const validateMobilePhone = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('手机号不能为空'))
      } else {
        callback()
      }
    }
    const validateVerifyCode = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      second: 3,
      codeLoading: false,
      submitLoading: false,
      form: {
        mobilePhone: '',
        dynamicVerifyCode: '',
        msgId: ''
      },
      resetForm: {
        moblePhone: '',
        password: '',
        confirmPassword: ''
      },
      sendAuthCode: true,
      authTime: 0,
      rules: {
        mobilePhone: [{ required: true, trigger: 'blur', validator: validateMobilePhone }],
        dynamicVerifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }],
        password: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        },
        {
          min: 6,
          message: '密码长度最少为6位',
          trigger: 'blur'
        }
        ],
        confirmPassword: [{
          required: true,
          message: '请再次输入新密码',
          trigger: 'blur'
        },
        {
          min: 6,
          message: '密码长度最少为6位',
          trigger: 'blur'
        },
        {
          validator: this.validatePass2,
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    codeBtn() {
      this.$refs.form.validateField('mobilePhone', err => {
        if (!err) {
          this.codeLoading = true
          const params = { mobilePhone: this.form.mobilePhone }
          getSmsCode(params).then(data => {
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
        } else {
          return false
        }
      })
    },
    submitBtn() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true
          resetPasswordPre(this.form).then(data => {
            this.clearAll()
            this.active++
          }).catch(() => {
            this.clearAll()
          })
        }
      })
    },
    resetPassword() {
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          this.resetForm.moblePhone = this.form.mobilePhone
          resetPassword(this.resetForm).then(data => {
            this.clearAll()
            this.active++
            const successTimetimer = setInterval(() => {
              this.second--
              if (this.second <= 0) {
                clearInterval(successTimetimer)
                this.success()
              }
            }, 1000)
          }).catch(() => {
            this.clearAll()
          })
        }
      })
    },
    success() {
      this.$router.push({ path: '/login' })
    },
    clearAll() {
      // this.form = {
      //   mobilePhone: '',
      //   verifyCode: '',
      //   dynamicVerifyCode: ''
      // }
      this.submitLoading = false
    },
    validatePass2(rule, value, callback) {
      if (value !== this.resetForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  .findpwd {
    position: absolute;
    left: 0;
    right: 0;
    width: 580px;
    padding: 50px 35px;
    margin: 120px auto;
    background: #ffffff;
  }
  .step {
    margin-bottom: 20px;
  }
  .next-btn {
    text-align: center;
    & button {
      width: 200px;
    }
  }
}
</style>

