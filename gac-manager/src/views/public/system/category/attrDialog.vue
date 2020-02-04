<template>
  <el-dialog title="选择类目属性"
             :visible.sync="dialogTableVisible">
    <el-input style="width: 195px;"
              placeholder="请输入类目属性名称"
              v-model="listParams.categoryAttributesName"> </el-input>
    <el-button type="primary"
               class="btn"
               v-waves
               @click="getList">查询</el-button>
    <el-table :data="attrList"
              ref="attrTable"
              highlight-current-row
              @selection-change="tableCurrentChange"
              style="width: 100%">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
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
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="listParams.offset"
                     :page-sizes="[10,20,30,50]"
                     :page-size="listParams.limit"
                     layout="total, prev, pager, next"
                     :total="total"> </el-pagination>
    </div>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="selectAttr">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { categoryAttributesPage } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  props: {
    categoryAttributesList: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      id: undefined,
      attributeSelected: [],
      dialogTableVisible: false,
      listParams: {
        offset: 1,
        limit: 10,
        categoryAttributesName: '',
        catId: undefined
      },
      total: 0,
      selectedName: [],
      attrList: [],
      textTypeMap: {
        0: '文本框',
        1: '下拉框'
      },
      mustMap: {
        0: '否',
        1: '是'
      }
    }
  },
  methods: {
    getList() {
      categoryAttributesPage(this.listParams).then(data => {
        this.attrList = data.data.records
        this.total = data.data.total
        // 数据回显
        // if (this.categoryAttributesList.length) {
        //   this.$nextTick(() => {
        //     let i = 0
        //     let result = this.attrList.some(item => {
        //       this.categoryAttributesList.forEach(subItem => {
        //         if (item.id === subItem.id) {
        //           this.$refs.attrTable.toggleRowSelection(this.attrList[i], true)
        //         }
        //       })
        //       i++
        //     })
        //   })
        // }
      })
    },
    openDialog(id) {
      this.dialogTableVisible = true
      this.listParams.catId = id
      this.getList()
    },
    tableCurrentChange(val) {
      this.selectedName = val
    },
    selectAttr() {
      this.dialogTableVisible = false
      this.$emit('selectAttr', this.selectedName)
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
