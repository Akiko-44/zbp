<template>
  <el-dialog title="审核操作" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item
        label="审核意见"
        v-if="form.isCheckSale == 2"
        prop="checkDesc"
      >
        <el-input v-model="form.checkDesc"></el-input>
      </el-form-item>
      <el-form-item label="" v-if="form.isCheckSale == 1">
        <span>是否审核通过该商品？</span>
      </el-form-item>
      <el-form-item
        label=""
        v-if="form.isCheckSale == 3 || form.isCheckSale == 5"
      >
        <span>是否下架该商品？</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="update('form')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { jewelryAudit } from '@/api/dm/works';
import { onOrOff } from '@/api/jewelryMerchant/works';
import { auditdesignWork } from '@/api/public/dm';

export default {
  props: {
    goodsSource: Number
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        type: undefined,
        checkDesc: '',
        caseId: '',
        isCheckSale: ''
      },
      jewelryForm: {
        goodsId: '',
        isCheck: 0,
        checkDesc: ''
      },
      rules: {
        checkDesc: [
          { required: true, message: '请输入审核意见', trigger: 'blur' },
          { min: 1, max: 60, message: '长度在  60 个字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.caseId = undefined
        setTimeout(() => {
          cb && cb()
        })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.resetForm('form')
    },
    // 提交成功
    success() {
      this.loading = false
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '编辑成功',
        type: 'success',
        duration: 2000
      })
      this.$emit('success')
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          if (this.goodsSource === 0) {
            this.jewelryForm.goodsId = this.form.caseId
            this.jewelryForm.isCheck = this.form.isCheckSale
            this.jewelryForm.checkDesc = this.form.checkDesc
            if (this.jewelryForm.isCheck === 3) {
              onOrOff(this.jewelryForm.goodsId, 3)
                .then(() => {
                  this.success()
                })
                .catch(() => {
                  this.loading = false
                })
            } else {
              jewelryAudit(this.jewelryForm)
                .then(() => {
                  this.success()
                })
                .catch(() => {
                  this.loading = false
                })
            }
          } else {
            auditdesignWork(this.form)
              .then(() => {
                this.success()
              })
              .catch(() => {
                this.loading = false
              })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
