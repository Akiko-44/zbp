<template>
  <div class="app-container calendar-list-container">
    <!-- 订单类型：1珠宝店,2互换销售订单,3拍卖订单, 5设计室, 6制造间, 7图文管 -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入内容" v-model="listQuery.searchWord"> </el-input>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>
    
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">    	
      <el-table-column width="200px" align="center" label="评论人">
        <template slot-scope="{ row }">
          <span>{{row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="评论内容">
        <template slot-scope="{ row }">
          <span>{{row.content}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="评论对象">
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>
      
      <el-table-column width="200px" align="center" label="商品名称">
	      <template slot-scope="{ row }">
          <span>{{row.targetName}}</span>
	      </template>
			</el-table-column>

      <el-table-column width="400px" align="center" label="评论时间">
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="left" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button size="small" @click="$router.push({ name: 'commentDetail', query: { id: row.id } })">
                               查看
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination 
      	@size-change="handleSizeChange" 
      	@current-change="handleCurrentChange" 
      	:current-page.sync="listQuery.offset" 
      	:page-sizes="[10,20,30,50]" 
      	:page-size="listQuery.limit" 
      	layout="total, sizes, prev, pager, next, jumper" 
      	:total="total"> 
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { page, delObj } from '@/api/dm/comment'
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    directives: {
      waves
    },
    props: {
      orderType: [String, Number]
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          offset: 1,
          limit: 20,
          searchWord: undefined
        },
        tableKey: 0
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        page(this.listQuery, this.orderType).then(data => {
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
        this.$confirm(`确定删除当前文章的这条评论？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(row.id).then(() => {
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
