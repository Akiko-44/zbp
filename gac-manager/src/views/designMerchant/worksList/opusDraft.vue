
<template>
  <div class="app-container calendar-list-container">
    <div>
      <el-form
        :inline="true"
        :model="listParams"
        ref="makeWorkListParamsForm"
        label-width="101px"
        class="listParamsForm"
      >
        <el-form-item label="作品名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model.trim="listParams.caseName"
          > </el-input>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
      </el-form>
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
        width="100px"
        align="center"
        label="作品ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="作品名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.caseName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="left"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="success"
            @click="$router.push({ name: 'addOpus', query: { id: row.id } })"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(row)"
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
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  opusList,
  delOpus
} from '@/api/designMerchant/works'
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
      listParams: {
        offset: 1,
        limit: 20,
        type: 1,
        caseName: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      opusList(this.listParams, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.$refs['makeWorkListParamsForm'].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
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
      this.$confirm(`确定删除当前草稿？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delOpus(row.id)
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

<style scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.el-button {
  margin-bottom: 5px;
}
</style>
