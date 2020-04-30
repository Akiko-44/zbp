
<template>
<div class="app-container calendar-list-container">
  <div>
  	<el-form :inline="true" :model="listQuery" :rules="rules" ref="makeReportListQueryForm" label-width="100px" class="listQueryForm">
		  <el-form-item label="审核状态:">
		  	<el-select v-model="listQuery.auditState" clearable placeholder="审核状态">
		      <el-option label="待审核" value="0"></el-option>
		      <el-option label="审核通过" value="1"></el-option>
		      <el-option label="审核不通过" value="2"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="订单编号:" prop="orderNumber">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.orderNumber"> </el-input>
		  </el-form-item>
		  <el-form-item label="收货人名称:">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.receiveName"> </el-input>
		  </el-form-item>
		  <el-form-item label="下单时间:">
		  	<el-date-picker
		      v-model="createValue"
		      value-format="yyyy-MM-dd"
		      type="daterange"
		      :picker-options="pickerOptions"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      align="right"
		    >
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="支付时间:">
		  	<el-date-picker
		      v-model="payValue"
		      value-format="yyyy-MM-dd"
		      type="daterange"
		      :picker-options="pickerOptions"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      align="right"
		    >
		    </el-date-picker>
		  </el-form-item>
	    <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
	    <el-button type="text" @click="resetQuery">清空条件</el-button>
    </el-form>
  </div>
  
  <div class="filter-container">
    <el-button class="button" type="primary" @click="downloadFile">导出excel</el-button>
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

    <el-table-column width="180px" align="center" label="订单号">
      <template slot-scope="{ row }">
        <span>{{row.orderNumber}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="100px" align="center" label="商品编号">
      <template slot-scope="{ row }">
        <span>{{row.orderGoods[0].skuId}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="商品名称">
      <template slot-scope="{ row }">
        <span>{{row.orderGoods[0].skuName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="100px" align="center" label="商品数量">
      <template slot-scope="{ row }">
        <span>{{row.orderGoods[0].goodsNumber}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="收货人姓名">
      <template slot-scope="{ row }">
        <span>{{row.receiveName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="收货人电话">
      <template slot-scope="{ row }">
        <span>{{row.mobile}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="250px" align="center" label="收货人地址">
      <template slot-scope="{ row }">
        <span>{{row.receiveArea}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="下单时间">
      <template slot-scope="{ row }">
        <span>{{row.createTime}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="支付时间">
      <template slot-scope="{ row }">
        <span>{{row.payTime}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="100px" align="center" label="订单金额">
      <template slot-scope="{ row }">
        <span>{{row.payMoney}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="100px" align="center" label="优惠类型">
      <template slot-scope="{ row }">
        <span>满减券</span>
      </template>
    </el-table-column>
    
    <el-table-column width="100px" align="center" label="优惠金额">
      <template slot-scope="{ row }">
        <span>{{row.couponsPrice}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="100px" align="center" label="应收金额">
      <template slot-scope="{ row }">
        <span>{{row.payMoney}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="100px" align="center" label="运费">
      <template slot-scope="{ row }">
        <span>{{row.freightMoney}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="100px" align="center" label="审核状态">
      <template slot-scope="{ row }">
        <span>{{auditState[row.auditState]}}</span>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  page
} from '@/api/designMerchant/report'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        orderNumber: undefined,
		    receiveName: undefined,
		    createBTime: undefined,
		    createETime: undefined,
		    payBTime: undefined,
		    payETime: undefined,
		    auditState: undefined
      },
      tableKey: 0,
      createValue: '',
      payValue: '',
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
      auditState: {
      	0: '待审核',
      	1: '审核通过',
      	2: '审核不通过'
      },
      
      //导出文件
	    outFile: '',  // 导出文件el
	    errorDialog: false, // 错误信息弹窗
	    errorMsg: '', // 错误信息内容
	    excelTitle: [{
	    	orderNumber: '订单号',
	    	skuId: '商品编号',
	    	skuName: '商品名称',
	    	goodsNumber: '商品数量',
	    	receiveName: '收货人姓名',
	    	mobile: '收货人电话',
	    	receiveArea: '收货人地址',
	    	createTime: '下单时间',
	    	payTime: '支付时间',
	    	payMoney: '订单金额',
	    	couponsType: '优惠类型',
	    	couponsPrice: '优惠金额',
	    	receivableMoney: '应收金额',
	    	freightMoney: '运费',
	    	state: '审核状态'
	    }],
	    rules: {      	
      	orderNumber: [
	        { pattern: /^[0-9]*$/, message: '订单编号需为纯数字', trigger: 'blur' }
	      ]
      }
    }
  },
  created() {
    this.getList()
  },
  watch: {
    createValue(value) {
      this.listQuery.createBTime = value ? value[0] : undefined
      this.listQuery.createETime = value ? value[1] : undefined
    },
    payValue(value) {
      this.listQuery.payBTime = value ? value[0] : undefined
      this.listQuery.payETime = value ? value[1] : undefined
    }
  },
  mounted () {
	  this.outFile = document.getElementById('downlink')
	},
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.$refs['makeReportListQueryForm'].validate((valid) => {
	      if (valid) {
	        this.getList()
	      } else {
	        return false
	      }
	    })
    },
    resetQuery() {
      this.listQuery.orderNumber = undefined
      this.listQuery.receiveName = undefined
      this.listQuery.createBTime = undefined
      this.listQuery.createETime = undefined
      this.listQuery.payBTime = undefined
      this.listQuery.payETime = undefined
      this.listQuery.auditState = undefined
      this.$refs['makeReportListQueryForm'].resetFields()
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    },
    downloadFile () { // 点击导出按钮
	    var listData = this.list
	    for(let i=0;i<listData.length;i++){
	    	listData[i].couponsType = '满减券'
	    	listData[i].state = this.auditState[listData[i].auditState]
	    	listData[i].skuId = listData[i].orderGoods[0].skuId
	    	listData[i].skuName = listData[i].orderGoods[0].skuName
	    	listData[i].goodsNumber = listData[i].orderGoods[0].goodsNumber
	    	listData[i].receivableMoney = listData[i].payMoney
	    }
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
</style>

