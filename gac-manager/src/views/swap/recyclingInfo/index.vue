
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <label class="filter-label">编号：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.id"> </el-input>

    &nbsp;
    <label class="filter-label">回收标题：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.recycleName"> </el-input>

    &nbsp;
    <label class="filter-label">回收人：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.userName"> </el-input>

  </div>

  <div class="filter-container">
    <label class="filter-label">状态：</label>
    <el-select v-model="listQuery.status" clearable placeholder="状态">
      <el-option
        v-for="item in goodsStatus"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    &nbsp;
    <label class="filter-label">回收分类：</label>
    <el-cascader
      clearable
      :options="categories"
      change-on-select
      v-model="selectedCategory"
      @change="handleChange"
      :props="{value: 'id', label: 'name'}"
    >
    </el-cascader>

    &nbsp;
    <label class="filter-label">来源：</label>
    <el-select v-model="listQuery.src" clearable placeholder="来源">
      <el-option
        v-for="item in src"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>

  <div class="filter-container">
    <label class="filter-label">更新时间：</label>
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
    &#12288;
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    <el-button type="text" @click="resetQuery">清空条件</el-button>
  </div>

  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="110px" align="left" label="图片">
      <template slot-scope="{ row }">
        <img :src="row.imgUrl | setImg" style="max-width: 100%" />
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="信息编号">
      <template slot-scope="{ row }">
        <span>{{row.id}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="回收标题">
      <template slot-scope="{ row }">
        <span>{{row.recycleName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="80px" align="center" label="回收分类">
      <template slot-scope="{ row }">
        <span>{{row.categoryName}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="回收人">
      <template slot-scope="{ row }">
        <span>{{row.userName}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="状态">
      <template slot-scope="{ row }">
        <span>{{goodsState[row.status]}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="更新时间">
      <template slot-scope="{ row }">
        <span>{{row.updateTime}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="来源">
      <template slot-scope="{ row }">
        <span>{{srcState[row.src]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column fixed="right" align="left" label="操作" width="350">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          @click="$router.push({ name: 'recyclingDetail', query: { id: row.id } })"
        >
          详情
        </el-button>
        <!--<el-button
          size="small"
          type="primary"
          @click="$router.push({ name: 'recyclingEdit', query: { id: row.id } })"
        >
          修改
        </el-button>-->

        <!--<el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>-->
        &nbsp;
        <el-dropdown @command="handleCommand" v-if="row.status == 1 || row.status == 3">
          <span class="el-dropdown-link">
            审核操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="row.status == 1 || row.status == 3" :command="{row, state: 2}">审核通过</el-dropdown-item>
            <el-dropdown-item v-if="row.status == 1" :command="{row, state: 3}">审核拒绝</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
  delObj,
  audit
} from '@/api/swap/recycleInfo'
import waves from '@/directive/waves' // 水波纹指令
import { goodsState, srcState, category } from '@/utils/mixins/swap'

const getInitQuery = () => {
  return {
    offset: 1,
    limit: 20,
    recycleName: undefined,
    categoryId: undefined,
    userName: undefined,
    status: undefined,
    updateTimeBegin: undefined,
    updateTimeEnd: undefined,
    src: undefined
  }
}

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: getInitQuery(),
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
      goodsState,
      srcState
    }
  },
  computed: {
    goodsStatus() {
      return Object.keys(this.goodsState).map(key => {
        return { value: key, label: this.goodsState[key] }
      })
    },
    src() {
      const data = Object.keys(this.srcState).map(key => {
        return { value: key, label: this.srcState[key] }
      })
      return data
    }
  },
  watch: {
    dateValue(value) {
      this.listQuery.updateTimeBegin = value ? value[0] : undefined
      this.listQuery.updateTimeEnd = value ? value[1] : undefined
    }
  },
  created() {
    this.getList()
    this.getCategory()
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
      this.$confirm(`确定删除当前信息？`, '提示', {
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
    audit(row, state) {
      this.$confirm(`确定执行当前操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          audit(row.id, state).then(data => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            row.status = state
          })
        })
    },
    handleCommand({ row, state }) {
      this.audit(row, state)
    },
    resetQuery() {
      this.listQuery = getInitQuery()
      this.dateValue = ''
      this.selectedCategory = []
    },
    async getCategory() {
      const categories = await category.get(3)
      this.categories = categories
    },
    handleChange(data) {
      this.listQuery.categoryId = data[data.length - 1]
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
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

