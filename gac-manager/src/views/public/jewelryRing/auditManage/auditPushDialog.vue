<template>
  <el-dialog
    title="审核操作"
    width="600px"
    :visible.sync="dialogFormVisible"
  >
    <div>
      标题：{{title}}
    </div>
    <div>
      作者：{{authorName}}
    </div>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item prop="pushStatus">
        <el-radio-group v-model="form.pushStatus">
          <el-radio :label="3">审核通过(仅粉丝)</el-radio>
          <el-radio :label="2">审核通过(全平台)</el-radio>
          <el-radio :label="4">审核不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.pushStatus == 4"
        prop="pushReviewDesc"
      >
        <el-input
          v-model="form.pushReviewDesc"
          type="textarea"
          maxlength="60"
          placeholder="请输入不通过原因，60字以内"
        />
      </el-form-item>
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
  auditPushReview
} from '@/api/public/jewelryRing'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      title: '',
      authorName: '',
      form: {
        id: '',
        pushStatus: 3,
        pushReviewDesc: ''
      },
      rules: {
        pushReviewDesc: [
          { required: true, message: '"请输入不通过原因，60字以内', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.id = undefined
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
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          auditPushReview(this.form).then((data) => {
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
>>> .el-dialog__body {
  text-align: center;
  .el-form-item margin: 0;
}
</style>
