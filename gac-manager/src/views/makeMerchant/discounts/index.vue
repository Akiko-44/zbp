
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-button type="primary" v-waves @click="$router.push({ name: 'discountsAdd' })">添加优惠券</el-button>
  </div>
  <div class="filter-container">
    <label class="filter-label">优惠券名称：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listParams.couponsName"> </el-input>
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
  </div>

  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column width="80px" align="center" label="编号">
      <template slot-scope="{ row }">
        <span>{{row.id}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="优惠券名称">
      <template slot-scope="{ row }">
        <span>{{row.couponsName}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="优惠券金额">
      <template slot-scope="{ row }">
        <span>{{row.couponsPrice}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="优惠券条件">
      <template slot-scope="{ row }">
        <span>{{row.couponsScale}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="开始时间">
      <template slot-scope="{ row }">
        <span>{{row.startDate}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="结束时间">
      <template slot-scope="{ row }">
        <span>{{row.endDate}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="发放数量">
      <template slot-scope="{ row }">
        <span>{{row.total}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="领取数量">
      <template slot-scope="{ row }">
        <span>{{row.total-row.poorCount}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="实用数量">
      <template slot-scope="{ row }">
        <span>{{row.useCount}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="剩余数量">
      <template slot-scope="{ row }">
        <span>{{row.poorCount}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="关联商品数">
      <template slot-scope="{ row }">
        <span>{{row.goodsCount}}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button
          type="edit"
          size="small"
          @click="$router.push({ name: 'discountsAdd', query: { id: row.id } })"
        >
        编辑
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
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
  page,
  delObj
} from '@/api/makeMerchant/discounts'
import waves from '@/directive/waves' // 水波纹指令

const getInitQuery = () => {
  return {
    couponsName: undefined
  }
}

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20,
        couponsName: ''
      },
      listQuery: getInitQuery(),
      tableKey: 0,
      id: undefined,
      couponsName: '',
      goodsCount: '',
      couponsScale: '',
      startDate: '',
      endDate: '',
      useCount: undefined,
      poorCount: undefined
    }
  },
  watch: {

  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
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
    handleDelete(row) {
      this.$confirm(`确定删除当前优惠券？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
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

