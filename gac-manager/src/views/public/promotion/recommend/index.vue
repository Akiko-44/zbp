<template>
  <div class="app-container calendar-list-container">
    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      v-show="list && list.length"
    >
      <el-table-column
        width="300px"
        class-name="blue"
        align="center"
        label="标题"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'jccontentManageDetail', query: {id: row.id, isDraft: 0, from: 1, isWeMedia: true}})">{{row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="作者"
      >
        <template slot-scope="{ row }">
          <span>{{row.authorName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="栏目"
      >
        <template slot-scope="{ row }">
          <span>{{row.columnName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="浏览量"
      >
        <template slot-scope="{ row }">
          <span>{{row.viewNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="点赞数"
      >
        <template slot-scope="{ row }">
          <span>{{row.likeNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="收藏数"
      >
        <template slot-scope="{ row }">
          <span>{{row.collectNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="blue"
        align="center"
        label="评论数"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'commentsGoods', query: {id: row.id, title: row.title}})">{{row.commentNumber}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="150px"
        align="center"
        label="绑定商品数量"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsVOS.length}}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        width="120px"
        align="center"
        label="推荐数量"
      >
        <template slot-scope="{ row }">
          <span>{{row.recommendNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="推荐类型"
      >
        <template slot-scope="{ row }">
          <span>{{recommendTypeMap[row.recommendType]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="130px"
        align="center"
        label="推送状态"
      >
        <template slot-scope="{ row }">
          <span>{{pushStatusMap[row.pushStatus]}}
            <span v-if="row.pushStatus == 2 || row.pushStatus == 3"><br />{{row.pushTime}}</span>
            <el-popover
              placement="bottom"
              width="200"
              trigger="hover"
              :content="row.pushReviewDesc"
            >
              <i
                class="el-icon-warning"
                slot="reference"
                v-if="row.pushStatus == 4"
              ></i>
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="160px"
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.updateTime}}</span>
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
            type="warning"
            @click="delRecommend(row.id, $index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div :class="{'recommend': true,'recommended': list && list.length}">
      <el-button
        class="auditBtn"
        size="small"
        type="danger"
        @click="openContentDialog"
        v-if="list && list.length < 3"
      >
        <template v-if="list.length == 0">选择首页推荐内容</template>
        <template v-else>继续添加</template>
      </el-button>
      最多可添加3个
    </div>
    <!-- <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div> -->
    <content-dialog
      ref="contentDialog"
      @selectContent="selectContent"
    ></content-dialog>
  </div>
</template>

<script>
import {
  getRecommendation,
  addRecommendation,
  deleteRecommendation
} from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令
import contentDialog from './chooseContent'

export default {
  directives: {
    waves
  },
  components: {
    contentDialog
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        recommendation: 1
      },
      pushStatusMap: {
        0: '未推送',
        1: '待审核',
        2: '已推送(全平台)',
        3: '已推送(粉丝)',
        4: '拒绝推送'
      },
      recommendTypeMap: {
        1: '商品',
        2: '店铺',
        3: '外链'
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getRecommendation(this.listParams).then(data => {
        this.list = data.data.records
        this.list.map(item => {
          if (item.recommendType === 1) {
            item.recommendNumber = item.contentToGoodsDTOS.length
          } else if (item.recommendType === 2) {
            item.recommendNumber = item.contentToMerchantDTOS.length
          } else if (item.recommendType === 3) {
            item.recommendNumber = item.contentToExternalLinks.length
          }
        })
        this.total = data.data.total
        this.listLoading = false
      })
    },
    // 选择内容弹框
    openContentDialog() {
      this.$refs.contentDialog.dialogTableVisible = true
      this.$refs.contentDialog.getList()
    },
    selectContent(selectedObj) {
      if (!selectedObj) { return }
      const arr = this.list.map(item => item.id)
      if (!arr.includes(selectedObj.id)) {
        addRecommendation(selectedObj.id).then(data => {
          this.$refs.contentDialog.dialogTableVisible = false
          this.getList()
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
        })
          .catch(() => { })
      } else {
        this.$notify({
          title: '提示',
          message: '不可添加重复内容',
          type: 'warning'
        })
      }
    },
    delRecommend(id, index) {
      this.$confirm('确定删除此推荐？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteRecommendation(id)
          .then(data => {
            this.list.splice(index, 1)
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          })
          .catch(() => { })
      })
    },
    add(id) {
      addRecommendation(id)
        .then(data => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.$refs.contentDialog.dialogTableVisible = false
        })
        .catch(() => { })
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

<style scoped>
.recommend {
  text-align: center;
  padding: 50px 0;
  font-size: 14px;
  color: #f56c6c;
}
.recommended {
  text-align: left;
}
</style>
