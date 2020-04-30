<template>
  <div
    class="page-container calendar-list-container"
    v-loading="pageLoading"
  >
    <el-steps
      :active="active"
      align-center
      :space="227"
      process-status="finish"
      class="step-box block-center"
    >
      <el-step title="填写资料">
      </el-step>
      <el-step
        title="对公打款认证"
        v-if="registType === 2"
      >
      </el-step>
      <el-step title="签订协议">
      </el-step>
      <el-step title="资质审核">
      </el-step>
    </el-steps>
    <template v-if="active === 0">
      <div class="text-container">
        <img src="../../../assets/image/user/auditSucess.png">
        <p class="text-main">资料提交成功，平台初审中</p>
        <p class="text-info">请在收到银联的打款金额和验证码后，进行对公打款认证。</p>
      </div>
    </template>
    <template v-if="active === 1">
      <el-form
        label-position="left"
        :model="form"
        ref="form"
        :rules="rules"
        label-width="80px"
        class="pl-4 pt-5"
      >
        <el-form-item
          label="金额："
          prop="transAmt"
        >
          <el-input
            v-model="form.transAmt"
            style="width:310px"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="验证码："
          prop="verifyCode"
        >
          <el-input
            v-model="form.verifyCode"
            style="width:310px"
          ></el-input>
          <span class="text-primary font-12 pl">验证码请在打款记录的备注中查看</span>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="primary-btn-md"
            type="primary"
            @click="account"
          >
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-if="active === 2">
      <div class="text-container">
        <img src="../../../assets/image/user/agreement.png">
        <p class="text-main">您已完成对公打款认证</p>
        <p class="text-info">请前往<span
            class="link-type"
            @click="toUrl"
          >银联商务</span>，签订协议。</p>
      </div>
    </template>
    <template v-if="active === 3">
      <div
        v-if="signData.apply_status && (signData.apply_status=='01' || signData.apply_status=='02')"
        class="text-container"
      >
        <img src="../../../assets/image/user/audit.png">
        <p class="text-main">您已成功签订协议，银联审核中</p>
        <p class="text-info">审核结果将以短信形式通知到手机：{{mobilePhone | formatPhone}}，请您耐心等候</p>
      </div>
      <div
        v-else-if="signData.apply_status && signData.apply_status=='03'"
        class="text-container"
      >
        <img src="../../../assets/image/user/auditSucess.png">
        <p class="text-main">您已完成自主签约，获得商编：{{mer_no}}</p>
      </div>
      <div
        style="margin-bottom: 20px;"
        class="text-container"
        v-else-if="signData.apply_status && (signData.apply_status=='04' || signData.apply_status=='06' || signData.apply_status=='28' || signData.apply_status=='31' || signData.apply_status=='99')"
      >
        <img src="../../../assets/image/user/auditFail.png">
        <p class="text-main">未通过审核</p>
        <p class="text-info">
          尊敬的中宝平商户，您的企业认证未通过审核
          <el-popover
            placement="bottom-end"
            width="400"
            trigger="hover"
            :visible-arrow="false"
            popper-class="custom-popper"
            :offset="50"
          >
            <i
              class="el-icon-warning warning-tip-icon"
              slot="reference"
            ></i>
            <div>
              <p
                class="text-gray font-12 mb-1"
                v-if="signData.failReason"
              >
                {{signData.failReason}}
              </p>
              <el-button
                class="primary-btn-md"
                type="primary"
                @click="$router.push({name: 'certification'})"
              >
                修改资料
              </el-button>
            </div>
          </el-popover>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { accountVerify, agreementSign, signQuery } from '@/api/makeMerchant/center'
import { getInfo } from '@/api/jewelryMerchant/merchant'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      active: undefined,
      show: true,
      pageLoading: false,
      loading: false,
      sign: {
        '00': '签约中',
        '01': '签约成功',
        '02': '入网审核中',
        '03': '入网成功',
        '04': '入网失败',
        '99': '其它错误'
      },
      resCode: '',
      signData: {},
      signFlag: false,
      // registType 1个人 2 企业
      registType: 0,
      mer_no: '',
      form: {
        transAmt: '',
        verifyCode: ''
      },
      rules: {
        transAmt: [
          {
            required: true,
            message: '请输入金额',
            trigger: 'blur'
          }
        ]
        // verifyCode: [
        //   {
        //     required: true,
        //     message: '请输入验证码',
        //     trigger: 'blur'
        //   }
        // ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'mobilePhone'
    ])
  },
  created() {
    this.pageLoading = true
    getInfo().then(res => {
      this.registType = res.data.registType
      signQuery({ userId: '' }).then(resData => {
        this.pageLoading = false
        const data = resData.data
        this.resCode = data.res_code
        this.mer_no = data.mer_no
        this.signData = data
        if (this.signData.apply_status) {
          if (this.signData.apply_status === '05') {
            this.active = 1
          } else if (this.signData.apply_status === '00') {
            this.active = 2
          } else if ('01,02,03,04,06,28,31,99'.indexOf(this.signData.apply_status) !== -1) {
            this.active = 3
          }
        }
      }).catch(() => {
        this.pageLoading = false
      })
    })
  },
  methods: {
    toUrl() {
      // if (this.resCode == '0000') {
      agreementSign().then(res => {
        setTimeout(() => {
          // window.open(res.data.htmlContent)
          var el1 = document.createElement('a')
          el1.setAttribute('target', '_blank')
          el1.setAttribute('id', 'openWin')
          el1.setAttribute('href', res.data.htmlContent)
          document.body.appendChild(el1)
          document.getElementById('openWin').click()
          document.body.removeChild(el1)
        }, 1000)
      })
      // }
    },
    account() {
      const set = this.$refs
      set.form.validate((valid) => {
        if (valid) {
          this.loading = true
          accountVerify(this.form).then(data => {
            if (data.data.resCode === '0000') {
              agreementSign().then(res => {
                localStorage.setItem('htmlContent', res.data.htmlContent)
                setTimeout(() => {
                  var el1 = document.createElement('a')
                  el1.setAttribute('target', '_blank')
                  el1.setAttribute('id', 'openWin')
                  el1.setAttribute('href', res.data.htmlContent)
                  document.body.appendChild(el1)
                  document.getElementById('openWin').click()
                  document.body.removeChild(el1)
                  // window.open(res.data.htmlContent)
                }, 1000)
              })
            } else {
              this.$notify({
                title: '警告',
                message: data.data.resMes,
                type: 'warning'
              })
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.step-box {
  width: 680px;
  .el-step__head.is-finish {
    .step-icon {
      background: #418afd;
    }
  }
  /deep/ .el-step__title {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }
}
.text-container {
  padding-top: 100px;
  text-align: center;
  .text-main {
    margin: 10px 0;
    font-size: 16px;
    color: #333333;
  }
  .text-info {
    font-size: 14px;
    color: #666666;
  }
  .warning-tip-icon {
    color: #ff7f7f;
  }
}
</style>

