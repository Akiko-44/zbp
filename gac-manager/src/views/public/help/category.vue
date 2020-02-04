<template>
    <div class="app-container">
        <div class="filter-container">
            <!--<el-input @keyup.enter.native="getList" class="filter-item" style="width: 200px;" placeholder="输入栏目名称进行过滤" v-model="listQuery.name"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="getList">搜索</el-button>-->
            <el-button  class="filter-item" type="primary" icon="plus" @click="handlerAdd()" style="margin-left: 10px;">添加分类</el-button>
        </div>
        <tree-table :data="data" :columns="columns" expandAll border>
            <el-table-column width="100px" align="center" label="关联文章" prop="relateArticlesNum">
              
            </el-table-column>
            <el-table-column width="400px" align="center" label="操作">
                <template slot-scope="{ row }">
                    <el-tooltip class="item" effect="dark" content="增加子栏目" placement="top">
                        <el-button size="small" icon="el-icon-plus" @click="handlerAdd(row)"></el-button>
                    </el-tooltip>
                    <el-button size="small" type="primary" @click="handleUpdate(row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handlerDelete(row)" v-if="row.relateArticlesNum == 0">删除</el-button>
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
  import { page, delObj } from '@/api/public/column'
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
            text: '栏目名称',
            value: 'name'
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
        page(this.listQuery)
          .then(data => {
            this.data = data.data
          })
      },
      handlerDelete(data) {
        this.$confirm(`确定删除当前栏目（包含子栏目数据）？`, '提示', {
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
          dialog.form.parentId = row && row.id ? row.id : 0
        })
      },
      handleUpdate(row) {
        const dialog = this.$refs.dialog
        console.log(row)
        dialog.dialogStatus = 'update'
        dialog.dialogFormVisible = true
        dialog.resetForm('form', () => {
          dialog.form.parentId = row && row.parentId
          dialog.form.id = row && row.id ? row.id : 0
          dialog.form.name = row && row.name
          dialog.form.helpDesc = row && row.helpDesc
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
