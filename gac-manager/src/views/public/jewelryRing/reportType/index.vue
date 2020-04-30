<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        label-width="100px"
      >
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            placeholder="请输入类型名称"
            v-model="listParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="listParams.type"
            placeholder="请选择分类"
            clearable
          >
            <el-option
              v-for="(item, index) in typeMap"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >搜索</el-button>
        <el-button
          class="fr"
          type="primary"
          v-waves
          @click="handlerAdd"
        >添加</el-button>
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
        type="index"
        width="50"
        align="center"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="类型名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="所属"
      >
        <template slot-scope="{ row }">
          <span>{{typeMap[row.type]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="添加时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="200px"
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
            @click="delContent(row.id, $index)"
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
      ref="dialog"
      @success="success"
    />
  </div>
</template>

<script>
import Add from './add'
import { reportTypeList, delReportType } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令
export default {
  components: {
    Add
  },
  directives: {
    waves
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
        name: undefined,
        type: undefined
      },
      typeMap: {
        1: '举报',
        2: '申诉',
        3: '举报&申诉'
      }
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

      reportTypeList(this.listParams, 0).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    delContent(id, index) {
      this.$confirm('确认删除该类型？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delReportType(id).then(data => {
          this.getList()
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
    handlerAdd(row, index) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form')
    },
    handleUpdate(data) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.checked = data.type === 3 ? [1, 2] : [data.type]
      dialog.resetForm('form', () => {
        dialog.form = {
          id: data.id,
          name: data.name,
          order: data.order,
          type: data.type === 3 ? '1,2' : data.type
        }
      })
    },
    success(form) {
      this.getList()
    }
  }
}
</script>
