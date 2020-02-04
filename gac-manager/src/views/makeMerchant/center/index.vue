<template>
  <div class="app-container calendar-list-container">
    <h4>基本信息</h4>
    <el-form label-position="left"
             class="table-expand">
      <el-form-item label="用户头像">
        <span class="userlogo"><img :src="detail.userLogo"
               alt="" /></span>
      </el-form-item>
      <el-form-item label="账户名">
        <span>{{ detail.nickname }}</span>
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{ detail.mobilePhone }}</span>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   plain
                   type="primary"
                   @click="$router.push({ name: 'updateInfo'})">
          修改个人信息
        </el-button>
        <el-button size="small"
                   plain
                   type="primary"
                   @click="$router.push({ name: 'updatePhone', query: {phone: detail.mobilePhone}})">
          修改手机号
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo } from '@/api/makeMerchant/center'

export default {
  data() {
    return {
      detail: {}
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await getInfo()
    next(vm => {
      vm.detail = data
      if (data.userLogo.indexOf('http://') == 0) {
        vm.detail.userLogo = data.userLogo
      } else {
        vm.detail.userLogo = 'http://image.gacjc.com/' + data.userLogo
      }
    })
  },
  methods: {

  }
}
</script>

<style scoped>
.detail {
  margin: 20px 14px;
}
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 30%;
}
.userlogo {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.userlogo img {
  width: 100%;
  height: 100%;
}
</style>

