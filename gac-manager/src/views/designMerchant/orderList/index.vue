
<template>
  <div class="app-container calendar-list-container">
    <el-form :inline="true"
             :model="listQuery"
             :rules="rules"
             ref="designListQueryForm"
             label-width="101px"
             class="listQueryForm">
      <div class="filter-container">
        <el-form-item label="订单编号:"
                      prop="orderNumber">
          <el-input @keyup.enter.native="handleFilter"
                    :maxlength="20"
                    style="width: 195px;"
                    v-model.trim="listQuery.orderNumber"> </el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input @keyup.enter.native="handleFilter"
                    :maxlength="30"
                    style="width: 195px;"
                    v-model.trim="listQuery.caseName"> </el-input>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-select v-model="listQuery.status"
                     @change="handleFilter"
                     clearable
                     placeholder="订单状态"
                     style="width: 120px;">
            <el-option v-for="item in orderStatus"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否使用优惠:">
          <el-select v-model="listQuery.isCoupons"
                     @change="handleFilter"
                     placeholder="是否使用优惠"
                     style="width: 150px;">
            <el-option v-for="item in couponsMap"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="filter-container">
        <el-form-item label="下单时间:">
          <el-date-picker v-model="payDateValue"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetimerange"
                          :picker-options="pickerOptions"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单类型:">
          <el-select v-model="listQuery.caseType"
                     @change="handleFilter"
                     placeholder="订单类型"
                     style="width: 120px;">
            <el-option v-for="item in caseType"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary"
                   v-waves
                   icon="el-icon-search"
                   @click="handleFilter">查询</el-button>
        <el-button type="text"
                   @click="resetQuery">清空条件</el-button>
      </div>
    </el-form>

    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">

      <el-table-column width="180px"
                       align="center"
                       label="订单编号">
        <template slot-scope="{ row }">
          <span>{{row.orderNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="商品名称">
        <template slot-scope="{ row }">
          <span v-for="(item,index) in row.orderGoodVOList"
                :key="index">
            <span v-if="index > 0">，</span>
            {{item.skuName}}
          </span>
        </template>
      </el-table-column>

      <el-table-column width="110px"
                       align="center"
                       label="订单状态">
        <template slot-scope="{ row }">
          <span>{{orderState[row.state]}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px"
                       align="center"
                       label="收件人">
        <template slot-scope="{ row }">
          <span>{{row.consigneeName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px"
                       align="center"
                       label="下单时间">
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px"
                       align="center"
                       label="订单类型">
        <template slot-scope="{ row }">
          <span>{{caseTypeMap[row.caseType]}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px"
                       align="center"
                       label="优惠金额">
        <template slot-scope="{ row }">
          <span>￥{{row.couponsPrice}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right"
                       align="left"
                       label="操作">
        <template slot-scope="{ row, $index }">
          <el-button type="primary"
                     size="small"
                     @click="$router.push({ name: 'orderDetail', query: { id: row.orderNumber } })">
            订单详情
          </el-button>
          <el-button type="success"
                     size="small"
                     @click="confirmOrder(row.orderNumber)"
                     v-if="row.state === 2">
            确认订单
          </el-button>
          <el-button type="danger"
                     size="small"
                     @click="cancelOrder(row.orderNumber)"
                     v-if="row.state === 2">
            取消订单
          </el-button>
          <el-button type="primary"
                     size="small"
                     @click="deliver(row.orderNumber,row.id)"
                     v-if="row.state === 4">
            发货
          </el-button>
          <el-button type="primary"
                     size="small"
                     @click="expressLook(row.id)"
                     v-if="row.state === 5">
            查看物流
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listParams.offset"
                     :page-sizes="[10,20,30,50]"
                     :page-size="listParams.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <deliver-dialog ref="deliverDialog"
                    @success="getList" />

    <el-dialog title="物流详情"
               :visible.sync="dialogExpressVisible">
      <p>物流公司：{{orderExpressData.com}}</p>
      <p>物流单号：{{orderExpressData.nu}}</p>
      <el-table :data="orderExpressData.data"
                border>
        <el-table-column align="center"
                         label="时间"
                         width="200px">
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
  </div>
</template>

<script>
import {
  page, confirmOrder, cancelOrder, lookExpress, expressMap
} from '@/api/common/order'
import waves from '@/directive/waves' // 水波纹指令
import { orderState, payType } from '@/utils/mixins/order'
import deliverDialog from './deliverDialog'

const getInitQuery = () => {
  return {
    orderNumber: undefined,
    caseName: undefined,
    status: undefined,
    orderType: 5,
    consignee: undefined,
    caseType: undefined,
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
      }
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
      //    this.listParams.offset = val
      //    this.getList()
      this.$router.replace({ name: 'orderList', query: { page: val }})
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
      confirmOrder(orderNo)
        .then(_ => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '已确认订单',
            type: 'success'
          })
        })
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

