<template>
  <el-dialog
    :title="category === 3 ? '推荐-作品': '推荐-商品'"
    :visible.sync="dialogTableVisible"
  >
    <el-form
      :inline="true"
      :model="listParams"
      ref="notifyListQueryForm"
      label-width="100px"
      class="notifyListQueryForm"
    >
      <el-form-item :label="category === 3 ? '作品名称:': '商品名称:'">
        <el-input
          @keyup.enter.native="handleFilter"
          style="width: 195px;"
          v-model="listParams.goodsName"
        > </el-input>
      </el-form-item>
      <el-form-item :label="category === 3 ? '设计师名称:': '商家名称:'">
        <el-input
          @keyup.enter.native="handleFilter"
          style="width: 195px;"
          v-model="listParams.merchantName"
        > </el-input>
      </el-form-item>
      <el-button
        type="primary"
        class="btn"
        v-waves
        @click="getList"
      >查询</el-button>
      <p class="tip"> 提示：单击以下选项即可选中该商品</p>
    </el-form>
    <el-table
      :data="goodsList"
      ref="enterpriseTable"
      highlight-current-row
      @current-change="tableCurrentChange"
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
        :label="category === 3 ? '作品名称': '商品名称'"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsName || row.caseName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="商品图片"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.imgUrl"
            width="50"
            height="50"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        :label="category === 3 ? '设计师名称': '商家名称'"
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
          <span>{{row.brandName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="300px"
        align="center"
        label="商品分类"
      >
        <template slot-scope="{ row }">
          <span>{{row.categoryName || row.worksCategories}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="库存"
        v-if="category !== 3"
      >
        <template slot-scope="{ row }">
          <span>{{row.stockNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="300px"
        align="center"
        label="价格"
        v-if="category !== 3"
      >
        <template slot-scope="{ row }">
          <span>￥{{row.lowPrice}} ~ ￥{{row.highPrice}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, prev, pager, next"
        :total="total"
      > </el-pagination>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="selectGoods"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { associatedGoodsList } from '@/api/public/jewelryRing'
import { designWork } from '@/api/public/dm'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'chooseGoods',
  directives: {
    waves
  },
  data() {
    return {
      dialogTableVisible: false,
      category: 0,
      listParams: {
        offset: 1,
        limit: 10,
        goodsName: '',
        merchantName: '',
        caseName: '',
        userName: ''
      },
      total: 0,
      selectedName: {},
      goodsList: []
    }
  },
  methods: {
    getList(type = 1) {
      this.category = type
      if (type === 3) {
        // 设计师作品
        this.listParams.caseName = this.listParams.goodsName
        this.listParams.userName = this.listParams.merchantName
        designWork(this.listParams).then(data => {
          this.goodsList = data.data.records
          this.total = data.data.total
        })
      } else {
        // 珠宝店商品
        associatedGoodsList(this.listParams).then(data => {
          this.goodsList = data.data.records
          this.total = data.data.total
        })
      }
    },
    tableCurrentChange(val) {
      this.selectedName = val
    },
    selectGoods() {
      this.dialogTableVisible = false
      this.$emit('selectGoods', this.selectedName)
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    }
  }
}
</script>

<style scoped>
table img {
  width: 100px;
  height: 100px;
}
</style>
