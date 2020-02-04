<template>
  <el-dialog
    :title="textMap[dialogStatus]"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item
        label="栏目名称"
        prop="columnName"
      >
        <el-input
          v-model="form.columnName"
          maxlength="5"
          placeholder="请输入栏目名称，不大于五个字"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="排列顺序"
        prop="sortOrder"
      >
        <el-input
          type="number"
          maxlength="2"
          min="0"
          v-model.number="form.sortOrder"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          :loading="loading"
          @click="create('form')"
        >确 定</el-button>
        <el-button
          v-else
          type="primary"
          :loading="loading"
          @click="update('form')"
        >确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { updateJewelryColumn } from '@/api/public/jewelryRing'

export default {
  props: {
    flag: Number
  },
  data() {
    return {
      loading: false,
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '添加'
      },
      form: {
        columnName: '',
        sortOrder: 0,
        // 编辑的ID
        id: undefined,
        flag: this.flag
      },
      rules: {
        columnName: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { max: 5, message: '不大于5个字', trigger: 'blur' }
        ],
        sortOrder: [
          { required: true, message: '请输入排列顺序', trigger: 'blur' }
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
          updateJewelryColumn(this.form).then(() => {
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
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          updateJewelryColumn(this.form).then(() => {
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
    success() {
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
      this.loading = false
    }
  }
}
</script>


<style scoped>
</style>
