<template>
  <div class="app-container calendar-list-container">
    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        align="center"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="操作"
      >
        <template slot-scope="{ row }">
          <span>{{row.operation === 0 ? '上链' : '验证'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="300px"
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.betweenTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="结果"
      >
        <template slot-scope="{ row }">
          <span>{{row.result === 'SUCCESS' ? '成功' : '失败'}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        align="center"
        label="重试次数"
      >
        <template slot-scope="{ row }">
          <span>{{row.retryCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="结果描述"
      >
        <template slot-scope="{ row }">
          <!-- <span>{{row.reslutDesc}}</span> -->
          <el-button
            size="small"
            @click="showDetailDialog(row.reslutDesc)"
          >执行详情</el-button>
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
      >
      </el-pagination>
    </div>

    <el-dialog
      title="执行详情"
      :visible.sync="dialogVisible"
      width="40%"
      custom-class="detail-dialog"
    >
      <div class="detail-dialog-body">
        <p
          v-for="(item, i) in detailList"
          :key="i"
        >{{ item }}</p>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllCallback } from '@/api/public/system'
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
      listParams: {
        offset: 1,
        limit: 20
      },
      dialogVisible: false,
      detailList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getAllCallback(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    showDetailDialog(log) {
      if (!log) {
        this.$alert('该回调暂无执行详情', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        })
      } else {
        this.detailList = log.split('|')
        this.dialogVisible = true
      }
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-dialog .detail-dialog-body {
  overflow: auto;
  padding-left: 10px;
  max-height: 500px;
  border: 1px solid #dedede;
  border-radius: 5px;
  & p {
    height: 16px;
  }
}
</style>
