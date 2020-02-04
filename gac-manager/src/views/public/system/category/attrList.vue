<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :model="listParams"
               inline
               label-width="110px">
        <el-form-item label="类目属性名称:">
          <el-input style="width: 195px;"
                    placeholder="请输入类目属性名称"
                    v-model="listParams.categoryAttributesName"> </el-input>
        </el-form-item>
        <el-form-item label="类目属性:">
          <el-select v-model="listParams.isBinding"
                     placeholder="请选择">
            <el-option v-for="item in bindingState"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary"
                   class="btn"
                   v-waves
                   @click="getList">查询</el-button>
        <el-button type="primary"
                   v-waves
                   @click="$router.push({ name:'secondCategoryList', query: {id: firstId}})">返回</el-button>
      </el-form>
    </div>

    <el-table :data="attrList"
              v-loading.body="listLoading"
              ref="attrTable"
              border
              fit
              style="width: 100%">
      <el-table-column property="attributesName"
                       label="名称"></el-table-column>
      <el-table-column label="文本框类型">
        <template slot-scope="{ row }">
          <span>{{ textTypeMap[row.attributesType] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可选择内容">
        <template slot-scope="{ row }">
          <span>{{ row.subsidiaryAttributesVOs.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否必填">
        <template slot-scope="{ row }">
          <span>{{ mustMap[row.isMust] }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       align="left"
                       label="操作">
        <template slot-scope="{ row }">
          <el-button class="auditBtn"
                     size="small"
                     type="primary"
                     v-if="row.isBinding"
                     @click="bind(row.id, 0)">绑定</el-button>
          <el-button class="auditBtn"
                     size="small"
                     type="warning"
                     v-if="!row.isBinding && !hasBindGoods"
                     @click="unBind(row.id, 1)">解绑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination"
         v-show="!listLoading">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="listParams.offset"
                     :page-sizes="[10,20,30,50]"
                     :page-size="listParams.limit"
                     layout="total, prev, pager, next"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { categoryAttributesPage, CatAttr } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      firstId: '',
      catId: '',
      hasBindGoods: 0,
      listParams: {
        offset: 1,
        limit: 10,
        categoryAttributesName: '',
        catId: '',
        isBinding: undefined,
      },
      attrList: [],
      total: 0,
      listLoading: true,
      textTypeMap: {
        0: '文本框',
        1: '下拉框'
      },
      mustMap: {
        0: '否',
        1: '是'
      },
      bindingState: [
        { value: undefined, label: '全部' },
        { value: 0, label: '已绑定' },
        { value: 1, label: '未绑定' }
      ],
    }
  },
  created() {
    this.firstId = this.$route.query.firstId
    this.listParams.catId = this.$route.query.id
    this.hasBindGoods = Number(this.$route.query.hasBindGoods)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      categoryAttributesPage(this.listParams).then(data => {
        this.attrList = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    unBind(catAttrId, bindingType) {
      this.$confirm(`确定解除绑定该属性？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.bind(catAttrId, bindingType)
      })
    },
    bind(catAttrId, bindingType) {
      let data = {
        catId: this.listParams.catId,
        catAttrId,
        bindingType
      }
      CatAttr(data).then(data => {
        this.getList()
      })
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    }
  }
}
</script>

<style scoped lang="postcss">
.pagination {
  text-align: right;
  margin-top: 10px;
}
.tip {
  margin-left: 20px;
  font-size: 12px;
}
</style>
