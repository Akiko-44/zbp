<template>
  <div class="app-container">
    <div class="findpwd">
      <h3 class="font-big text-black pb-1">找回密码</h3>
      <el-steps
        :active="active"
        align-center
        :space="227"
        process-status="finish"
        class="step-box block-center"
      >
        <el-step title="验证身份">
          <i
            class="step-icon"
            slot="icon"
          ></i>
        </el-step>
        <el-step title="设置新密码">
          <i
            class="step-icon"
            slot="icon"
          ></i>
        </el-step>
        <el-step title="设置成功">
          <i
            class="step-icon"
            slot="icon"
          ></i>
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
  // created() {
  //   this.submit()
  // },
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
.app-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url('../../assets/image/user/bj.png');
  .findpwd {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-top: 100px;
    box-sizing: border-box;
    width: 1350px;
    height: 754px;
    background: #ffffff;
  }
  h3 {
    width: 96px;
    margin: 0 auto 48px;
    border-bottom: 5px solid #4184fd;
  }
  .step-box {
    width: 680px;
    .step-icon {
      width: 10px;
      height: 10px;
      background: #e5e5e5;
      border-radius: 50%;
    }
    /deep/ .el-step__icon.is-text {
      border: 0;
    }
    .el-step__head.is-finish {
      .step-icon {
        background: #418afd;
      }
    }
  }
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
}
</style>
