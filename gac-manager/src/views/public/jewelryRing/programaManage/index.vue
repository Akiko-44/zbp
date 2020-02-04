<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="programaListQueryForm"
        label-width="100px"
        class="programaListQueryForm"
      >
        <el-form-item label="栏目名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.columnName"
          > </el-input>
        </el-form-item>
        <el-form-item label="添加时间:">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
        <el-button
          type="text"
          @click="resetQuery"
        >清空条件</el-button>
        <el-button
          class="fr"
          type="primary"
          v-waves
          @click="handlerAdd()"
        >添加栏目</el-button>
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
        width="50"
        align="center"
        label="排序"
      >
        <template slot-scope="{ row }">
          <span>{{row.sortOrder}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="栏目名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.columnName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="添加时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="handleUpdate(row)"
          >编辑</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="handlerDelete(row.id, $index)"
            v-if="row.id != 1000"
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
    <add
      :flag="flag"
      ref="dialog"
      @success="success"
    />
  </div>
</template>

<script>
import Add from './add'
import { jewelryColumnList, delJewelryColumn } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  props: {
    flag: Number
  },
  components: {
    Add
  },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        columnName: '',
        startTime: '',
        endTime: ''
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
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''
      jewelryColumnList(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    handlerDelete(id, index) {
      this.$confirm('确认删除该栏目？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delJewelryColumn(id).then(data => {
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
      this.listParams.columnName = undefined
      this.createTime = ''
      this.$router.replace({ name: this.routerName })
      this.getList()
    },
    handlerAdd(row, index) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form.parentId = row && row.id ? row.id : undefined
      })
      this.index = index
    },
    handleUpdate(data) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form = {
          id: data.id,
          columnName: data.columnName,
          sortOrder: data.sortOrder,
          flag: this.flag
        }
      })
    },
    success(form) {
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
