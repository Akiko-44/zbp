
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-button @click="handlerAdd" type="primary" icon="edit">添加属性</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="700px" align="left" label="属性名称">
      <template slot-scope="{ row }">
        <span>{{row.name}}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" align="center" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button size="small" type="primary" @click="handleUpdate(row, $index)">编辑</el-button>
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
  delObj
} from '@/api/gallery/props'
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
          this.list = data.data
          this.listLoading = false
        })
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
    handleUpdate(data, index) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        this.index = index
        dialog.form = JSON.parse(JSON.stringify(data))
      })
    },
    saveSuccess(data) {
      // 后端保存没有返回ID，更新本地操作，添加成功直接读取接口数据
      if (this.index !== undefined) {
        this.list.splice(this.index, 1, data)
        this.index = undefined
      } else {
        this.getList()
      }
    }
  }
}
</script>
