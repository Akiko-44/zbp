
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <label class="filter-label">名称：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.search"> </el-input>
    <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
  </div>

  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column width="80px" align="center" label="名称">
      <template slot-scope="{ row }">
        <span>{{row.name}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="发布人">
      <template slot-scope="{ row }">
        <span>{{row.userName}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="期望价格区间">
      <template slot-scope="{ row }">
        <span>{{row.lowPrice}}-{{row.highPrice}}</span>
      </template>
    </el-table-column>

    <el-table-column width="170px" align="center" label="参考图片">
      <template slot-scope="{ row }">
        <el-card style="width:150px;" :body-style="{ padding: '0px' }">
		        <img :src="row.customsPic[0].picUrl | setImg" class="image" width="100%">
		    </el-card>
      </template>
    </el-table-column>

    <el-table-column width="150px" align="center" label="需求描述">
      <template slot-scope="{ row }">
        <span>{{row.customsDesc}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="发布时间">
      <template slot-scope="{ row }">
        <span>{{row.createTime}}</span>
      </template>
    </el-table-column>
    
    <el-table-column fixed="right" align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button
        	type="primary"
          size="small"
          @click="$router.push({ name: 'madeDetail', query: { madeDetail: JSON.stringify(row) } })"
        >
        详情
        </el-button>
        <el-button
          type="edit"
          size="small"
          @click="touch"
        >
        联系发布人
        </el-button>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</div>
</template>

<script>
import {
  page
} from '@/api/makeMerchant/made'
import { setImg } from '@/filters'

const getInitQuery = () => {
  return {
    search: undefined
  }
}

export default {
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
      tableKey: 0
    }
  },
  watch: {

  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true;
      page(this.listQuery, this.listParams, 3)
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
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    touch(){
    	
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
.image {
  display: block;
  max-width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

