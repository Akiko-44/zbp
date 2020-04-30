<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="notifyListQueryForm"
        label-width="100px"
        class="notifyListQueryForm"
      >
        <el-form-item label="手机号:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.mobile"
            placeholder="请输入中奖人手机号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="奖品名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.prizeName"
            placeholder="请输入奖品名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="奖品类型:">
          <el-select
            style="width: 195px;"
            clearable
            v-model="listParams.prizeType"
            placeholder="请选择奖品类型"
          >
            <el-option
              v-for="(item, i) in prizeType"
              :key="item"
              :label="item"
              :value="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div class="filter-container"></div>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="timeValue"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
          >查找</el-button
        >
        <el-button
          type="primary"
          :loading="exportLoading"
          @click="getExportList"
        >导出</el-button>
        <a id="downlink"></a>
      </el-form>
    </div>

    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
  		<el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
      <el-table-column width="150px" align="center" label="中奖人手机号">
        <template slot-scope="{ row }">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="奖品名称">
        <template slot-scope="{ row }">
          <span>{{ row.prizeName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="奖品类型">
        <template slot-scope="{ row }">
          <span>{{ prizeType[row.prizeType] }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="收货人">
        <template slot-scope="{ row }">
          <span>{{ row.consignee }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="收货人手机号">
        <template slot-scope="{ row }">
          <span>{{ row.consigneeMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="收货人地址">
        <template slot-scope="{ row }">
          <span>{{ row.consigneeAddr }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="中奖时间">
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" fixed="right" align="left" label="操作">
        <template slot-scope="{ row, $index }" v-if="row.prizeType == 0">
          <el-button
            size="small"
            type="primary"
            v-if="row.isDeliver == 2 && row.hasReceiveAddr == 1"
            @click="onSend(row.id)"
            >发货</el-button
          >
          <el-button
            size="small"
            type="primary"
            v-if="row.isDeliver == 1"
            @click="expressLook(row.id)"
            >查看物流</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="发货"
      :visible.sync="dialogExpressVisible"
    >
      <el-form
        :model="expressForm"
        :rules="expressFormRules"
        ref="expressForm"
        label-width="100px"
      >
        <el-form-item
          label="物流公司"
          prop="expressCompany"
        >
          <el-select
            v-model="expressForm.expressCompany"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="物流编号"
          prop="expressNum"
        >
          <el-input v-model="expressForm.expressNum"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelExpressForm">取 消</el-button>
        <el-button
          type="primary"
          :loading="expressLoading"
          @click="sendGoods"
        >确认</el-button>
      </div>
    </el-dialog>
    <express-draw ref="express" :data="expressData"/>
  </div>
</template>

<script>
var XLSX = require('xlsx')
import {
	prizePage,
	send,
	expressObj
} from '@/api/public/luckDraw';
import { express } from '@/api/common/order'
import expressDraw from './component/express';
import waves from '@/directive/waves'; // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    expressDraw
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      exportLoading: false,
      expressLoading: false,
      dialogExpressVisible: false,
      expressData: {},
      options: [],
      timeValue: [],
      listParams: {
        offset: 1,
        limit: 20,
        drawId: undefined,
        mobile: undefined,
        prizeType: undefined,
        prizeName: undefined,
        startTime: undefined,
        endTime: undefined
      },
      expressForm: {
      	id: '',
      	expressCompany: undefined,
      	expressNum: undefined
      },
   	  prizeType: {
	    	'0': '实物',
	    	'1': '再来一次',
	    	'2': '感谢参与'
      },
      expressFormRules: {
      	expressCompany: [
          { required: true, message: '请选择物流公司', trigger: 'blur' }
        ],
        expressNum: [
          { pattern: /^[0-9a-zA-Z]+$/, required: true, message: '请输入物流编号', trigger: 'blur' }
        ]
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        mobile: '中奖人手机号',
        prizeName: '奖品名称',
        prizeTypeName: '奖品类型',
        consignee: '收货人',
        consigneeMobile: '收货人手机号',
        consigneeAddr: '收货人地址',
        createTime: '中奖时间'
      }]
    }
  },
  created() {
  	this.getExpress()
    this.getList()
  },
  watch: {
    timeValue(value) {
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
    }
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
  	async getExpress() {
      const expressData = await express()
      const _this = this
      expressData.data.forEach(function(v, i) {
        _this.options.push({
          value: i,
          label: v
        })
      })
    },
    onSend($id){
    	this.expressForm.id = $id
    	setTimeout(()=>{
    		this.dialogExpressVisible = true
    	},10)
    },
  	sendGoods() {
      this.expressLoading = true
      send(this.expressForm).then(data => {
        this.$notify({
          title: '成功',
          message: '发货成功',
          type: 'success',
          duration: 2000
        })
        this.expressLoading = false
        this.dialogExpressVisible = false
      })
    },
    expressLook(id){
    	let self = this
    	expressObj(id).then((result)=>{
    		self.expressData = result.data
    		self.$refs.express.dialogExpressVisible = true
    	})
    },
    cancelExpressForm() {
      this.dialogExpressVisible = false
      this.resetForm('expressForm')
    },
    getList() {
      this.listLoading = true
      this.listParams.drawId = this.$route.query.id
      prizePage(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
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
    getExportList() {
      this.exportLoading = true
      this.listParams.offset = 1
      this.listParams.limit = this.total + 1
      prizePage(this.listParams).then(data => {
        this.exportLoading = false
        this.downloadFile(data.data.records)
      })
    },
    downloadFile(exportList) { // 点击导出按钮
      const listData = exportList
      const downloadData = this.excelTitle.concat(listData)
      downloadData.map((data)=>{
      	data.prizeTypeName = this.prizeType[data.prizeType]
      })
      this.downloadExl(downloadData, '中奖名单')
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
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
</style>
