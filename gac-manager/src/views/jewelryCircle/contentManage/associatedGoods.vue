<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="notifyListQueryForm"
        label-width="100px"
        class="notifyListQueryForm"
      >
        <el-form-item label="商品名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.goodsName"
          > </el-input>
        </el-form-item>
        <el-form-item label="商家名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.merchantName"
          > </el-input>
        </el-form-item>
        <!-- <el-form-item label="状态:">
          <el-select
            style="width: 195px;"
            v-model="listParams.type"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >搜索</el-button>
      </el-form>
    </div>

    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        align="center"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="商品名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="商家名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="所属品牌"
      >
        <template slot-scope="{ row }">
          <span>{{row.brandName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="300px"
        align="center"
        label="商品分类"
      >
        <template slot-scope="{ row }">
          <span>{{row.categoryName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="库存"
      >
        <template slot-scope="{ row }">
          <span>{{row.stockNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="300px"
        align="center"
        label="价格"
      >
        <template slot-scope="{ row }">
          <span>￥{{row.lowPrice}} ~ ￥{{row.highPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            v-if="row.bindingState == 2"
            @click="bindAndUnbind(1, row.id)"
          >绑定</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            v-else
            @click="bindAndUnbind(2, row.id)"
          >解绑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>
  </div>
</template>

<script>
import { associatedGoodsList, bindAndUnbindContent } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      columnList: [{
        value: '',
        label: '全部'
      }],
      listParams: {
        offset: 1,
        limit: 20,
        goodsName: '',
        merchantName: '',
        contentId: undefined
      },
      typeList: [
        { value: '', label: '全部' },
        { value: '1', label: '图文' },
        { value: '2', label: '视频' }
      ]
    }
  },
  created() {
    this.listParams.contentId = this.$route.query.id
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      associatedGoodsList(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    bindAndUnbind(type, goodsId) {
      bindAndUnbindContent(type, {
        id: this.listParams.contentId,
        goodsIdList: [goodsId]
      }).then(data => {
        if (data.success) {
          this.$router.go(0)
        }
      })
    },
    handleFilter() {
      this.getGoodsList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getGoodsList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getGoodsList()
    },
    resetQuery() {
      this.listQuery.caseName = undefined
      this.$router.replace({ name: this.routerName })
      this.getGoodsList()
    }
  }
}
</script>

<style scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.auditBtn {
  margin-left: 0;
}
</style>
