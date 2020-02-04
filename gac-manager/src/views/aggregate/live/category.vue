
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-button @click="handlerAdd" type="primary" icon="edit">添加栏目</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="150px" align="left" label="栏目名称">
      <template slot-scope="{ row }">
        <span>{{row.catName}}</span>
      </template>
    </el-table-column>
    <el-table-column width="150px" align="left" label="推荐权重">
      <template slot-scope="{ row }">
        <span>{{row.grade}}</span>
      </template>
    </el-table-column>
    <el-table-column width="100px" align="left" label="直播数量">
      <template slot-scope="{ row }">
        <span>{{row.liveCount}}</span>
      </template>
    </el-table-column>
    <el-table-column width="100px" align="left" label="状态">
      <template slot-scope="{ row }">
        <span>{{row.isShow == 0 ? '显示' : '不显示'}}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" align="center" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button size="small" type="primary" @click="handleUpdate(row, $index)">编辑</el-button>
        <el-button v-if="row.isShow == 1" size="small" type="success" @click="handleStatus(row, 0)">显示</el-button>
        <el-button v-else size="small" type="success" @click="handleStatus(row, 1)">不显示</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>

  <add
    ref="dialog"
    @success="saveSuccess"
  />
</div>
</template>

<script>
import {
  page,
  delObj,
  updateShowStatus
} from '@/api/aggregate/liveCategory'
import waves from '@/directive/waves' // 水波纹指令
import Add from './addCategoryDialog'

export default {
  directives: {
    waves
  },
  components: {
    Add
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
      },
      tableKey: 0,
      index: undefined
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
          this.listLoading = false
        })
    },
    handleDelete(row) {
      this.$confirm(`确定删除此分类？`, '提示', {
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
    },
    handlerAdd(row) {
      const dialog = this.$refs.dialog

      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        if (row && row.id) {
          dialog.form.id = row.id
        }
      })
    },
    handleUpdate(data, index) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        this.index = index
        dialog.form = JSON.parse(JSON.stringify(data))
      })
    },
    handleStatus(row, status) {
      this.$confirm(`确定执行当前操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          updateShowStatus(row.id, status)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list[index].isShow = status
            })
        })
    },
    saveSuccess(data) {
      this.getList()
    }
  }
}
</script>
