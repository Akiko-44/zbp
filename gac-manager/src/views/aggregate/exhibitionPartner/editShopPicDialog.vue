<template>
  <el-dialog title="修改图片" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="图片名称" prop="imgName">
        <el-input v-model="form.imgName"></el-input>
      </el-form-item>
      <el-form-item label="图片描述" prop="imgDesc">
        <el-input v-model="form.imgDesc"></el-input>
      </el-form-item>
      <el-form-item label="商品ID" prop="goodsId">
        <el-input v-model.number="form.goodsId" placeholder="不填写则默认不出现商品购买链接"></el-input>
      </el-form-item>
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
          :prefix="'pic'"
          @crop-upload-success="uploadSuccess"
        />
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

import {
  addPic
} from '@/api/aggregate/exhibition'

export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      cropShow: false,
      width: 1080,
      height: 460,
      showStatus: [
        { name: '待展示', value: 0 },
        { name: '展示中', value: 1 },
        { name: '已过期', value: 2 }
      ],
      loading: false,
      dialogFormVisible: false,
      form: {
        id: undefined,
        merchantId: undefined,
        exhibitionId: undefined,
        imgUrl: undefined,
        imgName: undefined,
        imgDesc: undefined,
        goodsId: undefined
      },
      rules: {
        imgName: [
          { required: true, message: '请输入图片名称', trigger: 'change' }
        ],
        imgDesc: [
          { required: true, message: '请输入图片描述', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
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
          this.loading = true
          addPic(this.form).then(() => {
            this.dialogFormVisible = false
            this.success()
          }).catch(() => {
            this.loading = false
          })
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

