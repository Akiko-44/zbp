
<template>
  <div class="calendar-list-container">
    <div class="filter-container block-container pt-2">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="customerQueryForm"
        label-width="71px"
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
          class="primary-btn-sm"
          @click="handleFilter"
        >查询</el-button>
      </el-form>
    </div>

    <!-- <div class="summary">
      <span class="summary-title">汇总统计</span>
      <span class="label">累计订单数量：</span>
      <span class="money">{{cumuOrderNum}}</span>
      <span class="label">累计交易金额：</span>
      <span class="money">{{cumuTradeAmount}}</span>
    </div> -->

    <div class="block-container pt-1 pb-2">
      <h4>汇总统计</h4>
      <div class="d-flex">
        <div class="statistics-item">
          <p class="pl-1">{{cumuOrderNum || 0}}</p>
          <p class="statistics-value pl-1">累计订单数量</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">{{cumuTradeAmount || 0}}</p>
          <p class="statistics-value pl-1">累计交易金额</p>
        </div>
      </div>
    </div>

    <div class="block-container table-container pt-3 pb-4">
      <el-table
        :key='tableKey'
        :data="list"
        v-loading.body="listLoading"
        highlight-current-row
        class="custom-table"
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
          width="120px"
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
          width="120px"
          align="center"
          label="手机号码"
        >
          <template slot-scope="{ row }">
            <span>{{row.mobilePhone}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120px"
          align="center"
          label="所在城市"
        >
          <template slot-scope="{ row }">
            <span>{{row.region || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          align="center"
          label="订单数量"
        >
          <template slot-scope="{ row }">
            <span>{{row.orderNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
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
h4 {
  margin-bottom: 20px;
  line-height: 42px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #e5e5e5;
}
.statistics-item {
  margin-right: 20px;
  width: 220px;
  color: #333333;
  font-size: 20px;
  line-height: 50px;
  border: 1px solid #f0f3f9;
  .statistics-value {
    line-height: 34px;
    font-size: 12px;
    background: #efefef;
  }
}
</style>

