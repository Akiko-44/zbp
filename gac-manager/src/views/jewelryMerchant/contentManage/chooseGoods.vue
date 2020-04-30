<template>

  <el-dialog
    title="推荐-商品"
    :visible.sync="dialogTableVisible"
  >
    <el-form
      :inline="true"
      :model="listParams"
      ref="chooseGoodsForm"
      label-width="100px"
      class="chooseGoodsForm"
    >
      <el-form-item>
        <el-input
          @keyup.enter.native="handleFilter"
          style="width: 195px;"
          placeholder="请输入商品名称"
          v-model="listParams.goodsName"
        > </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          @keyup.enter.native="handleFilter"
          style="width: 195px;"
          placeholder="请输入商品名称"
          v-model="listParams.merchantName"
        > </el-input>
      </el-form-item>
      <el-button
        type="primary"
        class="btn"
        v-waves
        @click="getList"
      >查询</el-button>
      <span class="tip"> 提示：单击以下选项即可选中该商品</span>
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
        label="商品名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="商品图片"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.imgUrl"
            width="100"
          />
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
        align="center"
        label="所属品牌"
      >
        <template slot-scope="{ row }">
          <span>{{row.brandName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
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
        width="200px"
        align="center"
        label="价格"
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
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'chooseGoods',
  directives: {
    waves
  },
  data() {
    return {
      dialogTableVisible: false,
      listParams: {
        offset: 1,
        limit: 10,
        goodsName: '',
        merchantName: '',
        contentId: undefined
      },
      total: 0,
      selectedName: {},
      goodsList: []
    }
  },
  methods: {
    getList() {
      associatedGoodsList(this.listParams).then(data => {
        this.goodsList = data.data.records
        this.total = data.data.total
      })
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
