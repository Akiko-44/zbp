<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="notifyListQueryForm"
        label-width="100px"
        class="notifyListQueryForm"
      >
        <el-form-item label="企业名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.companyName"
          > </el-input>
        </el-form-item>
        <el-form-item label="添加时间:">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
        <!-- <el-button type="text"
                   @click="resetQuery">清空条件</el-button> -->
        <el-button
          v-waves
          @click="$router.push({ name:'enterprisesModify'})"
        >添加</el-button>
      </el-form>
    </div>

    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        align="center"
        label="序号"
      >
      </el-table-column>

      <el-table-column
        align="center"
        property="companyName"
        label="企业名称"
      >
      </el-table-column>

      <el-table-column
        width="200px"
        align="center"
        label="企业LOGO"
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
          <!-- <p
            v-for="(item,i) in row.categoryList"
            :key="i"
          > -->
          <span
            v-for="(item,i) in row.categoryList"
            :key="i"
          > {{item.secondCatName}} </span>
          <!-- </p> -->
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="所在城市"
      >
        <template slot-scope="{ row }">
          <span>{{ row.provinceName }}</span>
          <span v-if="row.provinceName !== row.cityName">{{ row.cityName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="是否入驻平台"
      >
        <template slot-scope="{ row }">
          <span>{{!row.merchantId ? '否' : '是'}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="企业类型"
      >
        <template slot-scope="{ row }">
          <span>{{ companyTypeMap[row.companyType] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="添加时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            class="auditBtn"
            size="small"
            @click="$router.push({ name:'enterprisesModify',query:{data:JSON.stringify(row)}})"
          >修改</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="deleteCompany(row.id, $index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>

    <!-- <audit-dialog ref="auditDialog"
                  :goodsSource="goodsSource"
                  @success="auditSuccess" /> -->
  </div>
</template>

<script>
import { getCompanyDirectory, deleteCompanyDirectory } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令
// import auditDialog from './auditDialog'

export default {
  directives: {
    waves
  },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        companyName: '',
        startTime: '',
        endTime: ''
      },
      companyTypeMap: {
        1: '专委会主任企业',
        2: '专委会副主任企业',
        3: '专委会成员',
        4: '中宝协会员',
        5: '其它成员'
      },
      index: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''
      getCompanyDirectory(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    deleteCompany(id, index) {
      this.$confirm('确认删除该企业？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteCompanyDirectory(id).then(data => {
          this.list.splice(index, 1)
        }).catch(() => { })
      })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
      // this.$router.replace({ name: this.routerName, query: { page: val }})
    },
    resetQuery() {
      this.listQuery.caseName = undefined
      // this.$refs['workListQueryForm'].resetFields()
      this.$router.replace({ name: this.routerName })
      this.getList()
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
.auditBtn {
  margin-left: 0;
}
table img {
  width: 100px;
  height: 100px;
}
</style>
