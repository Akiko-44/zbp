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
            <p><strong>累计商家数：</strong>平台所有审核通过的商家数量总和；</p>
            <p><strong>活跃商家数：</strong>今日登录商家端的商家数量总和；</p>
            <p><strong>待审核商家数：</strong>所有待审核的商家数量总和；</p>
            <p><strong>累计会员数：</strong>平台所有已注册会员数量总和；</p>
            <p><strong>活跃会员数：</strong>今日登录中宝平（PC/APP）的注册会员数量总和；</p>
            <p><strong>支付会员数：</strong>所有支付过订单的注册会员数量总和；</p>
            <p><strong>累计访客数（UV）：</strong>所有访问过中宝平（PC/APP）的用户数量总和，本阶段仅统计已注册用户；</p>
            <!-- <p><strong>累计浏览量（PV）：</strong>所有用户浏览中宝平（PC/APP）的次数总和，包含未注册用户；</p> -->
            <p><strong>订单转化率：</strong>累计支付会员数 / 累计访客数（UV）X 100%；</p>
            <!-- <p><strong>退款/货率：</strong>累计退款/货订单 / 累计已付款订单 X 100%；</p> -->
          </div>
        </el-tooltip>
      </div>
      <ul>
        <li>累计商家数:<span>{{fixtotalData.cumuMerchantNum || 0}}</span></li>
        <!--<li>活跃商家数:<span>{{fixtotalData.cumuActiveMerchantNum || 0}}</span></li>-->
        <li>待审核商家数:<span>{{fixtotalData.cumuWaitAuditMerchantNum || 0}}</span></li>
        <li>累计会员数:<span>{{fixtotalData.cumuMemberNum || 0}}</span></li>
        <li>活跃会员数:<span>{{fixtotalData.cumuActiveMemberNum || 0}}</span></li>
        <li>支付会员数:<span>{{fixtotalData.cumuPayMemberNum || 0}}</span></li>
        <li>累计访客数（UV）:<span>{{fixtotalData.cumuUvNum || 0}}</span></li>
      </ul>
      <ul>
        <!-- <li>累计浏览量（PV）:<span>{{fixtotalData.cumuPvNum || 0}}</span></li> -->
        <li>订单转化率:<span>{{fixtotalData.convertRate || 0}}</span></li>
        <!-- <li>退款/货率:<span>{{fixtotalData.refundRate || 0}}</span></li> -->
      </ul>
    </div>
    <div
      class="statistics-container"
      v-if="isSummary && totalData"
    >
      <div>查询汇总：{{listParams.startTime}}至{{listParams.endTime}}</div>
      <!-- <el-tabs
        v-model="editableTabsValue"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        > -->
      <ul>
        <li>新增商家数:<span>{{totalData.cumuNewMerchantNum || 0}}</span></li>
        <li>活跃商家数:<span>{{totalData.cumuActiveMerchantNum || 0}}</span></li>
        <li>活跃会员数:<span>{{totalData.cumuActiveMemberNum || 0}}</span></li>
        <li>支付会员数:<span>{{totalData.cumuPayMemberNum || 0}}</span></li>
        <li>访客数（UV）:<span>{{totalData.cumuUvNum || 0}}</span></li>
        <!-- <li>浏览量（PV）:<span>{{totalData.cumuPvNum || 0}}</span></li> -->
      </ul>
      <ul>
        <li>订单转化率:<span>{{totalData.convertRate || 0}}</span></li>
        <!-- <li>退款/货率:<span>{{totalData.refundRate || 0}}</span></li> -->
      </ul>
      <!-- </el-tab-pane>
      </el-tabs> -->
    </div>

    <!-- <el-tabs
      v-model="editableTabsValue2"
      @tab-click="handleClick2"
      :before-leave="moreState"
    >
      <el-tab-pane
        :key="item2.name"
        v-for="(item2, index2) in editableTabs2"
        :label="item2.title"
        :name="item2.name"
      > -->
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
          <span>{{row.statisticsDate || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="新增商家数"
        :sortable="true"
        sort-by="newMerchantNum"
      >
        <template slot-scope="{ row }">
          <span>{{row.newMerchantNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="活跃商家数"
        :sortable="true"
        sort-by="activeMerchantNum"
      >
        <template slot-scope="{ row }">
          <span>{{row.activeMerchantNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="活跃会员数"
        :sortable="true"
        sort-by="activeMemberNum"
      >
        <template slot-scope="{ row }">
          <span>{{row.activeMemberNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="支付会员数"
        :sortable="true"
        sort-by="payMemberNum"
      >
        <template slot-scope="{ row }">
          <span>{{row.payMemberNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="访客数（UV）"
        :sortable="true"
        sort-by="uvNum"
      >
        <template slot-scope="{ row }">
          <span>{{row.uvNum || 0}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
            align="center"
            label="浏览量（PV）"
            :sortable="true"
            sort-by="pvNum"
          >
            <template slot-scope="{ row }">
              <span>{{row.pvNum || 0}}</span>
            </template>
          </el-table-column> -->
      <el-table-column
        align="center"
        label="订单转化率"
        :sortable="true"
        sort-by="convertRate"
      >
        <template slot-scope="{ row }">
          <span>{{row.convertRate || 0}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
            align="center"
            label="退款/货率"
            :sortable="true"
            sort-by="refundRate"
          >
            <template slot-scope="{ row }">
              <span>{{row.refundRate || 0}}</span>
            </template>
          </el-table-column> -->
    </el-table>
    <!-- </el-tab-pane>
    </el-tabs> -->

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
  operationDataStatisticsTotal,
  operationDataStatisticsList
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
        /* type: 0,
        isExport: 0,*/
        startTime: '',
        endTime: ''
      },
      startTime: undefined,
      endTime: undefined,
      isSummary: false,
      tableKey: 0,
      editableTabsValue: 0,
      editableTabsValue2: 0,
      editableTabs: [{
        title: '全部',
        name: '0'
      }, {
        title: '珠宝店',
        name: '1'
      }, /* {
        title: '互换坊',
        name: '2'
      },*/ {
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
        newMerchantNum: '新增商家数',
        activeMerchantNum: '活跃商家数',
        activeMemberNum: '活跃会员数',
        payMemberNum: '支付会员数',
        uvNum: '访客数（UV）',
        pvNum: '浏览量（PV）',
        convertRate: '订单转化率',
        refundRate: '退款/货率'
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
    this.getTotalData(0)
    this.getListData(0, 0)
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    getFixTotalData() {
      operationDataStatisticsTotal(0)
        .then(succ => {
          this.fixtotalData = succ.data
        })
    },
    getTotalData(type, params) {
      operationDataStatisticsTotal(type, params)
        .then(succ => {
          this.totalData = succ.data
        })
    },
    getListData(type, isExport, params) {
      this.listLoading = true
      operationDataStatisticsList(type, isExport, params)
        .then(succ => {
          this.listData = succ.data.records
          this.total = succ.data.total
          this.listLoading = false
        })
    },
    getExportList() {
      operationDataStatisticsList(this.editableTabsValue2, 1, {
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
      this.getListData(0, 0, this.listParams)
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.listParams.offset = 1
      this.getListData(0, 0, this.listParams)
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getListData(0, 0, this.listParams)
    },
    handleClick(tab, event) {
      this.getTotalData(this.editableTabsValue, this.listParams)
    },
    handleClick2(tab, event) {
      this.getListData(this.editableTabsValue2, 0, this.listParams)
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
      if (tab == 'more') {
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
ul,
li {
  list-style: none;
  font-size: 14px;
  padding: 0;
}
li {
  display: inline-block;
  width: 16%;
  vertical-align: text-top;
}
li span {
  color: #ff0000;
}
</style>
