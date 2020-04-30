<template>
  <div class="app-container">
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
        label="ID"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="主任务ID"
      >
        <template slot-scope="{ row }">
          <span>{{ row.taskId }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="阶段"
      >
        <template slot-scope="{ row }">
          <span>{{ row.taskStage==1?'请求认证':(row.taskStage==2?'上链':'回调') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="{ row }">
          <span>{{ row.status==0?'未执行':'执行完成' }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="结果"
      >
        <template slot-scope="{ row }">
          <span>{{ row.result==0?'无结果':(row.result===1?'成功':'失败') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        label="开始时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.beginTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        label="结束时间"
      >
        <template slot-scope="{ row }">
          <span v-if="row.endTime">{{ row.endTime }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="耗时"
      >
        <template slot-scope="{ row }">
          <span>{{ row.consumeTime +'ms' }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="接口名"
      >
        <template slot-scope="{ row }">
          <span v-if="row.apiName">{{ row.apiName }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        label="创建时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer_btn">
      <el-button
        type="primary"
        @click="goBack"
      >返回</el-button>
    </div>
  </div>
</template>

<script>
import { getTaskDetail } from '@/api/task-manager'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        taskId: ''
      }
    }
  },
  created() {
    this.listParams.taskId = this.$route.query.id
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getTaskDetail(this.listParams).then(data => {
        this.list = data.data
        this.listLoading = false
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer_btn {
  display: flex;
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  bottom: 0px;
  padding: 20px 0;
  width: 100%;
  // height: 90px;
  background: #fff;
  border-top: 1px soild $line;
  /deep/ button {
    margin: 20px auto !important;
    width: 150px;
  }
}
</style>
