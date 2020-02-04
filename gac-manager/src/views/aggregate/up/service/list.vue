
<template>
<div class="app-container calendar-list-container">
  <!-- <div class="filter-container">
    <label class="filter-label">直播编号/申请用户：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.idOrName"> </el-input>

    &nbsp;
    <label class="filter-label">状态：</label>
    <el-select v-model="listQuery.checkStatus" clearable placeholder="状态">
      <el-option
        v-for="(value, key) in auditState"
        :key="key"
        :label="value"
        :value="key">
      </el-option>
    </el-select>
  </div>

  <div class="filter-container">
    <el-button type="primary" icon="el-icon-search" v-waves @click="handleFilter">查询</el-button>
  </div> -->

  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column width="110px" align="center" label="ID">
      <template slot-scope="{ row }">
        <span>{{row.id}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="申请企业名称">
      <template slot-scope="{ row }">
        <span>{{row.company}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="业务介绍">
      <template slot-scope="{ row }">
        <span>{{row.serviceDesc}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="300px" align="center" label="申请时间">
      <template slot-scope="{ row }">
        <span>{{row.createTime}}</span>
      </template>
    </el-table-column>
  
    <el-table-column width="110px" align="center" label="状态">
      <template slot-scope="{ row }">
        <span>{{auditState[row.checkStatus]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column fixed="right" align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button size="small" @click="$router.push({name: 'upCategoryDetail', query: {id: row.id}})">详情</el-button>
        <el-dropdown @command="handleCommand" v-if="row.checkStatus == 0 || row.checkStatus == 2">
          <span class="el-dropdown-link">
            审核操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="row.checkStatus == 0 || row.checkStatus == 2" :command="{row, state: 1, $index}">审核通过</el-dropdown-item>
            <el-dropdown-item v-if="row.checkStatus == 0" :command="{row, state: 2, $index}">审核拒绝</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>

  <audit-dialog ref="auditDialog" @success="auditSuccess" />
</div>
</template>

<script>
import {
  page
} from '@/api/aggregate/upService'
import AuditDialog from './auditDialog'
import waves from '@/directive/waves' // 水波纹指令

const getInitQuery = () => {
  return {
    offset: 1,
    limit: 20,
    checkStatus: undefined
  }
}

export default {
  directives: {
    waves
  },
  components: {
    AuditDialog
  },
  data() {
    return {
      auditState: {
        0: '待审核',
        1: '审核通过',
        2: '审核不通过'
      },
      list: [],
      total: null,
      listLoading: true,
      listQuery: getInitQuery(),
      tableKey: 0
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery)
        .then(data => {
          this.list = data.data
          this.total = data.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    },
    audit(row, state, index) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.id = row.id
      dialog.form.checkStatus = state
      this.index = index
    },
    auditSuccess(form) {
      this.list[this.index].checkStatus = form.checkStatus
    },
    handleCommand({ row, state, $index }) {
      this.audit(row, state, $index)
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
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

