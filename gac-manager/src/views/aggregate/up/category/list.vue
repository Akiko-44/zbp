<template>
<div class="app-container">
  <div class="filter-container">
    <!-- <el-input @keyup.enter.native="getList" class="filter-item" style="width: 200px;" placeholder="输入栏目名称进行过滤" v-model="listQuery.name"></el-input> -->
    <!-- <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="getList">搜索</el-button> -->
    <el-button  class="filter-item" type="primary" icon="plus" @click="handlerAdd()">添加栏目</el-button>
  </div>
  <tree-table v-loading.body="listLoading" :data="data" :columns="columns" expandAll border>
    <el-table-column width="400px" align="center" label="操作">
      <template slot-scope="{ row, $index }">
        <!-- <el-tooltip class="item" effect="dark" content="增加子栏目" placement="top">
          <el-button size="small" icon="el-icon-plus" @click="handlerAdd(row)"></el-button>
        </el-tooltip> -->
        <el-button size="small" @click="handleUpdate(row)">编辑</el-button>
        <el-button size="small" type="primary" @click="$router.push({name: 'upCategoryDetail', query: {id:row.id}})">设置</el-button>
        <!-- <el-button size="small" type="danger" @click="handlerDelete(row)">删除</el-button> -->
        <el-button v-if="row.status == 1" size="small" type="danger" @click="handleStatus(row, 0)">启用</el-button>
        <el-button v-else size="small" type="danger" @click="handleStatus(row, 1)">停用</el-button>
      </template>
    </el-table-column>
  </tree-table>
  <add
    ref="dialog"
    @success="success"
  />
</div>
</template>

<style rel="stylesheet/scss" lang="scss">
</style>

<script>
import Add from './addCategoryDialog'
import TreeTable from '@/components/TreeTable'
import { page, setCategoryStatus } from '@/api/aggregate/upCategory'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      listLoading: false,
      columns: [
        {
          text: '栏目名称',
          value: 'name'
        },
        {
          text: '权重',
          value: 'weight'
        }
      ],
      data: [],
      listQuery: {
        name: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(0)
        .then(data => {
          this.data = data.data
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    // handlerDelete(data) {
    //   this.$confirm(`确定删除当前栏目（包含子栏目数据）？`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       delObj(data.id)
    //         .then(() => {
    //           this.$notify({
    //             title: '成功',
    //             message: '删除成功',
    //             type: 'success',
    //             duration: 2000
    //           })
    //           this.getList()
    //         })
    //     })
    // },
    handlerAdd(row) {
      const dialog = this.$refs.dialog

      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form.pid = row && row.id ? row.id : 0
      })
    },
    handleUpdate(data) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
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
          setCategoryStatus(row.id, status)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              row.status = status
            })
        })
    },
    success(form) {
      this.getList()
    }
  },
  components: {
    Add,
    TreeTable
  }
}
</script>
