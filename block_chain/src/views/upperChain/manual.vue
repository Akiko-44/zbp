<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :inline="true"
      >
        <el-form-item label="业务平台:">
          <el-select
            v-model="listParams.platformId"
            placeholder="请选择业务平台"
          >
            <el-option
              v-for="item in platformList"
              :key="item.id"
              :label="item.displayName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区块链平台:">
          <el-select
            v-model="listParams.blockchainId"
            placeholder="请选择区块链平台"
          >
            <el-option
              v-for="item in blockChainList"
              :key="item.id"
              :label="item.blockchainName"
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
        >
          查找
        </el-button>
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
        type="index"
        align="center"
        width="50"
        label="序号"
      />

      <el-table-column
        align="center"
        label="上链任务ID"
      >
        <template slot-scope="{ row }">
          <span>{{ row.taskId }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="业务平台"
      >
        <template slot-scope="{ row }">
          <span>{{ row.displayName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="区块链平台"
      >
        <template slot-scope="{ row }">
          <span>{{ row.blockchainName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="结果"
      >
        <template slot-scope="{ row }">
          <span>{{ resultMap[row.result] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="结果描述"
      >
        <template slot-scope="{ row }">
          <span>{{ row.resultDesc }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="重试次数"
      >
        <template slot-scope="{ row }">
          <span>{{ row.retryCount }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="center"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="row.result != 1"
            size="small"
            type="warning"
            :disabled="btnDisabled"
            @click="upperChain(row.id)"
          >上链</el-button>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 50]"
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
import {
  searchManualRetryChain,
  manulDealChainFailResult
} from '@/api/cochain'
import { getAllPlatformList, getBlockChainList } from '@/api/common'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        current: 1,
        size: 20,
        platformId: undefined,
        blockchainId: undefined,
        beginTime: undefined,
        endTime: undefined,
        blockChain: undefined
      },
      btnDisabled: false,
      createTime: [],
      platformList: [],
      blockChainList: [],
      upListParams: {
        taskResultId: ''
      },
      resultMap: {
        0: '无结果',
        1: '成功',
        2: '失败'
      }
    }
  },
  created() {
    this.getList()
    this.getAllPlatformList()
    this.getBlockChainList()
  },
  methods: {
    getAllPlatformList() {
      getAllPlatformList().then(data => {
        this.platformList = data.data
        this.platformList.unshift({ id: undefined, displayName: '全部' })
      })
    },
    getBlockChainList() {
      getBlockChainList().then(data => {
        this.blockChainList = data.data
        this.blockChainList.unshift({ id: undefined, blockchainName: '全部' })
      })
    },
    getList() {
      this.listLoading = true
      this.listParams.startTime = this.createTime
        ? this.createTime[0]
        : undefined
      this.listParams.endTime = this.createTime
        ? this.createTime[1]
        : undefined
      searchManualRetryChain(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    upperChain(id) {
      this.$confirm('是否确认上链？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.btnDisabled = true
        this.upListParams.taskResultId = id
        manulDealChainFailResult(this.upListParams)
          .then(data => {
            this.btnDisabled = false
            this.getList()
          })
          .catch(() => {
            this.btnDisabled = false
          })
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

<style lang="scss" scoped>
/deep/ .audit-dialog.el-dialog {
  width: 400px;
}

/deep/ .audit-dialog.el-dialog .el-dialog__body {
  padding: 0 20px;
  height: 70px;
}

/deep/ .audit-dialog .el-form-item {
  margin-bottom: 0;
}
</style>
