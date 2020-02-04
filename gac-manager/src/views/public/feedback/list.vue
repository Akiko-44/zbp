
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <label class="filter-label">问题：</label>
      <el-input @keyup.enter.native="handleFilter"
                style="width: 195px;"
                v-model="listParams.title"> </el-input>
      <label class="filter-label">手机号：</label>
      <el-input @keyup.enter.native="handleFilter"
                placeholder="请输入11位手机号"
                style="width: 195px;"
                v-model="listParams.telephone"> </el-input>
    </div>

    <div class="filter-container">
      <el-button type="primary"
                 icon="el-icon-search"
                 v-waves
                 @click="handleFilter">查询</el-button>
    </div>

    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">

      <el-table-column width="110px"
                       align="center"
                       label="编号">
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px"
                       align="center"
                       label="反馈问题">
        <template slot-scope="{ row }">
          <span>{{row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px"
                       align="center"
                       label="内容摘要"
                       class-name="content">
        <template slot-scope="{ row }">
          <span v-html="row.content"></span>
        </template>
      </el-table-column>

      <el-table-column width="180px"
                       align="center"
                       label="反馈时间">
        <template slot-scope="{ row }">
          <span>{{row.createtime}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right"
                       align="left"
                       label="操作">
        <template slot-scope="{ row, $index }">
          <el-button size="small"
                     type="primary"
                     @click="$router.push({ name: 'detail', query: { id: row.id } })">查看</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listParams.offset"
                     :page-sizes="[10,20,30,50]"
                     :page-size="listParams.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getPage
} from '@/api/public/feedback'
import waves from '@/directive/waves' // 水波纹指令

const getInitQuery = () => {
  return {

  }
}

export default {
  directives: {
    waves
  },
  components: {

  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20,
        title: undefined,
        telephone: undefined
      },
      listQuery: getInitQuery(),
      tableKey: 0
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPage(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
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

<style lang="postcss" scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
/deep/ .content img {
  width: 100%;
}
</style>