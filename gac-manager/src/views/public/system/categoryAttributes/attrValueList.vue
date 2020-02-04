<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="listParams"
               label-width="100px"
               class="listQueryForm">
        <el-form-item>
          <el-input @keyup.enter.native="handleFilter"
                    placeholder="请输入类目属性值名称"
                    style="width: 195px;"
                    v-model="listParams.subName"> </el-input>
        </el-form-item>
        <el-button type="primary"
                   v-waves
                   icon="el-icon-search"
                   @click="handleFilter">查找</el-button>
        <el-button type="primary"
                   v-waves
                   @click="$router.push({ name:'attrValueModify', query: {id: id}})">添加</el-button>
      </el-form>
    </div>

    <el-table :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center"
                       width="50"
                       label="排序">
        <template slot-scope="{ row }">
          <span>{{row.sortOrder}}</span>
        </template>               
      </el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="类目属性值名称">
        <template slot-scope="{ row }">
          <span>{{row.subsidiaryName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px"
                       align="center"
                       label="是否绑定商品">
        <template slot-scope="{ row }">
          <span>{{row.goodsNum > 0 ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       align="left"
                       label="操作">
        <template slot-scope="{ row, $index }">
          <el-button class="auditBtn"
                     size="small"
                     type="primary"
                     v-if="row.goodsNum <= 0"
                     @click="$router.push({ name:'attrValueModify',query:{rowData:JSON.stringify(row)}})">修改</el-button>
          <el-button class="auditBtn"
                     size="small"
                     type="warning"
                     v-if="row.goodsNum <= 0"
                     @click="delAttribute(row.id, $index)">删除</el-button>
          <span v-if="row.goodsNum > 0">-</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { selectSubsidiaryById, deleteBySubsidiaryAttributesId } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      id: this.$route.query.id,
      list: [],
      listParams: {
        id: this.$route.query.id,
        subName: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      selectSubsidiaryById(this.listParams).then(data => {
        this.list = data.data
      })
    },
    delAttribute(id, index) {
      this.$confirm('确认删除该类目属性值？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteBySubsidiaryAttributesId(id).then(data => {
          this.list.splice(index, 1)
        }).catch(() => { })
      })
    },
    handleFilter() {
      this.getList()
    },
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
</style>
