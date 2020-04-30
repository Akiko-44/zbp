<template>
  <el-dialog
    title="评论回复"
    @close="closeDialog"
    :visible.sync="dialogFormVisible"
  >
    <div>
      <div class="reply-user">
        <img
          :src="data.userLogo"
          width="30"
        />
        <span>{{data.nickname}}</span>
        <span class="reply-time">{{data.createTime}}</span>
      </div>
      <div class="reply-main">
        <div class="reply-content">
          {{data.content}}
        </div>
        <div class="reply-operate">
          <span><img src="../../../assets/image/like.png" />{{data.likeNumber}}</span>
          <span @click="openReplyMainText">回复</span>
          <span @click="delContentComment(data.id)">删除</span>
        </div>
        <div
          class="reply-text"
          v-if="replyMainTextFlag"
        >
          <el-input
            type="textarea"
            :rows="2"
            :placeholder="'回复'+data.nickname"
            v-model="form.content"
          >
          </el-input>
          <el-button
            type="primary"
            size="mini"
            style="margin-top: 10px;"
            @click="sendReplyMainText"
          >发送</el-button>
          <el-button
            size="mini"
            style="margin-top: 10px;"
            @click="resetFlag(false)"
          >取消</el-button>
        </div>
      </div>
    </div>
    <div class="reply-totle">
      {{total}}条回复
    </div>
    <div v-if="list && list.length">
      <div
        v-for="(item, i) in list"
        :key="i"
        class="reply-item"
      >
        <div class="reply-user">
          <img
            :src="item.userLogo"
            width="30"
          />
          <span>{{item.nickname}}<span style="margin: 0 10px;color: #666;">回复</span>{{item.replyNickname}}</span>
          <span class="reply-time">{{item.createTime}}</span>
        </div>
        <div class="reply-main">
          <div class="reply-content">
            {{item.content}}
          </div>
          <div class="reply-operate">
            <span><img src="../../../assets/image/like.png" />{{item.likeNumber}}</span>
            <span @click="openReplyText(item)">回复</span>
            <span @click="delContentComment(item.id, i)">删除</span>
          </div>
          <div
            class="reply-text"
            v-if="item.replyTextFlag"
          >
            <el-input
              type="textarea"
              :rows="2"
              :placeholder="'回复'+item.nickname"
              v-model="form.content"
            >
            </el-input>
            <el-button
              type="primary"
              size="mini"
              style="margin-top: 10px;"
              @click="sendReplyText(item)"
            >发送</el-button>
            <el-button
              size="mini"
              style="margin-top: 10px;"
              @click="resetFlag(false, item)"
            >取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        layout="total, prev, pager, next"
        :total="total"
      > </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import { contentCommentDetail, contentCommentSave, delContentComment } from '@/api/public/jewelryRing'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      replyMainTextFlag: false,
      data: {},
      list: [],
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 10,
        id: ''
      },
      form: {
        contentId: '',
        content: '',
        parentId: '',
        replyUserId: '',
        replayParentId: ''
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.id) {
        this.listParams.id = this.id
        contentCommentDetail(this.listParams).then((data) => {
          this.list = data.data.records
          this.list.map(item => {
            this.$set(item, 'replyTextFlag', false)
          })
          this.total = data.data.total
          this.listLoading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    delContentComment(id, index) {
      this.$confirm('确认删除该评论？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delContentComment(id).then(data => {
          if (index) {
            this.list.splice(index, 1)
            this.getList()
          } else {
            this.dialogFormVisible = false
          }
        }).catch(() => { })
      })
    },
    openReplyMainText() {
      this.resetFlag(true)
      this.form.contentId = this.$route.query.id
      this.form.parentId = this.data.id
      this.form.replyUserId = this.data.userId
      this.form.replayParentId = this.data.id
    },
    openReplyText(item) {
      this.resetFlag(true, item)
      this.form.contentId = item.contentId
      this.form.parentId = item.parentId
      this.form.replyUserId = item.userId
      this.form.replayParentId = item.id
    },
    sendReplyMainText() {
      this.resetFlag(true)
      this.commentSave()
    },
    sendReplyText(item) {
      this.resetFlag(true, item)
      this.commentSave()
    },
    commentSave() {
      if (!this.form.content) { return }
      contentCommentSave(this.form).then(data => {
        this.$notify({
          title: '成功',
          message: '发送成功',
          type: 'success',
          duration: 2000
        })
        this.resetFlag(false)
        this.form.content = ''
        this.getList()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    resetFlag(isOpen, item) {
      this.replyMainTextFlag = false
      this.list.map(citem => {
        this.$set(citem, 'replyTextFlag', false)
      })
      if (isOpen) {
        if (item && Object.keys(item).length > 0) {
          item.replyTextFlag = true
        } else {
          this.replyMainTextFlag = true
        }
      }
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    closeDialog() {
      this.$parent.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-item {
  padding: 10px 0;
  border-top: 1px solid #eee;
}
.reply-totle {
  padding: 10px 0;
  border-top: 10px solid #eee;
  margin-top: 10px;
}
.reply-user {
  & img {
    margin-right: 6px;
    width: 30px;
    vertical-align: middle;
  }
  & .reply-time {
    float: right;
  }
}
.reply-main {
  margin-left: 40px;
  & .reply-operate {
    & span {
      display: inline-block;
      margin-right: 20px;
      color: #999999;
      &:not(:first-child) {
        cursor: pointer;
      }
    }
    & img {
      margin-right: 5px;
      width: 16px;
      vertical-align: middle;
    }
  }
}
</style>
