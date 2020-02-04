<template>
  <div class="app-container calendar-list-container"> 
    <div>
      <p style="float: right;margin: 0;" v-if="totalSaleDate">累计销售额：{{totalSaleDate}}元</p>
      <h4>销售额</h4>
    </div>
    
    <el-row v-if="saleDate" :gutter="40">
      <el-col :span="12">
        <el-card>
          <p v-if="yesterdayVal">{{ yesterdayVal }}</p>
          <p v-else>0</p>
          <span>今日销售额</span>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <p v-if="todayVal">{{ todayVal }}</p>
          <p v-else>0</p>
          <span>昨日销售额</span>
        </el-card>
      </el-col>
    </el-row>
        
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

    <div class="chart" id="chart" :style="{height:height,width:width}"></div>
    <div>
      <div class="top">
        <h4>今日销售额TOP10列表</h4>
        <el-table
          :data="topSaleTodayList"
          border
          style="width: 100%">
          <el-table-column align="center" label="商家名称" prop="merchantName"></el-table-column>
          <el-table-column align="center" label="销售额/元" prop="totalPrice"></el-table-column>
        </el-table>
      </div>
      <div class="top">
        <h4>昨日销售额TOP10列表</h4>
        <el-table
          :data="topSaleYesList"
          border
          style="width: 100%">
          <el-table-column align="center" label="商家名称" prop="merchantName"></el-table-column>
          <el-table-column align="center" label="销售额/元" prop="totalPrice"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  saleDate,
  daySale,
  topSale
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
      ydata: [],
      listLoading: true,
      listParams:{
        startTime: '',
        endTime: ''
      },
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
      saleDate: [],
      daysaleList: [],
      topSaleYesList: [],
      topSaleTodayList: [],
      yesterdayTime:'',
      todayTime:'',
      totalSaleDate:'',
      yesterdayVal:'',
      todayVal:''
    }
  },
  mounted() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    this.listParams.startTime = start.getFullYear() + "-" + this.p(start.getMonth() + 1) + "-" + this.p(start.getDate())
    this.listParams.endTime = end.getFullYear() + "-" + this.p(end.getMonth() + 1) + "-" + this.p(end.getDate())
    
    const today = new Date()
    const yesterday = new Date()
    yesterday.setTime(yesterday.getTime() - 3600 * 1000 * 24 * 1)
    this.yesterdayTime = yesterday.getFullYear() + "-" + this.p(yesterday.getMonth() + 1) + "-" + this.p(yesterday.getDate())
    this.todayTime = today.getFullYear() + "-" + this.p(today.getMonth() + 1) + "-" + this.p(today.getDate())
  },
  watch: {
    dateValue(value) {
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getSaleDate()
    this.getDaySale()
    this.getTopSale()
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
      this.getDaySale()
    },
    recentThirty(){
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.listParams.startTime = start.getFullYear() + "-" + this.p(start.getMonth() + 1) + "-" + this.p(start.getDate())
      this.listParams.endTime = end.getFullYear() + "-" + this.p(end.getMonth() + 1) + "-" + this.p(end.getDate())
      this.getDaySale()
    },
    getSaleDate() {
      var _this = this
      this.listLoading = true
      saleDate(this.type)
        .then(succ => {
          this.saleDate = succ.data
          this.totalSaleDate = this.saleDate[0].sumPrice
          this.saleDate[0].saleList.forEach(function(v, i) {
            if(v.eachMouth == _this.yesterdayTime){
              _this.yesterdayVal = v.totalPrice
            }else if(v.eachMouth == _this.todayTime){
              _this.todayVal = v.totalPrice
            }
          })
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    getDaySale() {
      let self = this
      this.listLoading = true
      daySale(this.type, this.listParams)
        .then(succ => {
          this.daySaleList = succ.data
          self.xdata = []
          self.ydata = []
          this.daysaleList.forEach(function(v, i) {
            self.xdata.push(v.eachTime)
            self.ydata.push(v.totalOrder)
          })
          self.initChart(self.xdata, self.ydata)
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    getTopSale() {
      this.listLoading = true
      topSale(this.type)
        .then(succ => {
          const data = succ.data
          this.topSaleYesList = data[0].yesList
          this.topSaleTodayList = data[0].todayList
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    handleFilter() {
      this.getDaySale()
    },
    initChart(xdata, ydata) {
      let self = this
      this.chart = echarts.init(document.getElementById('chart'))
      this.chart.setOption({
        title: {
          
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['订单量', '已完结订单', '退换货订单']
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
          name: '订单量',
          type: 'line',
          stack: '总量',
          data: self.ydata
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
  .el-card{
    text-align: center;
  }
  .el-card p{
    height: 20px;
  }
  .filter-container{
    padding-top: 20px;
  }
</style>