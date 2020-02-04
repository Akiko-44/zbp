<template>
<el-dialog title="新增" :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">
    <el-form-item label="商品编号" prop="goodsId">
      <el-input v-model="form.goodsId"></el-input>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="form.weight"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel('form')">取 消</el-button>
    <el-button type="primary" :loading="loading" @click="create('form')">确 定</el-button>
  </div>
</el-dialog>  
</template>

<script>
import { saveObj } from '@/api/swap/recommended'

export default {
  props: {
    type: Number
  },
  data() {
    return {
      loading: false,
      dialogStatus: '',
      dialogFormVisible: false,
      form: {
        goodsId: undefined,
        weight: 1,
        type: this.type
      },
      rules: {
        goodsId: [
          { required: true, message: '请输入商品编号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          saveObj(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
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
    },
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
    }
  }
}
</script>
