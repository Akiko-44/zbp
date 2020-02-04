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

      <h4 id="BaseInfo">基本信息：</h4>
      <el-form-item label="品牌">
        <span>{{form.brandName}}</span>
      </el-form-item>

      <el-form-item label="商品名称">
        <span>{{form.goodsName}}</span>
      </el-form-item>

      <el-form-item label="副标题">
        <span>{{form.goodsBrief}}</span>
      </el-form-item>

      <el-form-item label="关键字">
        <span>{{form.keywords}}</span>
      </el-form-item>

      <el-form-item label="商品编码">
        <span>{{form.goodsSn}}</span>
      </el-form-item>

      <h4 id="WorkInfo">商品信息：</h4>
      <el-form-item label="商品分类">
        <span
          v-for="item in form.catList"
          :key="item.id"
        >{{item.catName}}&emsp;</span>
      </el-form-item>

      <el-form-item label="商品主图">
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

      <!--<el-form-item label="视频介绍" v-if="form.goodsSource != 5">
      <video controls="controls" v-if="form.videoUrl" style="width: 450px; height: 250px;" :src="domain + '/' + form.videoUrl">
        您的浏览器不支持 html5 video 属性，下载视频查看：
        <el-button size="mini" type="text">
          <a :href="domain + '/' + form.videoUrl" target="_blank">下载视频</a>
        </el-button>
      </video>
    </el-form-item>-->

      <el-form-item label="设计理念">
        <span>{{form.designIdea}}</span>
      </el-form-item>

      <el-form-item label="运费设置">
        <span>￥{{form.freightPrice}}</span>
      </el-form-item>

      <!--<el-form-item label="库存" prop="stock">
      <div>{{form.stock}} ({{form.stockType == 1 ? '付款减库存' : '拍下减库存'}})</div>
    </el-form-item>-->

      <!--<el-form-item label="商品服务">
      <div>
        <span v-for="(item, index) in form.serveType" :key="index">
          {{serveTypeMap[item]}}
        </span>
      </div>
    </el-form-item>-->

      <GoodsSpec
        :goodsSpec="form.goodsSpecs"
        :goodsSpecTable="form.goodsSkus"
        :look="true"
      ></GoodsSpec>

      <!-- <h4 id="WorkDetail">商品详情：</h4>
      <el-form-item label="参数设置">
        <el-table style="width: 540px;margin-bottom: 10px;"
                  :data="form.goodsAttrs"
                  border>
          <el-table-column align="center"
                           label="参数名称">
            <template slot-scope="{ row }">
              <span>{{row.attrName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="参数值">
            <template slot-scope="{ row }">
              <span>{{row.attrValue}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item label="商品价格">
        <span>￥{{form.price}}</span>
      </el-form-item> -->

      <!-- <el-form-item label="原价">
      <span>￥{{form.marketPrice}}</span>
    </el-form-item> -->

      <!--<el-form-item label="商品详情">
      <div class= "imgss" v-html="form.caseInfo"></div>
    </el-form-item>-->

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
<style lang="scss" >
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  img {
    width: 100%;
    height: 200px;
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
