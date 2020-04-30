<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
        class="listForm"
      >
        <el-form-item label="登录账号:">
          {{form.userName}}
        </el-form-item>
        <el-form-item label="头像:">
          <el-card
            v-if="form.userLogo"
            style="width:250px;"
            :body-style="{ padding: '0px' }"
          >
            <img
              :src="form.userLogo | setImg"
              class="image"
              width="100%"
            >
          </el-card>
        </el-form-item>
        <el-form-item label="账户昵称:">
          {{form.name}}
        </el-form-item>
        <el-form-item label="账户简介:">
          {{form.description}}
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            class="btn save-btn"
            v-waves
            @click="$router.push({name: 'jcmodifyAccountInfo', query: {id: form.id}})"
          >修改账户信息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getAcountDetail } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令
import Cookies from 'js-cookie'

export default {
  directives: {
    waves
  },
  data() {
    return {
      form: {}
    }
  },
  created() {
    if (Cookies.get('userId')) {
      this.form.id = Cookies.get('userId')
      getAcountDetail(this.form.id).then(data => {
        this.form = data.data
      })
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.filter-container {
  position: relative;
}
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.button-box {
  margin-left: 100px;
}
</style>
