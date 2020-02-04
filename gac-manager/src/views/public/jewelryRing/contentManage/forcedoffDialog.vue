<template>
  <el-dialog
    title="强制下架"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item prop="contentReviewDesc">
        <el-input
          v-model="form.contentReviewDesc"
          type="textarea"
          placeholder="请输入强制下架原因，60字以内"
          :maxlength="60"
        ></el-input>
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
  forceTakeOffContent
} from '@/api/public/jewelryRing'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        id: '',
        contentReviewDesc: ''
      },
      rules: {
        contentReviewDesc: [
          { required: true, message: '请请输入强制下架原因，60字以内', trigger: 'blur' }
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
          forceTakeOffContent(this.form).then((data) => {
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

