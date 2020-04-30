
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container title">
      <div>活动主题：{{activityThemeName}}</div>
      <div
        @click="$router.go(-1)"
        style="color: #409EFF;cursor:pointer;"
      >返回</div>
    </div>
    <div class="filter-container">
      <el-form
        :inline="true"
        label-width="100px"
      >
        <el-form-item label="商品名称">
          <el-input
            @keyup.enter.native="handleFilter"
            placeholder="请输入商品名称"
            style="width: 195px;"
            v-model="listParams.goodsName"
          > </el-input>
        </el-form-item>
        <el-form-item label="商户名称">
          <el-input
            @keyup.enter.native="handleFilter"
            placeholder="请输入商户名称"
            style="width: 195px;"
            v-model="listParams.merchantName"
          > </el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="listParams.relationType"
            style="width: 100px;"
          >
            <el-option
              size="size"
              v-for="(key, value) in relationType"
              :key="value"
              :label="key"
              :value="value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          v-waves
          @click="handleFilter"
        >查询</el-button>
      </el-form>
    </div>

    <el-table
      :key='tableKey'
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        width="110px"
        align="center"
        label="商品ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
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
        label="商品分类"
        class-name="content"
      >
        <template slot-scope="{ row }">
          <span>{{row.categoryName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="所属商户"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="价格"
      >
        <template slot-scope="{ row }">
          <span>￥{{row.lowPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="库存"
      >
        <template slot-scope="{ row }">
          <span>{{row.stockNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="上架时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.onSaleTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        label="状态"
      >
        <template slot-scope="{ row }">
          <span>{{row.bindingState === 1 ? '绑定' : '未绑定'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="primary"
            @click="bind(row)"
            v-if="row.bindingState === 2"
          >关联</el-button>
          <el-button
            size="small"
            type="warning"
            @click="bind(row)"
            v-else
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
import waves from '@/directive/waves' // 水波纹指令
import { activityThemeGetGoodsPage, activityThemeSetRelationGoods } from '@/api/public/system'

export default {
  directives: {
    waves
  },
  components: {

  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20,
        merchantName: undefined,
        goodsName: undefined,
        relationType: undefined,
        activityThemeId: this.$route.query.activityThemeId
      },
      relationType: {
        0: '全部',
        1: '未绑定',
        2: '绑定'
      },
      tableKey: 0,
      activityThemeName: undefined
    }
  },
  created() {
    this.getList()
    if (this.$route.query.activityThemeName) {
      this.activityThemeName = this.$route.query.activityThemeName
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      activityThemeGetGoodsPage(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
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
    bind(row) {
      const params = {
        activityThemeId: this.listParams.activityThemeId,
        goodsId: row.id,
        merchantId: row.merchantId,
        relationType: row.bindingState
      }
      activityThemeSetRelationGoods(params).then(data => {
        this.getList()
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.title {
  font-weight: bold;
  font-size: 14px;
  line-height: 30px;
  color: #666;
}
</style>
