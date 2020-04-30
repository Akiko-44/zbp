<template>
  <div class="app-container calendar-list-container">
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
        label="选择"
      >
        <template slot-scope="{ row }">
          <el-checkbox
            v-model="row.checked"
            @change="handleCheck(row.id, row.checked)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        width="300px"
        align="center"
        label="主题"
      >
        <template slot-scope="{ row }">
          <span>{{ row.applicationIconName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="图标"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.applicationIcon"
            width="50"
          >
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
  application,
  setShowApplication
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
      checked: 0,
      listParams: {
        offset: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      application(this.listParams).then(data => {
        this.list = data.data.records
        this.list.map(item => {
          this.$set(item, 'checked', item.state === 1)
        })
        this.total = data.data.total
        this.listLoading = false
      })
    },
    handleCheck(id, checked) {
      if (checked) {
        this.$confirm(`确定修改主题选择？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setShowApplication({ id: id }).then(data => {
            this.getList()
          })
        })
      }
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
