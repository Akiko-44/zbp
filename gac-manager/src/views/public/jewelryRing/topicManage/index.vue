<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="topicListQueryForm"
        label-width="100px"
        class="topicListQueryForm"
      >
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            placeholder="请输入话题名称"
            v-model="listParams.topicName"
          > </el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >搜索</el-button>
        <el-button
          class="fr"
          type="primary"
          v-waves
          @click="$router.push({ name:'topicManageModify'})"
        >添加</el-button>
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
        type="index"
        width="50px"
        align="center"
        label="编号"
      >
        <!-- <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="话题名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.topicName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        class-name="blue"
        align="center"
        label="参与人数"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'topicJoin', query: {id: row.id, topicName: row.topicName}})">{{row.joinNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="160px"
        align="center"
        label="添加时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="200px"
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            v-if="row.top === 1"
            @click="stickTopic(row.id, row.top)"
          >取消置顶</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            v-if="row.top === 0 && topCount < 2"
            @click="stickTopic(row.id, row.top)"
          >置顶</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="$router.push({ name:'topicManageModify',query:{data: JSON.stringify(row)}})"
          >编辑</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="delTopic(row.id, $index)"
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
import { getTopicList, stickTopic, delTopic } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      topCount: undefined,
      listParams: {
        offset: 1,
        limit: 20,
        topicName: undefined,
        startTime: undefined,
        endTime: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''

      getTopicList(0, this.listParams).then(data => {
        this.list = data.data.page.records
        this.total = data.data.page.total
        this.topCount = data.data.topCount
        this.listLoading = false
      })
    },
    delTopic(id, index) {
      this.$confirm('确认删除该话题？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delTopic(id).then(data => {
          this.getList()
        }).catch(() => { })
      })
    },
    stickTopic(id, top) {
      const msg = top === 1 ? '取消置顶' : '置顶'
      const resetTop = top === 1 ? 0 : 1
      this.$confirm(`确认${msg}该话题？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        stickTopic(id, resetTop).then(data => {
          this.getList()
        }).catch(() => { })
      })
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
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.auditBtn {
  margin-left: 0;
  margin-bottom: 5px;
}
/deep/ td.blue {
  color: #409eff;
  cursor: pointer;
}
</style>
