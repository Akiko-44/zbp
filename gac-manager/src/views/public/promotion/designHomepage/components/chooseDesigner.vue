<template>
  <el-dialog
    title="选择设计师"
    :visible.sync="dialogTableVisible"
  >
    <el-input
      style="width: 195px;"
      placeholder="请输入设计师名称"
      v-model="listParams.name"
    >
    </el-input>
    <el-button
      type="primary"
      class="btn"
      v-waves
      @click="getList"
    >查询</el-button>
    <span class="tip"> 提示：单击以下选项即可选中该设计师</span>
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
        label="设计师ID"
      ></el-table-column>
      <el-table-column
        align="center"
        property="name"
        label="设计师名称"
      ></el-table-column>
      <el-table-column
        align="center"
        label="上架作品"
      >
        <template slot-scope="{ row }">
          <span>{{ row.goodsCount || "0" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="createTime"
        label="入驻时间"
      ></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listParams.limit"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="selectDesigner"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getCompaniesByName } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'chooseDesigner',
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
        companyName: '',
        merchantType: 2,
        moduleId: undefined
      },
      total: 0,
      selectedName: {},
      enterpriseList: [],
      index: 0
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
      if (val) {
        this.selectedName = val
        this.selectedName.index = this.index
      }
    },
    selectDesigner() {
      if (JSON.stringify(this.selectedName) === '{}') {
        this.$notify({
          title: '警告',
          message: '请选择设计师',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      this.dialogTableVisible = false
      this.$emit('selectDesigner', this.selectedName)
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
