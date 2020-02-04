<template>
  <div class="app-container calendar-list-container">
    <p
      style="margin-bottom: 20px;"
      v-if="signData.apply_status && signData.apply_status=='00'"
    >
      请前往
      <el-button
        size="small"
        type="primary"
        @click="toUrl"
      >
        银联商务
      </el-button>，完成自主签约
    </p>
    <!-- <p style="margin-bottom: 20px;"
       v-if="signData.apply_status && signData.apply_status=='01'">您的资料信息已提交，正在审核中，请耐心等待</p>
    <p style="margin-bottom: 20px;"
       v-else-if="signData.apply_status && signData.apply_status=='02'">入网审核中，请耐心等待；审核结果将以短信形式发送至您的手机号上。</p> -->
    <p
      style="margin-bottom: 20px;"
      v-if="signData.apply_status && (signData.apply_status=='01' || signData.apply_status=='02')"
    >您已在银联商务进行自主签约，资质审核中，请耐心等待...</p>
    <p
      style="margin-bottom: 20px;"
      v-else-if="signData.apply_status && signData.apply_status=='03'"
    >您已完成自主签约，获得商编：&emsp;{{mer_no}}</p>
    <p
      style="margin-bottom: 20px;"
      v-else-if="signData.apply_status && signData.apply_status=='04'"
    >入网失败，请前往<a href="www.gacjc.com">www.gacjc.com</a>个人中心-免费开店处，重新修改资料</p>
    <div
      style="margin-bottom: 20px;"
      v-else-if="signData.apply_status && (signData.apply_status=='06' || signData.apply_status=='28' || signData.apply_status=='31' || signData.apply_status=='99')"
    >
      签约失败，原因：<span style="font-size: 20px;color: #FF0000;">{{signData.failReason}}</span>
      <p>请前往<a href="www.gacjc.com">www.gacjc.com</a> 个人中心-免费开店处，重新修改资料</p>
    </div>
    <!-- <el-form v-if="signFlag"
             label-position="left"
             :model="form"
             ref="form"
             :rules="rules"
             label-width="80px">
      <el-form-item label="金额"
                    prop="transAmt">
        <el-input v-model="form.transAmt">
        </el-input>
      </el-form-item>
      <el-form-item label="验证码"
                    prop="verifyCode">
        <el-input v-model="form.verifyCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"
                   size="small"
                   type="primary"
                   @click="account">
          提交
        </el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
import { accountVerify, agreementSign, signQuery } from '@/api/makeMerchant/center'

export default {
  data() {
    return {
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
  async beforeRouteEnter(to, from, next) {
    const { data } = await signQuery({ userId: '' })
    next(vm => {
      // if (data.accountVerifyStatus == '0000' || data.accountVerifyStatus == '1066' || data.accountVerifyStatus == '1050') {
      //   vm.signFlag = false
      //   vm.resCode = data.res_code
      //   if (data.res_code == '0000') {
      vm.signData = data
      // }
      // } else {
      //   vm.signFlag = true
      // }
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
  		/* let url = localStorage.getItem('htmlContent')
  		window.location.href = url*/
    },
    account() {
      const set = this.$refs
      set.form.validate((valid) => {
        if (valid) {
          this.loading = true
          accountVerify(this.form).then(data => {
            if (data.data.resCode == '0000') {
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

<style scoped>
</style>

