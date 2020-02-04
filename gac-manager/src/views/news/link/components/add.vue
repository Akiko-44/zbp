<template>
<el-dialog title="添加/修改友情链接" :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">
    <el-form-item label="网站名称" prop="website">
      <el-input v-model="form.website"></el-input>
    </el-form-item>

    <el-form-item label="链接地址" prop="link">
      <el-input v-model="form.link"></el-input>
    </el-form-item>
    
    <el-form-item label="排列顺序" prop="priority">
      <el-input v-model.number="form.priority" type="number" maxlength="2"></el-input>
    </el-form-item>

    <el-form-item label="网站简介" prop="summary">
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.summary"> </el-input>
    </el-form-item>

    <el-form-item label="站长email" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>

    <el-form-item label="站长电话" prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel('form')">取 消</el-button>
    <el-button type="primary" :loading="loading" @click="update('form')">确 定</el-button>
  </div>
</el-dialog>  
</template>

<script>
import { putObj } from '@/api/news/link'

export default {
  name: 'linkAdd',
  data() {
    return {
      loading: false,
      dialogStatus: '',
      dialogFormVisible: false,
      form: {
        id: undefined,
        website: '',
        link: '',
        priority: null,
        summary: '',
        email: '',
        phone: ''
      },
      rules: {
        website: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
        ],
        priority: [
          { required: true, message: '请输入排列顺序', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入网站简介', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入Email', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入站长电话', trigger: 'blur' }
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
          this.form.id = undefined
          putObj(this.form)
            .then(() => {
              this.loading = false
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.success()
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          putObj(this.form).then(() => {
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
    },
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
    }
  }
}
</script>
