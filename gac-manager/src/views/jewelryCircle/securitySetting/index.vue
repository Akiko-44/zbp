<template>
  <div class="app-container calendar-list-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <p>登录密码</p>
          <p>定期更换密码有助于账号安全</p>
          <el-button
            type="primary"
            @click="$router.push({name: 'jcupdatePwd'})"
            plain
          >修改密码</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div
          class="grid-content bg-purple"
          v-if="mobilePhone"
        >
          <p>已绑定手机</p>
          <p>绑定手机号：{{mobilePhone}}</p>
          <p>如需修改手机号，请到移动端或PC端个人中心修改</p>
        </div>
        <div
          class="grid-content bg-purple"
          v-else
        >
          <p>绑定手机</p>
          <p>发布内容前，请先绑定手机号</p>
          <el-button
            type="primary"
            @click="$router.push({name: 'jcbindPhone'})"
            plain
          >绑定手机号</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAcountDetail } from '@/api/public/jewelryRing'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      mobilePhone: ''
    }
  },
  created() {
    if (Cookies.get('userId')) {
      getAcountDetail(Cookies.get('userId')).then(data => {
        this.mobilePhone = data.data.mobilePhone ? data.data.mobilePhone : ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-purple {
  padding: 20px;
  height: 150px;
  text-align: center;
  font-size: 14px;
  background: #eee;
}
</style>
