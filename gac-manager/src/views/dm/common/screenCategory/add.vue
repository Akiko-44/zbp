<template>
	<el-dialog
	  :title="textMap[dialogStatus]"
	  :visible.sync="dialogFormVisible"
	>
	  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="ruleForm" style="width: 50%;">
	    <el-form-item label="分类名称" prop="name">
	      <el-input v-model="form.name"></el-input>
	    </el-form-item>
	    <el-form-item label="排列顺序" prop="priority">
	      <el-input type="number" maxlength="2" v-model.number="form.priority"></el-input>
	    </el-form-item>
	    <el-form-item>
	      <el-button @click="cancel('form')">取 消</el-button>
	      <el-button v-if="dialogStatus=='create'" type="primary" :loading="loading" @click="create('form')">确 定</el-button>
	      <el-button v-else type="primary" :loading="loading" @click="update('form')">确 定</el-button>
	    </el-form-item>
	  </el-form>
	</el-dialog>
</template>

<script>
import { addObjScreen } from '@/api/dm/goodsCategory'

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
        name: '',
        priority: 0,
        // 顶级分类ID
        parentId: undefined,
        // 编辑的分类ID
        id: undefined,
        flag: this.flag
      },
      rules: {
        name: [
          { required: true, message: '请输入类目名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        priority: [
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
          addObjScreen(this.form).then(() => {
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
          addObjScreen(this.form).then(() => {
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
.image {
  max-width: 80%;
  max-height: 100%;
  display: block;
  margin: 10px auto 0;
}
</style>