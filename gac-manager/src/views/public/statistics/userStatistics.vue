<template>
  <div class="app-container calendar-list-container">
    <div>
      <p style="float: right;">当前总会员数为：{{totalMerchant}}人</p>
      <h4>今日会员</h4>
    </div>

    <el-table
      :data="userList"
      border
      style="width: 100%"
    >
      <el-table-column
        width="200px"
        align="center"
        prop="eachTime"
      ></el-table-column>
      <el-table-column
        align="center"
        label="在线会员数"
        prop="onlineNum"
      ></el-table-column>
      <el-table-column
        align="center"
        label="活跃会员数"
        prop="activeNum"
      ></el-table-column>
      <el-table-column
        align="center"
        label="新增会员数"
        prop="newNum"
      ></el-table-column>
      <el-table-column
        align="center"
        label="订单转化率"
        prop="convertRate"
      ></el-table-column>
    </el-table>

    <div class="filter-container">
      <label class="filter-label">时间：</label>
      <el-button
        type="primary"
        v-waves
        @click="recentSeven"
      >最近7天</el-button>
      <el-button
        type="primary"
        v-waves
        @click="recentThirty"
      >最近30天</el-button>
      &#12288;
      <el-date-picker
        v-model="dateValue"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        align="right"
      >
      </el-date-picker>
      &#12288;
      <el-button
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
    </div>
    <el-table
      :data="dayuserList"
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="日期"
        prop="eachTime"
      ></el-table-column>
      <el-table-column
        align="center"
        label="在线会员数"
        prop="onlineNum"
      ></el-table-column>
      <el-table-column
        align="center"
        label="活跃会员数"
        prop="activeNum"
      ></el-table-column>
      <el-table-column
        align="center"
        label="新增会员数"
        prop="newNum"
      ></el-table-column>
      <el-table-column
        align="center"
        label="订单转化率"
        prop="convertRate"
      ></el-table-column>
    </el-table>

    <div
      class="chart"
      id="chart"
      :style="{height:height,width:width}"
    ></div>
  </div>
</template>

<script>
import {
  userDate
} from '@/api/public/statistics'
import waves from '@/directive/waves' // 水波纹指令
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'

export default {
  directives: {
    waves
  },
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  components: {

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
      listParams: {
        startTime: '',
        endTime: ''
      },
      listTwoParams: {
        startTime: '',
        endTime: ''
      },
      todayTime: '',
      yesterdayTime: '',
      dateValue: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
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
      totalMerchant: '',
      userList: [],
      dayuserList: []
    }
  },
  mounted() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    this.listParams.startTime = start.getFullYear() + '-' + this.p(start.getMonth() + 1) + '-' + this.p(start.getDate())
    this.listParams.endTime = end.getFullYear() + '-' + this.p(end.getMonth() + 1) + '-' + this.p(end.getDate())
  },
  watch: {
    dateValue(value) {
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getUserList()
    this.getUser()
  },
  methods: {
    p(s) {
      return s < 10 ? '0' + s : s
    },
    recentSeven() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.listParams.startTime = start.getFullYear() + '-' + this.p(start.getMonth() + 1) + '-' + this.p(start.getDate())
      this.listParams.endTime = end.getFullYear() + '-' + this.p(end.getMonth() + 1) + '-' + this.p(end.getDate())
      this.getUser()
    },
    recentThirty() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.listParams.startTime = start.getFullYear() + '-' + this.p(start.getMonth() + 1) + '-' + this.p(start.getDate())
      this.listParams.endTime = end.getFullYear() + '-' + this.p(end.getMonth() + 1) + '-' + this.p(end.getDate())
      this.getUser()
    },
    getUserList() {
      const self = this
      this.listLoading = true
      const today = new Date()
      const yesterday = new Date()
      yesterday.setTime(yesterday.getTime() - 3600 * 1000 * 24 * 1)
      this.listTwoParams.startTime = yesterday.getFullYear() + '-' + this.p(yesterday.getMonth() + 1) + '-' + this.p(yesterday.getDate())
      this.listTwoParams.endTime = today.getFullYear() + '-' + this.p(today.getMonth() + 1) + '-' + this.p(today.getDate())
      userDate(0, this.listTwoParams)
        .then(succ => {
          this.dayuserList = succ.data.userList
          self.userList = []
          this.dayuserList.forEach(function(v, i) {
            if (v.eachTime.split(' ')[0] == self.listTwoParams.startTime) {
              v.eachTime = '昨天'
              self.userList.push(v)
            } else if (v.eachTime.split(' ')[0] == self.listTwoParams.endTime) {
              v.eachTime = '今天'
              self.userList.push(v)
            }
          })
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    getUser() {
      const self = this
      this.listLoading = true
      userDate(0, this.listParams)
        .then(succ => {
          this.dayuserList = succ.data.userList
          self.totalMerchant = succ.data.total
          self.xdata = []
          self.ydata1 = []
          self.ydata2 = []
          self.ydata3 = []
          self.ydata4 = []
          this.dayuserList.forEach(function(v, i) {
            self.xdata.push(v.eachTime)
            self.ydata1.push(v.onlineNum)
            self.ydata2.push(v.activeNum)
            self.ydata3.push(v.newNum)
            self.ydata4.push(v.convertRate)
          })
          self.initChart(self.xdata)
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    handleFilter() {
      this.getUser()
    },
    initChart(xdata) {
      const self = this
      this.chart = echarts.init(document.getElementById('chart'))
      this.chart.setOption({
        title: {

        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['在线会员数', '活跃会员数', '新增会员数', '订单转化率']
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
          name: '在线会员数',
          type: 'line',
          stack: '总量',
          data: self.ydata1
        },
        {
          name: '活跃会员数',
          type: 'line',
          stack: '总量',
          data: self.ydata2
        },
        {
          name: '新增会员数',
          type: 'line',
          stack: '总量',
          data: self.ydata3
        },
        {
          name: '订单转化率',
          type: 'line',
          stack: '总量',
          data: self.ydata4
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
