<template>
  <div class="app-container">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="tabHandleClick"
    >
      <el-tab-pane
        label="用户分析"
        name="user"
      ></el-tab-pane>
      <el-tab-pane
        label="内容分析"
        name="content"
      ></el-tab-pane>
    </el-tabs>
    <div
      class="statistics-container"
      v-if="activeName === 'user'"
    >
      <div>昨日关键指标</div>
      <el-row>
        <el-col :span="6">
          <div class="grid-content">
            <p>{{yesterdayData.newConcernNum}}</p>
            新增关注人次
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <p>{{yesterdayData.cancelConcernNum}}</p>
            取消关注人次
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <p>{{yesterdayData.netWorthConcernNum}}</p>
            净增关注人次
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <p>{{yesterdayData.totalConcernNum}}</p>
            累计关注人次
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      class="statistics-container"
      v-else
    >
      <div>昨日关键指标</div>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <p>{{yesterdayData.shareNum}}</p>
            分享
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <p>{{yesterdayData.collectNum}}</p>
            收藏
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <p>{{yesterdayData.viewNum}}</p>
            浏览
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="filter-container">
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
        value-format="yyyy-MM-dd"
        type="daterange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
      &#12288;
      <el-button
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        class="button fr"
        type="primary"
        @click="getExportList"
      >导出</el-button>
    </div>
    <div
      class="chart"
      id="chart"
      :style="{height:'500px',width:'100%'}"
      v-show="activeName === 'user'"
    ></div>
    <div
      class="chart"
      id="chart2"
      :style="{height:'500px',width:'100%'}"
      v-show="activeName === 'content'"
    ></div>
    <div class="filter-list">

      <a id="downlink"></a>
      <!--错误信息提示-->
      <el-dialog
        title="提示"
        v-model="errorDialog"
        size="tiny"
      >
        <span>{{errorMsg}}</span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="errorDialog=false"
          >确认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  jewelryContentDate
} from '@/api/public/statistics'
import waves from '@/directive/waves' // 水波纹指令
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'

