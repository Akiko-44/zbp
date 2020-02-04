<template>
<el-dialog title="添加/修改图片" :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">
    <el-form-item label="描述" prop="name">
      <el-input type="textarea" autosize v-model="form.name" maxlength="40"></el-input>
    </el-form-item>

    <el-form-item label="图片" prop="url">
      <el-card v-if="form.url" style="width:250px;" :body-style="{ padding: '0px' }">
        <img :src="form.url | setImg({ w: 500 })" class="image">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="form.url = ''">删除</el-button>
          </div>
        </div>
      </el-card>
      <ImageUpload
        v-show="!form.url"
        :multiple="false"
        :checkFile="checkFile"
        prefix="gallery"
        @successCBK="uploadSuccess"
      />
      
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel('form')">取 消</el-button>
    <el-button type="primary" @click="update('form')">确 定</el-button>
  </div>
</el-dialog>  
</template>

<script>
import ImageUpload from '@/components/Upload'

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '添加'
      },
      form: {
        name: '',
        url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          this.success()
        } else {
          return false
        }
      })
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          this.success()
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
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
    },
    uploadSuccess(imgs) {
      this.form.url = imgs[imgs.length - 1].key
    },
    checkFile(file, img) {
      // const size = this.bannerRule[this.form.location - 1]
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