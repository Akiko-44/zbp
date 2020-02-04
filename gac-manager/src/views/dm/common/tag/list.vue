<template>
	<div class="app-container calendar-list-container">
	  <div class="filter-container">
	    <el-button @click="handlerAdd" type="primary" icon="edit">添加标签</el-button>
	  </div>
	  
	  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
	    <el-table-column align="center" label="标签名称">
	      <template slot-scope="{ row }">
	        <span>{{row.name}}</span>
	      </template>
	    </el-table-column>
	
	    <el-table-column align="center" label="评价累计使用次数">
	      <template slot-scope="{ row }">
	        <span>{{row.useCount}}</span>
	      </template>
	    </el-table-column>
	
	    <el-table-column width="100px" align="center" label="状态">
	      <template slot-scope="{ row }">
	        <span>{{isValid[row.isValid]}}</span>
	      </template>
	    </el-table-column>
	
	    <el-table-column fixed="right" align="center" label="操作">
	      <template slot-scope="{ row, $index }">
	        <el-button size="small" type="primary" @click="handleUpdate(row, $index)">编辑</el-button>
	        <el-button v-if="row.isValid === 0" size="small" type="warning" @click="handleDisabled(row, $index, 1)">禁用</el-button>
	        <el-button v-else size="small" type="warning" @click="handleDisabled(row, $index, 0)">启用</el-button>
	        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
	      </template>
	    </el-table-column>	
	  </el-table>
	
	  <div v-show="!listLoading" class="pagination-container">
	    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
	  </div>
	
	  <add
	    :flag="flag"
	    ref="dialog"
	    @success="saveSuccess"
	  />
	</div>
</template>

<script>
import {
  page,
  delObj,
  disableTag
} from '@/api/dm/tag'
import waves from '@/directive/waves' // 水波纹指令
import Add from './add'

export default {
  directives: {
    waves
  },
  components: {
    Add
  },
  props: {
    flag: Number
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: {
        flag: this.flag
      },
      tableKey: 0,
      index: undefined,
      isValid: {
        0: '可用',
        1: '不可用'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
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
    handleDelete(row) {
      this.$confirm(`确定删除此标签？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
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
        dialog.form.flag = this.flag
      })
    },
    handleDisabled(row, index, isValid) {
      const text = isValid === 0 ? '启用' : '禁用'
      this.$confirm(`确定${text}此标签？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        disableTag(row.id, isValid).then(() => {
          this.$notify({
            title: '成功',
            message: `${text}成功`,
            type: 'success',
            duration: 2000
          })
          row.isValid = isValid
        })
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
