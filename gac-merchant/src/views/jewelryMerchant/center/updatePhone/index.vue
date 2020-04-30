<template>
  <div class="page-container">
    <div class="updatePhone">
      <el-steps
        :active="active"
        align-center
        :space="227"
        process-status="finish"
        class="step-box block-center"
      >
        <el-step title="验证原手机号码">
        </el-step>
        <el-step title="绑定新手机号码">
        </el-step>
        <el-step title="修改成功">
        </el-step>
      </el-steps>

      <step1
        @submit="submit"
        v-if="active === 0"
      ></step1>
      <step2
        @submit="submit"
        v-if="active === 1"
        ref="step2"
      ></step2>
      <success v-if="active === 2"></success>
    </div>
  </div>
</template>

<script>
import step1 from './components/step1'
import step2 from './components/step2'
import success from './components/success'

export default {
  components: {
    step1,
    step2,
    success
  },
  data() {
    return {
      active: 0,
      uuid: ''
    }
  },
  methods: {
    submit(uuid) {
      this.active++
      this.$nextTick(() => {
        if (uuid) {
          this.$refs.step2.form.uuid = uuid
        }
      })
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
.step-form {
  margin: 50px auto 0;
  width: 378px;
}
</style>
