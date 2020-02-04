<template>
  <div class="app-container calendar-list-container">
    <div class="findpwd">
      <div
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
      </div>
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
          label="短信验证码"
          prop="dynamicVerifyCode"
        >
          <el-col :span="16">
            <el-input
              type="text"
              v-model.trim="form.dynamicVerifyCode"
              autoComplete="on"
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
        <el-form-item
          label="图形验证码"
          prop="verifyCode"
        >
          <el-col :span="16">
            <el-input
              name="code"
              type="text"
              v-model.trim="form.verifyCode"
              autoComplete="on"
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

        <el-form-item>
          <el-button
            type="primary"
            style="width:300px;"
            :loading="submitLoading"
            @click.native.prevent="submitBtn"
          >下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getVerifyCode } from '@/api/admin/login'
import { resetPasswordPre } from '@/api/admin/user'
import { getCode, validatePhone, changePhone } from '@/api/makeMerchant/center'

export default {
  data() {
    return {
      codeLoading: false,
      submitLoading: false,
      form: {
        mobilePhone: '',
        codeUuid: '',
        verifyCode: '',
        dynamicVerifyCode: '',
        msgId: '123456'
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
          resetPasswordPre(this.form).then(data => {
            self.clearAll()
            this.$router.push({
              path: '/findPwdNext',
              query: { uuid: data.data }
            })
          }).catch(() => {
            self.submitLoading = false
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
ul {
  padding: 0;
}
li {
  list-style: none;
}
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
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background: #ffffff;
  }
  .stepWrap {
    margin-bottom: 50px;
    margin-top: 20px;
    ul {
      width: 510px;
      position: relative;
      margin: 0 auto;
      color: #cccccc;
      margin-bottom: 40px;
      overflow: hidden;
    }
    &:after {
      position: absolute;
      height: 2px;
      width: 470px;
      content: "";
      top: 75px;
      left: 56px;
      right: 20px;
      background: #e5e5e5;
    }
    li {
      width: 70px;
      text-align: center;
      position: relative;
      z-index: 2;
    }
    li span {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: #cccccc;
      color: #fff;
      border-radius: 50%;
      font-size: 24px;
      line-height: 40px;
    }
    li.cur span {
      background: #409eff;
    }
    li p {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 14px;
    }
    li.cur p {
      color: #606266;
    }
  }
}
</style>
