<template>

  <el-dialog
    title="推荐-店铺"
    :visible.sync="dialogTableVisible"
  >
    <el-input
      style="width: 195px;"
      placeholder="请输入店铺名称"
      v-model="listParams.name"
    > </el-input>
    <el-input
      style="width: 195px;"
      placeholder="请输入企业名称"
      v-model="listParams.companyName"
    > </el-input>
    <el-button
      type="primary"
      class="btn"
      v-waves
      @click="getList"
    >查询</el-button>
    <span class="tip"> 提示：单击以下选项即可选中该店铺</span>
    <el-table
      :data="enterpriseList"
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
        property="id"
        width="100"
        label="商户ID"
      ></el-table-column>
      <el-table-column
        align="center"
        property="name"
        label="店铺名称"
      ></el-table-column>
      <el-table-column
        align="center"
        property="companyName"
        label="企业名称"
      ></el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="LOGO"
      >
        <template slot-scope="{ row }">
          <img
            v-if="row.logo"
            :src="row.logo | setImg"
            class="avatar"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="主营"
      >
        <template slot-scope="{ row }">
          <span
            v-for="(item,i) in row.categoryList"
            :key="i"
          > {{item.secondCatName}} </span>
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
        @click="selectEnterprise"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getCompaniesByName } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'chooseEnterprise',
  directives: {
    waves
  },
  data() {
    return {
      dialogTableVisible: false,
      listParams: {
        offset: 1,
        limit: 5,
        name: '',
        companyName: ''
      },
      total: 0,
      selectedName: {},
      enterpriseList: []
    }
  },
  methods: {
    getList() {
      getCompaniesByName(this.listParams).then(data => {
        this.enterpriseList = data.data.records
        this.total = data.data.total
      })
    },
    tableCurrentChange(val) {
      this.selectedName = val
    },
    selectEnterprise() {
      this.dialogTableVisible = false
      this.$emit('selectEnterprise', this.selectedName)
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
  width: 50px;
  height: 50px;
}
</style>
