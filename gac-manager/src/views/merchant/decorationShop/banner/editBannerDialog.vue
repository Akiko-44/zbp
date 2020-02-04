<template>
  <el-dialog title="添加/编辑图片" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="图片" prop="imgUrl">
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
      <!-- <el-form-item label="链接类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择链接类型">
          <el-option v-for="item in hrefTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="链接地址" prop="jumpUrl">
        <el-input v-model="form.jumpUrl"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'

export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      // hrefTypes: [
      //   { value: 1, name: '外链' }
      // ],
      prefix: 'banner',
      width: 810,
      height: 310,
      cropShow: false,
      loading: false,
      dialogFormVisible: false,
      form: {
        imgUrl: undefined,
        jumpUrl: undefined
        // type: undefined
      },
      rules: {
        imgUrl: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
        ],
        jumpUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
        // type: [
        //   { required: true, message: '请选择链接类型', trigger: 'change' }
        // ]
      }
    }
  },
  methods: {
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
      this.loading = false
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
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
    uploadSuccess({ key }) {
      this.form.imgUrl = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    }
  }
}
</script>

