<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="brandListQueryForm"
        label-width="101px"
        class="listQueryForm"
      >
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            placeholder="请输入品牌名称"
            style="width: 195px;"
            v-model="listParams.brandName"
          ></el-input>
        </el-form-item>
        <el-date-picker
          v-model="dateValue"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
        <el-button
          type="primary"
          size="mini"
          v-if="alldelete"
          @click="handleDelete(multipleSelection)"
        >全部删除</el-button>
        <el-button type="primary" @click="gotoMananger('0')">新增</el-button>
      </el-form>
    </div>

    <el-table
      :data="list"
      v-loading.body="listLoading"
      @selection-change="handleSelectionChange"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column align="center" width="100" prop="brandName" label="品牌名称"></el-table-column>
      <el-table-column align="center" width="200" label="品牌图片">
        <template slot-scope="{ row }">
          <img v-if="row.pic" :src="row.pic | setImg" class="avatar" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        prop="merchantCount"
        label="绑定商户数量"
      >
      </el-table-column>
      <el-table-column align="center" width="120" prop="goodsNum" label="是否绑定商品"></el-table-column>
      <el-table-column align="center" width="300" prop="createTime" label="添加时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="small"@click="$router.push({ name: 'merchantChangeList', query: { brandID: row.id,pic: row.pic,brandName: row.brandName } })">绑定商家</el-button>
          <el-button type="primary" size="small"@click="$router.push({ name: 'brandmanager', query: { brandID: row.id,pic: row.pic,brandName: row.brandName } })">更改</el-button>
          <el-button type="danger" size="small" plain @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <update-dialog ref="brandUdpateDialog" @success="success" />
  </div>
</template>

<script>
import { selectBrandMerchantPage, delBrands } from '@/api/public/brand'
import waves from '@/directive/waves' // 水波纹指令 src\api\public\brand.js
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
      // 时间组件参数
      dateValue: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20,
        brandName: undefined,
        startTime: undefined,
        endTime: undefined
      },
      index: undefined,
      multipleSelection: '',
      alldelete: false
    }
  },
  watch: {
    dateValue(value) {
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
    },
    $route: 'fetchData'
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
      selectBrandMerchantPage(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs['brandListQueryForm'].validate(valid => {
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
      this.$router.replace({ name: 'brand', query: { page: val }})
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
    },
    // 新增/修改
    gotoMananger(brandID) {
      this.$router.push({ name: 'brandmanager', query: { brandID: brandID }})
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
/deep/ td.complaint-title {
  color: #409eff;
  cursor: pointer;
}
</style>
