
<template>
  <div class="app-container">
    <el-form
      style="padding-right: 200px;margin-top: 50px;"
      :model="form"
      ref="form"
      label-width="120px"
    >
      <el-form-item label="奖项名称">
        {{form.name}}
      </el-form-item>

      <el-form-item label="奖项描述">
        {{form.desc}}
      </el-form-item>

      <el-form-item label="获奖图片">
        <el-row
          class="row"
          v-if="form.imgUrlList && form.imgUrlList.length"
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
                @click="lookImg(picUrl)"
                class="image"
                :style="getImageStyle(picUrl)"
              ></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="显示顺序">
        {{form.sortNum}}
      </el-form-item>
      <el-form-item label="添加时间">
        {{form.createTime}}
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="$router.push({ name: 'addDesignAwards', query: { id: form.id } })"
          style="width: 150px;"
        >编辑</el-button>
        <el-button
          type="primary"
          @click="handleDelete(form.id)"
          style="width: 150px;"
        >删除</el-button>
        <el-button
          type="primary"
          @click="$router.go(-1)"
          style="width: 150px;"
        >取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="大图"
      fullscreen='fullscreen'
      :visible.sync="dialogImgVisible"
    >
      <div style="text-align: center;">
        <img
          :src="bigImgSrc"
          width="50%"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import VideoUpload from '@/components/VideoUpload'
import { setImg } from '@/filters'
import { domain } from '@/api/qiniu'
import Tinymce from '@/components/Tinymce'
import { getAwards, delAwards } from '@/api/designMerchant/designAwards'

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
      dialogImgVisible: false,
      bigImgSrc: '',
      form: {}
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
    handleDelete(id) {
      this.$confirm(`确定删除当前奖项？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delAwards(id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.$router.go(-1)
            })
        })
    },
    lookImg(imgSrc) {
      this.dialogImgVisible = true
      this.bigImgSrc = imgSrc
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, {
          w: 500
        }) + ')'
      }
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
</style>
