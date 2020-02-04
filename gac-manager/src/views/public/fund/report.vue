
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <label class="filter-label">下单时间：</label>
    <el-date-picker
      v-model="createValue"
      value-format="yyyy-MM-dd"
      type="daterange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
    >
    </el-date-picker>
    <label class="filter-label">支付时间：</label>
    <el-date-picker
      v-model="payValue"
      value-format="yyyy-MM-dd"
      type="daterange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
    >
    </el-date-picker>
  </div>
  
  <div class="filter-container">
    <label class="filter-label">订单编号：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.orderNumber" placeholder="请输入订单编号"> </el-input>
    &nbsp;
    <label class="filter-label">卖家姓名：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.sellUserName" placeholder="请输入卖家姓名"> </el-input>
    &nbsp;
    <label class="filter-label">审核状态：</label>
    <el-select v-model="listQuery.auditState" clearable placeholder="审核状态">
      <el-option label="待审核" value="0"></el-option>
      <el-option label="审核通过" value="1"></el-option>
      <el-option label="审核不通过" value="2"></el-option>
    </el-select>
  </div>
  <div class="filter-container">
    <label class="filter-label">商家类别：</label>
    <el-select v-model="listQuery.orderType" clearable placeholder="商家类别">
      <el-option
        v-for="item in orderStatus"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    &nbsp;
    
    <label class="filter-label">收货人名称：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.receiveName" placeholder="请输入收货人名称"> </el-input>
    <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
    <el-button type="text" @click="resetQuery">清空条件</el-button>
  </div>
  
  
  <div class="filter-container">
    <el-button class="button" type="primary" @click="auditAll(1)">审核批量通过</el-button>
    <!--<el-button class="button" type="danger" @click="auditAll(2)">审核批量不通过</el-button>-->
    
    <el-button class="button" type="primary" @click="getFixedList">导出excel</el-button>
    <a id="downlink"></a>
    <!--错误信息提示-->
    <el-dialog title="提示" v-model="errorDialog" size="tiny">
      <span>{{errorMsg}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="errorDialog=false">确认</el-button>
        </span>
    </el-dialog> 
  </div>


  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%"  @selection-change="handleSelectionChange">

    <el-table-column type="selection" width="55">
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="订单号">
      <template slot-scope="{ row }">
        <span>{{row.orderNumber}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="商家编号">
      <template slot-scope="{ row }">
        <span>{{row.sellUserId}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="商家名称">
      <template slot-scope="{ row }">
        <span>{{row.sellUserName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="商家类别">
      <template slot-scope="{ row }">
        <span>{{orderType[row.orderType]}}</span>
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
    
    <el-table-column width="180px" align="center" label="收货人地址">
      <template slot-scope="{ row }">
        <span>{{row.receiveArea}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="商品编号">
      <template slot-scope="{ row }">
        <span>{{row.orderGoods[0].goodId}}</span>
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
    
    <el-table-column fixed="right" align="left" width="200px"  label="操作">
      <template slot-scope="{ row, $index }">
        <el-button v-if="row.auditState == 0 || row.auditState == 2" size="small" type="primary" @click="auditOne(row.id, 1)">审核通过</el-button>
        <!--<el-button v-if="row.auditState == 0" size="small" type="warning" @click="auditOne(row.id, 2)">审核拒绝</el-button>-->
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
  
  <el-dialog title="审核操作" :visible.sync="dialogFormVisible">
  	<div>
  		<span>确认审核</span>
  	</div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" :loading="auditLoading" @click="update">确 定</el-button>
    </div>
  </el-dialog>
  
</div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  page,
  audit
} from '@/api/public/report'

export default {
  data() {
    return {
      list: null,
      fixedList: null,
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
		    orderType: undefined,
		    auditState: undefined
      },
      orderType: {
      	1: '珠宝店',
      	2: '互换坊销售订单',
      	3: '互换坊拍卖订单',
      	5: '设计室',
      	6: '制造间'
      },
      orderStatus: [
      	{value: 1, label: '珠宝店'},
      	{value: 2, label: '互换坊销售订单'},
      	{value: 3, label: '互换坊拍卖订单'},
      	{value: 5, label: '设计室'},
      	{value: 6, label: '制造间'},
      ],
      tableKey: 0,
      createValue: '',
      payValue: '',
      
      dialogFormVisible: false,
      multipleSelection: [],
      auditLoading: false,
      auditForm: {
      	id: undefined,
      	state: undefined
      },
      
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
	    	orderNumber: '订单号',
	    	sellUserName: '商家名称',
	    	merchantType: '商家类别',
	    	receiveName: '收货人姓名',
	    	mobile: '收货人电话',
	    	receiveArea: '收货人地址',
	    	createTime: '下单时间',
	    	payTime: '支付时间',
	    	payMoney: '订单金额',
	    	couponsType: '优惠类型',
	    	couponsPrice: '优惠金额',
	    	receivableMoney: '应收金额',
	    	freightMoney: '运费'
	    }]
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
    getFixedList(){
      page({
        offset: 1,
        limit: 99999999,
        orderNumber: this.listQuery.orderNumber,
        receiveName: this.listQuery.receiveName,
        createBTime: this.listQuery.createBTime,
        createETime: this.listQuery.createETime,
        payBTime: this.listQuery.payBTime,
        payETime: this.listQuery.payETime,
        orderType: this.listQuery.orderType,
        auditState: this.listQuery.auditState
      }).then(data => {
        this.fixedList = data.data.records
        this.downloadFile()
      })
    },
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
    handleSelectionChange(val) {
    	this.multipleSelection = val
    },
    auditOne($id, $state){
    	this.dialogFormVisible = true
    	this.auditForm.id = $id
    	this.auditForm.state = $state
    },
    auditAll($state){
    	if(this.multipleSelection.length == 0){
    		this.$message({
          message: '您还未选中',
          type: 'warning'
        })
    		return false
    	}
    	let idArr = []
    	const state = $state==1?2:1
    	this.multipleSelection.forEach(data => {
    		if(data.auditState == state){
    			idArr.push(data.id)
    		}
    	})
    	if(idArr.length == 0){
    		this.$message({
          message: '您还未选中符合此操作的项',
          type: 'warning'
        })
    		return false
    	}
    	this.auditForm.id = idArr.join(',')
    	this.auditForm.state = $state
    	setTimeout(() => {
    		this.dialogFormVisible = true
    	},20)
    },
    update(){
    	const idArr = this.auditForm.id.split(',')
    	audit(this.auditForm).then(data => {
    		this.dialogFormVisible = false
    		this.$notify({
          title: '成功',
          message: '审核成功',
          type: 'success',
          duration: 2000
       	})
    		for(let i=0; i<this.list.length; i++){
    			if(idArr.indexOf(this.list[i].id) != -1){
    				this.list[i].auditState = this.auditForm.state
    			}
    		}
    		this.auditForm = {
    			id: undefined,
    			state: undefined
    		}
    	}).catch(() => {
    		this.auditForm = {
    			id: undefined,
    			state: undefined
    		}
    	})
    },
    resetQuery() {
      this.listQuery = {
        orderNumber: undefined,
        receiveName: undefined,
        createBTime: undefined,
        createETime: undefined,
        payBTime: undefined,
        payETime: undefined,
        orderType: undefined,
        auditState: undefined
      }
      this.createValue = ''
      this.payValue = ''
      this.getList()
    },
    downloadFile () { // 点击导出按钮
	    var listData = this.fixedList
	    for(let i=0;i<listData.length;i++){
	    	listData[i].merchantType = this.orderType[listData[i].orderType]
	    	listData[i].couponsType = '满减券'
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

