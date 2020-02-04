<template>
  <div class="dashboard-editor-container app-container">
    <h4>商品信息</h4>
    <el-row>
  	  <el-col :span="4">
  	    <el-card>
  	      <p>{{saleGoods == '' ? 0 : saleGoods}}</p>
  	      <span>出售中</span>
  	    </el-card>
  	  </el-col>
  	  <el-col :span="4">
        <el-card>
          <p>{{lowerGoods == '' ? 0 : lowerGoods}}</p>
          <span>已下架</span>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <p>{{warmGoods == '' ? 0 : warmGoods}}</p>
          <span>库存告警</span>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <p>{{newGoods == '' ? 0 : newGoods}}</p>
          <span>七天新品</span>
        </el-card>
      </el-col>
      <!--<el-col :span="4">
        <el-card>
          <p>{{discountGoods == '' ? 0 : discountGoods}}</p>
          <span>促销商品</span>
        </el-card>
      </el-col>-->
  	</el-row>
    <h4>交易提示</h4>
    <el-row>
      <el-col :span="4">
        <el-card>
          <p>{{payOrder == '' ? 0 : payOrder}}</p>
          <span>待支付订单</span>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <p>{{sendOrder == '' ? 0 : sendOrder}}</p>
          <span>待发货订单</span>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <p>{{endOrder == '' ? 0 : endOrder}}</p>
          <span>已完成订单</span>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <p>{{commentOrder == '' ? 0 : commentOrder}}</p>
          <span>待评价订单</span>
        </el-card>
      </el-col>
    </el-row>
    
    <h4>销售统计</h4>
    <el-table
      :data="saleData"
      stripe
      style="width: 100%">
      
      <el-table-column
        prop="no"
        label=""
        width="180">
      </el-table-column>
      <el-table-column
        prop="total"
        label="成交总额"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pcmoney"
        label="PC端成交总额/元"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pcorder"
        label="PC端成交订单数">
      </el-table-column>
      <el-table-column
        prop="appmoney"
        label="移动端成交总额/元"
        width="180">
      </el-table-column>
      <el-table-column
        prop="apporder"
        label="移动端成交订单数">
      </el-table-column>
    </el-table>
    
    <h4>商品销售排行</h4>
    <el-table
      :data="topData"
      stripe
      style="width: 100%">
      <el-table-column label="商品名称" width="180">
        <template slot-scope="{ row }">
          <span>{{row.goodsName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销量" width="180">
        <template slot-scope="{ row }">
          <span>{{row.totalPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="{ row, $index }">
          <el-button
            type="text"
            @click="$router.push({ name: 'workDetail', query: { id: row.goodsId } })"
          >
              查看商品详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <h4>店铺动态评分</h4>
    <el-form :model="starData" label-width="80px">
      <el-form-item label="描述相符">
        <el-rate
          v-model="starData.mjfwtdScore"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
      </el-form-item>
      <el-form-item label="服务态度">
        <el-rate
          v-model="starData.spmxxfScore"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
      </el-form-item>
      <el-form-item label="发货速度">
        <el-rate
          v-model="starData.wlfhsdScore"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  goodsStatistics,
  orderStatistics,
  saleStatistics,
  goodsTopStatistics,
  storeStarStatistics
} from '@/api/common/statistics'
import waves from '@/directive/waves' // 水波纹指令
import { isDesignMerchant, isMakeMerchant } from '@/utils/auth'

export default {
  directives: {
    waves
  },
  data() {
    return {
//    discountGoods: '',
      lowerGoods: '',
      newGoods: '',
      saleGoods: '',
      warmGoods: '',
      payOrder: '',
      sendOrder: '',
      endOrder: '',
      commentOrder: '',
      saleData: [{
        no: '今日',
        total: '120,000',
        pcmoney: '60,000',
        pcorder: '20',
        appmoney: '60,000',
        apporder: '20'
      }, {
        no: '昨日',
        total: '120,000',
        pcmoney: '60,000',
        pcorder: '20',
        appmoney: '60,000',
        apporder: '20'
      }],
      topData: [],
      starData: {
        mjfwtdScore: null,
        spmxxfScore: null,
        wlfhsdScore: null
      },
      type: null
    }
  },
  created() {
    if(isDesignMerchant()) {
      this.type = 5
    }else if(isMakeMerchant()) {
      this.type = 6
    }
    this.getGoods()
    this.getOrder()
    this.getSale()
    this.getTop()
    this.getStar()
  },
  methods: {
    getGoods() {
      goodsStatistics(this.type)
        .then(succ => {
          let data = succ.data
//        this.discountGoods = data.discountGoods
          this.lowerGoods = data.lowerGoods
          this.newGoods = data.newGoods
          this.saleGoods = data.saleGoods
          this.warmGoods = data.warmGoods
        })
    },
    getOrder() {
      orderStatistics(this.type)
        .then(succ => {
          let data = succ.data
          this.payOrder = data.payOrder
          this.sendOrder = data.sendOrder
          this.endOrder = data.endOrder
          this.commentOrder = data.commentOrder
        })
    },
    getSale() {
      saleStatistics(this.type)
        .then(succ => {
          let data = succ.data
        })
    },
    getTop() {
      goodsTopStatistics(this.type)
        .then(data => {
          if (typeof data.data === 'string') data.data = []
          this.topData = data.data
        })
    },
    getStar() {
      storeStarStatistics(this.type)
        .then(data => {
          this.starData = data.data
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-card{
    margin: 0 10px;
    text-align: center;
    p{
      font-size: 20px;
      color: #F47A0E;
    }
  }
</style>