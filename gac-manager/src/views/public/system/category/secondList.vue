<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="listParams"
               ref="honestListQueryForm"
               label-width="100px"
               class="listQueryForm">
        <el-form-item label="分类名称:">
          <el-input @keyup.enter.native="handleFilter"
                    style="width: 195px;"
                    placeholder="请输入分类名称"
                    v-model="listParams.catName"> </el-input>
        </el-form-item>
        <el-button type="primary"
                   v-waves
                   icon="el-icon-search"
                   @click="handleFilter">查找</el-button>
        <!-- <el-button type="text"
                   @click="resetQuery">清空条件</el-button> -->
        <el-button type="primary"
                   v-waves
                   @click="$router.push({ name:'addSecondCategory', query: {id: parentId} })">添加</el-button>
        <el-button type="primary"
                   v-waves
                   @click="$router.push({ name:'menuCategory' })">返回</el-button>
      </el-form>
    </div>

    <el-table :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column type="index"
                       align="center"
                       width="50"
                       label="序号">
      </el-table-column>

      <el-table-column width="200px"
                       align="center"
                       label="分类名称">
        <template slot-scope="{ row }">
          <span>{{ row.catName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px"
                       align="center"
                       class-name="third-category"
                       label="三级菜单分类">
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'thirdCategoryList', query: {id: row.id,firstId: parentId}})">{{ row.childrenSize }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px"
                       align="center"
                       label="是否绑定商品">
        <template slot-scope="{ row }">
          <span>{{ bindGoodsMap[row.hasBindGoods] }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px"
                       align="center"
                       label="编辑时间">
        <template slot-scope="{ row }">
          <span>{{row.updateTime}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right"
                       align="left"
                       label="操作">
        <template slot-scope="{ row, $index }">
          <el-button size="small"
                     @click="$router.push({ name: 'thirdCategoryList', query: {id: row.id,firstId: parentId}})">三级菜单管理</el-button>
          <el-button size="small"
                     @click="$router.push({ name: 'secondCategoryAttrList', query: {id: row.id,firstId: parentId,hasBindGoods: row.hasBindGoods}})">关联类目属性</el-button>
          <el-button size="small"
                     type="primary"
                     v-if="row.hasBindGoods === 1"
                     @click="$router.push({ name: 'addSecondCategory', query: {data: JSON.stringify(row)}})">类目属性</el-button>
          <el-button size="small"
                     type="primary"
                     v-if="row.hasBindGoods === 0"
                     @click="$router.push({ name: 'addSecondCategory', query: {data: JSON.stringify(row), isEdit: 1}})">修改</el-button>
          <el-button size="small"
                     type="warning"
                     v-if="row.hasBindGoods === 0"
                     @click="delSecond(row.id, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { delSecond, categoryList } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      parentId: '',
      list: null,
      listLoading: false,
      listParams: {
        catName: ''
      },
      bindGoodsMap: {
        0: '否',
        1: '是'
      }
    }
  },
  created() {
    this.parentId = this.$route.query.id
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      categoryList(this.parentId, this.listParams).then(data => {
        this.list = data.data
        this.listLoading = false
      })
    },
    delSecond(id, index) {
      this.$confirm('确定删除当前分类？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delSecond(id).then(data => {
          this.list.splice(index, 1)
        }).catch(() => { })
      })
    },
    handleFilter() {
      this.getList()
    },
    resetQuery() {
      this.listParams.catName = ''
      this.getList()
    }
  }
}
</script>

<style scoped lang="postcss">
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.auditBtn {
  margin-left: 0;
}
/deep/ td.third-category {
  color: #409eff;
  cursor: pointer;
}
</style>
