<template>
	<el-dialog
	  :title="textMap[dialogStatus]"
	  :visible.sync="dialogFormVisible">
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
import { addObj, putObj, addJewelryObj } from '@/api/dm/goodsCategory'

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
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        priority: [
          {  validator: this.checkPriority, trigger: 'blur' }
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
          // flag 为5指代珠宝店
      		if (this.flag === 5) {
      			this.form.catName = this.form.name
      			this.form.sortOrder = this.form.priority
      			this.form.categoryType = 1
      			addJewelryObj(this.form).then(() => {
	            this.successCallback()
	          }).catch(() => {
	            this.loading = false
	          })
      		} else {
      			addObj(this.form).then(() => {
	            this.successCallback()
	          }).catch(() => {
	            this.loading = false
	          })
      		}        
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
          if (this.flag === 5) {
      			this.form.catName = this.form.name
      			this.form.sortOrder = this.form.priority
      			this.form.categoryType = 1
      			addJewelryObj(this.form).then(() => {
	            this.successCallback()
	          }).catch(() => {
	            this.loading = false
	          })
      		} else {
      			putObj(this.form).then(() => {
	            this.successCallback()
	          }).catch(() => {
	            this.loading = false
	          })
      		}          
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
    },
    successCallback () {
    	this.loading = false
    	this.dialogFormVisible = false
	    this.$notify({
	      title: '成功',
	      message: '编辑成功',
	      type: 'success',
	      duration: 2000
	    })
	    this.success()
    },
    checkPriority (rule, value, callback) {
	    if (!value) {
	      return callback(new Error('请输入排列顺序'))
	    }
	    if (!Number.isInteger(value) || value < 0 || value > 100) {
	      callback(new Error('排列顺序需为0-100之间的正整数'))
	    } else {
	      callback();
	    }
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