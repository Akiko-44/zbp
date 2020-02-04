
<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-button type="primary" v-waves @click="$router.push({ name: 'release' })">发布消息</el-button>
        </div>

        <div class="filter-container">
            <el-date-picker
                    v-model="dateValue"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="创建开始日期"
                    end-placeholder="创建结束日期"
                    align="right"
            >
            </el-date-picker>
            <el-date-picker
                    v-model="updateValue"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="修改开始日期"
                    end-placeholder="修改结束日期"
                    align="right"
            >
            </el-date-picker>
        </div>

        <div class="filter-container">

            <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.title" placeholder="请输入标题"> </el-input>

            <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.content" placeholder="请输入内容"> </el-input>

            <el-select v-model="listQuery.position" clearable placeholder="选择发布位置">
                <el-option
                        v-for="item in position"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

            <el-button type="primary" icon="el-icon-search" v-waves @click="handleFilter">查询</el-button>
        </div>

        <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column width="110px" align="center" label="编号">
                <template slot-scope="{ row }">
                    <span>{{row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column width="200px" align="center" label="消息标题">
                <template slot-scope="{ row }">
                    <span>{{row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column width="300px" align="center" label="消息内容">
                <template slot-scope="{ row }">
                    <span v-html="row.content" class="msg"></span>
                </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="发布位置">
                <template slot-scope="{ row }">
                    <span>{{row.position}}</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="创建时间">
                <template slot-scope="{ row }">
                    <span>{{row.createTime}}</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="修改时间">
                <template slot-scope="{ row }">
                    <span>{{row.updateTime}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="left" label="操作">
                <template slot-scope="{ row, $index }">
                    <el-button size="small" type="edit" @click="$router.push({ name: 'editMsg', query: { id: row.id } })">编辑</el-button>
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
  } from '@/api/public/message'
  import waves from '@/directive/waves' // 水波纹指令

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
          title: '',
          content: ''
        },
        tableKey: 0,
        dateValue: '',
        updateValue: '',
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
        position: [
          { value: 0, label: 'PC' },
          { value: 1, label: 'APP' },
          { value: 2, label: '珠宝店商家' },
          { value: 3, label: '设计室商家' },
          { value: 4, label: '制造间商家' }
        ],
        auditPosition: {
          0: 'PC',
          1: 'APP',
          2: '珠宝店商家',
          3: '设计室商家',
          4: '制造间商家'
        },
        positionStr: ''
      }
    },
    watch: {
      dateValue(value) {
        this.listQuery.createTimeStart = value ? value[0] : undefined
        this.listQuery.createTimeEnd = value ? value[1] : undefined
      },
      updateValue(value) {
        this.listQuery.updateTimeStart = value ? value[0] : undefined
        this.listQuery.updateTimeEnd = value ? value[1] : undefined
      }
    },
    created() {
      this.getList()
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

<style lang="postcss">
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
    .msg{
      display: block;
    }
    .msg img.wscnph{
      width: 100%;
    }
</style>

