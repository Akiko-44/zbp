
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="customerQueryForm"
        label-width="120px"
        class="listQueryForm"
      >
        <el-form-item
          label="用户手机号码:"
          prop="mobilePhone"
        >
          <el-input
            class="search-input"
            clearable
            placeholder="请输入用户手机号码"
            :maxlength="11"
            @keyup.enter.native="handleFilter"
            v-model="listQuery.mobilePhone"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="推荐人手机号码:"
          prop="mobilePhone"
        >
          <el-input
            class="search-input"
            clearable
            placeholder="请输入推荐人手机号码"
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
        label="出生年月"
      >
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="是否已婚"
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
        label="职业"
      >
        <template slot-scope="{ row }">
          <span>{{row.region || '--'}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="爱好"
      >
        <template slot-scope="{ row }">
          <span>{{row.region || '--'}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="是否交易"
      >
        <template slot-scope="{ row }">
          <span>{{row.tradeState ? '是' : '否'}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="注册时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
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
    <div class="text-center">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </div>
  </div>
</template>

<script>
import { recommendUserFromMember } from '@/api/public/merchant'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      cumuOrderNum: '',
      cumuTradeAmount: '',
      id: this.$route.query.id,
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
      recommendUserFromMember(this.id, this.listQuery).then(data => {
        this.list = data.data.records
        this.total = data.data.total
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

