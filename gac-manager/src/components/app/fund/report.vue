
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="listQueryForm"
        label-width="100px"
        class="listQueryForm"
      >
        <el-form-item
          label="订单编号："
          prop="orderNumber"
        >
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.orderNumber"
            placeholder="请输入订单编号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="支付方式：">
          <el-select
            v-model="listQuery.payType"
            clearable
            placeholder="请选择支付方式"
          >
            <el-option
              v-for="item in payTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-select
            v-model="listQuery.auditState"
            clearable
            placeholder="请选择审核状态"
          >
            <el-option
              v-for="item in auditStateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="订单金额区间："
          label-width="110px"
        >
          <el-form-item prop="payMoneyLow">
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 100px;"
              v-model="listQuery.payMoneyLow"
            >
            </el-input>
          </el-form-item>
          --
          <el-form-item prop="payMoneyHigh">
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 100px;"
              v-model="listQuery.payMoneyHigh"
            >
            </el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item
          label="商家实收金额区间："
          label-width="140px"
        >
          <el-form-item prop="merchantReceiveLow">
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 100px;"
              v-model="listQuery.merchantReceiveLow"
            >
            </el-input>
          </el-form-item>
          --
          <el-form-item prop="merchantReceiveHigh">
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 100px;"
              v-model="listQuery.merchantReceiveHigh"
            >
            </el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="支付时间：">
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
        </el-form-item>
        <el-form-item label="完成时间：">
          <el-date-picker
            v-model="endValue"
            value-format="yyyy-MM-dd"
            type="daterange"
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
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
        <el-button
          class="button fr"
          type="primary"
          @click="getFixedList"
        >导出</el-button>
        <!-- <el-button
          class="button fr"
          type="primary"
          @click="auditAll()"
        >批量审核</el-button> -->
      </el-form>
    </div>

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
    <el-table
      :key='tableKey'
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      ref="table"
      height="531"
    >

      <el-table-column
        width="180px"
        align="center"
        label="订单编号"
      >
        <template slot-scope="{ row }">
          <el-button
            class="button"
            type="text"
            @click="$router.push({name: 'orderCheckDetail', query: {id: row.id}})"
          >{{row.orderNumber}}</el-button>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="银商订单号"
      >
        <template slot-scope="{ row }">
          <span>{{row.billId}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="商品总金额"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsTotalMoney}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="50px"
        align="center"
        label="运费"
      >
        <template slot-scope="{ row }">
          <span>{{row.freightMoney}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="80px"
        align="center"
        label="物流公司"
      >
        <template slot-scope="{ row }">
          <span>{{row.expressCompany}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="80px"
        align="center"
        label="优惠金额"
      >
        <template slot-scope="{ row }">
          <span>{{row.couponsPrice}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="80px"
        align="center"
        label="优惠折扣"
      >
        <template slot-scope="{ row }">
          <span>{{row.discountCount === 10 ? '无':row.discountCount+'折'}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="订单金额"
      >
        <template slot-scope="{ row }">
          <span>{{row.payMoney}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        width="110px"
        align="center"
        label="用户实付金额"
      >
        <template slot-scope="{ row }">
          <span>{{row.payMoney}}</span>
        </template>
      </el-table-column> -->

      <el-table-column
        width="180px"
        align="center"
        label="支付方式"
      >
        <template slot-scope="{ row }">
          <span>{{payTypeMap[row.payType]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="银联交易手续费率（商家）"
      >
        <template slot-scope="{ row }">
          <span>{{row.orderFee}}%</span>
        </template>
      </el-table-column>
      <el-table-column
        width="110px"
        align="center"
        label="银联交易手续费（商家）"
      >
        <template slot-scope="{ row }">
          <span>{{row.freeMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="110px"
        align="center"
        label="银联交易手续费率（平台）"
      >
        <template slot-scope="{ row }">
          <span>{{row.unionPlatServiceFee}}%</span>
        </template>
      </el-table-column>
      <el-table-column
        width="110px"
        align="center"
        label="银联交易手续费（平台）"
      >
        <template slot-scope="{ row }">
          <span>{{row.unionPlatServiceFeeMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="110px"
        align="center"
        label="平台服务费率"
      >
        <template slot-scope="{ row }">
          <span>{{row.platFee}}%</span>
        </template>
      </el-table-column>
      <el-table-column
        width="110px"
        align="center"
        label="平台实收服务费"
      >
        <template slot-scope="{ row }">
          <span>{{row.platServiceFee}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="商家实收金额"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantReceive}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="审核状态"
      >
        <template slot-scope="{ row }">
          <span>{{auditStateMap[row.auditState]}}</span>
          <el-tooltip
            :content="row.auditLog"
            placement="bottom"
            effect="light"
            v-if="row.auditState === 2 || row.auditState === 4"
          >
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="支付时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.payTime}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="完成时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.endTime}}</span>
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
        :current-page.sync="listQuery.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
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
  newPage as page,
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
        expressCompany: undefined,
        payMoneyLow: 0,
        payMoneyHigh: 999999,
        merchantReceiveLow: 0,
        merchantReceiveHigh: 999999,
        payType: undefined,
        payBTime: undefined,
        payETime: undefined,
        endSTime: undefined,
        endETime: undefined,
        auditState: undefined
      },
      payTypeMap: {
        1: 'PC扫码支付',
        2: 'APP微信支付',
        3: 'APP支付宝支付',
        4: '公众号+服务号支付'
      },
      payTypeList: [
        { value: 1, label: 'PC扫码支付' },
        { value: 2, label: 'APP微信支付' },
        { value: 3, label: 'APP支付宝支付' },
        { value: 4, label: '公众号+服务号支付' }
      ],
      auditStateMap: {
        0: '待审核',
        1: '初审通过',
        2: '初审不通过',
        3: '复审通过',
        4: '复审不通过'
      },
      auditStateList: [
        { value: 0, label: '待审核' },
        { value: 1, label: '初审通过' },
        { value: 2, label: '初审不通过' },
        { value: 3, label: '复审通过' },
        { value: 4, label: '复审不通过' }
      ],
      tableKey: 0,
      endValue: '',
      payValue: '',
      dialogFormVisible: false,
      multipleSelection: [],
      auditLoading: false,
      auditForm: {
        id: undefined,
        state: 1
      },
      rules: {
        orderNumber: [
          {
            pattern: /^[0-9]*$/,
            message: '订单编号需为纯数字',
            trigger: 'blur'
          }
        ],
        payMoneyLow: [
          {
            pattern: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
            message: '金额格式不正确',
            trigger: 'blur'
          }
        ],
        payMoneyHigh: [
          {
            pattern: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
            message: '金额格式不正确',
            trigger: 'blur'
          }
        ],
        merchantReceiveLow: [
          {
            pattern: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
            message: '金额格式不正确',
            trigger: 'blur'
          }
        ],
        merchantReceiveHigh: [
          {
            pattern: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
            message: '金额格式不正确',
            trigger: 'blur'
          }
        ]//
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
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        orderNumber: '订单编号',
        billId: '银商订单号',
        goodsTotalMoney: '商品总金额',
        freightMoney: '运费',
        expressCompany: '物流公司',
        couponsPrice: '优惠金额',
        discountCount: '优惠折扣',
        payMoney: '订单金额',
        payType: '支付方式',
        orderFee: '银联交易手续费率（商家）',
        freeMoney: '银联交易手续费（商家）',
        unionPlatServiceFee: '银联交易手续费率（平台）',
        unionPlatServiceFeeMoney: '银联交易手续费（平台）',
        platFee: '平台服务费率',
        platServiceFee: '平台实收服务费',
        merchantReceive: '商家实收金额',
        auditState: '审核状态',
        payTime: '支付时间',
        endTime: '完成时间'
      }]
    }
  },
  created() {
    this.getList()
  },
  watch: {
    endValue(value) {
      this.listQuery.endBTime = value ? value[0] : undefined
      this.listQuery.endETime = value ? value[1] : undefined
    },
    payValue(value) {
      this.listQuery.payBTime = value ? value[0] : undefined
      this.listQuery.payETime = value ? value[1] : undefined
    }
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    getFixedList() {
      page({
        offset: 1,
        limit: 99999999,
        orderNumber: this.listQuery.orderNumber,
        expressCompany: this.listQuery.expressCompany,
        payMoneyLow: this.listQuery.payMoneyLow,
        payMoneyHigh: this.listQuery.payMoneyHigh,
        merchantReceiveLow: this.listQuery.merchantReceiveLow,
        merchantReceiveHigh: this.listQuery.merchantReceiveHigh,
        payType: this.listQuery.payType,
        endBTime: this.listQuery.endBTime,
        endETime: this.listQuery.endETime,
        payBTime: this.listQuery.payBTime,
        payETime: this.listQuery.payETime,
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
      this.$refs['listQueryForm'].validate(valid => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    },
    /* handleSelectionChange(val) {
      this.multipleSelection = val
    }, */
    auditOne($id, $state) {
      this.dialogFormVisible = true
      this.auditForm.id = $id
      if ($state === 2) {
        this.auditForm.state = 1
      } else if ($state === 4) {
        this.auditForm.state = 3
      }
    },
    update() {
      audit(this.auditForm).then(data => {
        this.$refs.table.clearSelection()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '审核成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      }).catch(() => {
        this.getList()
      })
    },
    downloadFile() { // 点击导出按钮
      var listData = this.fixedList
      for (let i = 0; i < listData.length; i++) {
        listData[i].payType = this.payTypeMap[listData[i].payType]
        listData[i].auditState = this.auditStateMap[listData[i].auditState]
      }
      const data = this.excelTitle.concat(listData)
      this.downloadExl(data, '交易记录')
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
      }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
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
      setTimeout(function () { // 延时释放
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
</style>

