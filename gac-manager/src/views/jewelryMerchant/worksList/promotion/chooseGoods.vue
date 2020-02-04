<template>

  <el-dialog
    title="选择商品名称"
    :visible.sync="dialogTableVisible"
  >
    <el-input
      style="width: 195px;"
      v-model="listParams.goodsName"
    > </el-input>
    <el-button
      type="primary"
      class="btn"
      v-waves
      @click="getList"
    >查询</el-button>
    <span class="tip"> 提示：单击以下选项即可选中该商品</span>
    <el-table
      :data="goodsList"
      ref="enterpriseTable"
      highlight-current-row
      @current-change="tableCurrentChange"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="50"
      ></el-table-column>
      <el-table-column
        align="center"
        property="goodsId"
        width="100"
        label="商品ID"
      ></el-table-column>
      <el-table-column
        align="center"
        property="goodsName"
        label="商品名称"
      ></el-table-column>
      <el-table-column
        align="center"
        label="所属品牌"
      >
        <template slot-scope="{ row }">
          <span>{{ row.brandName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="商品分类"
      >
        <template slot-scope="{ row }">
          <span>{{ row.categoryName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="stockNum"
        label="总库存"
      ></el-table-column>
      <el-table-column
        align="center"
        label="价格(元)"
      >
        <template slot-scope="{ row }">
          <span>{{ `￥${row.lowPrice}` }}</span>
          <span v-if="row.lowPrice !== row.hightPrice">{{ ` ~ ￥${row.hightPrice}` }}</span>
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
import { groupGetGoods } from '@/api/jewelryMerchant/works'
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
        goodsName: ''
      },
      total: 0,
      selectedName: {},
      goodsList: []
    }
  },
  methods: {
    getList() {
      groupGetGoods(this.listParams).then(data => {
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
