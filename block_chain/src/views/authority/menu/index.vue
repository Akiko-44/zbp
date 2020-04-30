<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input
        v-model="listQuery.name"
        style="width: 195px;"
        placeholder="请输入菜单名称"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button> -->
      <el-button
        class="filter-item"
        type="primary"
        icon="plus"
        @click="handlerAdd()"
      >添加一级菜单</el-button>
    </div>
    <tree-table
      :data="data"
      :columns="columns"
      expand-all
      border
    >
      <el-table-column
        width="400px"
        align="center"
        label="菜单级别"
        prop="level"
      />
      <el-table-column
        width="400px"
        align="center"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="row.levelNum < 3"
            size="small"
            type="primary"
            @click="handlerAdd(row)"
          >添加</el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleUpdate(row)"
          >修改</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handlerDelete(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss">
</style>

<script>
import TreeTable from '@/components/TreeTable'
import {
  getAllMenu, deleteMenu
} from '@/api/menu'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Column',
  directives: {
    waves
  },
  components: {
    TreeTable
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
      getAllMenu(this.listQuery).then(data => {
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
          deleteMenu(data.id)
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
      this.$router.push({ name: 'addMenu', query: { parentId: row && row.id ? row.id : 0, levelNum: row && row.levelNum ? (row.levelNum + 1) : 1 }})
    },
    handleUpdate(row) {
      this.$router.push({ name: 'addMenu', query: { parentId: row.parentId, id: row.id, levelNum: row.levelNum }})
    },
    handleFilter() {
      this.getList()
    },
    success(form) {
      this.getList()
    }
  }
}
</script>
