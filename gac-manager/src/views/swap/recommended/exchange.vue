<template>
<div class="app-container">
  <div class="filter-container">
    <el-button type="primary" icon="edit" @click="handlerAdd" v-if="total<4">新增</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="220px" align="left" label="商品编号">
      <template slot-scope="{ row }">
        <span>{{row.goodsId}}</span>
      </template>
    </el-table-column>

    <el-table-column width="220px" align="left" label="图片">
      <template slot-scope="{ row }">
        <img :src="row.imgUrl | setImg" height="100" />
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="商品名称">
      <template slot-scope="{ row }">
        <span>{{row.goodsName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="排序">
      <template slot-scope="{ row }">
        <span>{{row.weight}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="添加时间">
      <template slot-scope="{ row }">
        <span>{{row.createTime}}</span>
      </template>
    </el-table-column>
    
    <el-table-column fixed="right" align="center" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>

  <add
    ref="dialog"
    :type="listQuery.type"
    @success="saveSuccess"
  />
</div>
</template>

<script>
import {
  page,
  delObj
} from '@/api/swap/recommended'
import waves from '@/directive/waves' // 水波纹指令
import Add from './add'

export default {
  components: {
    Add
  },
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        type: 2
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
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    },
    handlerAdd() {
      const dialog = this.$refs.dialog

      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form')
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前推荐？`, '提示', {
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
              this.getList()
            })
        })
    },
    saveSuccess() {
      this.getList()
    }
  }
}
</script>

