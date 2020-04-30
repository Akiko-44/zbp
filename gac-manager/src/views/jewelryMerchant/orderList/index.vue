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
          >
          </el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            :maxlength="30"
            style="width: 195px;"
            v-model.trim="listQuery.goodsName"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-select
            v-model="listQuery.status"
            @change="handleFilter"
            clearable
            placeholder="订单状态"
            style="width: 120px;"
          >
            <el-option
              v-for="item in orderStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否使用优惠:">
          <el-select
            v-model="listQuery.isCoupons"
            @change="handleFilter"
            placeholder="是否使用优惠"
            style="width: 150px;"
          >
            <el-option
              v-for="item in couponsMap"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="filter-container">
        <el-form-item label="下单时间:">
          <el-date-picker
            v-model="payDateValue"
            @change="handleFilter"
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
          type="text"
          @click="resetQuery"
        >清空条件</el-button>
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
          <span>{{ errorMsg }}</span>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="errorDialog = false"
            >确认</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>

    <el-table
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        width="180"
        align="center"
        label="订单编号"
        prop="orderNumber"
      >
      </el-table-column>

      <el-table-column
        width="110"
        align="center"
        label="订单状态"
      >
        <template slot-scope="{ row }">
          <span v-if="row.state === 6 && row.isCommented === 2">已评价</span>
          <span v-else>{{ orderState[row.state] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="130"
        align="center"
        label="购买人手机号码"
        prop="buyUserName"
      >
      </el-table-column>

      <el-table-column
        width="110"
        align="center"
        label="收件人"
        prop="userAddress.consignee"
      >
      </el-table-column>

      <el-table-column
        width="110"
        align="center"
        label="收件人手机号"
        prop="userAddress.phone"
      >
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        label="收货地址"
        prop="userAddress.shippingAddress"
      >
      </el-table-column>

      <el-table-column
        align="center"
        label="商品名称"
        width="200"
      >
        <template slot-scope="{ row }">
          <span
            v-for="(item, index) in row.orderGoodVOList"
            :key="index"
          >
            <span v-if="index > 0">，</span>
            {{ item.skuName }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        width="100"
        align="center"
        label="订单金额"
        prop="payMoney"
      >
      </el-table-column>

      <el-table-column
        width="180"
        align="center"
        label="下单时间"
        prop="createTime"
      >
      </el-table-column>

      <el-table-column
        width="180"
        align="center"
        label="支付时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.payTime || "-" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="left"
        label="操作"
        width="300"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            @click="
              $router.push({
                name: 'orderDetail',
                query: { id: row.orderNumber }
              })
            "
          >
            订单详情
          </el-button>
          <el-button
            type="success"
            size="small"
            @click="confirmOrder(row.orderNumber)"
            v-if="row.state === 2 || row.state === 24"
          >
            确认订单
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="cancelOrder(row.orderNumber)"
            v-if="row.state === 2 || row.state === 24"
          >
            取消订单
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="deliver(row)"
            v-if="row.state === 4"
          >
            发货
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="expressLook(row.id)"
            v-if="row.state === 5"
          >
            查看物流
          </el-button>
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
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <deliver-dialog
      ref="deliverDialog"
      :orderGoodVOList="orderGoodVOList"
      @success="getList"
    />

    <el-dialog
      title="物流详情"
      :visible.sync="dialogExpressVisible"
    >
      <div>物流公司：{{ orderExpressData.com }}</div>
      <div>物流单号：{{ orderExpressData.nu }}</div>
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
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物流信息">
          <template slot-scope="{ row }">
            <span>{{ row.context }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  getJewelryOrder,
  confirmOrder,
  cancelOrder,
  lookExpress,
  expressMap
} from '@/api/common/order'

import waves from '@/directive/waves' // 水波纹指令
import { payType } from '@/utils/mixins/order'
import deliverDialog from './deliverDialog'

const getInitQuery = () => {
  return {
    offset: 1,
    limit: 20,
    orderNumber: undefined,
    goodsName: undefined,
    status: undefined,
    isCoupons: undefined
  }
}

export default {
  directives: {
    waves
  },
  components: {
    deliverDialog
  },
  data() {
    return {
      list: null,
      exportList: [],
      total: null,
      listLoading: true,
      listQuery: getInitQuery(),
      tableKey: 0,
      payDateValue: '',
      couponsMap: [
        { value: undefined, label: '全部' },
        { value: '0', label: '已使用' },
        { value: '1', label: '未使用' }
      ],
      orderGoodVOList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      orderState: {
        '1': '待付款',
        '2': '待确认',
        '4': '待发货',
        '5': '待收货',
        '6': '待评价',
        '7': '已完成',
        '8': '已取消',
        '10': '退款待审核',
        '11': '退款成功',
        '12': '退款失败',
        '13': '退货待审核',
        '14': '退货成功',
        '17': '用户取消订单',
        '18': '退货失败',
        '19': '买家待发货',
        '20': '买家已发货',
        '21': '退款仲裁中',
        '22': '退货仲裁中',
        '23': '拼团中',
        '24': '拼团成功',
        '100': '待付款'
      },
      payType,
      dialogExpressVisible: false,
      orderExpressData: {},
      rules: {
        orderNumber: [
          {
            pattern: /^[0-9]*$/,
            message: '订单编号需为纯数字',
            trigger: 'blur'
          }
        ]
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [
        {
          orderNumber: '订单编号',
          state: '订单状态',
          buyUserName: '购买人手机号码',
          consignee: '收件人',
          phone: '收件人手机号',
          shippingAddress: '收货地址',
          goodsNameList: '商品名称',
          payMoney: '订单金额',
          createTime: '下单时间',
          payTime: '支付时间'
        }
      ]
    }
  },
  computed: {
    orderStatus() {
      const orderStatus = Object.keys(this.orderState).map(key => {
        // return { value: key, label: +key === 3 ? '设计中' : this.orderState[key] }
        return { value: key, label: this.orderState[key] }
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
    $route: 'fetchData',
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
      this.listQuery.offset = +this.$route.query.page || 1
      this.listQuery.limit = +this.$route.query.limit || 20
      this.listQuery.orderNumber = this.$route.query.orderNumber || undefined
      this.listQuery.goodsName = this.$route.query.goodsName || undefined
      this.listQuery.status = this.$route.query.status || undefined
      this.listQuery.isCoupons = this.$route.query.isCoupons || undefined
      this.payDateValue = this.$route.query.payDateValue || undefined
      this.getList()
    },
    getList() {
      this.listLoading = true
      getJewelryOrder(this.listQuery).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    getExportList() {
      getJewelryOrder({
        offset: 1,
        limit: 9999,
        orderNumber: this.listQuery.orderNumber,
        goodsName: this.listQuery.goodsName,
        status: this.listQuery.status,
        payStartTime: this.listQuery.payStartTime,
        payEndTime: this.listQuery.payEndTime
      }).then(data => {
        this.exportList = data.data.records
        let goodsNameList = []
        this.exportList.map(item => {
          goodsNameList = []
          item.consignee = item.userAddress.consignee
          item.phone = item.userAddress.phone
          item.shippingAddress = item.userAddress.shippingAddress

          item.orderGoodVOList.map(goodsItem => {
            goodsNameList.push(goodsItem.skuName)
          })
          item.goodsNameList = goodsNameList.join(' ')
        })

        this.downloadFile()
      })
    },
    handleFilter() {
      this.$refs['designListQueryForm'].validate(valid => {
        if (valid) {
          // this.getList()
          this.replaceRouter()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.replaceRouter()
      // this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.replaceRouter()
      //    this.getList()
    },
    replaceRouter() {
      this.$router.replace({
        name: 'orderList',
        query: {
          page: this.listQuery.offset,
          limit: this.listQuery.limit,
          orderNumber: this.listQuery.orderNumber,
          goodsName: this.listQuery.goodsName,
          status: this.listQuery.status,
          isCoupons: this.listQuery.isCoupons,
          payDateValue: this.payDateValue
        }
      })
    },
    resetQuery() {
      this.listQuery = getInitQuery()
      this.payDateValue = ''
      this.$refs['designListQueryForm'].resetFields()
      this.$router.replace({ name: 'orderList' })
      this.getList()
    },
    cancelOrder(orderNo) {
      this.$prompt('请输入取消原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        value = encodeURI(value)
        cancelOrder(orderNo, value).then(_ => {
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
      this.$confirm('确认该订单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        confirmOrder(orderNo).then(_ => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '已确认订单',
            type: 'success'
          })
        })
      })
    },
    deliver(row) {
      const dialog = this.$refs.deliverDialog
      dialog.dialogFormVisible = true
      dialog.orderNumber = row.orderNumber
      dialog.form.orderId = row.id
      this.orderGoodVOList = row.orderGoodVOList
    },
    expressLook(orderId) {
      lookExpress(orderId).then(data => {
        const res = JSON.parse(data.data)
        if (res.message == 'ok') {
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
    downloadFile() {
      // 点击导出按钮
      const listData = this.exportList
      const downloadData = this.excelTitle.concat(listData)
      this.downloadExl(downloadData, '订单列表')
    },
    downloadExl(json, downName, type) {
      // 导出到excel
      const keyMap = [] // 获取键
      for (const k in json[0]) {
        keyMap.push(k)
      }
      const tmpdata = [] // 用来保存转换好的json
      json
        .map((v, i) =>
          keyMap.map((k, j) =>
            Object.assign(
              {},
              {
                v: v[k],
                position:
                  (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) +
                  (i + 1)
              }
            )
          )
        )
        .reduce((prev, next) => prev.concat(next))
        .forEach(function(v) {
          tmpdata[v.position] = {
            v: v.v
          }
        })
      const outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
      const tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
          mySheet: Object.assign(
            {},
            tmpdata, // 内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
            }
          )
        }
      }
      const tmpDown = new Blob(
        [
          this.s2ab(
            XLSX.write(
              tmpWB,
              {
                bookType: type === undefined ? 'xlsx' : type,
                bookSST: false,
                type: 'binary'
              } // 这里的数据是用来定义导出的格式类型
            )
          )
        ],
        {
          type: ''
        }
      ) // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown) // 创建对象超链接
      this.outFile.download = downName + '.xlsx' // 下载名称
      this.outFile.href = href // 绑定a标签
      this.outFile.click() // 模拟点击实现下载
      setTimeout(function() {
        // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    s2ab(s) {
      // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff
      }
      return buf
    },
    getCharCol(n) {
      // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = (n % 26) + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    fixdata(data) {
      // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        )
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
/deep/ .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/ .el-dialog__body {
  padding-top: 0;
}
</style>
