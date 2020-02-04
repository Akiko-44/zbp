
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="craftListQueryForm"
        label-width="101px"
        class="listQueryForm"
      >
        <el-form-item
          label="工艺ID:"
          prop="craftId"
        >
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.craftId"
          > </el-input>
        </el-form-item>
        <el-form-item label="工艺名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.craftName"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="制造商ID:"
          prop="merchantId"
        >
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.merchantId"
          > </el-input>
        </el-form-item>
        <el-form-item label="制造商名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.merchantName"
          > </el-input>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
        <el-button
          type="text"
          @click="resetQuery"
        >清空条件</el-button>
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
        width="100px"
        align="left"
        label="工艺ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="工艺名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.craftName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120px"
        align="center"
        label="制造商名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="制造商ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantId}}</span>
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

      <el-table-column
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            type="success"
            @click="$router.push({ name: 'craftDetail', query: { id: row.id } })"
          >
            查看
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(row)"
          >删除</el-button>
          &nbsp;
          <el-dropdown
            @command="handleCommand"
            v-if="row.auditState == 1"
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

    <audit-dialog
      ref="auditDialog"
      @success="auditSuccess"
    />

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

  </div>
</template>

<script>
import {
  page,
  delObj
} from '@/api/dm/craft'
import waves from '@/directive/waves' // 水波纹指令
import auditDialog from './auditDialog'

export default {
  directives: {
    waves
  },
  components: {
    auditDialog
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
        craftId: undefined,
        craftName: undefined,
        merchantId: undefined,
        merchantName: undefined
      },
      auditState: {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      },
      index: undefined,
      rules: {
        craftId: [
          { pattern: /^[0-9]*$/, message: '工艺ID需为纯数字', trigger: 'blur' }
        ],
        merchantId: [
          { pattern: /^[0-9]*$/, message: '制造商ID需为纯数字', trigger: 'blur' }
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
      page(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.$refs['craftListQueryForm'].validate((valid) => {
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
      this.$router.replace({ name: 'craftList', query: { page: val }})
    },
    resetQuery() {
      this.listQuery.craftId = undefined
      this.listQuery.craftName = undefined
      this.listQuery.merchantId = undefined
      this.listQuery.merchantName = undefined
      this.$refs['craftListQueryForm'].resetFields()
      this.$router.replace({ name: 'craftList' })
      this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前工艺？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
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
