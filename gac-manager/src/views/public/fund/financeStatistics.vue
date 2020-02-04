<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
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
    <el-button type="primary" icon="el-icon-search" v-waves @click="handleFilter">查询</el-button>
  </div>
  <div class="statistics-container">
    <div>汇总统计</div>
    <ul>
    	<li>累计交易流水:<span>￥{{fixedData.cumuTradeFlow}}</span></li>
    	<li>订单交易金额:<span>￥{{fixedData.cumuTradeAmount}}</span></li>
    	<li>账户余额:<span>￥{{fixedData.accountBalance}}</span></li>
    	<li>待入账金额:<span>￥{{fixedData.lockAmount}}</span></li>
    	<li>累计提现金额:<span>￥{{fixedData.cumuCashWithdrawal}}</span></li>
    	<li>累计提现手续费:<span>￥{{fixedData.cumuWithdrawServiceFee}}</span></li>
    </ul>
    <ul>
    	<li>累计平台服务费:<span>￥{{fixedData.cumuPlatformServiceFee}}</span></li>
    	<li>累计优惠金额:<span>￥{{fixedData.cumuCouponsPrice}}</span></li>
    	<li>累计运费:<span>￥{{fixedData.cumuFreight}}</span></li>
    	<li>退款/货金额:<span>￥{{fixedData.cumuRefundcAmount}}</span></li>
    	<!--<li>累计保证金:<span>￥{{(fixedData.cumuSwapDeposit+fixedData.lockAuctionDeposit).toFixed(2)}}</span></li>
    	<li>待返还保证金:<span>￥{{(fixedData.lockAuctionDeposit+fixedData.lockSwapDeposit).toFixed(2)}}</span></li>-->
    </ul>
  </div>
  <div class="statistics-container" v-if="isSummary">
    <div>查询汇总：{{listParams.startTime}}至{{listParams.endTime}}</div>
    <ul>
      <li>累计交易流水:<span>￥{{data.cumuTradeFlow}}</span></li>
      <li>订单交易金额:<span>￥{{data.cumuTradeAmount}}</span></li>
      <li>累计提现金额:<span>￥{{data.cumuCashWithdrawal}}</span></li>
      <li>累计提现手续费:<span>￥{{data.cumuWithdrawServiceFee}}</span></li>
      <li>累计平台服务费:<span>￥{{data.cumuPlatformServiceFee}}</span></li>
      <li>累计优惠金额:<span>￥{{data.cumuCouponsPrice}}</span></li>
    </ul>
    <ul>
      <li>累计运费:<span>￥{{data.cumuFreight}}</span></li>
      <li>退款/货金额:<span>￥{{data.cumuRefundcAmount}}</span></li>
      <!--<li>累计拍卖保证金:<span>￥{{data.lockAuctionDeposit}}</span></li>
      <li>待返还拍卖保证金:<span>￥{{data.lockAuctionDeposit}}</span></li>
      <li>累计流拍保证金:<span>￥{{data.cumuFlowDeposit}}</span></li>
      <li>累计互换保证金:<span>￥{{data.cumuSwapDeposit}}</span></li>
    </ul>
    <ul>
      <li>待返还互换保证金:<span>￥{{data.lockSwapDeposit}}</span></li>-->
    </ul>
  </div>
  <div class="filter-list">
    财务统计列表
    <el-button class="button fr" type="primary" @click="getExportList">导出</el-button>
    <a id="downlink"></a>
    <!--错误信息提示-->
    <el-dialog title="提示" v-model="errorDialog" size="tiny">
      <span>{{errorMsg}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="errorDialog=false">确认</el-button>
        </span>
    </el-dialog> 
  </div>
  
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column align="center" label="日期">
      <template slot-scope="{ row }">
        <span>{{row.statisticsDate}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="交易流水" :sortable="true" sort-by="tradeFlow">
      <template slot-scope="{ row }">
        <span>{{row.tradeFlow}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="订单交易金额" :sortable="true" sort-by="tradeAmount">
      <template slot-scope="{ row }">
        <span>{{row.tradeAmount}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="账户余额">
      <template slot-scope="{ row }">
        <span>{{row.accountBalance}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="待入账金额">
      <template slot-scope="{ row }">
        <span>{{row.lockAmount}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="提现金额">
      <template slot-scope="{ row }">
        <span>{{row.withdrawCash}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="提现手续费">
      <template slot-scope="{ row }">
        <span>{{row.withdrawServiceFee}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="平台服务费">
      <template slot-scope="{ row }">
        <span>{{row.platformServiceFee}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="优惠金额">
      <template slot-scope="{ row }">
        <span>{{row.couponsPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="累计运费">
      <template slot-scope="{ row }">
        <span>{{row.freight}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="退款/货金额">
      <template slot-scope="{ row }">
        <span>{{row.refundAmount}}</span>
      </template>
    </el-table-column>
    <!--<el-table-column align="center" label="拍卖保证金">
      <template slot-scope="{ row }">
        <span>{{row.auctionDeposit}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="拍卖订单金额">
      <template slot-scope="{ row }">
        <span>{{row.auctionTradeAmount}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="流拍保证金">
      <template slot-scope="{ row }">
        <span>{{row.flowDeposit}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="拍卖待返还保证金">
      <template slot-scope="{ row }">
        <span>{{row.lockAuctionDeposit}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="互换保证金">
      <template slot-scope="{ row }">
        <span>{{row.swapDeposit}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="互换待返还保证金">
      <template slot-scope="{ row }">
        <span>{{row.lockSwapDeposit}}</span>
      </template>
    </el-table-column>-->
    
  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  financeStatistics
} from '@/api/common/fund'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      data:{},
      fixedData:{},
      list: [],
      exportList: [],
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20,
        userId: undefined,
        mobilePhone: undefined,
        startTime: undefined,
        endTime: undefined,
        sort: 'date-desc'
      },
      startTime: undefined,
      endTime: undefined,
      isSummary: false,
      tableKey: 0,
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
      //导出文件
      outFile: '',  // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        statisticsDate: '日期',
        tradeFlow: '交易流水',
        tradeAmount: '订单交易金额',
        accountBalance: '账户余额',
        lockAmount: '待入账金额',
        withdrawCash: '提现金额',
        withdrawServiceFee: '提现手续费',
        platformServiceFee: '平台服务费',
        couponsPrice: '优惠金额',
        freight: '累计运费',
        refundAmount: '退款/货金额',
        auctionDeposit: '拍卖保证金',
        auctionTradeAmount: '拍卖订单金额',
        flowDeposit: '流拍保证金',
        lockAuctionDeposit: '拍卖待返还保证金',
        swapDeposit: '互换保证金',
        lockSwapDeposit: '互换待返还保证金'
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
    this.getFixedList()
    
  },
  mounted () {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    getFixedList(){
      financeStatistics(0,0,{sort:'date-desc'}).then(data => {
        this.fixedData = data.data
        this.getList()
      })
    },
    getList(){
      this.listLoading = true
      financeStatistics(0,0,this.listParams).then(data => {
        this.data = data.data
        this.list = data.data.financeStatisticsList.records
        this.total = data.data.financeStatisticsList.total
        this.listLoading = false
      })
    },
    getExportList(){
      financeStatistics(0,1,{
        startTime: this.listParams.startTime,
        endTime: this.listParams.endTime
      }).then(data => {
        this.exportList = data.data.financeStatisticsList.records
        this.downloadFile()
      })
    },
    handleFilter() {
      if(this.startTime != undefined){
        this.isSummary = true
      }else{
        this.isSummary = false
      }
      
      this.listParams.startTime = this.startTime
      this.listParams.endTime = this.endTime
      this.getList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    downloadFile () { // 点击导出按钮
      let listData = this.exportList
      let data = this.excelTitle.concat(listData)
      this.downloadExl(data, '报表')
    },
    downloadExl (json, downName, type) {  // 导出到excel
      let keyMap = [] // 获取键
      for (let k in json[0]) {
        keyMap.push(k)
      }
      let tmpdata = [] // 用来保存转换好的json
      json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
        tmpdata[v.position] = {
          v: v.v
        }
      })
      let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
      let tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
          'mySheet': Object.assign({},
            tmpdata, // 内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
            })
        }
      }
      let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
        {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
      ))], {
        type: ''
      })  // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown)  // 创建对象超链接
      this.outFile.download = downName + '.xlsx'  // 下载名称
      this.outFile.href = href  // 绑定a标签
      this.outFile.click()  // 模拟点击实现下载
      setTimeout(function () {  // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    s2ab (s) { // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    },
    getCharCol (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    fixdata (data) {  // 文件流转BinaryString
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

<style lang="postcss" scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.filter-list{
  padding: 10px;
  background: #eaeaea;
  line-height: 36px;
  overflow: hidden;
}
.statistics-container{
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #a1a1a1;
  color: #666666;
  border-radius: 10px;
}
ul,li{
  list-style: none;
  font-size: 14px;
  padding: 0;
}
li{
  display: inline-block;
  width: 16%;
  vertical-align: text-top;
}
li span{
  color: #FF0000;
}
</style>
<style type="text/css">
	.el-date-editor .el-range-separator{
    padding: 0;
  }
</style>

