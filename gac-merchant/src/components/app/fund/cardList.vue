
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-button type="primary" v-waves @click="handleAdd" v-if="list.length == 0">添加银行卡</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="180px" align="center" label="开户姓名">
      <template slot-scope="{ row }">
        <span>{{row.accountName}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="开户银行">
      <template slot-scope="{ row }">
        <span>{{row.bankName}}</span>
      </template>
    </el-table-column>

    <el-table-column width="200px" align="center" label="银行帐号">
      <template slot-scope="{ row }">
        <span>{{row.accountNo}}</span>
      </template>
    </el-table-column>

    <el-table-column width="200px" align="center" label="开户地址">
      <template slot-scope="{ row }">
        <span>{{row.accountBankName || '-'}}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button
          type="danger"
          size="small"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>

  </el-table>

  <CardDialog ref="dialog" @success="success" />
</div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { delCard, cardList } from '@/api/common/fund'
import CardDialog from './cardDialog'

const getInitQuery = () => {
  return {
  }
}

export default {
  directives: {
    waves
  },
  components: {
    CardDialog
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: getInitQuery(),
      tableKey: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      cardList(this.listQuery)
        .then(data => {
          this.list = data.data
          this.listLoading = false
        })
    },
    handleAdd() {
      const dialog = this.$refs.dialog
      dialog.dialogFormVisible = true
      dialog.resetForm('form')
    },
    success() {
      this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前银行卡？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delCard(row.id)
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

