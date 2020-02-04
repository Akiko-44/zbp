<template>
  <el-dialog
    title="审核操作"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="350px"
    >
      <!--<el-form-item label="审核意见" prop="opinion">
        <el-input v-model="form.opinion"></el-input>
      </el-form-item>-->
      <el-form-item
        label="是否审核通过该工艺？"
        v-if="form.auditState == 2"
      ></el-form-item>
      <el-form-item
        label="是否审核拒绝该工艺？"
        v-if="form.auditState == 3"
      ></el-form-item>
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
  audit
} from '@/api/dm/craft'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        opinion: '',
        designerId: '',
        auditState: ''
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
        this.form.designerId = undefined
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
              message: '编辑成功',
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

