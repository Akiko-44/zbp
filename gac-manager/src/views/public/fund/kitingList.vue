
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <label class="filter-label">账单 ID：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.billId"> </el-input>
    &nbsp;
    <label class="filter-label">商户名：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.merchantName"> </el-input>
    &nbsp;
    <!--<label class="filter-label">用户名：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.userName"> </el-input>-->
  </div>

  <div class="filter-container">
    <label class="filter-label">支付时间：</label>
    <el-date-picker
      v-model="dateValue"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
    >
    </el-date-picker>
    &nbsp;
    <!--<label class="filter-label">支付状态：</label>
    <el-select v-model="listQuery.payStatus" clearable placeholder="状态">
      <el-option
        v-for="(item, index) in payStatus"
        :key="index"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>-->
  </div>

  <div class="filter-container">
    <el-button type="primary" icon="el-icon-search" v-waves @click="handleFilter">查询</el-button>
    <el-button type="text" @click="resetQuery">清空条件</el-button>
  </div>

  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column align="center" label="账单ID">
      <template slot-scope="{ row }">
        <span>{{row.billId}}</span>
      </template>
    </el-table-column>

    <el-table-column width="120px" align="center" label="商户名">
      <template slot-scope="{ row }">
        <span>{{row.merchantName || row.userName}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="银行">
      <template slot-scope="{ row }">
        <span>{{row.bank}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="银行账户">
      <template slot-scope="{ row }">
        <span>{{row.bankAccountName}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="银行帐号">
      <template slot-scope="{ row }">
        <span>{{row.bankAccountNumber}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="金额">
      <template slot-scope="{ row }">
        <span>{{row.amount}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="手续费">
      <template slot-scope="{ row }">
        <span>{{row.serviceFee}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="支付时间">
      <template slot-scope="{ row }">
        <span>{{row.payTime || '-'}}</span>
      </template>
    </el-table-column>

    <!--<el-table-column align="center" label="支付状态">
      <template slot-scope="{ row }">
        <span>{{payState[row.payStatus]}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="审核状态">
      <template slot-scope="{ row }">
        <span>{{auditState[row.review]}}</span>
      </template>
    </el-table-column>-->

    <el-table-column align="center" label="账户类型">
      <template slot-scope="{ row }">
        <span>{{accountType[row.accountType]}}</span>
      </template>
    </el-table-column>
    
    <!--<el-table-column width="300px" fixed="right" align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button v-if="row.review == 1" size="small" type="success" @click="handleAudit(row, 2)">审核通过</el-button>
        <el-button v-if="row.review !== 3" size="small" type="warning" @click="handleAudit(row, 3)">审核拒绝</el-button>
        <el-button v-if="row.review !== 2" size="small" type="primary" @click="handleAudit(row, 4)">延后处理</el-button>
      </template>
    </el-table-column>-->

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</div>
</template>

<script>
import {
  payCashList,
  payCashReview
} from '@/api/common/fund'
import waves from '@/directive/waves' // 水波纹指令

const getInitQuery = () => {
  return {
    createTime: undefined,
    payTime: undefined,
    billId: undefined,
    merchantName: undefined,
    userName: undefined,
    payStatus: undefined
  }
}

export default {
  directives: {
    waves
  },
  data() {
    return {
      auditState: {
        1: '待审核', 2: '审核通过', 3: '审核不通过', 4: '延后处理'
      },
      payState: {
        1: '待支付',
        2: '支付中',
        3: '支付成功',
        4: '支付失败',
        5: '支付撤销'
      },
      payStatus: [
        { value: '1', label: '待支付' },
        { value: '2', label: '支付中' },
        { value: '3', label: '支付成功' },
        { value: '4', label: '支付失败' }
      ],
      accountType: {
        1: '个人',
        2: '商户'
      },
      list: [],
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: getInitQuery(),
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
      }
    }
  },
  watch: {
    dateValue(value) {
      this.listQuery.createTime = value ? value[0] : undefined
      this.listQuery.payTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      payCashList(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        }).catch(() => {
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
    resetQuery() {
      this.listQuery = getInitQuery()
      this.dateValue = ''
    },
    handleAudit(row, state) {
      this.$confirm(`确定执行当前操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          payCashReview({ id: row.id, cashReview: state })
            .then(() => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              row.review = state
            })
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
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

