<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="listParams"
               ref="honestListQueryForm"
               label-width="100px"
               class="listQueryForm">
        <el-form-item label="属性名称:">
          <el-input @keyup.enter.native="handleFilter"
                    placeholder="请输入属性名称"
                    style="width: 195px;"
                    v-model="listParams.specsName"> </el-input>
        </el-form-item>
        <el-button type="primary"
                   v-waves
                   icon="el-icon-search"
                   @click="handleFilter">查找</el-button>
        <!-- <el-button type="text"
                   @click="resetQuery">清空条件</el-button> -->
        <el-button type="primary"
                   v-waves
                   @click="$router.push({ name:'skuModify'})">添加</el-button>
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
      <el-table-column width="200px"
                       align="center"
                       label="属性名称">
        <template slot-scope="{ row }">
          <span>{{row.specsName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px"
                       class-name="attribute-num"
                       align="center"
                       label="属性值">
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'attributeList', query: {id: row.id}})">{{row.specsAttrsCount}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       align="left"
                       label="操作">
        <template slot-scope="{ row, $index }">
          <el-button class="auditBtn"
                     size="small"
                     type="primary"
                     @click="$router.push({ name: 'skuModify', query: {data: JSON.stringify(row)}})">修改</el-button>
          <el-button class="auditBtn"
                     size="small"
                     type="warning"
                     @click="delSku(row.id, $index)">删除</el-button>
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
  </div>
</template>

<script>
import { delSkuAttr, skuPage } from '@/api/public/system'
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
        specsName: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      skuPage(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    delSku(id, index) {
      this.$confirm('是否删除该属性及其属性值？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delSkuAttr(id).then(data => {
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
    },
    resetQuery() {
      this.listParams.limit = 20
      this.listParams.offset = 1
      this.listParams.specsName = ''
      this.getList()
    }
  }
}
</script>

<style scoped lang="postcss">
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.auditBtn {
  margin-left: 0;
}
/deep/ td.attribute-num {
  color: #409eff;
  cursor: pointer;
}
</style>
