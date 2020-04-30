
<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
    >

      <el-form-item
        label="话题名称"
        prop="topicName"
      >
        <el-input
          v-model.trim="form.topicName"
          maxlength="10"
          placeholder="请输入话题名称，10字以内"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="话题简介"
        prop="topicAbstract"
      >
        <el-input
          v-model.trim="form.topicAbstract"
          maxlength="30"
          placeholder="请输入话题简介，30字以内"
        ></el-input>
      </el-form-item>

      <el-form-item label="话题背景图">
        <el-card
          v-if="form.backImag"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.backImag | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'backImag')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button
          v-else
          @click="cropShow = true"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="cropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="375"
          :height="185"
          :prefix="prefix"
          @crop-upload-success="uploadSuccess"
        />
        <div class="tip">尺寸375*185，大小2M以内，支持jpg/jpeg/png/gif格式</div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="update('form')"
        >保存</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import { saveOrUpdateTopic } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'editMsg',
  directives: {
    waves
  },
  components: {
    ImageCropper
  },
  data() {
    return {
      loading: false,
      cropShow: false,
      prefix: 'topic',
      form: {
        id: undefined,
        topicName: undefined,
        topicAbstract: undefined,
        backImag: undefined
      },
      rules: {
        topicName: [
          { required: true, message: '请输入话题名称', trigger: 'blur' }
        ],
        topicAbstract: [
          { required: true, message: '请输入话题简介', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.data) {
      this.form = JSON.parse(this.$route.query.data)
    }
  },
  methods: {
    uploadSuccess(key) {
      this.form.backImag = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          saveOrUpdateTopic(this.form).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.$router.go(-1)
          })
        } else {
          return false
        }
      })
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
