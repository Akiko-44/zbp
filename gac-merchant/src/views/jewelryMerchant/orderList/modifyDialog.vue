<template>
  <el-dialog title="修改订单价格" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item>
        <el-input v-model="form.modifyPrice" placeholder="请输入新价格"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  modifyPrice
} from '@/api/common/order'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        orderId: '',
        modifyPrice: ''
      },
      rules: {
        modifyPrice: [
          { required: true, message: '请输入新价格', trigger: 'blur' }
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
          modifyPrice(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
            this.success()
            location.reload()
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

