
<template>
  <div class="page-container calendar-list-container">
    <div>
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="makeWorkListQueryForm"
        label-width="90px"
        class="listQueryForm"
      >
        <el-form-item label="商品名称或ID:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 200px;"
            v-model.trim="listQuery.goodsName"
          > </el-input>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          class="primary-btn-sm"
          @click="handleFilter"
        >查询</el-button>
        <!-- <el-button
          type="text"
          @click="resetQuery"
        >清空条件</el-button> -->
      </el-form>
    </div>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      highlight-current-row
      class="custom-table"
    >
      <el-table-column
        align="center"
        label="商品ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="商品名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="text"
            @click="$router.push({ name: 'addWork', query: { id: row.id } })"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="text"
            @click="handleDelete(row)"
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
  </div>
</template>

<script>
import {
  page,
  delObj
} from '@/api/jewelryMerchant/works'
import { goodsSource } from '@/utils/mixins/order'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 10
      },
      listQuery: {
        goodsName: undefined,
        goodsType: 3
      },
      auditState: [
        { value: 0, label: '待审核' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核不通过' }
        //      { value: 3, label: '上架' },
        //      { value: 4, label: '下架' }
      ],
      auditStateMap: {
        0: '待审核',
        1: '审核通过',
        2: '未通过'
        //      3: '上架',
        //      4: '下架'
      },
      goodsSource,
      index: undefined,
      multipleSelection: [],
      rules: {
        id: [
          { pattern: /^[0-9]*$/, message: '商品ID需为纯数字', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
      this.$refs['makeWorkListQueryForm'].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    resetQuery() {
      this.listQuery.goodsName = undefined
      this.$refs['makeWorkListQueryForm'].resetFields()
      //	      this.$router.replace({ name: 'worksList' })
      this.getList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确认删除该草稿？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        customClass: 'custom-confirm-sm'
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
              this.getList()
            })
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
.el-button {
  margin-bottom: 5px;
}
</style>
