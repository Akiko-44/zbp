
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="listParams"
               :rules="rules"
               ref="complaintListQueryForm"
               label-width="120px"
               class="complaintListQueryForm">
        <el-form-item label="投诉人手机号:"
                      prop="mobilePhone">
          <el-input class="search-input"
                    placeholder="请输入投诉人手机号"
                    :maxlength="20"
                    @keyup.enter.native="handleFilter"
                    v-model="listParams.mobilePhone"> </el-input>
        </el-form-item>
        <el-form-item label="被投诉品牌名称:">
          <el-input class="search-input"
                    placeholder="请输入被投诉品牌名称"
                    :maxlength="20"
                    @keyup.enter.native="handleFilter"
                    v-model="listParams.brandName"> </el-input>
        </el-form-item>
        <el-form-item label="被投诉商家名称:">
          <el-input class="search-input"
                    placeholder="请输入被投诉商家名称"
                    :maxlength="20"
                    @keyup.enter.native="handleFilter"
                    v-model="listParams.merchantName"> </el-input>
        </el-form-item>
        <el-form-item label="被投诉商品名称:">
          <el-input class="search-input"
                    placeholder="请输入被投诉商品名称"
                    :maxlength="20"
                    @keyup.enter.native="handleFilter"
                    v-model="listParams.goodName"> </el-input>
        </el-form-item>
        <el-form-item label="投诉状态:">
          <el-select class="search-input"
                     v-model="listParams.state"
                     placeholder="请选择公告对象">
            <el-option v-for="item in stateList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投诉时间:">
          <el-date-picker value-format="yyyy-MM-dd"
                          type="datetimerange"
                          start-placeholder="开始"
                          end-placeholder="结束"
                          style="width:380px"
                          v-model="createTime"></el-date-picker>
        </el-form-item>
        <el-button class="search-button"
                   type="primary"
                   v-waves
                   icon="el-icon-search"
                   @click="handleFilter">查询</el-button>
        <el-button type="text"
                   @click="resetQuery">清空条件</el-button>
      </el-form>
    </div>

    <el-table :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column width="150px"
                       align="center"
                       label="投诉人手机号码">
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>

      <el-table-column width="170px"
                       align="center"
                       class-name="complaint-title"
                       label="投诉标题">
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'complaintDetail', query: { id: row.id } })">
            {{row.complaintName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px"
                       align="center"
                       label="被投诉品牌">
        <template slot-scope="{ row }">
          <span>{{row.brandName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px"
                       align="center"
                       label="被投诉商家">
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px"
                       align="center"
                       label="被投诉商家手机号码">
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px"
                       align="center"
                       label="被投诉商品">
        <template slot-scope="{ row }">
          <span>{{row.goodName}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="100px"
                       align="center"
                       label="被投诉商品条形码">
        <template slot-scope="{ row }">
          <span>{{row.refundAmount}}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="80px"
                       align="center"
                       label="状态">
        <template slot-scope="{ row }">
          <span>{{complaintState[row.state]}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px"
                       align="center"
                       label="投诉时间">
        <template slot-scope="{ row }">
          <span>{{row.complaintDate}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px"
                       align="center"
                       label="处理时间">
        <template slot-scope="{ row }">
          <span>{{row.complaintHandleDate || '-'}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right"
                       align="left"
                       label="操作">
        <template slot-scope="{ row }">
          <el-button v-if="row.state === 0"
                     style="margin-bottom: 5px;"
                     type="primary"
                     size="small"
                     @click="$router.push({ name: 'complaintDetail', query: { id: row.id } })">
            立即处理
          </el-button>
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
                     :total="total"> </el-pagination>
    </div>

  </div>
</template>

<script>
import { searchComplaint } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      createTime: [],
      listParams: {
        offset: 1,
        limit: 20,
        mobilePhone: null,
        brandName: null,
        merchantName: null,
        goodName: '',
        state: 2,
        complaintBeginDate: '',
        complaintEndDate: ''
      },
      stateList: [
        { value: 0, label: '未处理' },
        { value: 1, label: '已处理' },
        { value: 2, label: '全部' }
      ],
      complaintState: {
        0: '未处理',
        1: '已处理'
      },
      rules: {
        mobilePhone: [
          { pattern: /^[0-9]*$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
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
      this.listParams.complaintBeginDate = this.createTime ? this.createTime[0] : ''
      this.listParams.complaintEndDate = this.createTime ? this.createTime[1] : ''
      searchComplaint(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs['complaintListQueryForm'].validate((valid) => {
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
      this.$router.replace({ name: 'complaint', query: { page: val }})
    },
    resetQuery() {
      this.createTime = []
      this.$refs['complaintListQueryForm'].resetFields()
      this.$router.replace({ name: 'complaint' })
      this.getList()
    }
  }
}
</script>

<style lang="postcss" scoped>
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
.search-input {
  width: 210px;
  margin-bottom: 10px;
}
/deep/ td.complaint-title {
  color: #409eff;
  cursor: pointer;
}
</style>
