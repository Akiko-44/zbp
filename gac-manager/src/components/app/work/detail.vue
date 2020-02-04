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
      <el-form-item label="商品名称">
        <span>{{form.caseName || form.goodsName}}</span>
      </el-form-item>

      <!-- <el-form-item label="副标题">
        <span>{{form.subtitle}}</span>
      </el-form-item> -->

      <el-form-item label="商品简介">
        <span>{{form.designConcept || form.designIdea}}</span>
      </el-form-item>

      <el-form-item label="商品货号">
        <span>{{form.goodsNO}}</span>
      </el-form-item>

      <el-form-item label="商品标签">
        <span>{{form.keywords}}</span>
      </el-form-item>

      <!-- <el-form-item label="商品类型" prop="caseTypes">
      <el-radio-group v-model.number="form.caseTypes">
        <el-radio disabled :label="1">实体商品</el-radio>
        <el-radio disabled :label="2">委托设计</el-radio>
        <el-radio disabled :label="3">委托制作</el-radio>
      </el-radio-group>
    </el-form-item> -->

      <h4 id="WorkInfo">商品信息：</h4>
      <el-form-item label="商品分类">
        <template v-if="form.catList && form.catList.length">
          <span v-for="(item, i) in form.catList">{{item.catName}}<i v-if="i < form.catList.length - 1"> - </i></span>
        </template>
        <template v-else>
          <span>{{form.primaryCgyName}} - {{form.secondaryCgyName}} - {{form.thridaryCgyName}}</span>
        </template>
      </el-form-item>

      <el-form-item label="商品主图">
        <el-row
          class="row"
          v-if="form.picUrlList && form.picUrlList.length"
        >
          <el-col
            class="col"
            :span="6"
            v-for="(picUrl, index) in form.picUrlList"
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
            <el-card
              style="width:250px;"
              :body-style="{ padding: '0px' }"
            >
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

      <el-form-item
        label="视频介绍"
        v-if="form.goodsSource != 5"
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

      <!-- <el-form-item label="设计理念">
        <span>{{form.designConcept}}</span>
      </el-form-item> -->

      <el-form-item label="运费设置">
        <!-- <span>￥{{form.freightPrice}}</span> -->
        <span v-if="form.freightType === 0">包邮</span>
        <span v-if="form.freightType === 1">到付</span>
        <span v-if="form.freightType === 2">￥{{form.freightPrice}}元</span>
      </el-form-item>

      <el-form-item
        label="库存"
        prop="stock"
      >
        <div>{{form.stock}} ({{form.stockType == 1 ? '付款减库存' : '拍下减库存'}})</div>
      </el-form-item>

      <!-- <el-form-item label="最小购买量"
                    v-if="form.batchNum">
        <div>{{form.batchNum}}</div>
      </el-form-item> -->

      <!-- <el-form-item label="商品类型"
                    prop="stock">
        <div>{{form.caseType == 1 ? '现货商品' : '定制商品'}}</div>
      </el-form-item> -->

      <!-- <el-form-item label="商品服务">
        <div>
          <span v-for="(item, index) in form.serveType"
                :key="index">
            {{serveTypeMap[item]}}
          </span>
        </div>
      </el-form-item> -->

      <!-- <el-form-item label="设计师"
                    v-if="form.goodsSource == 5">
        <div>{{form.designerName}}</div>
      </el-form-item> -->

      <GoodsSpec
        :goodsSpec="goodsSpecData"
        :goodsSpecTable="goodsSpecTableData"
        :look="true"
      ></GoodsSpec>

      <h4 id="WorkDetail">商品描述：</h4>
      <!-- <el-form-item label="参数设置">
        <el-table style="width: 540px;margin-bottom: 10px;"
                  :data="form.caseAttrsDTOList"
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
      </el-form-item>

       <el-form-item label="原价">
      <span>￥{{form.originalPrice}}</span>
    </el-form-item> -->

      <el-form-item>
        <div
          class="imgss"
          v-html="form.caseInfo || form.designIdea"
        ></div>
      </el-form-item>

      <el-form-item
        v-if="showAudit && form.auditState == 0 || form.auditState == 2"
        label="操作"
      >
        <el-button
          size="small"
          type="primary"
          @click="audit(1)"
        >审核通过</el-button>
        <el-button
          v-if="form.auditState == 0"
          size="small"
          type="warning"
          @click="audit(2)"
        >审核拒绝</el-button>
      </el-form-item>

    </el-form>

    <audit-dialog
      ref="auditDialog"
      @success="auditSuccess"
    />
  </div>
</template>

<script>
import { setImg } from '@/filters'
import auditDialog from './auditDialog'
import { getObj } from '@/api/dm/works'
import { getObj as getJewelryObj } from '@/api/jewelryMerchant/works'
import { domain } from '@/api/qiniu'
import GoodsSpec from '@/components/GoodsSpec'
export default {
  props: {
    showAudit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    auditDialog,
    GoodsSpec
  },
  data() {
    return {
      type: this.$route.query.type || '',
      domain,
      form: {},
      goodsSpecData: [],
      goodsSpecTableData: [],
      serveTypeMap: {
        0: '七天无理由退货',
        1: '正品担保',
        2: '闪电配送'
      }
    }
  },
  watch: {
    form(a, c) {
      this.goodsSpecData = this.form.goodsSpecs
      this.goodsSpecTableData = this.form.goodsSkus
    }
  },
  async mounted() {
    let form
    if (this.type === 'jewelry') {
      form = await getJewelryObj(this.$route.query.id).then(data => data.data)
    } else {
      form = await getObj(this.$route.query.id).then(data => data.data)
    }
    setTimeout(() => {
      this.form = form
      //      this.form.serveType = this.form.serveType.split(',')
      this.goodsSpecData = form.goodsSpecs
      this.goodsSpecTableData = form.goodsSkus
    }, 10)
  },
  methods: {
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    audit(state) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.designerId = this.form.id
      dialog.form.auditState = state
    },
    auditSuccess() {
      const name = this.form.goodsSource === 5 ? 'workList' : 'makeWorkList'
      this.$router.push({ name })
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
