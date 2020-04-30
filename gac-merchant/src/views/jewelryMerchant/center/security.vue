<template>
  <div class="page-container security-container">
    <h4 class="mb-2">您的安全服务</h4>
    <div class="d-flex">
      <div class="box">
        <img
          class="mb-1"
          src="../../../assets/image/success.png"
          width="90"
        >
        <p>登录密码</p>
        <p>定期更换密码有助于账号安全</p>
        <el-button
          type="primary"
          class="primary-btn-big mt-2"
          @click="$router.push({name:'updatePwd'})"
        >修改密码</el-button>
      </div>
      <div class="box">
        <img
          class="mb-1"
          src="../../../assets/image/success.png"
          width="90"
        >
        <p>绑定手机</p>
        <p>{{mobilePhone | formatPhone}}</p>
        <el-button
          type="primary"
          class="primary-btn-big mt-2"
          @click="$router.push({name:'updatePhone'})"
        >修改手机号码</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'mobilePhone'
    ])
  }
}
</script>

<style scoped lang="scss">
.security-container {
  h4 {
    font-size: 14px;
    color: #4d4d4d;
  }
  .box {
    margin: 0 30px;
    padding: 30px 0;
    width: 260px;
    text-align: center;
    background: #f8fbff;
    border-radius: 4px;
    p {
      font-size: 12px;
      line-height: 18px;
    }
  }
}
</style>

