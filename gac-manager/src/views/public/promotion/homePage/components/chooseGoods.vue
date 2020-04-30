<template>

  <el-dialog
    title="选择商品"
    :visible.sync="dialogTableVisible"
  >
    <el-form
      :inline="true"
      :model="listParams"
      ref="notifyListQueryForm"
      label-width="100px"
      class="notifyListQueryForm"
    >
      <el-form-item label="商品名称:">
        <el-input
          style="width: 195px;"
          v-model="listParams.goodsName"
        > </el-input>
      </el-form-item>
      <el-form-item
        label="所属商户:"
        v-if="!hasMerchant"
      >
        <el-input
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
        width="100px"
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
        width="100px"
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
        label="所属商户"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="价格"
      >
        <template slot-scope="{ row }">
          <span>￥{{row.lowPrice}}<span v-if="row.lowPrice!==row.highPrice">~ ￥{{row.highPrice}}</span></span>
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
        width="100px"
        align="center"
        label="上架时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.onSaleTime}}</span>
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
      hasMerchant: false,
      listParams: {
        offset: 1,
        limit: 10,
        goodsName: '',
        merchantName: '',
        merchantId: undefined,
        goodsType: 0
      },
      total: 0,
      selectedName: {},
      goodsList: [],
      index: 0
    }
  },
  methods: {
    getList() {
      if (this.$route.path.includes('businessDetail')) { this.hasMerchant = true }
      associatedGoodsList(this.listParams).then(data => {
        this.goodsList = data.data.records
        this.total = data.data.total
      })
    },
    tableCurrentChange(val) {
      this.selectedName = val
      this.selectedName.index = this.index
    },
    selectGoods() {
      if (JSON.stringify(this.selectedName) == '{}') {
        this.$notify({
          title: '成功',
          message: '请选择要推荐的商品',
          type: 'warning',
          duration: 2000
        })
        return false
      }
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
