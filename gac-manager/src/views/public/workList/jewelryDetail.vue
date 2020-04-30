<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>商品详情</span>
    </div>
    <el-form label-width="120px">
      <el-form-item label="商品名称">
        <span>{{ form.goodsName }}</span>
      </el-form-item>

      <el-form-item label="商品简介">
        <span>{{form.designIdea}}</span>
      </el-form-item>

      <el-form-item
        label="商品标签"
        v-if="form.keywords"
      >
        <span>{{ form.keywords }}</span>
      </el-form-item>

      <el-form-item label="所属专区">
        <span>{{form.zoneName}}</span>
      </el-form-item>

      <el-form-item
        label="所属品牌"
        v-if="form.brandName"
      >
        <span>{{ form.brandName }}</span>
      </el-form-item>

      <el-form-item label="材料分类">
        <span
          v-for="item in form.catList"
          :key="item.id"
        >{{ item.catName }}&emsp;</span>
      </el-form-item>

      <GoodsSpec
        :goodsSpec="form.goodsSpecs"
        :goodsSpecTable="form.goodsSkus"
        :look="true"
      ></GoodsSpec>

      <el-form-item
        label="总库存"
        prop="stock"
      >
        <div>{{ form.stock }}</div>
      </el-form-item>

      <el-form-item label="运费设置">
        <span v-if="form.freightType === 0">包邮</span>
        <span v-if="form.freightType === 1">到付</span>
        <span v-if="form.freightType === 2">一次性收费:{{ form.freightPrice }}元</span>
      </el-form-item>

      <el-form-item label="商品图片">
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
            <el-card
              style="width:250px;"
              :body-style="{ padding: '0px' }"
            >
              <a
                target="_blank"
                :href="item.imgUrl"
                class="image"
                :style="getImageStyle(item.imgUrl)"
              >
              </a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item
        label="主图视频"
        v-if="form.videoUrl"
      >
        <video
          controls="controls"
          v-if="form.videoUrl"
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

      <el-form-item label="售后保障">
        <span v-if="form.genuine === 0">正品保证 </span>
        <span v-if="form.restore === 1"> 7天无理由退货</span>
      </el-form-item>

      <el-form-item label="商品详情">
        <div
          class="imgss"
          v-html="form.goodsDesc"
        ></div>
      </el-form-item>

      <el-form-item
        v-if="auditState === 0"
        label="操作"
      >
        <el-button
          size="small"
          type="primary"
          @click="audit(1)"
        >审核通过</el-button>
        <el-button
          size="small"
          type="warning"
          @click="audit(2)"
        >审核拒绝</el-button>
      </el-form-item>
    </el-form>

    <audit-dialog
      ref="auditDialog"
      :goodsSource="0"
      @success="auditSuccess"
    />
  </div>
</template>

<script>
import { setImg } from '@/filters'
import auditDialog from './components/auditDialog'
import { getJewelryDetail } from '@/api/dm/works'
// import { domain } from '@/api/qiniu'
import GoodsSpec from '@/components/GoodsSpec'
export default {
  components: {
    auditDialog,
    GoodsSpec
  },
  data() {
    return {
      id: this.$route.query.id,
      auditState: this.$route.query.auditState,
      //    domain,
      form: {}
    }
  },
  created() {
    getJewelryDetail(this.id).then(data => {
      this.form = data.data
    })
  },
  methods: {
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + picUrl + ')'
      }
    },
    audit(state) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.designerId = this.form.id
      dialog.form.auditState = state
      dialog.form.opinion = ''
    },
    auditSuccess() {
      this.$router.push({ name: 'jewelryWorkList' })
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
  img {
    width: 100%;
    height: 250px;
  }
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
