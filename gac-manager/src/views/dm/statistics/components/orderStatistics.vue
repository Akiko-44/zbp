<template>
  <div class="app-container calendar-list-container"> 
    <div>
      <p style="float: right;">累计完成订单：
        <template v-if="orderList[0]">
          {{orderList[0].totalNum}}
        </template>
                单</p>
      <h4>今日订单</h4>
    </div>
    
    <el-table
      :data="orderList"
      border
      style="width: 100%">
      <el-table-column width="200px" align="center" prop="eachTime"></el-table-column>
      <el-table-column align="center" label="订单量" prop="totalOrder"></el-table-column>
      <el-table-column align="center" label="已完结订单" prop="endOrder"></el-table-column>
      <el-table-column align="center" label="退换货订单" prop="refundOrder"></el-table-column>
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
      :data="dayOrderList"
      border
      style="width: 100%">
      <el-table-column align="center" label="日期" prop="eachTime"></el-table-column>
      <el-table-column align="center" label="订单量" prop="totalOrder"></el-table-column>
      <el-table-column align="center" label="已完结订单" prop="endOrder"></el-table-column>
      <el-table-column align="center" label="退换货订单" prop="refundOrder"></el-table-column>
    </el-table>

    <div class="chart" id="chart" :style="{height:height,width:width}"></div>
    <div>
      <div class="top">
        <h4>今日商家订单数量TOP10列表</h4>
        <el-table
          :data="topOrderTodayList"
          border
          style="width: 100%">
          <el-table-column align="center" label="商家名称" prop="merchantName"></el-table-column>
          <el-table-column align="center" label="订单数量" prop="orderNum"></el-table-column>
        </el-table>
      </div>
      <div class="top">
        <h4>昨日商家订单数量TOP10列表</h4>
        <el-table
          :data="topOrderYesList"
          border
          style="width: 100%">
          <el-table-column align="center" label="商家名称" prop="merchantName"></el-table-column>
          <el-table-column align="center" label="订单数量" prop="orderNum"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  order,
  dayOrder,
  topOrder
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
      orderList: [],
      dayOrderList: [],
      topOrderYesList: [],
      topOrderTodayList: []
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
    this.getOrder()
    this.getDayOrder()
//  this.getDayOrderLine()
    this.getTopOrder()
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
      this.getDayOrder()
    },
    recentThirty(){
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.listParams.startTime = start.getFullYear() + "-" + this.p(start.getMonth() + 1) + "-" + this.p(start.getDate())
      this.listParams.endTime = end.getFullYear() + "-" + this.p(end.getMonth() + 1) + "-" + this.p(end.getDate())
      this.getDayOrder()
    },
    getOrder() {
      this.listLoading = true
      order(this.type)
        .then(succ => {
          this.orderList = succ.data
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    getDayOrder() {
      let self = this
      this.listLoading = true
      dayOrder(this.type, this.listParams)
        .then(succ => {
          this.dayOrderList = succ.data
          self.xdata = []
          self.ydata1 = []
          self.ydata2 = []
          self.ydata3 = []
          this.dayOrderList.forEach(function(v, i) {
            self.xdata.push(v.eachTime)
            self.ydata1.push(v.totalOrder)
            self.ydata2.push(v.totalPrice)
            self.ydata3.push(v.totalPrice)
          })
          self.initChart(self.xdata)
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    getTopOrder() {
      this.listLoading = true
      topOrder(this.type)
        .then(succ => {
          const data = succ.data
          this.topOrderYesList = data[0].yesList
          this.topOrderTodayList = data[0].todayList
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    handleFilter() {
      this.getDayOrder()
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
          data: self.ydata1
        },
        {
          name: '已完结订单',
          type: 'line',
          stack: '总量',
          data: self.ydata2
        },
        {
          name: '退换货订单',
          type: 'line',
          stack: '总量',
          data: self.ydata3
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