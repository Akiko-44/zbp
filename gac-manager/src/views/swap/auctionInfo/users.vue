
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入报名人" v-model.trim="listQuery.userName"> </el-input>
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border>
    
    <el-table-column width="180px" align="center" label="创建时间">
      <template slot-scope="{ row }">
        <span>{{row.createTime}}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="交费时间">
      <template slot-scope="{ row }">
        <span>{{row.payFeeTime}}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="退费时间">
      <template slot-scope="{ row }">
        <span>{{row.returnFeeTime || '-'}}</span>
      </template>
    </el-table-column>

    <el-table-column width="200px" align="center" label="报名人">
      <template slot-scope="{ row }">
        <span>{{row.userName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="保证金">
      <template slot-scope="{ row }">
        <span>¥ {{row.deposit}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="是否成交">
      <template slot-scope="{ row }">
        <span>{{row.result == 1 ? '是' : '否'}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="是否退款">
      <template slot-scope="{ row }">
        <span>{{row.result == 3 ? '是' : '否'}}</span>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>

</div>
</template>

<script>
import {
  getUsers
} from '@/api/swap/auctionInfo'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        id: this.$route.query.id,
        userName: undefined
      },
      tableKey: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getUsers(this.listQuery)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      if (!this.listQuery.userName) {
        this.listQuery.userName = undefined
      }
      this.getList()
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
