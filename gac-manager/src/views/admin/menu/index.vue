<template>
<div class="app-container">
  <div class="filter-container">
    <el-button  class="filter-item" type="primary" icon="plus" @click="handlerAdd()">添加菜单</el-button>
  </div>
  <tree-table :data="data" :columns="columns" expandAll border>
    <el-table-column width="400px" align="center" label="操作">
      <template slot-scope="{ row }">
        <!-- <el-button size="small" type="primary" @click="handlerAdd(row)">添加子菜单</el-button> -->
        <el-tooltip class="item" effect="dark" content="添加子菜单" placement="top">
          <el-button size="small" icon="el-icon-plus" @click="handlerAdd(row)"></el-button>
        </el-tooltip>
        <el-button size="small" type="primary" @click="handleUpdate(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handlerDelete(row)">删除</el-button>
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
import Add from './components/add'
import TreeTable from '@/components/TreeTable'
import {
  fetchTree, getObj, delObj
} from '@/api/admin/menu'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'column',
  directives: {
    waves
  },
  data() {
    return {
      columns: [
        {
          text: '菜单名称',
          value: 'title'
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
      fetchTree(this.listQuery).then(data => {
        this.data = data.data
      })
    },

    handlerDelete(data) {
      this.$confirm(`确定删除当前菜单（包含子菜单数据）？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(data.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
        })
    },
    handlerAdd(row) {
      const dialog = this.$refs.dialog

      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form.parentId = row && row.id ? row.id : -1
      })
    },
    handleUpdate(data) {
      getObj(data.id).then(result => {
        const dialog = this.$refs.dialog
        dialog.dialogStatus = 'update'
        dialog.dialogFormVisible = true
        dialog.resetForm('form', () => {
          dialog.form = result.data
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
