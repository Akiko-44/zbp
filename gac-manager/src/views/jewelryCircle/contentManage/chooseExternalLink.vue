<template>

  <el-dialog
    title="推荐-外链"
    :visible.sync="dialogTableVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="130px"
    >
      <el-form-item
        label="banner名称"
        prop="name"
      >
        <el-input
          v-model.trim="form.name"
          placeholder="请输入banner名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="PC端banner"
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
        <div class="tip">尺寸1200*400，大小2M以内，支持jpg/jpeg/png/gif格式</div>
      </el-form-item>
      <el-form-item
        label="移动端banner"
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
        <div class="tip">尺寸750*350，大小2M以内，支持jpg/jpeg/png/gif格式</div>
      </el-form-item>
      <el-form-item
        label="PC端地址"
        prop="pcUrl"
      >
        <el-input
          style="width: 600px;"
          :disabled="checkedPcUrl"
          v-model="form.pcUrl"
          placeholder="请输入链接地址，链接地址需加上“http://或https://”"
        ></el-input>
        <el-checkbox v-model="checkedPcUrl">无</el-checkbox>
      </el-form-item>
      <el-form-item
        label="移动端地址"
        prop="mobileUrl"
      >
        <el-input
          style="width: 600px;"
          :disabled="checkedMobileUrl"
          v-model="form.mobileUrl"
          placeholder="请输入链接地址，链接地址需加上“http://或https://”"
        ></el-input>
        <el-checkbox v-model="checkedMobileUrl">无</el-checkbox>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="selectExternalLink"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'chooseExternalLink',
  directives: {
    waves
  },
  components: {
    ImageCropper
  },
  data() {
    return {
      prefix: 'banner',
      cropShow: false,
      mobileCropShow: false,
      dialogTableVisible: false,
      checkedPcUrl: false,
      checkedMobileUrl: false,
      form: {
        name: '',
        pcUrl: '',
        mobileUrl: '',
        pcPicture: '',
        mobilePicture: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入banner名称', trigger: 'blur' }
        ],
        pcUrl: [
          { message: '请输入链接地址', trigger: 'blur' },
          { pattern: /^(https?:\/\/(([a-zA-Z0-9]+-?)+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/, message: '请输入正确的链接地址' }
        ],
        mobileUrl: [
          { message: '请输入移动端链接地址', trigger: 'blur' }
          // { pattern: /^(https?:\/\/(([a-zA-Z0-9]+-?)+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/, message: '请输入正确的移动端链接地址' }
        ],
        pcPicture: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        mobilePicture: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'checkedPcUrl': function(newValue, oldValue) {
      if (newValue) {
        this.form.pcUrl = ''
      }
    },
    'checkedMobileUrl': function(newValue, oldValue) {
      if (newValue) {
        this.form.mobileUrl = ''
      }
    }
  },
  methods: {
    uploadSuccess(key) {
      if (this.PorM === 1) {
        this.form.pcPicture = key
        this.cropShow = false
      } else {
        this.form.mobilePicture = key
        this.mobileCropShow = false
      }
      this.$refs.cropper.setStep(1)
    },
    selectExternalLink() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogTableVisible = false
          this.$emit('selectExternalLink', this.form)
        }
      })
    },
    resetForm(row) {
      if (typeof (row) === 'string') {
        this.form = JSON.parse(row)
      } else {
        this.form = {
          name: '',
          pcUrl: '',
          mobileUrl: '',
          pcPicture: '',
          mobilePicture: ''
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
