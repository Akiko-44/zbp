
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="customerQueryForm"
        label-width="101px"
        class="listQueryForm"
      >
        <el-form-item
          label="手机号码:"
          prop="mobilePhone"
        >
          <el-input
            class="search-input"
            clearable
            placeholder="请输入手机号码"
            :maxlength="11"
            @keyup.enter.native="handleFilter"
            v-model="listQuery.mobilePhone"
          > </el-input>
        </el-form-item>
        <el-form-item label="注册时间:">
          <el-date-picker
            v-model="listQuery.createTime"
            value-format="yyyy-MM-dd"
            type="date"
            clearable
            placeholder="请选择注册时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
      </el-form>
    </div>

    <div class="summary">
      <span class="summary-title">汇总统计</span>
      <span class="label">累计订单数量：</span>
      <span class="money">{{cumuOrderNum}}</span>
      <span class="label">累计交易金额：</span>
      <span class="money">{{cumuTradeAmount}}</span>
    </div>

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
        label="昵称"
      >
        <template slot-scope="{ row }">
          <span>{{row.nickname}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="头像"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.userLogo"
            width="100"
          >
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="手机号码"
      >
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="所在城市"
      >
        <template slot-scope="{ row }">
          <span>{{row.region || '--'}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="订单数量"
      >
        <template slot-scope="{ row }">
          <span>{{row.orderNum}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="交易金额"
      >
        <template slot-scope="{ row }">
          <span>{{row.tradeAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="最后交易时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.recentTradeTime}}</span>
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
import {
  getPurchasedCustomer
} from '@/api/designMerchant/customer'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      cumuOrderNum: '',
      cumuTradeAmount: '',
      listQuery: {
        offset: 1,
        limit: 20,
        mobilePhone: undefined,
        createTime: undefined
      },
      tableKey: 0,
      rules: {
        mobilePhone: [
          { pattern: /^[0-9]{11}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.mobilePhone = this.listQuery.mobilePhone || undefined
      getPurchasedCustomer(this.listQuery).then(data => {
        if (!this.listQuery.mobilePhone && !this.listQuery.createTime) {
          this.cumuOrderNum = data.data.cumuOrderNum
          this.cumuTradeAmount = data.data.cumuTradeAmount
        }
        this.list = data.data.buyUserPage.records
        this.total = data.data.buyUserPage.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs['customerQueryForm'].validate((valid) => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.summary {
  position: relative;
  margin-bottom: 20px;
  padding: 30px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  & .summary-title {
    position: absolute;
    top: -7px;
    left: 20px;
    width: 70px;
    font-size: 14px;
    text-align: center;
    background: #fff;
  }
  & .money {
    margin-right: 60px;
    color: red;
  }
}
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
.el-date-editor /deep/ .el-range-separator {
  padding: 0;
}
</style>

