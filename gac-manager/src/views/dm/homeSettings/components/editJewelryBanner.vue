<template>
  <el-dialog
    title="添加/编辑图片"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="130px"
    >
      <el-form-item
        label="banner标题"
        prop="name"
      >
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item
        label="图片(PC)"
        prop="pcPicture"
      >
        <el-card
          v-if="form.pcPicture"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.pcPicture | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'pcPicture')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button
          v-else
          @click="cropShow = true;PorM = 1"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="cropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="1200"
          :height="400"
          :prefix="prefix"
          @crop-upload-success="uploadSuccess"
        />
      </el-form-item>
      <el-form-item
        label="图片(移动)"
        prop="mobilePicture"
      >
        <el-card
          v-if="form.mobilePicture"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.mobilePicture | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'mobilePicture')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button
          v-else
          @click="mobileCropShow = true;PorM = 2"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="mobileCropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="750"
          :height="340"
          :prefix="prefix"
          @crop-upload-success="uploadSuccess"
        />
      </el-form-item>
      <el-form-item
        label="PC端链接地址/ID"
        prop="pcUrl"
      >
        <el-input v-model="form.pcUrl"></el-input>
      </el-form-item>
      <el-form-item
        label="移动端链接地址"
        prop="mobileUrl"
      >
        <el-input v-model="form.mobileUrl"></el-input>
      </el-form-item>
      <template>
        <el-form-item
          label="展示周期"
          prop="showStartDate"
        >
          <el-form-item
            prop="showStartDate"
            class="dateInput"
          >
            <el-date-picker
              v-model="form.showStartDate"
              type="date"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <span>至</span>
          <el-form-item
            prop="showEndDate"
            class="dateInput"
          >
            <el-date-picker
              v-model="form.showEndDate"
              type="date"
              placeholder="选择截止时间"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-form-item>
      </template>
      <el-form-item label="排序">
        <el-input
          type="number"
          placeholder="1到100之间"
          v-model.number="form.sortOrder"
        > </el-input>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="update('form')"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'

export default {
  components: {
    ImageCropper
  },
  props: {
    category: [String, Number]
  },
  data() {
    return {
      prefix: 'banner',
      cropShow: false,
      mobileCropShow: false,
      loading: false,
      dialogFormVisible: false,
      PorM: 1,
      form: {
        id: undefined,
        category: this.category,
        pcUrl: undefined,
        mobileUrl: undefined,
        pcPicture: undefined,
        type: undefined,
        showStartDate: undefined,
        showEndDate: undefined
      },
      // 现在为珠宝店，不能选类型
      categoryList: [
        {
          value: 1,
          label: '首页'
        }, {
          value: 2,
          label: '珠宝店'
        }
      ],
      rules: {
        pcUrl: [
          { message: '请输入链接地址', trigger: 'blur' },
          { pattern: /^(https?:\/\/(([a-zA-Z0-9]+-?)+\.)+[a-zA-Z0-9]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/, message: '请输入正确的链接地址' }
        ],
        mobileUrl: [
          { message: '请输入移动端链接地址', trigger: 'blur' },
          { pattern: /^(https?:\/\/(([a-zA-Z0-9]+-?)+\.)+[a-zA-Z0-9]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/, message: '请输入正确的链接地址' }
        ],
        pcPicture: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        mobilePicture: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择链接类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入banner标题', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择banner类别', trigger: 'blur' }
        ],
        showStartDate: [
          { required: true, message: '请选择展示开始时间', trigger: 'blur' }
        ],
        showEndDate: [
          { required: true, message: '请选择展示结束时间', trigger: 'blur' }
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
          this.dialogFormVisible = false
          this.success()
        } else {
          return false
        }
      })
    },
    /* uploadSuccess({ key }) {
      this.form.pcPicture = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    }*/
    uploadSuccess(key) {
      if (this.PorM === 1) {
        this.form.pcPicture = key
        this.cropShow = false
      } else {
        this.form.mobilePicture = key
        this.mobileCropShow = false
      }
      this.$refs.cropper.setStep(1)
    }
  }
}
</script>

<style scoped>
.dateInput {
  display: inline-block;
}
</style>

