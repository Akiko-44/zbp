<template>
  <el-dialog title="新增/修改栏目服务" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="服务名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="服务介绍" prop="detail">
        <el-input type="textarea" v-model.number="form.detail" placeholder=""></el-input>
      </el-form-item>
      <!-- <el-form-item label="服务介绍" prop="detail1">
        <el-input v-model.number="form.detail1" placeholder="不填写则默认不出现商品购买链接"></el-input>
      </el-form-item> -->
      <el-form-item label="图标" prop="logo">
        <el-card v-if="form.logo" style="width:250px;text-align:center;" :body-style="{ padding: '0px' }">
          <img :src="form.logo | setImg" class="image">
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="form.logo = ''">删除</el-button>
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

      <el-form-item label="状态" prop="status">
        <el-select class="filter-item" v-model="form.status" placeholder="请选择">
          <el-option
            v-for="(item, index) in status"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
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
  putService
} from '@/api/aggregate/upCategory'

export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      cropShow: false,
      width: 20,
      height: 20,
      loading: false,
      dialogFormVisible: false,
      status: [{
        label: '启用',
        value: 0
      },
      {
        label: '停用',
        value: 1
      }],
      form: {
        categoryId: undefined,
        id: undefined,
        name: undefined,
        logo: undefined,
        detail: undefined,
        detail1: '1',
        status: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入服务名称', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入服务介绍', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请上传图标', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
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
          putService(this.form).then(() => {
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
      this.form.logo = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    }
  }
}
</script>

