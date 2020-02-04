<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="listParams"
               :rules="rules"
               ref="testQueryForm"
               label-width="100px"
               class="testQueryForm">
        <el-form-item label="用户ID:"
                      prop="userId">
          <el-input @keyup.enter.native="handleFilter"
                    style="width: 195px;"
                    v-model="listParams.userId"> </el-input>
        </el-form-item>
        <el-form-item label="手机号码:"
                      prop="mobilePhone">
          <el-input @keyup.enter.native="handleFilter"
                    style="width: 195px;"
                    v-model="listParams.mobilePhone"> </el-input>
        </el-form-item>
        <el-button type="primary"
                   v-waves
                   icon="el-icon-search"
                   @click="handleFilter">查找</el-button>
        <el-button type="primary"
                   v-waves
                   @click="$router.push({ name:'testUserModify'})">添加</el-button>
      </el-form>
    </div>

    <el-table :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column type="index"
                       align="center"
                       width="50"
                       label="序号">
      </el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="用户ID">
        <template slot-scope="{ row }">
          <span>{{row.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="手机号码">
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px"
                       align="center"
                       label="添加时间">
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       align="left"
                       label="操作">
        <template slot-scope="{ row, $index }">
          <!-- <el-button class="auditBtn"
                     size="small"
                     type="primary"
                     @click="$router.push({ name:'testUserModify',query:{id:row.id}})">修改</el-button> -->
          <el-button class="auditBtn"
                     size="small"
                     type="warning"
                     @click="delTest(row.userId, $index)">删除</el-button>
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
import { getTestUser, delTestUser } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      type: 1,
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        userId: '',
        mobilePhone: ''
      },
      rules: {
        userId: [
          { pattern: /^[0-9]*$/, message: '请输入正确的用户ID', trigger: 'blur' }
        ],
        mobilePhone: [
          { pattern: /^[0-9]*$/, message: '请输入正确的手机号', trigger: 'blur' }
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
      getTestUser(this.type, this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    delTest(id, index) {
      this.$confirm('确认删除该用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delTestUser(this.type, id).then(data => {
          this.list.splice(index, 1)
        }).catch(() => { })
      })
    },
    handleFilter() {
      this.$refs['testQueryForm'].validate((valid) => {
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
      this.listParams.offset = val
      this.getList()
    },
    resetQuery() {
      this.listParams.userId = ''
      this.listParams.mobilePhone = ''
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
</style>
