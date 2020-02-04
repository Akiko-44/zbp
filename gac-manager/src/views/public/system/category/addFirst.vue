<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px"
               class="ruleForm"
               style="width: 50%;">
        <el-form-item label="名称"
                      prop="catName">
          <el-input v-model="form.catName"
                    :maxlength="10"
                    placeholder="请输入分类名称，10字以内"
                    style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      prop="sortOrder">
          <el-input style="width: 220px;"
                    placeholder="请输入数字，1表示排在第1位"
                    v-model.number="form.sortOrder"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel('form')">取 消</el-button>
          <el-button type="primary"
                     :loading="loading"
                     @click="create('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveFirst } from '@/api/public/system'

export default {
  data() {
    return {
      loading: false,
      form: {
        id: undefined,
        parentId: '0',
        catLevel: '1',
        catName: '',
        sortOrder: ''
      },
      rules: {
        catName: [
          { required: true, message: '请输入类目名称', trigger: 'blur' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.data) {
      this.form = JSON.parse(this.$route.query.data)
    }
  },
  methods: {
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          saveFirst(this.form).then(() => {
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
      this.$router.push({ name: 'menuCategory' })
    },
    success() {
      this.loading = false
      this.$router.push({ name: 'menuCategory' })
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('请输入数字，1表示排在第1位'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入1-100的整数'))
        } else {
          if (value < 1 || value > 100) {
            callback(new Error('请输入1-100的整数'))
          } else {
            callback()
          }
        }
      }, 200)
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