
<template>
  <div class="page-container">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
    >
      <el-form-item
        label="奖项名称:"
        prop="name"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item
        label="奖项描述:"
        prop="desc"
      >
        <el-input
          type="textarea"
          v-model="form.desc"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="商品主图:"
        prop="imgUrlList"
      >
        <el-row
          class="row"
          v-if="form.imgUrlList.length"
        >
          <el-col
            class="col"
            :span="6"
            v-for="(picUrl, index) in form.imgUrlList"
            :key="index"
          >
            <el-card
              style="width:250px;"
              :body-style="{ padding: '0px' }"
            >
              <a
                target="_blank"
                :href="picUrl | setImg"
                class="image"
                :style="getImageStyle(picUrl)"
              ></a>
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    @click="form.imgUrlList.splice(index, 1)"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div>
          <ImageUpload
            :multiple="true"
            prefix="awards"
            @successCBK="workUploadSuccess"
          />
          <div class="input-tip">支持jpg、png格式，大小：2m以内</div>
        </div>
      </el-form-item>

      <el-form-item
        label="显示顺序:"
        prop="sortNum"
      >
        <el-input v-model="form.sortNum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="save"
          class="primary-btn-md"
        >保存</el-button>
        <el-button
          @click="$router.go(-1)"
          class="plain-btn-gray-md"
        >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import VideoUpload from '@/components/VideoUpload'
import { setImg } from '@/filters'
import { domain } from '@/api/qiniu'
import Tinymce from '@/components/Tinymce'
import { getAwards, saveOrUpdateAwards } from '@/api/designMerchant/designAwards'

export default {
  directives: {
    waves
  },
  components: {
    ImageUpload,
    VideoUpload,
    Tinymce
  },
  data() {
    return {
      domain,
      loading: false,
      form: {
        id: undefined,
        name: undefined,
        desc: undefined,
        imgUrlList: [],
        sortNum: 1
      },
      rules: {
        name: [{
          required: true,
          message: '请输入奖项名称',
          trigger: 'blur'
        }],
        desc: [{
          required: true,
          message: '请输入奖项描述',
          trigger: 'blur'
        }],
        sortNum: [{
          required: true,
          pattern: /^[0-9]*$/,
          message: '请输入正确的排序',
          trigger: 'blur'
        }],
        imgUrlList: [{
          required: true,
          message: '请上传获奖图片',
          type: 'array',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      getAwards(this.$route.query.id).then(data => {
        this.form = data.data
      })
    }
  },
  methods: {
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, {
          w: 500
        }) + ')'
      }
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          saveOrUpdateAwards(this.form).then(data => {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              name: 'designAwards'
            })
            this.loading = false
          }).catch(data => {
            this.loading = false
          })
        }
      })
    },
    workUploadSuccess(imgs) {
      imgs.forEach(key => {
        this.form.imgUrlList.push(key)
      })
    },
    videoUploadScccess(key) {
      this.form.videoUrl = key
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input,
.el-textarea {
  width: 640px;
}
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
