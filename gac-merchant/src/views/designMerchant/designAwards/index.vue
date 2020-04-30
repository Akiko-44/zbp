
<template>
  <div class="page-container">
    <el-button
      type="primary"
      class="primary-btn-md mb-2"
      @click="$router.push({name: 'addDesignAwards'})"
    >添加奖项</el-button>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      highlight-current-row
      class="custom-table"
    >
      <el-table-column
        align="center"
        label="奖项信息"
      >
        <template slot-scope="{ row }">
          <div class="info">
            <img :src="row.awardsUrl" />
            <div class="title">
              <h3>{{row.name}}</h3>
              <p>{{row.desc}}</p>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        align="center"
        label="添加时间"
        prop="createTime"
      ></el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="显示顺序"
        prop="sortNum"
      ></el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            type="primary"
            @click="$router.push({ name: 'designAwardsDetail', query: { id: row.id } })"
          >
            详情
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="$router.push({ name: 'addDesignAwards', query: { id: row.id } })"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleDelete(row, $index, 1)"
          >
            删除
          </el-button>
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
import waves from '@/directive/waves' // 水波纹指令
import { awardsList, delAwards } from '@/api/designMerchant/designAwards'

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
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
    getList() {
      this.listLoading = true
      awardsList(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前奖项？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delAwards(row.id)
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
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.info {
  text-align: left;
  & img {
    width: 100px;
    height: 100px;
    vertical-align: top;
  }
  & .title {
    display: inline-block;
  }
}
</style>
