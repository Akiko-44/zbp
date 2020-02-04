<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="listParams"
               label-width="100px"
               class="listQueryForm">
        <el-form-item>
          <el-input @keyup.enter.native="handleFilter"
                    placeholder="请输入类目属性名称"
                    style="width: 195px;"
                    v-model="listParams.categoryAttributesName"> </el-input>
        </el-form-item>
        <el-button type="primary"
                   v-waves
                   icon="el-icon-search"
                   @click="handleFilter">查询</el-button>
        <el-button type="primary"
                   v-waves
                   @click="$router.push({ name:'categoryAttrModify'})">添加</el-button>
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
                       label="名称">
        <template slot-scope="{ row }">
          <span>{{row.attributesName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="文本框类型">
        <template slot-scope="{ row }">
          <span>{{attributesTypeMap[row.attributesType]}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="是否必填">
        <template slot-scope="{ row }">
          <span>{{row.isMust === 0 ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px"
                       class-name="attribute-num"
                       align="center"
                       label="可选择内容数量">
        <template slot-scope="{ row }">
          <span v-if="row.attributesType == 0 || row.attributesType == 3">-</span>
          <span @click="$router.push({ name:'attrValueList',query:{id:row.id}})" v-else>{{row.subsidiaryAttributesVOs.length}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="是否绑定商品">
        <template slot-scope="{ row }">
          <span>{{row.bindingNum > 0 ? '是' : '否'}}</span>
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
          <el-button class="auditBtn"
                     size="small"
                     type="primary"
                     v-if="row.bindingNum <= 0"
                     @click="$router.push({ name:'categoryAttrModify',query:{rowData:JSON.stringify(row)}})">修改</el-button>
          <el-button class="auditBtn"
                     size="small"
                     type="warning"
                     v-if="row.bindingNum <= 0"
                     @click="del(row.id, $index)">删除</el-button>
          <span v-if="row.bindingNum > 0">-</span>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listParams.offset"
                     :page-sizes="[10,20,30,50]"
                     :page-size="listParams.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { delcategoryAttributes, categoryAttributesPage } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        categoryAttributesName: ''
      },
      attributesTypeMap: {
        0: '文本框',
        1: '下拉框',
        2: '其他'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      categoryAttributesPage(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    del(id, index) {
      this.$confirm('确认删除该类目属性？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delcategoryAttributes(id).then(data => {
          this.list.splice(index, 1)
        }).catch(() => { })
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
    resetQuery() {
      this.listParams.limit = 20
      this.listParams.offset = 1
      this.listParams.categoryAttributesName = ''
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
/deep/ td.attribute-num {
  color: #409eff;
  cursor: pointer;
}
</style>
