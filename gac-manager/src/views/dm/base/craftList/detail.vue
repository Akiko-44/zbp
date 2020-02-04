<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>工艺详情</span>
    </div>

    <el-form label-width="120px">
      <el-form-item label="工艺名称">
        <span>{{ form.craftName }}</span>
      </el-form-item>

      <el-form-item
        label="Logo"
        prop="craftLogo"
      >
        <el-row
          class="row"
          v-if="form.craftLogo"
        >
          <el-col
            class="col"
            :span="6"
          >
            <el-card :body-style="{ padding: '0px' }">
              <a
                target="_blank"
                :href="form.craftLogo | setImg"
                class="image"
                :style="getImageStyle(form.craftLogo)"
              ></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="工艺介绍">
        <div v-html="form.intro"></div>
      </el-form-item>

      <el-form-item
        v-if="form.videoUrl"
        label="视频介绍"
      >
        <video
          controls="controls"
          style="width: 450px; height: 250px;"
          :src="domain + '/' + form.videoUrl"
        >
          您的浏览器不支持 html5 video 属性，下载视频查看：
          <el-button
            size="mini"
            type="text"
          >
            <a
              :href="domain + '/' + form.videoUrl"
              target="_blank"
            >下载视频</a>
          </el-button>
        </video>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { domain } from '@/api/qiniu'
import { getObj } from '@/api/dm/craft'
import { setImg } from '@/filters'

export default {
  data() {
    return {
      domain,
      form: {}
    }
  },
  async beforeRouteEnter(to, from, next) {
    const form = await getObj(to.query.id).then(data => data.data)
    next(vm => {
      setTimeout(() => {
        vm.form = form
      }, 10)
    })
  },
  methods: {
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
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
.danger {
  color: #f56c6c;
}
.el-col-6 {
  margin-bottom: 20px;
}
</style>


