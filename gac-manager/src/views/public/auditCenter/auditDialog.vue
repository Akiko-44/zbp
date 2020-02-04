<template>
  <el-dialog title="审核操作" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="审核意见" prop="opinion" v-if="form.auditState == 3">
        <el-input v-model="form.opinion"></el-input>
      </el-form-item>
      <el-form-item v-else style="margin-left: 150px;">确定通过审核？</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  audit
} from '@/api/public/auditCenter'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
      	userAuthId: null,
        opinion: null,
        auditState: null
      },
      rules: {
        opinion: [
          { required: true, message: '请输入审核意见', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
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
          audit(this.form).then(() => {
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

