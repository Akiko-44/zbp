
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-button @click="handlerAdd" type="primary" icon="edit">添加友情链接</el-button>
  </div>
  <!-- <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入网站名称" v-model="listQuery.website"> </el-input>
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
  </div> -->
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="200px" align="center" label="网站名称">
      <template slot-scope="{ row }">
        <span>{{row.keyword}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="链接">
      <template slot-scope="{ row }">
        <span>{{row.link}}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" align="center" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button size="small" type="primary" @click="handleUpdate(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>

  <!-- <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div> -->

  <add
    ref="dialog"
    @success="getList"
  />
</div>
</template>

<script>
import {
  page,
  delObj
} from '@/api/public/link'
import waves from '@/directive/waves' // 水波纹指令
import Add from './components/add'

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
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        website: undefined
      },
      tableKey: 0
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
          this.list = data.data
          this.listLoading = false
        })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确定删除此链接？`, '提示', {
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
    handleUpdate(row) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form = JSON.parse(JSON.stringify(row))
      })
    }
  }
}
</script>
