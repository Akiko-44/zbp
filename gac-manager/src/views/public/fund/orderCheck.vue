
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
        <el-form-item label="商家名称：">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.sellUserName"
            placeholder="请输入商家名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="商家类型：">
          <el-select
            v-model="listQuery.registType"
            clearable
            placeholder="请选择商家类型"
          >
            <el-option
              v-for="item in registTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物流公司：">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.expressCompany"
            placeholder="请输入物流公司"
          >
          </el-input>
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
        <el-button
          class="button fr"
          type="primary"
          @click="auditAll()"
        >批量审核</el-button>
        <el-button
          class="fr"
          type="text"
          @click="dataDeclaration"
        >财务数据说明</el-button>
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
      @selection-change="handleSelectionChange"
      ref="table"
      max-height="531"
    >

      <el-table-column
        type="selection"
        width="40"
      >
      </el-table-column>

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
        width="180px"
        align="center"
        label="商家名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.sellUserName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="80px"
        align="center"
        label="商家类型"
      >
        <template slot-scope="{ row }">
          <span>{{registTypeMap[row.registType]}}</span>
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

      <el-table-column
        fixed="right"
        align="left"
        width="100px"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <!-- v-if="row.auditState == 0 || row.auditState == 2" -->
          <el-button
            size="small"
            type="text"
            @click="auditOne(row.id)"
          >审核操作</el-button>
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

    <el-dialog
      title="审核操作"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
    >
      <el-radio-group v-model="auditForm.state">
        <el-radio :label="1">审核通过</el-radio>
        <el-radio :label="2">审核不通过</el-radio>
      </el-radio-group>
      <p v-if="auditForm.state === 1">初审通过后，需要下一位同事进行复审</p>
      <el-input
        type="textarea"
        v-if="auditForm.state === 2"
        v-model="auditForm.auditLog"
        placeholder="请输入不通过原因，60字以内"
        maxlength="60"
      ></el-input>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="auditLoading"
          @click="update"
        >确 定</el-button>
      </div>
    </el-dialog>

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
      list: [],
      fixedList: null,
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        orderNumber: undefined,
        sellUserName: undefined,
        registType: undefined,
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
        auditState: 0
      },
      registTypeMap: {
        1: '个人',
        2: '企业'
      },
      registTypeList: [
        { value: 1, label: '个人' },
        { value: 2, label: '企业' }
      ],
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
      tableKey: 0,
      endValue: '',
      payValue: '',

      dialogFormVisible: false,
      multipleSelection: [],
      auditLoading: false,
      auditForm: {
        id: undefined,
        state: 1,
        auditLog: undefined
      },
      rules: {
        orderNumber: [
          {
            pattern: /^[0-9]*$/,
            message: '订单编号需为纯数字',
            trigger: 'blur'
          }
        ]
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
        sellUserName: '商家名称',
        registType: '商家类型',
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
        sellUserName: this.listQuery.sellUserName,
        registType: this.listQuery.registType,
        expressCompany: this.listQuery.expressCompany,
        payMoneyLow: this.listQuery.payMoneyLow,
        payMoneyHigh: this.listQuery.payMoneyHigh,
        merchantReceiveLow: this.listQuery.merchantReceiveLow,
        merchantReceiveHigh: this.listQuery.merchantReceiveHigh,
        payType: this.listQuery.payType,
        endBTime: this.listQuery.endBTime,
        endETime: this.listQuery.endETime,
        payBTime: this.listQuery.payBTime,
        payETime: this.listQuery.payETime
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    dataDeclaration() {
      this.$alert('<img src="http://219.134.137.178:85/group1/M00/01/36/wKgI5l6oAiGAKYWkAABQi4S7V6U410.png" style="width:100%"/>', {
        dangerouslyUseHTMLString: true,
        customClass: 'dataDecl'
      })
    },
    auditOne($id, $state) {
      this.dialogFormVisible = true
      this.auditForm.id = $id
      // this.auditForm.state = $state
    },
    auditAll() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '您还未选中',
          type: 'warning'
        })
        return false
      }
      this.dialogFormVisible = true
      /* const idArr = []
      const state = $state === 1 ? 2 : 1
      this.multipleSelection.forEach(data => {
        if (data.auditState === state) {
          idArr.push(data.id)
        }
      })
      if (idArr.length === 0) {
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
      }, 20) */
    },
    update() {
      if (this.multipleSelection.length) {
        const idArr = []
        this.multipleSelection.forEach(data => {
          idArr.push(data.id)
        })
        this.auditForm.id = idArr.join(',')
      }
      if (this.auditForm.state === 2 && this.auditForm.auditLog == undefined) {
        this.$message({
          message: '请输入不通过原因',
          type: 'warning'
        })
        return false
      }
      audit(this.auditForm).then(data => {
        this.$refs.table.clearSelection()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '审核成功',
          type: 'success',
          duration: 2000
        })
        this.auditForm = {
          id: undefined,
          state: 1,
          auditLog: undefined
        }
        this.getList()
      }).catch(() => {
        this.$refs.table.clearSelection()
        this.dialogFormVisible = false
        this.auditForm = {
          id: undefined,
          state: 1,
          auditLog: undefined
        }
        this.getList()
      })
    },
    downloadFile() { // 点击导出按钮
      var listData = this.fixedList
      for (let i = 0; i < listData.length; i++) {
        listData[i].payType = this.payTypeMap[listData[i].payType]
        listData[i].registType = this.registTypeMap[listData[i].registType]
      }
      const data = this.excelTitle.concat(listData)
      this.downloadExl(data, '订单初审')
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
/deep/ .el-range-separator {
  padding: 0;
}
</style>

<style>
.dataDecl {
  width: 667px !important;
}
</style>
