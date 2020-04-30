<template>
  <el-dialog
    title="举报审核"
    width="600px"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item>
        标题：{{title}}
      </el-form-item>
      <el-form-item>
        举报类型：{{reportedType}}
      </el-form-item>
      <el-form-item prop="isPassed">
        <el-radio-group v-model="form.isPassed">
          <el-radio :label="1">审核通过</el-radio>
          <el-radio :label="0">审核不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.isPassed == 1">
        审核通过后，该内容将会被强制下架，如作者申诉成功，可恢复展示
      </el-form-item>
      <div v-if="form.isPassed == 0">
        <el-form-item prop="reason">
          <el-input
            v-model="form.reason"
            type="textarea"
            maxlength="60"
            placeholder="请输入不通过原因，60字以内"
          />
        </el-form-item>
      </div>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="update('form')"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  reportCheck
} from '@/api/public/jewelryRing'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      title: '',
      reportedType: '',
      reportId: '',
      form: {
        isPassed: 1,
        reason: '',
        type: 1
      },
      rules: {
        reason: [
          { required: true, message: '请输入不通过原因，60字以内', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.reason = ''
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.resetForm('form')
    },
    // 提交成功
    success() {
      this.loading = false
      this.resetForm('form')
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          reportCheck(this.reportId, this.form).then((data) => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.success()
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="postcss" scoped>
>>> .el-dialog__body .el-form-item {
  margin-bottom: 0;
}
</style>
