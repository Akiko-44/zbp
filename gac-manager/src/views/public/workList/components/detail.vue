<template>
  <div class="app-container" style="padding-right: 40px">
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>商品详情</span>
    </div>
    <el-form label-width="120px">
      <el-form-item label="商品名称">
        <span>{{ form.caseName || form.goodsName }}</span>
      </el-form-item>

      <el-form-item label="商品价格">
        <span>￥{{ form.price }}</span>
      </el-form-item>

      <el-form-item label="库存" prop="stock">
        <div>{{ form.stock }}</div>
      </el-form-item>

      <el-form-item label="库存预警" prop="stock">
        <div>{{ form.stock }}</div>
      </el-form-item>

      <el-form-item label="商品主图">
        <el-row class="row" v-if="form.picUrlList && form.picUrlList.length">
          <el-col
            class="col"
            :span="6"
            v-for="(picUrl, index) in form.picUrlList"
            :key="index"
          >
            <el-card style="width:250px;" :body-style="{ padding: '0px' }">
              <a
                target="_blank"
                :href="picUrl | setImg"
                class="image"
                :style="getImageStyle(picUrl)"
              ></a>
            </el-card>
          </el-col>
        </el-row>
        <el-row
          class="row"
          v-if="form.goodsGallerys && form.goodsGallerys.length"
        >
          <el-col
            class="col"
            :span="6"
            v-for="(item, index) in form.goodsGallerys"
            :key="index"
          >
            <el-card style="width:250px;" :body-style="{ padding: '0px' }">
              <a
                target="_blank"
                :href="item.imgUrl | setImg"
                class="image"
                :style="getImageStyle(item.imgUrl)"
              ></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="主图视频" v-if="form.goodsSource != 5">
        <video
          controls="controls"
          v-if="form.videoUrl"
          style="width: 450px; height: 250px;"
          :src="domain + '/' + form.videoUrl"
        >
          您的浏览器不支持 html5 video 属性，下载视频查看：
          <el-button size="mini" type="text">
            <a :href="domain + '/' + form.videoUrl" target="_blank">下载视频</a>
          </el-button>
        </video>
      </el-form-item>

      <el-form-item label="商品描述">
        <div class="imgss" v-html="form.caseInfo || form.designIdea"></div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setImg } from '@/filters';
import { getObj } from '@/api/dm/works';
import { domain } from '@/api/qiniu';
export default {
  props: {
    showAudit: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      type: this.$route.query.type || '',
      domain,
      form: {},
      goodsSpecData: [],
      goodsSpecTableData: []
    }
  },
  async mounted() {
    this.form = await getObj(this.$route.query.id).then(data => data.data)
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
.imgss p img {
  width: 600px;
}
.wscnph {
  max-width: 500px !important;
  height: auto !important;
}
</style>
