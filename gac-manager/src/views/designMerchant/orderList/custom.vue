
<template>
  <div class="app-container calendar-list-container">
    <el-form
      :inline="true"
      :model="listQuery"
      :rules="rules"
      ref="designListQueryForm"
      label-width="101px"
      class="listQueryForm"
    >
      <div class="filter-container">
        <el-form-item
          label="订单编号:"
          prop="orderNumber"
        >
          <el-input
            @keyup.enter.native="handleFilter"
            :maxlength="20"
            style="width: 195px;"
            v-model.trim="listQuery.orderNumber"
          > </el-input>
        </el-form-item>
        <el-form-item label="生成时间:">
          <el-date-picker
            v-model="payDateValue"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            :picker-options="pickerOptions"
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
        >查询</el-button>
        <el-button
          class="fr"
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
    </el-form>

    <el-table
      :key='tableKey'
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >

      <el-table-column
        width="180px"
        align="center"
        label="订单编号"
      >
        <template slot-scope="{ row }">
          <span
            class="blue"
            @click="$router.push({ name: 'customOrderDetail', query: { id: row.orderNumber } })"
          >{{row.orderNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        align="center"
        label="下单时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="商品"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.orderGoodVOList[0].skuMainPic"
            width="100"
            height="100"
            style="vertical-align: text-top;"
          />
          <span
            v-for="(item,index) in row.orderGoodVOList"
            :key="index"
          >
            <span v-if="index > 0">，</span>
            {{item.skuName}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="单价"
      >
        <template slot-scope="{ row }">
          <span>
            ￥{{row.orderGoodVOList[0].unitPrice}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="数量"
      >
        <template slot-scope="{ row }">
          <span>
            {{row.orderGoodVOList[0].goodsNumber}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="收货信息"
      >
        <template slot-scope="{ row }">
          <p>{{row.consigneeName}}</p>
          <p>{{row.buyUserName}}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="订单状态"
      >
        <template slot-scope="{ row }">
          <span v-if="row.state === 6 && row.isCommented === 2">已评价</span>
          <span v-else>{{orderState[row.state]}}</span>
          <el-button
            type="text"
            size="small"
            @click="$router.push({ name: 'customOrderDetail', query: { id: row.orderNumber } })"
          >
            查看详情
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="confirmOrder(row.orderNumber)"
            v-if="row.state === 3"
          >
            <!--  -->
            确认订单
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="cancelOrder(row.orderNumber)"
            v-if="row.state === 1 || row.state === 2 || row.state === 3 || row.state === 100"
          >
            <!--  -->
            关闭交易
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="deliver(row.orderNumber,row.id)"
            v-if="row.state === 4"
          >
            <!--  -->
            发货
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="expressLook(row.id)"
            v-if="row.state === 5"
          >
            <!--  -->
            查看物流
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="订单金额"
      >
        <template slot-scope="{ row }">
          <span>￥{{row.payMoney}}(含运费：￥{{row.freightMoney}})</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="left"
        label="实收金额"
      >
        <template slot-scope="{ row }">
          <span>￥{{row.payMoney}}</span><br />
          <el-button
            type="text"
            @click="modify(row)"
            v-if="row.state == 3 || row.state == 100"
          >修改价格</el-button>
        </template>
      </el-table-column>

    </el-table>

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
      >
      </el-pagination>
    </div>

    <deliver-dialog
      ref="deliverDialog"
      @success="getList"
    />

    <el-dialog
      title="物流详情"
      :visible.sync="dialogExpressVisible"
    >
      <p>物流公司：{{orderExpressData.com}}</p>
      <p>物流单号：{{orderExpressData.nu}}</p>
      <el-table
        :data="orderExpressData.data"
        border
      >
        <el-table-column
          align="center"
          label="时间"
          width="200px"
        >
          <template slot-scope="{ row }">
            <span>{{row.time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="物流信息">
          <template slot-scope="{ row }">
            <span>{{row.context}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <modify-dialog ref="modifyDialog" />
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  page, confirmOrder, cancelOrder, lookExpress, expressMap
} from '@/api/common/order'
import waves from '@/directive/waves' // 水波纹指令
import { orderState, payType } from '@/utils/mixins/order'
import deliverDialog from './deliverDialog'
import modifyDialog from './modifyDialog'

const getInitQuery = () => {
  return {
    // orderNumber: undefined,
    // caseName: undefined,
    // status: undefined,
    orderType: 5
    // consignee: undefined,
    // caseType: undefined,
    // isCoupons: undefined
  }
}

export default {
  directives: {
    waves
  },
  components: {
    deliverDialog,
    modifyDialog
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: getInitQuery(),
      tableKey: 0,
      payDateValue: '',
      couponsMap: [
        { value: undefined, label: '全部' },
        { value: '0', label: '已使用' },
        { value: '1', label: '未使用' }
      ],
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
      orderState,
      payType,
      caseType: [
        { value: undefined, label: '全部' },
        { value: 1, label: '商品销售' },
        { value: 2, label: '商品定制' }
      ],
      caseTypeMap: {
        1: '商品销售',
        2: '商品定制'
      },
      dialogExpressVisible: false,
      orderExpressData: {},
      rules: {
        orderNumber: [
          { pattern: /^[0-9]*$/, message: '订单编号需为纯数字', trigger: 'blur' }
        ]
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        orderNumber: '订单编号',
        createTime: '生成时间',
        goodsNameList: '商品名称',
        state: '订单状态',
        consigneeName: '收件人',
        payMoney: '订单金额'
      }]
    }
  },
  computed: {
    orderStatus() {
      const orderStatus = Object.keys(this.orderState).map(key => {
        return { value: key, label: +key === 3 ? '设计中' : this.orderState[key] }
      })
      orderStatus.splice(orderStatus.length - 1, 1)
      return orderStatus
    },
    src() {
      const data = Object.keys(this.srcState).map(key => {
        return { value: key, label: this.srcState[key] }
      })
      return data
    }
  },
  watch: {
    '$route': 'fetchData',
    payDateValue(value) {
      this.listQuery.payStartTime = value ? value[0] : undefined
      this.listQuery.payEndTime = value ? value[1] : undefined
    }
  },
  created() {
    //  this.getList()
    this.fetchData()
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      page(2, this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    getExportList() {
      page(2, {
        offset: 1,
        limit: 9999,
        orderNumber: this.listQuery.orderNumber,
        orderType: 5,
        payStartTime: this.listQuery.payStartTime,
        payEndTime: this.listQuery.payEndTime
      }).then(data => {
        this.exportList = data.data.records
        let goodsNameList = []
        this.exportList.map(item => {
          goodsNameList = []
          item.orderGoodVOList.map(goodsItem => {
            goodsNameList.push(goodsItem.skuName)
          })
          item.goodsNameList = goodsNameList.join(' ')
        })
        this.downloadFile()
      })
    },
    handleFilter() {
      this.$refs['designListQueryForm'].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    cancelOrder(orderNo) {
      this.$prompt('请输入取消原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        value = encodeURI(value)
        cancelOrder(orderNo, value)
          .then(_ => {
            this.getList()
            this.$notify({
              title: '成功',
              message: '已取消订单',
              type: 'success'
            })
          })
      })
    },
    confirmOrder(orderNo) {
      this.$confirm('<div style="text-align:center;"><p style="font-size:16px;">是否确认该笔订单？</p><p>请先与用户协商一致，并在修改价格后再确认订单，确认订单后，用户即可支付</p></div>', '确认订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        confirmOrder(orderNo)
          .then(_ => {
            this.getList()
            this.$notify({
              title: '成功',
              message: '已确认订单',
              type: 'success'
            })
          })
      }).catch(() => {
      })
    },
    modify(detail) {
      const dialog = this.$refs.modifyDialog
      dialog.list = []
      dialog.dialogFormVisible = true
      dialog.form.orderId = detail.id
      dialog.list.push(detail)
    },
    deliver(orderNumber, id) {
      const dialog = this.$refs.deliverDialog
      dialog.dialogFormVisible = true
      dialog.orderNumber = orderNumber
      dialog.form.orderId = id
    },
    expressLook(orderId) {
      lookExpress(orderId).then(data => {
        const res = JSON.parse(data.data)
        if (res.message === 'ok') {
          this.orderExpressData = res
          this.dialogExpressVisible = true
          this.expressToChinese(res.com)
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    },
    expressToChinese(val) {
      expressMap().then(data => {
        data = data.data
        for (const item in data) {
          if (val === data[item]) {
            this.orderExpressData.com = item
          }
        }
      })
    },
    downloadFile() { // 点击导出按钮
      const listData = this.exportList
      const downloadData = this.excelTitle.concat(listData)
      this.downloadExl(downloadData, '订单列表')
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

<style lang="postcss" scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.blue {
  cursor: pointer;
  color: #409eff;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>

