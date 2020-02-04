<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="getList"
                class="filter-item"
                style="width: 200px;"
                placeholder="请输入分类名称"
                v-model="listQuery.catName"></el-input>
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="el-icon-search"
                 @click="getList">搜索</el-button>
      <el-button class="filter-item"
                 type="primary"
                 icon="plus"
                 @click="$router.push({ name: 'addFirstCategory' })"
                 style="margin-left: 10px;">添加一级菜单</el-button>
    </div>
    <tree-table v-loading.body="listLoading"
                ref="treeTable"
                :data="data"
                border>
      <el-table-column label="分类名称"
                       class-name="catLevel">
        <template slot-scope="{ row }">
          <span v-if="row.catLevel === 2"
                class="catLevel-2"></span>
          <span v-if="row.catLevel === 3"
                class="catLevel-3"></span>
          <span>{{ row.catName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="菜单级别">
        <template slot-scope="{ row }">
          <span>{{ levelMap[row.catLevel] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否绑定商品">
        <template slot-scope="{ row }">
          <span>{{ bindGoodsMap[row.hasBindGoods] }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400px"
                       align="center"
                       label="操作">
        <template slot-scope="{ row, $index }">
          <el-button size="small"
                     v-if="row.catLevel === 1"
                     @click="toSecondList(row.id, $index)">二级菜单管理</el-button>
          <el-button size="small"
                     v-if="row.catLevel === 2"
                     @click="toThirdList(row.id, $index)">三级菜单管理</el-button>
          <el-button size="small"
                     type="primary"
                     v-if="row.catLevel === 1 && row.hasBindGoods === 0"
                     @click="editFirstCategory(row)">修改</el-button>
          <el-button size="small"
                     type="danger"
                     v-if="row.hasBindGoods === 0"
                     @click="handlerDelete(row.id, row.catLevel)">删除</el-button>
          <span v-if="row.hasBindGoods === 1">-</span>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import Add from './addFirst'
import TreeTable from '@/components/TreeTable'
import { categoryList, delFirst, delSecond, delThird } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    Add,
    TreeTable
  },
  data() {
    return {
      columns: [
        {
          text: '分类名称',
          value: 'catName'
        },
        {
          text: '菜单级别',
          value: 'catLevel'
        },
        {
          text: '是否绑定商品',
          value: 'hasBindGoods'
        }
      ],
      data: [],
      listQuery: {
        catName: undefined
      },
      listLoading: false,
      index: undefined,
      levelMap: {
        1: '一级菜单',
        2: '二级菜单',
        3: '三级菜单'
      },
      bindGoodsMap: {
        0: '否',
        1: '是'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      categoryList(0, this.listQuery).then(data => {
        this.data = data.data
        this.listLoading = false
        this.$nextTick(() => {
          if (this.index !== undefined) {
            const obj = this.$refs.treeTable.formatData[this.index]
            obj._expanded = true
            obj._show = true
          }
        })
      }).catch(() => {
        this.listLoading = false
      })
    },
    handlerDelete(id, catLevel) {
      this.$confirm(`确定删除当前分类？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (catLevel === 1) {
          delFirst(id).then(() => {
            this.delSucess()
          })
        } else if (catLevel === 2) {
          delSecond(id).then(() => {
            this.delSucess()
          })
        } else {
          delThird(id).then(() => {
            this.delSucess()
          })
        }
      })
    },
    editFirstCategory(data) {
      const { id, parentId, catLevel, catName, sortOrder } = data
      const form = { id, parentId, catLevel, catName, sortOrder }
      this.$router.push({ name: 'addFirstCategory', query: { data: JSON.stringify(form) } })
    },
    toSecondList(id) {
      this.$router.push({ name: 'secondCategoryList', query: { id } })
    },
    toThirdList(id) {
      this.$router.push({ name: 'thirdCategoryList', query: { id } })
    },
    delSucess() {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.getList()
    }
  }

}
</script>

<style scoped lang="postcss">
/deep/ td.catLevel .catLevel-2 {
  display: inline-block;
  width: 18px;
}
/deep/ td.catLevel .catLevel-3 {
  display: inline-block;
  width: 36px;
}
</style>
