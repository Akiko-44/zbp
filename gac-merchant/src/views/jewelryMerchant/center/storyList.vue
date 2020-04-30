
<template>
  <div class="page-container calendar-list-container">
    <template v-if="list.length">
      <div class="filter-container">
        <el-button
          type="primary"
          v-waves
          class="primary-btn-md"
          @click="addStory"
        >添加品牌故事</el-button>
      </div>

      <el-table
        :data="list"
        v-loading.body="listLoading"
        highlight-current-row
        class="custom-table"
      >
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="100"
        >
        </el-table-column>
        <el-table-column
          width="150px"
          align="center"
          label="添加时间"
        >
          <template slot-scope="{ row }">
            <span>{{row.createTime}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="简介"
        >
          <template slot-scope="{ row }">
            <div
              class="story"
              v-html="row.stroyDetail"
            ></div>
          </template>
        </el-table-column>

        <el-table-column
          width="100px"
          align="center"
          label="显示顺序"
        >
          <template slot-scope="{ row }">
            <span>{{row.sortOrder}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="200px"
        >
          <template slot-scope="{ row }">
            <el-button
              size="small"
              type="text"
              @click="$router.push({ name: 'storyDetail', query: { id: row.id} })"
            >
              详情
            </el-button>
            <el-button
              size="small"
              type="text"
              @click="$router.push({ name: 'updateStory', query: { id: row.id } })"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="text"
              @click="handleDelete(row)"
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
    </template>
    <template v-else>
      <div class="no-content-container text-center">
        <p class="font-14 mb-3">您还未添加品牌故事，添加品牌故事可以让更多的用户了解您的品牌！</p>
        <el-button
          type="primary"
          v-waves
          class="primary-btn-md"
          @click="addStory"
        >添加品牌故事</el-button>
      </div>
    </template>

  </div>
</template>

<script>
import {
  storyPage,
  delStory
} from '@/api/jewelryMerchant/merchant'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    addStory() {
      this.$router.push({ name: 'updateStory' })
    },
    getList() {
      this.listLoading = true
      storyPage(this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
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
    handleDelete(row) {
      this.$confirm(`确定要删除该品牌故事吗？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        customClass: 'custom-confirm-sm'
      })
        .then(() => {
          delStory(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
            })
        })
        .catch(() => { })
    }
  }
}
</script>

<style scoped lang="scss">
.story {
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  img {
    width: 100px;
  }
}
.no-content-container {
  padding: 124px 0 440px;
}
</style>
