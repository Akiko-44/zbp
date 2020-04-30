<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="dateValue"
        value-format="yyyy-MM-dd"
        type="daterange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        align="right"
      >
      </el-date-picker>
      <el-button
        type="primary"
        icon="el-icon-search"
        v-waves
        @click="handleFilter"
      >查询</el-button>
    </div>
    <div
      class="statistics-container"
      v-if="fixtotalData"
    >
      <div>汇总统计
        <el-tooltip
          placement="right"
          effect="light"
        >
          <i class="el-icon-info"></i>
          <div slot="content">
            <p><strong>累计订单数：</strong>全部状态订单数量总和；</p>
            <p><strong>累计交易流水(GMV)：</strong>全部订单金额总和；</p>
            <p><strong>退款/货订单数：</strong>全部退款、退货订单数量总和；</p>
            <p><strong>退款/货订单金额：</strong>全部退款、退货订单金额总和；</p>
          </div>
        </el-tooltip>
      </div>
      <ul>
        <li>累计订单数:<span>{{fixtotalData.cumuOrderNum || 0}}</span></li>
        <li>累计交易流水(GMV):<span>￥{{fixtotalData.cumuTradeFlow || 0}}</span></li>
        <li>待付款订单数:<span>{{fixtotalData.waitPayOrderNum || 0}}</span></li>
        <li>待付款订单金额:<span>￥{{fixtotalData.waitPayOrderAmount || 0}}</span></li>
        <li>待确认订单数:<span>{{fixtotalData.waitConfirmOrderNum || 0}}</span></li>
        <li>待确认订单金额:<span>￥{{fixtotalData.waitConfirmOrderAmount || 0}}</span></li>
      </ul>
      <ul>
        <li>待发货订单数:<span>{{fixtotalData.waitDeliverOrderNum || 0}}</span></li>
        <li>待发货订单金额:<span>￥{{fixtotalData.waitDeliverOrderAmount || 0}}</span></li>
        <li>待收货订单数:<span>{{fixtotalData.waitReceiveOrderNum || 0}}</span></li>
        <li>待收货订单金额:<span>￥{{fixtotalData.waitReceiveOrderAmount || 0}}</span></li>
        <li>已收货订单数:<span>{{fixtotalData.receiveOrderNum || 0}}</span></li>
        <li>已收货订单金额:<span>￥{{fixtotalData.receiveOrderAmount || 0}}</span></li>
      </ul>
      <ul>
        <li>已完成订单数:<span>{{fixtotalData.finishOrderNum || 0}}</span></li>
        <li>已完成订单金额:<span>￥{{fixtotalData.finishOrderAmount || 0}}</span></li>
        <li>已取消订单数:<span>{{fixtotalData.cancelOrderNum || 0}}</span></li>
        <li>已取消订单金额:<span>￥{{fixtotalData.cancelOrderAmount || 0}}</span></li>
        <li>退款/货订单数:<span>{{fixtotalData.refundOrderNum || 0}}</span></li>
        <li>退款/货订单金额:<span>￥{{fixtotalData.refundOrderAmount || 0}}</span></li>
      </ul>
    </div>
    <div
      class="statistics-container"
      v-if="isSummary && totalData"
    >
      <div>查询汇总：{{listParams.startTime}}至{{listParams.endTime}}</div>
      <el-tabs
        v-model="editableTabsValue"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
          <ul>
            <li>交易订单数:<span>{{totalData.cumuOrderNum || 0}}</span></li>
            <li>交易流水（GMV）:<span>￥{{totalData.cumuTradeFlow || 0}}</span></li>
            <li>待付款订单数:<span>{{totalData.waitPayOrderNum || 0}}</span></li>
            <li>待付款订单金额:<span>￥{{totalData.waitPayOrderAmount || 0}}</span></li>
            <li>待确认订单数:<span>{{totalData.waitConfirmOrderNum || 0}}</span></li>
            <li>待确认订单金额:<span>￥{{totalData.waitConfirmOrderAmount || 0}}</span></li>
          </ul>
          <ul>
            <li>待发货订单数:<span>{{totalData.waitDeliverOrderNum || 0}}</span></li>
            <li>待发货订单金额:<span>￥{{totalData.waitDeliverOrderAmount || 0}}</span></li>
            <li>待收货订单数:<span>{{totalData.waitReceiveOrderNum || 0}}</span></li>
            <li>待收货订单金额:<span>￥{{totalData.waitReceiveOrderAmount || 0}}</span></li>
            <li>已收货订单数:<span>{{totalData.receiveOrderNum || 0}}</span></li>
            <li>已收货订单金额:<span>￥{{totalData.receiveOrderAmount || 0}}</span></li>
          </ul>
          <ul>
            <li>已完成订单数:<span>{{totalData.finishOrderNum || 0}}</span></li>
            <li>已完成订单金额:<span>￥{{totalData.finishOrderAmount || 0}}</span></li>
            <li>已取消订单数:<span>{{totalData.cancelOrderNum || 0}}</span></li>
            <li>已取消订单金额:<span>￥{{totalData.cancelOrderAmount || 0}}</span></li>
            <li>退款/货订单数:<span>{{totalData.refundOrderNum || 0}}</span></li>
            <li>退款/货订单金额:<span>￥{{totalData.refundOrderAmount || 0}}</span></li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-tabs
      v-model="editableTabsValue2"
      @tab-click="handleClick2"
    >
      <el-tab-pane
        :key="item2.name"
        v-for="(item2, index2) in editableTabs2"
        :label="item2.title"
        :name="item2.name"
      >
        <div class="filter-list">
          <el-button
            class="button fr"
            type="primary"
            @click="getExportList"
          >导出</el-button>
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
        <el-table
          :key='tableKey'
          :data="listData"
          v-loading.body="listLoading"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            align="center"
            label="日期"
          >
            <template slot-scope="{ row }">
              <span>{{row.statisticsDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="交易订单数"
          >
            <template slot-scope="{ row }">
              <span>{{row.tradeOrderNum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="交易流水（GMV)"
            :sortable="true"
            sort-by="tradeFlow"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.tradeFlow}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="待付款订单数"
          >
            <template slot-scope="{ row }">
              <span>{{row.waitPayOrderNum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="待付款订单金额"
            :sortable="true"
            sort-by="waitPayOrderAmount"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.waitPayOrderAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="待确认订单数"
          >
            <template slot-scope="{ row }">
              <span>{{row.waitConfirmOrderNum || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="待确认订单金额"
            :sortable="true"
            sort-by="waitConfirmOrderAmount"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.waitConfirmOrderAmount || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="待发货订单数"
          >
            <template slot-scope="{ row }">
              <span>{{row.waitDeliverOrderNum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="待发货订单金额"
            :sortable="true"
            sort-by="waitDeliverOrderAmount"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.waitDeliverOrderAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="待收货订单数"
          >
            <template slot-scope="{ row }">
              <span>{{row.waitReceiveOrderNum || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="待收货订单金额"
            :sortable="true"
            sort-by="waitReceiveOrderAmount"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.waitReceiveOrderAmount || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="已收货订单数"
          >
            <template slot-scope="{ row }">
              <span>{{row.receiveOrderNum || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="已收货订单金额"
            :sortable="true"
            sort-by="receiveOrderAmount"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.receiveOrderAmount || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="已完成订单数"
          >
            <template slot-scope="{ row }">
              <span>{{row.finishOrderNum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="已完成订单金额"
            :sortable="true"
            sort-by="finishOrderAmount"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.finishOrderAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="已取消订单数"
          >
            <template slot-scope="{ row }">
              <span>{{row.cancelOrderNum || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="已取消订单金额"
            :sortable="true"
            sort-by="cancelOrderAmount"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.cancelOrderAmount || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="退款/货订单数"
          >
            <template slot-scope="{ row }">
              <span>{{row.refundOrderNum || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="退款/货订单金额"
            :sortable="true"
            sort-by="refundOrderAmount"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.refundOrderAmount || 0}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  orderStatisticsList,
  orderStatisticsTotal
} from '@/api/public/statistics'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {

  },
  data() {
    return {
      type: 0,
      listParams: {
        offset: 1,
        limit: 20,
        /* type: 1,
        isExport: 0,*/
        startTime: '',
        endTime: ''
      },
      startTime: undefined,
      endTime: undefined,
      isSummary: false,
      tableKey: 0,
      editableTabsValue: '0',
      editableTabsValue2: '0',
      editableTabs: [{
        title: '全部',
        name: '0'
      }, {
        title: '珠宝店',
        name: '1'
      }, /* {
        title: '互换坊',
        name: '2'
      }, */{
        title: '设计师',
        name: '5'
      }, {
        title: '制造间',
        name: '6'
      }],
      editableTabs2: [{
        title: '全部',
        name: '0'
      }, {
        title: '珠宝店',
        name: '1'
      }, /* {
        title: '互换坊',
        name: '2'
      }, */{
        title: '设计师',
        name: '5'
      }, {
        title: '制造间',
        name: '6'
      }],
      tabIndex: 0,
      fixtotalData: undefined,
      totalData: undefined,
      listData: [],
      exportList: [],
      total: null,
      listLoading: true,
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
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        statisticsDate: '日期',
        tradeOrderNum: '交易订单数',
        tradeFlow: '交易流水',
        waitPayOrderNum: '待付款订单数',
        waitPayOrderAmount: '待付款订单金额',
        waitConfirmOrderNum: '待确认订单数',
        waitConfirmOrderAmount: '待确认订单金额',
        waitDeliverOrderNum: '待发货订单数',
        waitDeliverOrderAmount: '待发货订单金额',
        waitReceiveOrderNum: '待收货订单数',
        waitReceiveOrderAmount: '待收货订单金额',
        receiveOrderNum: '已收货订单数',
        receiveOrderAmount: '已收货订单金额',
        finishOrderNum: '已完成订单数',
        finishOrderAmount: '已完成订单金额',
        cancelOrderNum: '已取消订单数',
        cancelOrderAmount: '已取消订单金额',
        refundOrderNum: '退款/货订单数',
        refundOrderAmount: '退款/货订单金额'
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
    this.getFixTotalData()
    this.getListData(0, 0, this.listParams)
    /* this.getTotalData(0)*/
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    getFixTotalData() {
      orderStatisticsTotal(0)
        .then(succ => {
          this.fixtotalData = succ.data
        })
    },
    getTotalData(type, params) {
      orderStatisticsTotal(type, params)
        .then(succ => {
          this.totalData = succ.data
        })
    },
    getListData(type, isExport, params) {
      this.listLoading = true
      orderStatisticsList(type, isExport, params)
        .then(succ => {
          this.listData = succ.data.records
          this.total = succ.data.total
          this.listLoading = false
        })
    },
    getExportList() {
      orderStatisticsList(this.editableTabsValue2, 1, {
        startTime: this.listParams.startTime,
        endTime: this.listParams.endTime
      }).then(data => {
        this.exportList = data.data.records
        this.downloadFile()
      })
    },
    handleFilter() {
      if (this.startTime != undefined) {
        this.isSummary = true
      } else {
        this.isSummary = false
      }

      this.listParams.startTime = this.startTime
      this.listParams.endTime = this.endTime
      this.listParams.offset = 1
      this.getTotalData(0, this.listParams)
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.listParams.offset = 1
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    },
    handleClick(tab, event) {
      this.getTotalData(this.editableTabsValue, this.listParams)
    },
    handleClick2(tab, event) {
      this.getListData(this.editableTabsValue2, 0, {
        offset: 1,
        limit: 20,
        startTime: this.listParams.startTime,
        endTime: this.listParams.endTime
      })
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
.statistics-container ul,
.statistics-container li {
  list-style: none;
  font-size: 14px;
  padding: 0;
}
.statistics-container li {
  display: inline-block;
  width: 16%;
  vertical-align: text-top;
}
.statistics-container li span {
  color: #ff0000;
}
</style>
