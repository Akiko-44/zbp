<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <span class="title">{{title}}的评论</span>
    </div>
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="contentListQueryForm"
        label-width="100px"
        class="contentListQueryForm"
      >
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.content"
            placeholder="请输入内容"
          > </el-input>
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
          @click="$router.go(-1)"
        >返回</el-button>
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
        width="50"
        align="center"
        label="编号"
      >
      </el-table-column>
      <el-table-column
        width="300px"
        align="center"
        label="评论内容"
      >
        <template slot-scope="{ row }">
          <span>{{row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="评论人"
      >
        <template slot-scope="{ row }">
          <span>{{row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="评论时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="点赞数"
      >
        <template slot-scope="{ row }">
          <span>{{row.likeNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        class-name="blue"
        align="center"
        label="回复数"
      >
        <template slot-scope="{ row, $index }">
          <span @click="handleReply(row, $index)">{{row.replyNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="delContentComment(row.id, $index)"
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

    <reply-dialog ref="replyDialog" />
  </div>
</template>

<script>
import { contentCommentList, delContentComment } from '@/api/public/jewelryRing'
import ReplyDialog from './replyDialog'

import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    ReplyDialog
  },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        content: '',
        contentId: this.$route.query.id
      },
      typeList: [
        { value: '', label: '全部' },
        { value: '1', label: '图文' },
        { value: '2', label: '视频' }
      ],
      index: undefined,
      title: this.$route.query.title
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      contentCommentList(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    delContentComment(id, index) {
      this.$confirm('确认删除该评论？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delContentComment(id).then(data => {
          this.list.splice(index, 1)
        }).catch(() => { })
      })
    },
    handleReply(row, $index) {
      this.reply(row, $index)
    },
    reply(row, index) {
      const dialog = this.$refs.replyDialog
      dialog.dialogFormVisible = true
      dialog.id = row.id
      dialog.data = row
      dialog.getList()
      this.index = index
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
    },
    refresh() {
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
/deep/ td.blue {
  color: #409eff;
  cursor: pointer;
}
</style>
