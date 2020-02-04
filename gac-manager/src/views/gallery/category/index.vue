<template>
<div class="app-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="getList" class="filter-item" style="width: 200px;" placeholder="输入分类名称进行过滤" v-model="listQuery.name"></el-input>
    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="getList">搜索</el-button>
    <el-button  class="filter-item" type="primary" icon="plus" @click="handlerAdd()" style="margin-left: 10px;">增加顶级分类</el-button>
  </div>
  <tree-table v-loading.body="listLoading" ref="treeTable" :data="data" :columns="columns" border>
    <el-table-column width="400px" align="center" label="操作">
      <template slot-scope="{ row, $index }">
        <el-tooltip class="item" effect="dark" content="增加子类" placement="top">
          <el-button size="small" icon="el-icon-plus" @click="handlerAdd(row, $index)"></el-button>
        </el-tooltip>
        <el-button size="small" type="primary" @click="handleUpdate(row)" :disabled="noDel.indexOf(row.name) != -1">编辑</el-button>
        <el-button size="small" type="danger" @click="handlerDelete(row)" :disabled="noDel.indexOf(row.name) != -1">删除</el-button>
        <!--<el-button size="small" type="warning" >显示</el-button>
        <el-button size="small" type="info" >不显示</el-button>-->
      </template>
    </el-table-column>
  </tree-table>
  <add
    ref="dialog"
    @success="success"
  />
</div>
</template>

<script>
import Add from './components/add'
import TreeTable from '@/components/TreeTable'
import { page, delObj } from '@/api/gallery/category'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'category',
  directives: {
    waves
  },
  data() {
    return {
    	noDel:['赛事获奖作品','玉雕设计作品','首饰设计作品','国际设计师作品','专利作品'],
      columns: [
        {
          text: '分类名称',
          value: 'name'
        }
      ],
      data: [],
      listQuery: {
        name: undefined
      },
      listLoading: false
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
          this.data = data.data
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    handlerDelete(data) {
      this.$confirm(`确定删除当前分类（包含子分类数据）？`, '提示', {
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
    handlerAdd(row, index) {
      const dialog = this.$refs.dialog

      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form.parentId = row && row.id ? row.id : 0
      })

      if (index !== undefined) {
        this.$refs.treeTable.toggleExpanded(index)
      }
    },
    handleUpdate(data) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form = {
          id: data.id,
          name: data.name,
          priority: data.priority,
          parentId: data.parentId
        }
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
