<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="getList"
                class="filter-item"
                style="width: 200px;"
                placeholder="输入分类名称进行过滤"
                v-model="listQuery.name"></el-input>
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="el-icon-search"
                 @click="getList">搜索</el-button>
      <el-button class="filter-item"
                 type="primary"
                 icon="plus"
                 @click="handlerAdd()"
                 style="margin-left: 10px;">增加顶级分类</el-button>
    </div>
    <tree-table v-loading.body="listLoading"
                ref="treeTable"
                :data="data"
                :columns="columns"
                border>
      <el-table-column width="400px"
                       align="center"
                       label="操作">
        <template slot-scope="{ row, $index }">
          <el-tooltip class="item"
                      effect="dark"
                      content="增加子类"
                      placement="top">
            <el-button size="small"
                       icon="el-icon-plus"
                       @click="handlerAdd(row, $index)"></el-button>
          </el-tooltip>
          <el-button size="small"
                     type="primary"
                     @click="handleUpdate(row)">编辑</el-button>
          <el-button size="small"
                     type="danger"
                     @click="handlerDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
    <add :flag="flag"
         ref="dialog"
         @success="success" />
  </div>
</template>

<script>
import Add from './add'
import TreeTable from '@/components/TreeTable'
import { page, delObj, jewelryPage, delJewelryObj } from '@/api/dm/goodsCategory'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    Add,
    TreeTable
  },
  props: {
    flag: Number
  },
  data() {
    return {
      columns: [
        {
          text: '分类名称',
          value: 'name'
        }
      ],
      data: [],
      listQuery: {
        flag: this.flag,
        name: undefined
      },
      listLoading: false,
      index: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      // flag 为5指代珠宝店
      if (this.flag === 5) {
        this.listQuery.catName = this.listQuery.name
        this.listQuery.limit = 999
        jewelryPage(this.listQuery).then(data => {
          this.data = data.data.records
          this.rename(this.data)
          this.listLoading = false
        })
          .catch(() => {
            this.listLoading = false
          })
      } else {
        page(this.listQuery).then(data => {
          this.data = data.data
          this.listLoading = false
          this.$nextTick(() => {
            if (this.index !== undefined) {
              const obj = this.$refs.treeTable.formatData[this.index]
              obj._expanded = true
              obj._show = true
            }
          })
        })
          .catch(() => {
            this.listLoading = false
          })
      }
    },
    // 前台属性名转换
    rename(children = []) {
      if (children.length > 0) {
        children.map(item => {
          item.name = item.catName
          item.priority = item.sortOrder
          if (item.children && item.children.length > 0) {
            this.rename(item.children)
          }
        })
      }
      return children
    },
    handlerDelete(data) {
      this.$confirm(`确定删除当前分类（包含子分类数据）？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.flag === 5) {
            delJewelryObj(data.id).then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          } else {
            delObj(data.id).then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
    },
    handlerAdd(row, index) {
      const dialog = this.$refs.dialog

      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form.parentId = row && row.id ? row.id : 0
        dialog.form.catLevel = row && row.catLevel ? row.catLevel + 1 : 1
      })
      this.index = index
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
          parentId: data.parentId,
          flag: this.flag,
          catLevel: data.catLevel
        }
      })
    },
    success(form) {
      this.getList()
    }
  }
}
</script>
