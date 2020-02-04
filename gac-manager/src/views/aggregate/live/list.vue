
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <label class="filter-label">直播编号/申请用户：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.idOrName"> </el-input>

    &nbsp;
    <label class="filter-label">状态：</label>
    <el-select v-model="listQuery.isCheck" clearable placeholder="状态">
      <el-option
        v-for="(value, key) in auditState"
        :key="key"
        :label="value"
        :value="key">
      </el-option>
    </el-select>

    &nbsp;
    <label class="filter-label">类别：</label>
    <el-select v-model="listQuery.catId" clearable placeholder="类别">
      <el-option
        v-for="(category, index) in categories"
        :key="index"
        :label="category.catName"
        :value="category.id">
      </el-option>
    </el-select>
  </div>

  <div class="filter-container">
    <el-button type="primary" icon="el-icon-search" v-waves @click="handleFilter">查询</el-button>
  </div>

  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column type="expand">
      <template slot-scope="{ row }">
        <el-form label-position="left" inline class="expand-table">
          <el-form-item label="企业名称：">
            <span>{{row.companyName || '-'}}</span>
          </el-form-item>
          <el-form-item label="更新时间：">
            <span>{{row.updateTime || '-'}}</span>
          </el-form-item>
          <el-form-item label="审核状态：">
            <span>{{auditState[row.isCheck]}}</span>
          </el-form-item>
          <el-form-item label="审核描述：">
            <span>{{row.checkDesc || '-'}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="直播编号">
      <template slot-scope="{ row }">
        <span>{{row.id}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="栏目">
      <template slot-scope="{ row }">
        <span>{{row.catName}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="直播名称">
      <template slot-scope="{ row }">
        <span>{{row.liveTitle}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="300px" align="center" label="申请用户">
      <template slot-scope="{ row }">
        <span>{{row.userName}}</span>
      </template>
    </el-table-column>
  
    <el-table-column width="110px" align="center" label="状态">
      <template slot-scope="{ row }">
        <span>{{auditState[row.isCheck]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column fixed="right" align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-dropdown @command="handleCommand" v-if="row.isCheck == 0 || row.isCheck == 2">
          <span class="el-dropdown-link">
            审核操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="row.isCheck == 0 || row.isCheck == 2" :command="{row, state: 1, $index}">审核通过</el-dropdown-item>
            <el-dropdown-item v-if="row.isCheck == 0" :command="{row, state: 2, $index}">审核拒绝</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
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
  page,
  delObj
} from '@/api/aggregate/live'
import {
  page as getCategories
} from '@/api/aggregate/liveCategory'
import AuditDialog from './auditDialog'
import waves from '@/directive/waves' // 水波纹指令

const getInitQuery = () => {
  return {
    offset: 1,
    limit: 20,
    catId: undefined,
    isCheck: undefined,
    idOrName: undefined
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
      categories: [],
      total: null,
      listLoading: true,
      listQuery: getInitQuery(),
      tableKey: 0
    }
  },
  computed: {
  },
  watch: {
    dateValue(value) {
      this.listQuery.startTime = value ? value[0] : undefined
      this.listQuery.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getList()
    getCategories({ size: 100 }).then(response => response.data.records).then(data => {
      this.categories = data.filter(category => {
        return category.isShow === 0
      })
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery)
        .then(data => {
          this.list = data.data.records
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
      dialog.form.liveId = +row.id
      dialog.form.isCheck = state
      this.index = index
    },
    auditSuccess(form) {
      this.list[this.index].isCheck = form.isCheck
    },
    handleCommand({ row, state, $index }) {
      this.audit(row, state, $index)
    },
    handleDelete(row) {
      this.$confirm(`确定删除此直播申请？`, '提示', {
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

