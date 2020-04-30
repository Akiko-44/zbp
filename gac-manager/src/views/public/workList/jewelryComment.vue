<template>
  <div class="app-container calendar-list-container">
    <div
      class="clearfix"
      style="margin-bottom: 20px;"
    >
      <span>用户名：</span>
      <el-input
        v-model="jewelryParams.userName"
        placeholder="用户名"
        :maxlength="30"
        style="width: 150px;"
      ></el-input>
      <el-button
        type="primary"
        @click="getData()"
      >搜索</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      v-loading="loading"
    >
      <el-table-column
        prop="id"
        label="编号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="类型"
        align="center"
      >
        <template slot-scope="scope">
          <span> {{commentTypeMap[scope.row.commentType]}} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="评论时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <span> {{commentRankMap[scope.row.commentRank]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论"
        align="center"
      ></el-table-column>
      <el-table-column label="操作0">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="$router.push({ name: 'publicjewelryCommentDetail', query: { commentId: scope.row.id } })"
          >
            查看详情
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="delComment(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="tr">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="jewelryParams.limit"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <div class="text-center">
      <el-button
        type="primary"
        size="small"
        @click="$router.go(-1)"
      >返回</el-button>
    </div>
  </div>
</template>

<script>
import { getJewelryComment, delJewelryComment } from '@/api/dm/works'
export default {
  name: 'jewelryComment',
  data() {
    return {
      id: this.$route.query.id,
      loading: false,
      total: 0,
      jewelryParams: {
        offset: 1,
        limit: 10,
        merchantType: 1,
        userName: undefined
      },
      tableData: [],
      commentTypeMap: {
        1: '商品',
        2: '文章',
        3: '订单'
      },
      commentRankMap: {
        0: '差评',
        1: '差评',
        2: '中评',
        3: '中评',
        4: '好评',
        5: '好评'
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleCurrentChange(page) {
      this.jewelryParams.offset = page
      this.getData()
    },
    getData() {
      this.loading = true
      getJewelryComment(this.id, this.jewelryParams).then(data => {
        this.tableData = data.data.records
        this.total = data.data.total
        this.loading = false
      })
    },
    delComment(id) {
      var _this = this
      this.$confirm('确定删除该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delJewelryComment(id).then(data => {
          this.$notify({
            title: '成功',
            type: 'success',
            message: '删除成功!',
            duration: 2000
          })
          this.getData()
        })
      }).catch(() => { })
    }
  }
}
</script>
