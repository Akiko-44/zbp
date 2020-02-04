<template>
    <el-dialog
            :title="textMap[dialogStatus]"
            :visible.sync="dialogFormVisible"
    >
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="ruleForm" style="width: 50%;">
            <el-form-item label="标题" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="helpDesc">
                <el-input v-model="form.helpDesc"></el-input>
            </el-form-item>
            <el-form-item label="排列顺序" prop="sortOrder">
                <el-input type="number" maxlength="2" v-model.number="form.sortOrder"></el-input>
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
  import { addObj, putObj } from '@/api/public/column'
  import ImageUpload from '@/components/Upload'

  export default {
    name: 'columnAdd',
    components: {
      ImageUpload
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
          sortOrder: 1,
          helpDesc: '',
          // 顶级栏目ID
          parentId: 0,
          // 编辑的栏目ID
          id: undefined
        },
        rules: {
          name: [
            { required: true, message: '请输入栏目名称', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          helpDesc: [
            { required: true, message: '请输入内容', trigger: 'blur' }
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
            addObj(this.form)
              .then(() => {
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
      success() {
        this.loading = false
        this.$emit('success', JSON.parse(JSON.stringify(this.form)))
      },
      uploadSuccess(imgs) {
        this.form.thumbnail = imgs[imgs.length - 1]
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