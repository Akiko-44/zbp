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
                   @click="$router.push({ name:'addThirdCategory', query: {id: parentId,firstId: firstId}})">添加</el-button>
        <el-button type="primary"
                   v-waves
                   @click="$router.push({ name:'secondCategoryList', query: {id: parentId}})">返回</el-button>
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
          <span>{{row.catName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="分类图片">
        <template slot-scope="{ row }">
          <img v-if="row.categoryPic" :src="row.categoryPic" class="category-img" />
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

					
          <!--v-if="row.hasBindGoods === 0"暂时放开修改按钮，为添加三级分类图片-->
          <el-button class="auditBtn"
                     size="small"
                     type="primary"
                     @click="$router.push({ name:'addThirdCategory',query:{data:JSON.stringify(row),firstId:firstId}})">修改</el-button>
          <el-button class="auditBtn"
                     size="small"
                     type="warning"
                     v-if="row.hasBindGoods === 0"
                     @click="delSecond(row.id, $index)">删除</el-button>
          <el-button class="auditBtn"
                     size="small"
                     type="primary"
                     v-if="row.hasBindGoods === 1 && !row.styleList.length"
                     @click="$router.push({ name:'addThirdCategory',query:{data:JSON.stringify(row), isBind: 1}})">关联款式</el-button>
          <span v-if="row.hasBindGoods === 1 && row.styleList.length">-</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { delThird, categoryList } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      firstId: '',
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
    this.firstId = this.$route.query.firstId
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
        delThird(id).then(data => {
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
.category-img {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
}
</style>
