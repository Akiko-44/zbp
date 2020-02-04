<template>
<el-dialog title="新增/修改" :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">
    <el-form-item label="图片内容" prop="imgUrl">
      <el-card v-if="form.imgUrl" style="width:250px;" :body-style="{ padding: '0px' }">
        <img :src="form.imgUrl | setImg" class="image" width="100%">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="form.imgUrl = ''">删除</el-button>
          </div>
        </div>
      </el-card>
      <el-button v-else @click="cropShow = true" type="primary">上传</el-button>
      <ImageCropper
        ref="cropper"
        v-model="cropShow"
        :noCircle="true"
        :noSquare="true"
        :withCredentials="true"
        imgFormat="jpg"
        :width="width"
        :height="height"
        :prefix="prefix"
        @crop-upload-success="uploadSuccess"
      />
    </el-form-item>
    <el-form-item label="链接地址" prop="targetUrl">
      <el-input v-model="form.targetUrl"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel('form')">取 消</el-button>
    <el-button type="primary" :loading="loading" @click="create('form')">确 定</el-button>
  </div>
</el-dialog>  
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import { saveObj, putObj } from '@/api/swap/recommended'

export default {
  components: {
    ImageCropper
  },
  props: {
    prefix: String,
    type: Number,
    width: Number,
    height: Number
  },
  data() {
    return {
      cropShow: false,
      loading: false,
      dialogStatus: '',
      dialogFormVisible: false,
      form: {
        targetUrl: undefined,
        imgUrl: undefined,
        type: this.type
      },
      rules: {
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        targetUrl: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
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
          const action = this.dialogStatus === 'add' ? saveObj : putObj
          action(this.form).then(res => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.success(res.data)
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
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.resetForm('form')
    },
    // 提交成功
    success(data) {
      this.loading = false
      this.$emit('success', data)
    },
    uploadSuccess({ key }) {
      this.form.imgUrl = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    }
  }
}
</script>
