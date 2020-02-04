<template>
  <el-dialog title="关联SKU"
             :visible.sync="dialogTableVisible">
    <el-input style="width: 195px;"
              placeholder="请输入属性名称"
              v-model="listParams.specsName"> </el-input>
    <el-button type="primary"
               class="btn"
               v-waves
               @click="getList">查询</el-button>
    <span class="tip" style="color: red;"> 提示：最多选择四项SKU关联</span>
    <el-table :data="skuList"
              ref="enterpriseTable"
              highlight-current-row
              @selection-change="tableCurrentChange"
              style="width: 100%">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column property="specsName"
                       label="属性名称"></el-table-column>
      <el-table-column label="属性值">
        <template slot-scope="{ row }">
          <span>{{getAttrValue(row.specsAttrsList)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="listParams.offset"
                     layout="total, prev, pager, next"
                     :total="total"> </el-pagination>
    </div>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="selectSku">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { skuPage } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      attributeSelected: [],
      dialogTableVisible: false,
      listParams: {
        offset: 1,
        limit: 10,
        specsName: ''
      },
      total: 0,
      selectedName: [],
      skuList: []
    }
  },
  methods: {
    getList() {
      skuPage(this.listParams).then(data => {
        this.skuList = data.data.records
        this.total = data.data.total
      })
    },
    openDialog() {
      this.dialogTableVisible = true
      this.getList()
    },
    tableCurrentChange(val) {
      this.selectedName = val
    },
    selectSku() {
      if (this.selectedName.length > 4) {
        this.$notify({
          title: '警告',
          message: '最多选择四项SKU关联',
          type: 'warning'
        })
        return
      }
      this.dialogTableVisible = false
      this.$emit('selectSku', this.selectedName)
    },
    getAttrValue(specsAttrsList) {
      const attrList = specsAttrsList.map(item => item.attrValue)
      return attrList.join(', ')
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