export default {
  directives: {
    waves
  },
  mixins: [resize],
  data() {
    return {
      type: 0,
      listParams: {
        offset: 1,
        limit: 20,
        startTime: '',
        endTime: ''
      },
      listData: [],
      yesterdayData: {},
      exportList: [],
      total: null,
      listLoading: true,
      dateValue: '',
      activeName: 'user',
      chart: null,
      xdata: [],
      ydata1: [],
      ydata2: [],
      ydata3: [],
      ydata4: [],
      ydata5: [],
      chart2: null,
      x2data: [],
      y2data1: [],
      y2data2: [],
      y2data3: [],
      y2data4: [],
      y2data5: [],
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
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        createTime: '记录时间',
        newConcernNum: '新增关注数',
        cancelConcernNum: '取消关注数',
        netWorthConcernNum: '净关注数',
        totalConcernNum: '总关注数',
        shareNum: '分享数',
        collectNum: '收藏数',
        viewNum: '浏览数'
      }]
    }
  },
  watch: {
    dateValue(value) {
      this.startTime = value ? value[0] : undefined
      this.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getListData()
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    tabHandleClick() {
      this.getListData()
    },
    getListData() {
      this.listLoading = true
      jewelryContentDate(this.listParams)
        .then(succ => {
          this.listData = succ.data.records
          this.listData.map(item => {
            item.createTime = item.createTime.split(' ')[0]
          })
          if (Object.keys(this.yesterdayData).length === 0 && this.listData && this.listData.length) {
            this.yesterdayData = this.listData[this.listData.length - 1]
          }
          this.total = succ.data.total
          this.xdata = []
          this.ydata1 = []
          this.ydata2 = []
          this.ydata3 = []
          this.ydata4 = []
          this.listData.map(v => {
            this.xdata.push(v.createTime)
            this.ydata1.push(v.cancelConcernNum)
            this.ydata2.push(v.newConcernNum)
            this.ydata3.push(v.totalConcernNum)
            this.ydata4.push(v.netWorthConcernNum)
          })

          this.x2data = []
          this.y2data1 = []
          this.y2data2 = []
          this.y2data3 = []
          this.listData.map(v => {
            this.x2data.push(v.createTime)
            this.y2data1.push(v.shareNum)
            this.y2data2.push(v.collectNum)
            this.y2data3.push(v.viewNum)
          })
          this.initChart(this.xdata, this.x2data)
          this.listLoading = false
        })
    },
    getExportList() {
      jewelryContentDate({
        startTime: this.listParams.startTime,
        endTime: this.listParams.endTime
      }).then(data => {
        this.exportList = data.data.records
        this.downloadFile()
      })
    },
    p(s) {
      return s < 10 ? '0' + s : s
    },
    recentSeven() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.listParams.startTime = start.getFullYear() + '-' + this.p(start.getMonth() + 1) + '-' + this.p(start.getDate())
      this.listParams.endTime = end.getFullYear() + '-' + this.p(end.getMonth() + 1) + '-' + this.p(end.getDate())
      this.getListData()
    },
    recentThirty() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.listParams.startTime = start.getFullYear() + '-' + this.p(start.getMonth() + 1) + '-' + this.p(start.getDate())
      this.listParams.endTime = end.getFullYear() + '-' + this.p(end.getMonth() + 1) + '-' + this.p(end.getDate())
      this.getListData()
    },
    handleFilter() {
      this.listParams.startTime = this.startTime
      this.listParams.endTime = this.endTime
      this.listParams.offset = 1
      this.getListData()
    },
    initChart(xdata, x2data) {
      const self = this
      document.getElementById('chart').style.width = '100%'
      this.chart = echarts.init(document.getElementById('chart'))
      this.chart.setOption({
        title: {

        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: '20%',
          data: ['取消关注人次', '新增关注人次', '累计关注人次', '净增关注人次']
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
          name: '取消关注人次',
          type: 'line',
          stack: '总量',
          data: self.ydata1
        },
        {
          name: '新增关注人次',
          type: 'line',
          stack: '总量',
          data: self.ydata2
        },
        {
          name: '累计关注人次',
          type: 'line',
          stack: '总量',
          data: self.ydata3
        },
        {
          name: '净增关注人次',
          type: 'line',
          stack: '总量',
          data: self.ydata4
        }]
      })

      document.getElementById('chart2').style.width = '100%'
      this.chart2 = echarts.init(document.getElementById('chart2'))
      this.chart2.setOption({
        title: {

        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'right',
          data: ['分享', '收藏', '浏览']
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: x2data
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '分享',
          type: 'line',
          stack: '总量',
          data: self.y2data1
        },
        {
          name: '收藏',
          type: 'line',
          stack: '总量',
          data: self.y2data2
        },
        {
          name: '浏览',
          type: 'line',
          stack: '总量',
          data: self.y2data3
        }]
      })
      this.chart.resize()
      this.chart2.resize()
    },
    downloadFile() { // 点击导出按钮
      const listData = this.exportList
      const data = this.excelTitle.concat(listData)
      this.downloadExl(data, '统计')
    },
    downloadExl(json, downName, type) { // 导出到excel
      const keyMap = [] // 获取键
      for (const k in json[0]) {
        keyMap.push(k)
      }
      const tmpdata = [] // 用来保存转换好的json
      json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce((prev, next) => prev.concat(next)).forEach(function(v) {
        tmpdata[v.position] = {
          v: v.v
        }
      })
      const outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
      const tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
          'mySheet': Object.assign({},
            tmpdata, // 内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
            })
        }
      }
      const tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
        { bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
      ))], {
        type: ''
      }) // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown) // 创建对象超链接
      this.outFile.download = downName + '.xlsx' // 下载名称
      this.outFile.href = href // 绑定a标签
      this.outFile.click() // 模拟点击实现下载
      setTimeout(function() { // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    s2ab(s) { // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    },
    getCharCol(n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    fixdata(data) { // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    moreState(tab, event) {
      if (tab === 'more') {
        console.log('/////', tab, event)
        return false
      }
    }
  }
}
</script>
<style scoped>
.statistics-container {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #a1a1a1;
  color: #666666;
  border-radius: 10px;
}
.grid-content {
  background: #e5e5e5;
  margin: 10px;
  text-align: center;
  padding: 20px;
}
.grid-content p {
  color: red;
}
/deep/ .el-range-editor--medium .el-range-separator {
  padding: 0;
}
.filter-container {
  padding: 30px 0;
}
</style>
