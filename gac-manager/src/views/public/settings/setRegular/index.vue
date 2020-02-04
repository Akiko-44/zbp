
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-button @click="showDialog" type="primary" icon="edit">设置规则</el-button>
  </div>

  <el-dialog title="设置规则" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="过滤词汇" prop="keyword">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入过滤词汇，使用；分隔，如：关键词1；关键词2；" v-model="form.keyword"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  getRegular,
  setRegular
} from '@/api/gallery/comment'

// 缓存过滤内容关键字
let keyword

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        keyword: ''
      },
      rules: {
        keyword: [
          {
            required: true,
            message: '请输入过滤词汇',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async showDialog() {
      if (keyword === undefined) {
        keyword = await getRegular().then(data => data.data.keyword)
      }
      this.form.keyword = keyword
      this.dialogFormVisible = true
    },
    cancel(formName) {
      this.dialogFormVisible = false
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          setRegular(this.form).then(() => {
            this.dialogFormVisible = false
            // 更新缓存
            keyword = this.form.keyword
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
