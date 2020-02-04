<template>
<el-dialog
  :title="textMap[dialogStatus]"
  :visible.sync="dialogFormVisible"
>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="ruleForm" style="width: 50%;">
    <el-form-item label="栏目名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <!-- <el-form-item label="缩略图" prop="thumbnail">
      <el-card v-if="form.thumbnail" style="width:250px;" :body-style="{ padding: '0px' }">
        <img :src="form.thumbnail | setImg" class="image">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="form.thumbnail = ''">删除</el-button>
          </div>
        </div>
      </el-card>
      <ImageUpload
        v-show="!form.thumbnail"
        :multiple="false"
        :checkFile="checkFile"
        prefix="news"
        @successCBK="uploadSuccess"
      />
    </el-form-item> -->
    <el-form-item label="权重">
      <el-input type="number" maxlength="2" v-model.number="form.weight"></el-input>
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
import { putObj } from '@/api/aggregate/upCategory'
import ImageUpload from '@/components/Upload'

export default {
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
        weight: 1,
        // 顶级栏目ID
        pid: 0,
        // 编辑的栏目ID
        id: undefined
        // thumbnail: undefined
      },
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
        // weight: [
        //   { required: true, message: '请输入权重', trigger: 'blur' }
        // ]
        // thumbnail: [
        //   { required: true, message: '请上传缩略图', trigger: 'blur' }
        // ],
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
      this.form.thumbnail = imgs[imgs.length - 1].key
    },
    checkFile(file, img) {
      // const size = this.bannerRule[this.form.location]
      // if (img.width !== size.width || img.height !== size.height) {
      //   return '图片尺寸不对，请重新上传'
      // }
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