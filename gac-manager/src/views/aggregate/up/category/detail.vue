<template>
<div class="app-container">
  <el-button size="small" type="primary" @click="handlerAdd({id: $route.query.id})">新增子栏目</el-button>
  <el-table :data="categories" v-loading.body="listLoading" border fit highlight-current-row >
    <el-table-column align="center" label="子栏目管理">
      <el-table-column
        prop="name"
        label="名称"
        width="250"
        align="center"
      >
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button size="small" @click="handlerView(row)">服务查看</el-button>
          <el-button size="small" type="primary" @click="handlerUpdate(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
  <br />
  <el-button v-if="current.id" size="small" type="primary" @click="handlerAddService">新增服务</el-button>
  <el-table v-if="current.id" :data="serviceList" v-loading.body="serviceLoading" border fit highlight-current-row >
    <el-table-column align="center" :label="current.name">
      <el-table-column
        prop="name"
        label="服务类型"
        width="250"
        align="center"
      >
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="{ row, $index }">
          <span>{{+row.status === 0 ? '启用' : '停用'}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button size="small" type="primary" @click="handlerUpdateService(row)">修改</el-button>
          <el-button v-if="+row.status === 0" size="small" type="danger" @click="handlerServiceStatus(row, 1)">停用</el-button>
          <el-button v-else size="small" type="danger" @click="handlerServiceStatus(row, 0)">启用</el-button>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
  <Add
    ref="dialog"
    @success="success"
  />

  <ServiceDialog
    ref="serviceDialog"
    @success="addServiceSuccess"
  />
</div>
</template>

<script>
import { page, getServiceList, setServiceStatus } from '@/api/aggregate/upCategory'
import Add from './addCategoryDialog'
import ServiceDialog from './serviceDialog'

export default {
  components: {
    Add,
    ServiceDialog
  },
  data() {
    return {
      listLoading: false,
      serviceLoading: false,
      form: {},
      categories: [],
      serviceList: [],
      current: { id: undefined, name: '' }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.$route.query.id)
        .then(data => {
          this.categories = data.data
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    success(form) {
      this.getList()
    },
    handlerUpdate(data) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form = JSON.parse(JSON.stringify(data))
      })
    },
    handlerAdd(row) {
      const dialog = this.$refs.dialog

      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form.pid = row && row.id ? row.id : 0
      })
    },
    handlerView(row) {
      this.serviceLoading = true
      this.current = { id: row.id, name: row.name }
      getServiceList(row.id)
        .then(data => {
          this.serviceList = data.data
          this.serviceLoading = false
        })
        .catch(() => {
          this.serviceLoading = false
        })
    },
    handlerAddService() {
      const dialog = this.$refs.serviceDialog
      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form.categoryId = this.current.id
      })
    },
    handlerUpdateService(data) {
      const dialog = this.$refs.serviceDialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form = JSON.parse(JSON.stringify(data))
        dialog.form.categoryId = this.current.id
      })
    },
    addServiceSuccess() {
      this.handlerView(this.current)
    },
    handlerServiceStatus(row, status) {
      this.$confirm(`确定执行当前操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setServiceStatus(row.id, status)
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
    }
  }
}
</script>

<style scoped>
.right-nav {
  position: fixed;
  top: 57px;
  text-align: center;
}
</style>
