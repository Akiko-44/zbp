
<template>
<div class="app-container" style="padding-right: 40px">
  <el-form :model="form" :rules="rules" ref="form" label-width="120px">

    <el-form-item label="工艺名称" prop="craftName">
      <el-input v-model="form.craftName" placeholder="请输入工艺名称"></el-input>
    </el-form-item>
    
    <el-form-item label="工艺分类" prop="primaryCgyName">
      <template v-if="!form.id || categoryShow">
        <el-cascader
          change-on-select
          placeholder="选择工艺分类"
          :options="categories"
          v-model="selectedCategory"
          @change="handleCategoryChange"
          :props="{value: 'id', label: 'name'}"
        />
      </template>
      <template v-if="form.id && !categoryShow">
        <span>{{form.primaryCgyName}} - {{form.secondaryCgyName}} - {{form.thridaryCgyName}}</span>
        <el-button type="text" @click="categoryShow = true">修改</el-button>
      </template>
    </el-form-item>

    <el-form-item label="工艺介绍" prop="intro">
      <Tinymce :height="500" ref="editor" v-model="form.intro"></Tinymce>
    </el-form-item>

    <el-form-item label="logo" prop="craftLogo">
      <el-row class="row" v-if="form.craftLogo">
        <el-col class="col" :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <a target="_blank" :href="form.craftLogo | setImg" class="image" :style="getImageStyle(form.craftLogo)"></a>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="form.craftLogo = ''">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-button type="primary" v-if="!form.craftLogo" @click="cropShow = true;" size="small">上传</el-button>
      <!--<ImageUpload
        v-show="!form.craftLogo"
        :multiple="false"
        prefix="craftLogo"
        @successCBK="craftLogoUploadSuccess"
      />-->
      <ImageCropper
      	ref="cropper"
		    v-model="cropShow"
		    :noCircle="true"
		    :noSquare="true"
		    :withCredentials="true"
		    imgFormat="jpg"
		    :width="width"
		    :height="height"
		    prefix="craftLogo"
		    @crop-upload-success="craftLogoUploadSuccess"
		  />
    </el-form-item>

    <el-form-item label="视频介绍">
      <video controls="controls" v-if="form.videoUrl" style="width: 450px; height: 250px;" :src="form.videoUrl">
        您的浏览器不支持 html5 video 属性，下载视频查看：
        <el-button
          size="mini"
          type="text"
        >
          <a :href="form.videoUrl" target="_blank">下载视频</a>
        </el-button>
      </video>
      <el-button v-if="form.videoUrl" type="text" @click="form.videoUrl = ''">删除视频</el-button>
      <template v-else>
        <video-upload
          @success="videoUploadScccess"
        />
      </template>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save(0)">发布</el-button>
      <!--<el-button type="success" :loading="loading" @click="save(1)">存草稿</el-button>-->
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
import ImageCropper from '@/components/ImageCropper'
import VideoUpload from '@/components/VideoUpload'
import { setImg } from '@/filters'
import { domain } from '@/api/qiniu'
import { getObj, putObj } from '@/api/makeMerchant/craft'
import { category } from '@/utils/mixins/goods'

export default {
  directives: {
    waves
  },
  components: {
    Tinymce,
    ImageCropper,
    VideoUpload
  },
  data() {
    return {
      domain,
      loading: false,
      categoryShow: false,
      cropShow: false,
      width: 400,
      height: 400,
      categories: [],
      selectedCategory: [],
      form: {
        primaryCgyId: undefined,
        primaryCgyName: undefined,
        secondaryCgyId: undefined,
        secondaryCgyName: undefined,
        thridaryCgyId: undefined,
        thridaryCgyName: undefined,
        id: undefined,
        intro: undefined,
        craftLogo: undefined,
        videoUrl: undefined,
        isDraft: undefined
      },
      // form: { 'id': undefined, 'intro': '<p>介绍</p>\n<p><img class="wscnph" src="http://pa95ui71l.bkt.clouddn.com/pic_1hOk90DD1wj4xik_220_160.jpeg" /></p>', 'craftLogo': 'craftLogo_1hOkbd0vFoVqYXs_580_562.jpeg', 'videoUrl': 'designer-video/1hOkfImofSQ4HkT', 'craftName': '工艺一号' },
      rules: {
        craftName: [
          {
            required: true,
            message: '请输入工艺名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        intro: [
          {
            required: true,
            message: '请输入工艺介绍',
            trigger: 'blur'
          }
        ],
        craftLogo: [
          {
            required: true,
            message: '请上传 Logo',
            trigger: 'blur'
          }
        ],
        primaryCgyName: [
          {
            required: true,
            message: '请选择一级分类',
            trigger: 'blur'
          }
        ]
      },
      editStatus: true,
      timeout: null
    }
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  async beforeRouteEnter(to, from, next) {
    let form
    if (to.query.id) {
      form = await getObj(to.query.id).then(data => data.data)
    }
    next(vm => {
      setTimeout(() => {
        if (form) {
          vm.form = form
        }
      }, 10)
    })
  },
  created() {
    this.getCategory()
  },
  watch: {
    selectedCategory(value) {
      this.selectedCategory = value
    }
  },
  methods: {
    async getCategory() {
      const categories = await category.get(2)
      this.categories = categories
    },
    save(isDraft) {
      const set = this.$refs
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.form.isDraft = isDraft
          putObj(this.form).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              name: 'craftList'
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          })
          return false
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    craftLogoUploadSuccess(key) {
      this.form.craftLogo = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    videoUploadScccess(key) {
      this.form.videoUrl = key
    },
    onbeforeunloadHandler(next) {
      if (this.editStatus) {
        if (window.confirm('确定要放弃当前的操作吗？')) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    },
    handleCategoryChange(data) {
      const fieldIds = ['primaryCgyId', 'secondaryCgyId', 'thridaryCgyId']
      const fields = ['primaryCgyName', 'secondaryCgyName', 'thridaryCgyName']
      data.forEach((id, index) => {
        this.form[fieldIds[index]] = id
        this.form[fields[index]] = category.map[id].name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.el-col-6 {
  margin-bottom: 20px;
}
</style>
