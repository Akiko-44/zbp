<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :model="logForm"
        ref="logForm"
        :rules="rules"
        label-width="100px"
        class="listForm"
      >
        <el-form-item
          label="跟进人:"
          prop="followUpPerson"
        >
          <el-input
            style="width: 220px;"
            :maxlength="10"
            placeholder="请输入跟进人姓名，10字以内"
            v-model="logForm.followUpPerson"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="备注:"
          prop="intentionJoinDetail"
        >
          <el-input
            style="width: 220px;"
            type="textarea"
            :rows="5"
            :maxlength="100"
            placeholder="请输入备注信息，100字以内"
            v-model="logForm.intentionJoinDetail"
          >
          </el-input>
        </el-form-item>
        <div class="button-box">
          <el-button
            class="btn cancel-btn"
            v-waves
            @click="cancel"
          >取消</el-button>
          <el-button
            type="primary"
            class="btn save-btn"
            v-waves
            :loading="loading"
            @click="save"
          >保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveIntentionJoinLog } from '@/api/public/merchant'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      loading: false,
      logForm: {
        intentionJoinId: '',
        followUpPerson: '',
        intentionJoinDetail: ''
      },
      rules: {
        followUpPerson: [
          { required: true, message: '请输入跟进人姓名，10字以内', trigger: 'blur' }
        ],
        intentionJoinDetail: [
          { required: true, message: '请输入备注信息，100字以内', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.logForm.intentionJoinId = this.$route.query.id
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    add() {
      this.loading = true
      saveIntentionJoinLog(this.logForm).then(data => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'intentionJoinLog',
          query: {
            id: this.$route.query.id,
            name: this.$route.query.name
          }
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.logForm.validate(valid => {
        if (valid) {
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
    }
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
.auditBtn {
  margin-left: 0;
}
.button-box {
  margin-left: 100px;
}
.btn {
  width: 90px;
}
.select-btn {
  position: absolute;
  left: 340px;
  top: 0;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.merchant-name-box {
  position: relative;
}
.tip {
  margin-left: 20px;
  font-size: 12px;
}
</style>
