<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="rules"
        label-width="140px"
        class="listForm"
      >

        <el-form-item
          label="补数起始日期:"
          prop="beginTime"
        >
          <el-date-picker
            v-model="dataForm.beginTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择补数起始日期"
          />
        </el-form-item>

        <el-form-item
          label="数据接入:"
          prop="dataAccess"
        >
          <el-radio-group v-model="dataForm.dataAccess">
            <el-radio :label="1">SFTP</el-radio>
            <el-radio :label="0">DB</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="button-box">
          <el-button
            class="btn cancel-btn"
            @click="cancel"
          >取消</el-button>
          <el-button
            type="primary"
            class="btn save-btn"
            :loading="loading"
            @click="save"
          >启动</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import { extracteData } from '@/api/system'

export default {
  data() {
    return {
      loading: false,
      dataForm: {
        platformId: '',
        beginTime: '',
        dataAccess: 1
      },
      rules: {
        beginTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        dataAccess: [
          { required: true, message: '请选择数据接入', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.dataForm.platformId = this.$route.query.id
  },
  methods: {
    add() {
      extracteData(this.dataForm).then(data => {
        this.success()
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.add()
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          })
          return false
        }
      })
    },
    success() {
      this.$notify({
        title: '成功',
        message: '启动成功',
        type: 'success',
        duration: 2000
      })
      this.$router.push({
        name: 'businessPlatform'
      })
      this.loading = false
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.filter-container {
  position: relative;
}
.button-box {
  margin-left: 100px;
}
.btn {
  width: 90px;
}
.price-box .el-form-item {
  display: inline-block;
  margin-right: 10px;
}
</style>
