<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>{{ type === "1" ? "作品详情" : "商品详情" }}</span>
    </div>
    <el-form label-width="120px">
      <el-form-item :label="type === '1' ? '作品名称' : '商品名称'">
        <span>{{ form.caseName }}</span>
      </el-form-item>

      <el-form-item
        label="作品标签"
        v-if="type === '1'"
      >
        <span>{{ form.tag }}</span>
      </el-form-item>
      <el-form-item
        label="材料分类"
        v-if="type === '1'"
      >
        <span>{{ form.worksCategories }}</span>
      </el-form-item>

      <el-form-item
        label="商品价格"
        v-if="type === '0'"
      >
        <span>￥{{ form.price }}</span>
      </el-form-item>

      <!-- <el-form-item label="库存" v-if="type === '0'">
        <div>{{ form.stock }}</div>
      </el-form-item>

      <el-form-item label="库存预警" v-if="type === '0'">
        <div>{{ form.stock }}</div>
      </el-form-item> -->

      <el-form-item
        label="商品主图"
        v-if="type === '0'"
      >
        <el-row class="row">
          <el-col
            class="col"
            :span="6"
          >
            <el-card
              style="width:250px;"
              :body-style="{ padding: '0px' }"
            >
              <a
                target="_blank"
                :href="form.imageUrl | setImg"
                class="image"
                :style="getImageStyle(form.imageUrl)"
              ></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item
        label="主图视频"
        v-if="type === '0'"
      >
        <video
          controls="controls"
          v-if="form.videoUrl"
          style="width: 450px; height: 250px;"
          :src="form.videoUrl"
        >
          您的浏览器不支持 html5 video 属性，下载视频查看：
          <el-button
            size="mini"
            type="text"
          >
            <a
              :href="form.videoUrl"
              target="_blank"
            >下载视频</a>
          </el-button>
        </video>
      </el-form-item>

      <el-form-item :label="type === '1' ? '作品描述' : '商品描述'">
        <div
          class="imgss"
          v-html="form.caseInfo"
        ></div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import WorkDetail from '@/components/app/work/detail'
import { setImg } from '@/filters'
import { domain } from '@/api/qiniu'

export default {
  // async beforeRouteEnter(to, from, next) {
  //   const form = await getObj(to.query.id).then(data => data.data)
  //   next(vm => {
  //     setTimeout(() => {
  //       vm.$refs.detail.form = form
  //       vm.$refs.detail.form.caseInfo = form.caseInfo.replace(/pa95ui71l.bkt.clouddn/g, 'image.gacjc')
  //     }, 10)
  //   })
  // },
  components: {
    WorkDetail
  },
  data() {
    return {
      domain,
      type: '',
      detail: {}
    }
  },
  created() {
    this.type = this.$route.query.type
    this.form = JSON.parse(this.$route.query.data)
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
<style lang="scss">
.image {
  display: block;
  max-width: 100%;
  height: 250px;
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
.imgss p img {
  width: 600px;
}
.wscnph {
  max-width: 500px !important;
  height: auto !important;
}
</style>
