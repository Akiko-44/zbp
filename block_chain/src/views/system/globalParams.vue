<template>
  <div class="app-container">
    <div class="block-container">
      <span class="title">上链审批</span>
      <el-radio
        v-model="globalForm.JUEGE_MANUAL_OR_AUTOMATION"
        label="0"
      >自动上链</el-radio>
      <el-radio
        v-model="globalForm.JUEGE_MANUAL_OR_AUTOMATION"
        label="1"
      >人工审核上链</el-radio>
    </div>

    <div class="block-container chain-retry">
      <span class="title">上链失败重试</span>
      <div>
        <p>上链失败是否需要重试：</p>
        <el-radio
          v-model="globalForm.CHAIN_TRTRY_OR_NOT"
          class="radio-block"
          label="0"
        >不用重试</el-radio>
        <el-radio
          v-model="globalForm.CHAIN_TRTRY_OR_NOT"
          label="1"
        >需要重试，自动重试
          <!-- <el-input
            v-model="globalForm.FAIL_COUNT"
            class="retry-count"
            maxlength="4"
            @input.native="changeRetryCount"
          />次 -->
          <input
            v-model="globalForm.FAIL_COUNT"
            class="el-input__inner retry-count"
            maxlength="4"
          >次
        </el-radio>
      </div>
      <div class="auto-return">
        <el-radio
          v-model="globalForm.MANUAL_RETRY_OR_AUTOMATIN_RETRUN"
          class="radio-block"
          :disabled="globalForm.CHAIN_TRTRY_OR_NOT === '0'"
          label="0"
        >自动重试失败
          <el-input
            v-model="globalForm.FAIL_COUNT"
            readonly
            class="retry-count"
          />次，进入人工重试界面</el-radio>
        <el-radio
          v-model="globalForm.MANUAL_RETRY_OR_AUTOMATIN_RETRUN"
          class="radio-block"
          :disabled="globalForm.CHAIN_TRTRY_OR_NOT === '0'"
          label="1"
        >自动重试失败
          <el-input
            v-model="globalForm.FAIL_COUNT"
            readonly
            class="retry-count"
          />次，自动返回失败结果</el-radio>
      </div>
    </div>

    <div class="block-container">
      <div class="bottom-line bottom-line-20">
        <span class="title">回调失败重试</span>
        <p>上链结果回调失败以后，是否需要重试：</p>
        <el-radio
          v-model="globalForm.CALLBACK_RETRY"
          label="0"
        >不用重试</el-radio>
        <el-radio
          v-model="globalForm.CALLBACK_RETRY"
          label="1"
        >需要重试，直到把上链结果通知给上链平台</el-radio>
      </div>
      <div>
        <p>验证结果回调失败以后，是否需要重试：</p>
        <el-radio
          v-model="globalForm.CHECK_CALLBACK_RETRY"
          label="0"
        >不用重试</el-radio>
        <el-radio
          v-model="globalForm.CHECK_CALLBACK_RETRY"
          label="1"
        >需要重试，直到把验证结果通知给上链平台</el-radio>
      </div>
    </div>

    <el-button
      type="primary"
      @click="save"
    >设置</el-button>

  </div>
</template>

<script>
import { getGlobalConfig, saveGlobalConfig } from '@/api/system'

export default {
  data() {
    return {
      globalForm: {
        JUEGE_MANUAL_OR_AUTOMATION: '0',
        MANUAL_RETRY_OR_AUTOMATIN_RETRUN: '0',
        CALLBACK_RETRY: '0',
        CHAIN_TRTRY_OR_NOT: '0',
        FAIL_COUNT: '0',
        CHECK_CALLBACK_RETRY: '0'
      }
    }
  },
  watch: {
    'globalForm.FAIL_COUNT': {
      handler: function(curVal, oldVal) {
        if (!curVal) {
          this.globalForm.FAIL_COUNT = ''
          return false
        }
        // 实时把非数字的输入过滤掉
        this.globalForm.FAIL_COUNT = curVal.match(/\d/ig) ? curVal.match(/\d/ig).join('') : ''
        if (Number(this.globalForm.FAIL_COUNT) > 1000) {
          this.globalForm.FAIL_COUNT = oldVal
        } else if (this.globalForm.FAIL_COUNT !== '') {
          this.globalForm.FAIL_COUNT = String(Number(this.globalForm.FAIL_COUNT))
        }
      }
    }
  },
  created() {
    getGlobalConfig().then(data => {
      this.globalForm = data.data
    })
  },
  methods: {
    save() {
      if (this.globalForm.CHAIN_TRTRY_OR_NOT === '0') {
        this.globalForm.FAIL_COUNT = '0'
      } else {
        if (!this.globalForm.FAIL_COUNT) {
          this.$notify({
            title: '警告',
            message: '请填写完整设置参数',
            type: 'warning'
          })
          return
        }
      }
      saveGlobalConfig(this.globalForm).then(data => {
        this.$notify({
          title: '成功',
          message: '设置成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .block-container {
    position: relative;
    margin-bottom: 20px;
    padding: 30px 20px;
    border: $border-1;
    border-radius: 5px;
    .title {
      position: absolute;
      top: -7px;
      left: 20px;
      width: 100px;
      font-size: 15px;
      text-align: center;
      background: #fff;
      font-weight: bold;
    }
    p {
      margin: 0 0 10px;
      font-size: 14px;
    }
    .retry-count {
      margin: 0 10px;
      width: 60px;
      height: 30px;
    }
    .auto-return {
      margin-left: 160px;
    }
    .radio-block {
      display: block;
      line-height: 40px;
      & /deep/ .el-input__inner {
        height: 30px;
      }
    }
  }
}
>>> input::-webkit-outer-spin-button,
>>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
/* 火狐 */
>>> input {
  -moz-appearance: textfield;
}
</style>
