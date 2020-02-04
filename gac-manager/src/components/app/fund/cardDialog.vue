<template>
  <el-dialog title="添加银行卡" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="开户姓名" prop="accountName">
        <el-input type="text" v-model="form.accountName"></el-input>
      </el-form-item>
      <el-form-item label="开户银行" prop="bankName">
        <el-input type="text" v-model="form.bankName"></el-input>
      </el-form-item>
      <el-form-item label="银行帐号" prop="accountNo">
        <el-input type="text" v-model="form.accountNo"></el-input>
      </el-form-item>
      <el-form-item label="账户类型" prop="accountType">
        <el-radio-group v-model.number="form.accountType">
          <el-radio :label="0">对公</el-radio>
          <el-radio :label="1">对私</el-radio>
        </el-radio-group>
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
  addCard
} from '@/api/common/fund'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        accountName: undefined,
        bankName: undefined,
        accountNo: undefined,
        accountType: undefined
      },
      rules: {
        accountName: [
          { required: true, message: '请输入开户姓名', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        accountNo: [
          { required: true, message: '请输入银行帐号', trigger: 'blur' }
        ],
        accountType: [
          { required: true, message: '请选择账户类型', trigger: 'change' }
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
      this.resetForm('form')
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          addCard(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加成功',
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

