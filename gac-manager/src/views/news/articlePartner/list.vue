
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-button @click="$router.push({name: 'articlePartnerAdd'})" type="primary" icon="edit">添加文章</el-button>
  </div>
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入标题/发布人" v-model="listQuery.name"> </el-input>
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
      placeholder="栏目"
      :options="categories"
      :change-on-select="true"
      v-model="selectedCategory"
      @change="handleCategoryChange"
      :props="{value: 'id', label: 'name'}"
    />
    <el-select v-model="listQuery.auditState" clearable placeholder="审核状态">
      <el-option
        v-for="item in status"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="220px" align="left" label="文章标题">
      <template slot-scope="{ row }">
        <span>{{row.title}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="更新时间">
      <template slot-scope="{ row }">
        <span>{{row.updateTime || '-'}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="栏目">
      <template slot-scope="{ row }">
        <span>{{row.columnName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="80px" align="center" label="点击数">
      <template slot-scope="{ row }">
        <span>{{row.clickNum || '-'}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="发布人">
      <template slot-scope="{ row }">
        <span>{{row.authorName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="状态">
      <template slot-scope="{ row }">
        <span>{{auditState[row.auditState]}}</span>
        <el-popover
					v-if="row.auditState==3"
				    placement="bottom"
				    title=""
				    width="200"
				    trigger="click"
				    :content="row.auditReason">
				    <el-button slot="reference">查看原因</el-button>
				</el-popover>
      </template>
    </el-table-column>
     <el-table-column width="110px" align="center" label="发布状态">
      <template slot-scope="{ row }">
        <span>{{publishStatus[row.publicStatus]}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" align="center" label="操作" width="350">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          type="success"
          @click="$router.push({ name: 'articlePartnerAdd', query: { id: row.id } })"
        >
          编辑
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</div>
</template>

<script>
import {
  page,
  delObj
} from '@/api/news/articlePartner'

import waves from '@/directive/waves' // 水波纹指令
import { category } from '@/utils/mixins/news'

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      publishStatus: ['已存稿','已发布'],
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        name: undefined,
        auditState: null,
        columnId: null,
        updateTimeStart: undefined,
        updateTimeEnd: undefined
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
      selectedCategory: [],
      status: [
        { value: 1, label: '待审核' },
        { value: 2, label: '已发布' }
      ],
      auditState: {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
    }
  },
  watch: {
    dateValue(value) {
      this.listQuery.updateTimeStart = value ? value[0] : undefined
      this.listQuery.updateTimeEnd = value ? value[1] : undefined
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
    handleDelete(row) {
      this.$confirm(`确定删除当前文章？`, '提示', {
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
    },
    handleCategoryChange(data) {
      this.listQuery.columnId = data[data.length - 1]
    }
  }
}
</script>
