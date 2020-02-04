
<template>
<div class="app-container calendar-list-container">
	
  <div class="filter-container">
    <label class="filter-label">商品ID：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.swapmerid"> </el-input>
    &emsp;
    <label class="filter-label">审核状态：</label>
    <el-select v-model="listQuery.ischeck" clearable placeholder="审核状态">
      <el-option
        v-for="item in ischeckData"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
  </div>
  
  <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
  	
    <el-table-column width="100px" align="left" label="商家编号">
      <template slot-scope="{ row }">
        <span>{{row.id}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="客服ID">
      <template slot-scope="{ row }">
        <span>{{row.userId}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="商家名称">
      <template slot-scope="{ row }">
        <span>{{row.userName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="center" label="公司名称">
      <template slot-scope="{ row }">
        <span>{{row.name}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="审核状态">
      <template slot-scope="{ row }">
        <span>{{ischeck[row.ischeck]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="创建时间">
      <template slot-scope="{ row }">
        <span>{{row.createTime}}</span>
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
  page
} from '@/api/public/merchantAuth'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      listQuery:{
      	offset: 1,
      	limit: 20,
      	swapmerid: undefined,
      	ischeck: undefined
      },
      ischeckData:[
      	{value: 0, label:'审核中'},
      	{value: 1, label:'审核不通过'},
      	{value: 2, label:'未认证'},
      	{value: 3, label:'已认证'}
      ],
      total: null,
      ischeck:{
      	0: '审核中',
      	1: '审核不通过',
      	2: '未认证',
      	3: '已认证'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
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

<style scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
</style>
