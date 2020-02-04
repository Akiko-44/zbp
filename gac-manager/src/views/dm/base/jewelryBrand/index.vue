<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="listParams"
               ref="brandListQueryForm"
               label-width="101px"
               class="listQueryForm">
        <el-form-item label="品牌名称:">
          <el-input @keyup.enter.native="handleFilter"
                    style="width: 195px;"
                    v-model="listParams.brandName"> </el-input>
        </el-form-item>
        <el-button type="primary"
                   v-waves
                   icon="el-icon-search"
                   @click="handleFilter">查询</el-button>
        <el-button type="text"
                   @click="resetQuery">清空条件</el-button>
        <el-button type="primary"
                   @click="handleAdd()">增加品牌</el-button>
        <el-button type="primary"
                   size="mini"
                   v-if="alldelete"
                   @click="handleDelete(multipleSelection)">全部删除</el-button>
      </el-form>
    </div>

    <el-table :data="list"
              v-loading.body="listLoading"
              @selection-change="handleSelectionChange"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column type="selection"
                       width="55"
                       align="center">
      </el-table-column>
      <el-table-column align="center"
                       width="300"
                       prop="brandName"
                       label="品牌名称">
      </el-table-column>
      <el-table-column align="center"
                       width="300"
                       label="品牌图片">
        <template slot-scope="{ row }">
          <img v-if="row.pic"
               :src="row.pic | setImg"
               class="avatar" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <el-button type="primary"
                     size="small"
                     @click="handleUpdate(row)">更改</el-button>
          <el-button type="danger"
                     size="small"
                     plain
                     @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listParams.offset"
                     :page-sizes="[10,20,30,50]"
                     :page-size="listParams.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <update-dialog ref="brandUdpateDialog"
                   @success="success" />

  </div>
</template>

<script>
import { getBrandList, saveBrand, delBrands } from '@/api/dm/brand'
import waves from '@/directive/waves' // 水波纹指令
import updateDialog from './updateDialog'

export default {
  directives: {
    waves
  },
  components: {
    updateDialog
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20,
        brandName: undefined
      },
      index: undefined,
      multipleSelection: '',
      alldelete: false
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      getBrandList(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs['brandListQueryForm'].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.$router.replace({ name: 'brandList', query: { page: val }})
    },
    resetQuery() {
      this.listParams.brandName = undefined
      this.$refs['brandListQueryForm'].resetFields()
      this.$router.replace({ name: 'brandList' })
      this.getList()
    },
    handleUpdate(data) {
      console.log(data)
      const dialog = this.$refs.brandUdpateDialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('brandform', () => {
        dialog.form = JSON.parse(JSON.stringify(data))
        dialog.id = data.id
      })
    },
    handleAdd() {
      const dialog = this.$refs.brandUdpateDialog
      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('brandform')
    },
    handleDelete(id) {
      this.$confirm(`确定删除当前品牌？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBrands(id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
    },
    success(data) {
      data.moduleType = 1
      saveBrand(data).then(() => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleSelectionChange(val) {
      let str = ''
      this.alldelete = val.length !== 0
      val.map(item => {
        str += item.id + ','
      })
      this.multipleSelection = str
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
}
</style>
