<template>
  <div class="app-container calendar-list-container">
    <!-- <div class="filter-container">
      <el-button @click="$router.push({name: 'editDesigner'})"
                 type="primary"
                 icon="edit">添加设计师</el-button>
    </div> -->

    <div class="filter-container">
      <label class="filter-label">设计师姓名：</label>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 195px;"
        placeholder="请输入设计师姓名"
        v-model="listQuery.userName"
      > </el-input>
      &nbsp;
      <label class="filter-label">联系方式：</label>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 195px;"
        placeholder="请输入联系方式"
        v-model="listQuery.mobile"
      > </el-input>
      &nbsp;
      <label class="filter-label">设计师名称：</label>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 195px;"
        placeholder="请输入设计师名称"
        v-model="listQuery.merchantName"
      > </el-input>
    </div>
    <div class="filter-container">
      <label class="filter-label">设计师地区：</label>
      <v-city
        @change="cityChange"
        ref="city"
      />
      &nbsp;
      <label class="filter-label">审核状态：</label>
      <el-select
        v-model="listQuery.auditState"
        clearable
        placeholder="审核状态"
      >
        <el-option
          v-for="item in status"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      &nbsp;
      <!-- <label class="filter-label">设计师分类：</label>
      <el-select
        v-model="listQuery.cateFirst"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in designType"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select> -->
      &nbsp;
      <el-button
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
    </div>
    <el-table
      :key='tableKey'
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        width="100px"
        align="left"
        label="ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="姓名"
      >
        <template slot-scope="{ row }">
          <span>{{row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120px"
        align="center"
        label="联系方式"
      >
        <template slot-scope="{ row }">
          <span>{{row.mobile}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="设计师"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="状态"
      >
        <template slot-scope="{ row }">
          <span>{{auditState[row.auditState]}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="110px"
                       align="center"
                       label="分类">
        <template slot-scope="{ row }">
          <span>{{row.cateFirst}}</span>
        </template>
      </el-table-column> -->

      <el-table-column
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            @click="$router.push({ name: 'designerDetail', query: { id: row.id } })"
          >
            查看
          </el-button>
          <!-- <el-button size="small"
                     type="success"
                     @click="$router.push({ name: 'editDesigner', query: { id: row.id } })">
            编辑
          </el-button> -->
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(row)"
          >删除</el-button>
          &nbsp;
          <el-dropdown
            @command="handleCommand"
            v-if="row.auditState == 1 || row.auditState == 3"
          >
            <span class="el-dropdown-link">
              审核操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="row.auditState == 1 || row.auditState == 3"
                :command="{row, state: 2, $index}"
              >审核通过</el-dropdown-item>
              <el-dropdown-item
                v-if="row.auditState == 1"
                :command="{row, state: 3, $index}"
              >审核拒绝</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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

    <audit-dialog
      ref="auditDialog"
      @success="auditSuccess"
    />
  </div>
</template>

<script>
import {
  page,
  delObj,
  categoryList
} from '@/api/dm/designer'
import auditDialog from './auditDialog'
import waves from '@/directive/waves' // 水波纹指令
import VCity from '@/components/app/city'
import {
  audit
} from '@/api/dm/designer'

export default {
  directives: {
    waves
  },
  components: {
    auditDialog,
    VCity
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: {
        mobile: undefined,
        userName: undefined,
        merchantName: undefined,
        auditState: undefined,
        province: undefined,
        city: undefined,
        area: undefined,
        cateFirst: undefined
      },
      tableKey: 0,
      status: [
        { value: 1, label: '审核中' },
        { value: 2, label: '审核通过' },
        { value: 3, label: '审核不通过' }
      ],
      auditState: {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      },
      designType: [],
      index: undefined
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.fetchData()
    this.getCategoryList()
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      page(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    getCategoryList() {
      this.listLoading = true
      categoryList({ flag: 0 })
        .then(data => {
          const self = this
          data.data.forEach(function(v) {
            self.designType.push({
              value: v.id,
              label: v.name
            })
          })
          this.listLoading = false
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
      this.$router.replace({ name: 'designList', query: { page: val }})
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前设计师？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
            })
        })
    },
    handleApprove(row) {
      const auditState = 2
      this.$confirm(`是否通过审核？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          audit({
            auditState,
            opinion: '',
            designerId: row.id
          })
            .then(() => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              row.auditState = auditState
            })
        })
    },
    audit(row, state, index) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.designerId = row.id
      dialog.form.auditState = state
      this.index = index
    },
    auditSuccess(form) {
      this.list[this.index].auditState = form.auditState
    },
    handleCommand({ row, state, $index }) {
      this.audit(row, state, $index)
    },
    cityChange(cities) {
      const fields = ['province', 'city', 'area']
      fields.forEach((value, index) => {
        this.listQuery[value] = cities[index] && cities[index].regionName
      })
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
</style>
