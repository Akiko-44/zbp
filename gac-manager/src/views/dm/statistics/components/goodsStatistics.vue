<template>
  <div class="app-container calendar-list-container"> 
    <div>
      <!--<p style="float: right;">当前总商品数为：
        <template v-if="goodsList[0]">
          {{orderList[0].totalNum}}
        </template>
                种</p>-->
      <h4>今日商品报表</h4>
    </div>
    
    <el-table
      :data="goodsList"
      border
      style="width: 100%">
      <el-table-column width="200px" align="center" prop="recordTime"></el-table-column>
      <el-table-column align="center" label="在售商品" prop="saleGoods"></el-table-column>
      <el-table-column align="center" label="库存不足商品" prop="storckGoods"></el-table-column>
      <el-table-column align="center" label="产生订单商品" prop="orderGoods"></el-table-column>
      <el-table-column align="center" label="待审核商品" prop="auditGoods"></el-table-column>
      <el-table-column align="center" label="新上架商品" prop="newGoods"></el-table-column>
    </el-table>
        
    <div class="filter-container">
      <label class="filter-label">时间：</label>
      <el-button type="primary" v-waves @click="recentSeven">最近7天</el-button>
      <el-button type="primary" v-waves @click="recentThirty">最近30天</el-button>
      &#12288;
      <el-date-picker
        v-model="dateValue"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
      &#12288;
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table
      :data="dayGoodsList"
      border
      style="width: 100%">
      <el-table-column align="center" label="日期" prop="recordTime"></el-table-column>
      <el-table-column align="center" label="在售商品" prop="saleGoods"></el-table-column>
      <el-table-column align="center" label="库存不足商品" prop="storckGoods"></el-table-column>
      <el-table-column align="center" label="产生订单商品" prop="orderGoods"></el-table-column>
      <el-table-column align="center" label="待审核商品" prop="auditGoods"></el-table-column>
      <el-table-column align="center" label="新上架商品" prop="newGoods"></el-table-column>
    </el-table>

    <div class="chart" id="chart" :style="{height:height,width:width}"></div>
  </div>
</template>

<script>
import { 
  goodsDate
} from '@/api/dm/statistics'
import waves from '@/directive/waves' // 水波纹指令
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'

export default {
  directives: {
    waves
  },
  mixins: [resize],
  props: {
    type: [String, Number],
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  components:{
    
  },
  data() {
    return {
      chart: null,
      xdata: [],
      ydata1: [],
      ydata2: [],
      ydata3: [],
      ydata4: [],
      ydata5: [],
      listLoading: true,
      listParams:{
        startTime: '',
        endTime: ''
      },
      listTwoParams:{
        startTime: '',
        endTime: ''
      },
      todayTime: '',
      yesterdayTime: '',
      dateValue: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      goodsList:[],
      dayGoodsList: []
    }
  },
  mounted() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    this.listParams.startTime = start.getFullYear() + "-" + this.p(start.getMonth() + 1) + "-" + this.p(start.getDate())
    this.listParams.endTime = end.getFullYear() + "-" + this.p(end.getMonth() + 1) + "-" + this.p(end.getDate())
  },
  watch: {
    dateValue(value) {
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getGoodsList()
    this.getGoods()
  },
  methods: {
    p(s) {
        return s < 10 ? '0' + s: s;
    },
    recentSeven(){
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.listParams.startTime = start.getFullYear() + "-" + this.p(start.getMonth() + 1) + "-" + this.p(start.getDate())
      this.listParams.endTime = end.getFullYear() + "-" + this.p(end.getMonth() + 1) + "-" + this.p(end.getDate())
      this.getGoods()
    },
    recentThirty(){
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.listParams.startTime = start.getFullYear() + "-" + this.p(start.getMonth() + 1) + "-" + this.p(start.getDate())
      this.listParams.endTime = end.getFullYear() + "-" + this.p(end.getMonth() + 1) + "-" + this.p(end.getDate())
      this.getGoods()
    },
    getGoodsList() {
      let self = this
      this.listLoading = true
      const today = new Date()
      const yesterday = new Date()
      yesterday.setTime(yesterday.getTime() - 3600 * 1000 * 24 * 1)
      this.listTwoParams.startTime = yesterday.getFullYear() + "-" + this.p(yesterday.getMonth() + 1) + "-" + this.p(yesterday.getDate())
      this.listTwoParams.endTime = today.getFullYear() + "-" + this.p(today.getMonth() + 1) + "-" + this.p(today.getDate())
      goodsDate(this.type, this.listTwoParams)
        .then(succ => {
          this.dayGoodsList = succ.data
          self.goodsList = []
          this.dayGoodsList.forEach(function(v, i) {
            if(v.recordTime.split(' ')[0] == self.listTwoParams.startTime){
              v.recordTime = '昨天'
              self.goodsList.push(v)
            }else if(v.recordTime.split(' ')[0] == self.listTwoParams.endTime){
              v.recordTime = '今天'
              self.goodsList.push(v)
            }
          })
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    getGoods() {
      let self = this
      this.listLoading = true
      goodsDate(this.type, this.listParams)
        .then(succ => {
          this.dayGoodsList = succ.data
          self.xdata = []
          self.ydata1 = []
          self.ydata2 = []
          self.ydata3 = []
          self.ydata4 = []
          self.ydata5 = []
          this.dayGoodsList.forEach(function(v, i) {
            self.xdata.push(v.recordTime)
            self.ydata1.push(v.saleGoods)
            self.ydata2.push(v.storckGoods)
            self.ydata3.push(v.orderGoods)
            self.ydata4.push(v.auditGoods)
            self.ydata5.push(v.newGoods)
          })
          self.initChart(self.xdata)
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    handleFilter() {
      this.getGoods()
    },
    initChart(xdata) {
      let self = this
      this.chart = echarts.init(document.getElementById('chart'))
      this.chart.setOption({
        title: {
          
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['在售商品', '库存不足商品', '产生订单商品', '待审核商品', '新上架商品']
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: xdata
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '在售商品',
          type: 'line',
          stack: '总量',
          data: self.ydata1
        },
        {
          name: '库存不足商品',
          type: 'line',
          stack: '总量',
          data: self.ydata2
        },
        {
          name: '产生订单商品',
          type: 'line',
          stack: '总量',
          data: self.ydata3
        },
        {
          name: '待审核商品',
          type: 'line',
          stack: '总量',
          data: self.ydata4
        },
        {
          name: '新上架商品',
          type: 'line',
          stack: '总量',
          data: self.ydata5
        }]
      })
    }
  }
}
</script>
<style>
  .el-table {
    margin-bottom: 20px;
  }
  .top {
    display: inline-block;
    width: 48%;
  }
</style>