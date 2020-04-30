<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :inline="true"
        label-width="100px"
      >
        <el-form-item
          label="Group:"
          prop="groupId"
        >
          <el-select
            v-model="listParams.groupId"
            placeholder="请选择Group"
            clearable
          >
            <el-option
              v-for="item in groupList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="账号:">
          <el-select
            v-model="listParams.userId"
            placeholder="请选择账号"
            clearable
          >
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时间区间:">
          <el-date-picker
            v-model="createTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
          />
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
      </el-form>
    </div>

    <el-table
      v-loading.body="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="Group"
      >
        <template slot-scope="{ row }">
          <span>{{ row.groupName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="账号"
      >
        <template slot-scope="{ row }">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="上链次数合计"
      >
        <template slot-scope="{ row }">
          <span>{{ row.count }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="交易费用合计（eth）"
      >
        <template slot-scope="{ row }">
          <span>{{ row.cost }}</span>
        </template>
      </el-table-column>

    </el-table>

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10,20,30,50]"
        :total="total"
        :page-size="listParams.size"
        :current-page.sync="listParams.current"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getPrivateAccountStatistics } from '@/api/accountBook'
import { getUserGroup } from '@/api/group'
import { getAllUser } from '@/api/account'

export default {

  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        current: 1,
        size: 20,
        groupId: undefined,
        userId: undefined,
        startTime: '',
        endTime: ''
      },
      groupList: [],
      userList: [],
      createTime: []
    }
  },
  created() {
    this.getGroupList()
    this.getList()
    this.getAllUser()
  },
  methods: {
    getGroupList() {
      getUserGroup().then(data => {
        this.groupList = data.data
        this.groupList.map(item => {
          item.label = item.group.join('-->')
        })
      })
    },
    getAllUser() {
      getAllUser().then(data => {
        this.userList = data.data
      })
    },
    getList() {
      this.listLoading = true
      this.listParams.startTime = this.createTime ? this.createTime[0] : undefined
      this.listParams.endTime = this.createTime ? this.createTime[1] : undefined
      getPrivateAccountStatistics(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs.listQueryForm.validate(valid => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listParams.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.current = val
      this.getList()
    }
  }
}
</script>
