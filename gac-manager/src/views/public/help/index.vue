
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-date-picker
        v-model="dateValue"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
      <el-cascader
        clearable
        placeholder="全部分类"
        :options="categories"
        v-model="selectedCategory"
        @change="handleCategoryChange"
        :props="{value: 'id', label: 'name'}"
      />

      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 195px;"
        v-model="listQuery.word"
        placeholder="请输入要搜索的关键词"
      > </el-input>

      <el-button
        type="primary"
        icon="el-icon-search"
        v-waves
        @click="handleFilter"
      >查询</el-button>
      <el-button
        class="fr"
        type="primary"
        v-waves
        @click="$router.push({ name: 'releaseDocument' })"
      >发布新文档</el-button>
    </div>

    <el-table
      :key='tableKey'
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >

      <el-table-column
        width="300px"
        align="center"
        label="标题"
      >
        <template slot-scope="{ row }">
          <span>{{row.artTitle}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="分类"
      >
        <template slot-scope="{ row }">
          <span>{{row.articleCatogry}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="文档类型"
      >
        <template slot-scope="{ row }">
          <span v-if="row.articleType === 0">已存草稿</span>
          <span v-if="row.articleType === 1">已发布</span>
        </template>
      </el-table-column>

      <el-table-column
        width="300px"
        align="center"
        label="创建时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <!--<el-button size="small" type="primary" @click="$router.push({ name: 'docDetail', query: { id: row.id } })">详情</el-button>-->
          <el-button
            size="small"
            type="edit"
            @click="$router.push({ name: 'editDocument', query: { id: row.id } })"
          >编辑</el-button>
          <el-button
            size="small"
            type="danger"
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
        :current-page.sync="listQuery.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  page,
  delObj
} from '@/api/public/help'
import waves from '@/directive/waves' // 水波纹指令
import { category } from '@/utils/mixins/help'

export default {
  name: 'index',
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        word: undefined,
        category: null
      },
      tableKey: 0,
      dateValue: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      categories: [],
      selectedCategory: []
    }
  },
  watch: {
    dateValue(value) {
      this.listQuery.startTime = value ? value[0] : undefined
      this.listQuery.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getList()
    category.get().then(data => (this.categories = data))
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery)
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
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    },
    handleCategoryChange(data) {
      this.listQuery.category = data[data.length - 2]
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前文档？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

