<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="listParams"
               ref="guidanceQueryForm"
               label-width="100px"
               class="guidanceQueryForm">
        <el-form-item label="名称:">
          <el-input @keyup.enter.native="handleFilter"
                    style="width: 195px;"
                    v-model="listParams.name"> </el-input>
        </el-form-item>
        <el-button type="primary"
                   v-waves
                   icon="el-icon-search"
                   @click="handleFilter">查找</el-button>
        <!-- <el-button type="text"
                   @click="resetQuery">清空条件</el-button> -->
        <el-button type="primary"
                   v-waves
                   @click="$router.push({ name:'guidanceModify'})">添加</el-button>
      </el-form>
    </div>

    <el-table :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column type="index"
                       align="center"
                       width="50"
                       label="序号">
      </el-table-column>
      <el-table-column width="100px"
                       align="center"
                       label="名称">
        <template slot-scope="{ row }">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="价格">
        <template slot-scope="{ row }">
          <span>{{row.price + row.priceUnit}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="添加时间">
        <template slot-scope="{ row }">
          <span>{{row.addTime}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       align="left"
                       label="操作">
        <template slot-scope="{ row, $index }">
          <el-button class="auditBtn"
                     size="small"
                     type="primary"
                     @click="$router.push({ name:'guidanceModify',query:{sortNum:row.sortNum}})">修改</el-button>
          <el-button class="auditBtn"
                     size="small"
                     type="warning"
                     @click="delGuidance(row.sortNum, $index)">删除</el-button>
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
                     :total="total"> </el-pagination>
    </div>

    <!-- <audit-dialog ref="auditDialog"
                  :goodsSource="goodsSource"
                  @success="auditSuccess" /> -->
  </div>
</template>

<script>
import { searchGuidedPriceList, deleteGuidedPrice } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        name: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      searchGuidedPriceList(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    delGuidance(sortNum, index) {
      this.$confirm('确认删除该指导价？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteGuidedPrice(sortNum).then(data => {
          this.list.splice(index, 1)
        }).catch(() => { })
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
      // this.$router.replace({ name: this.routerName, query: { page: val }})
    },
    resetQuery() {
      this.listParams.name = ''
      // this.$refs['workListQueryForm'].resetFields()
      // this.$router.replace({ name: this.routerName })
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
.auditBtn {
  margin-left: 0;
}
</style>
