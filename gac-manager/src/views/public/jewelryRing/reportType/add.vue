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
      style="width: 50%;"
    >
      <el-form-item
        label="类型名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="请输入类型名称，6个字以内"
          maxlength="6"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="排序"
        prop="order"
      >
        <el-input
          type="number"
          maxlength="2"
          v-model.number="form.order"
          min="1"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="所属分类"
        prop="type"
      >
        <el-checkbox-group
          v-model="checked"
          @change="checkboxChange"
        >
          <el-checkbox :label="1">举报</el-checkbox>
          <el-checkbox :label="2">申诉</el-checkbox>
        </el-checkbox-group>
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
import { updateReportType } from '@/api/public/jewelryRing'

export default {
  data() {
    return {
      loading: false,
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '添加'
      },
      checked: [],
      form: {
        id: undefined,
        name: '',
        type: undefined,
        order: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入类型名称', trigger: 'blur' }
        ],
        order: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择所属分类', trigger: 'blur' }
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
          updateReportType(this.form).then(() => {
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
    },
    checkboxChange() {
      this.form.type = this.checked.join(',')
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          updateReportType(this.form).then(() => {
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
      this.checked = []
    },
    success() {
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
      this.checked = []
      this.loading = false
    }
  }
}
</script>


<style scoped>
.image {
  max-width: 80%;
  max-height: 100%;
  display: block;
  margin: 10px auto 0;
}
</style>
