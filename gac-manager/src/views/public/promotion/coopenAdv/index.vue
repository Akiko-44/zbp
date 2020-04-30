<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button
        type="primary"
        v-waves
        @click="$router.push({name: 'coopenAdvModify'})"
      >添加</el-button>
    </div>

    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        align="center"
        label="序号"
      ></el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="主题"
      >
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="链接类型"
      >
        <template slot-scope="{ row }">
          <span>{{ linkTypeMap[row.linkType] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="有效期"
      >
        <template slot-scope="{ row }">
          <span>{{ row.showStartDate }} ~ {{ row.showEndDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row}">
          <el-button
            class="auditBtn"
            size="small"
            @click="$router.push({name: 'coopenAdvModify', query: {id: row.id,type: 'detail'}})"
          >详情</el-button>
          <el-button
            class="auditBtn"
            size="small"
            @click="$router.push({name: 'coopenAdvModify', query: {id: row.id}})"
          >编辑</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="delOpeningPage(row)"
          >删除</el-button>
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
        :current-page.sync="listParams.offset"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  openingPage,
  deleteOpeningPage
} from '@/api/public/system'
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
      },
      linkTypeMap: {
        1: '商品',
        2: '店铺',
        3: '内容',
        4: '自媒体主页',
        5: '外部链接'
      },
      index: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      openingPage(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    delOpeningPage(row) {
      const tip =
        (new Date().getTime() > new Date(row.showStartDate).getTime()) && (new Date().getTime() < new Date(row.showEndDate).getTime()) ? '当前开屏页处于有效期内，确定要删除吗？' : '确定要删除当前开屏页吗？'
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteOpeningPage(row.id)
          .then(data => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
          .catch(() => { })
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
