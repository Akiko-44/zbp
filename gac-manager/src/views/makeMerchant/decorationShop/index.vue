<template>
    <div class="app-container calendar-list-container">
    	<el-button type="primary" @click="dialogVisible = true">添加</el-button>
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            
            <el-table-column width="180px" align="center" label="页面名称">
                <template slot-scope="{ row }">
                    <span>{{row.storeName}}</span>
                </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="创建时间">
                <template slot-scope="{ row }">
                    <span>{{row.createTime}}</span>
                </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="状态">
                <template slot-scope="{ row }">
                    <span v-if="row.showStatus == 0">未发布</span>
                    <span v-if="row.showStatus == 1">发布</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="left" width="300px"  label="操作">
                <template slot-scope="{ row, $index }">
                    <el-button
                            size="small"
                            plain
                            type="primary"
                            @click="$router.push({ name: 'shopPage', query:{storeId: row.id}})"
                    >
                    编辑
                    </el-button>
                    
                    <el-button
                            size="small"
                            plain
                            type="primary"
                            @click="$router.push({ name: 'shopDetail', query:{storeId: row.id}})"
                    >
                    详情
                    </el-button>
                    
                    <el-button
                            size="small"
                            plain
                            v-if="row.showStatus == 0"
                            type="primary"
                            @click="fabuww(row)"
                    >
                    发布
                    </el-button>
                    
                    <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        
        <el-dialog
		  title="添加页面"
		  :visible.sync="dialogVisible"
		  width="350px">
		  <div>
		  	<p style="color: #999;">页面类型</p>
		  	<p>自定义页面&emsp;{{total}}/50</p>
		  	<p style="color: #999;">页面名称</p>
		  	<el-input v-model="form.storeName" placeholder="请输入页面名称，长度不要超过10个文案"></el-input>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="add">确 定</el-button>
		  </span>
		</el-dialog>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
    </div>
</template>

<script>
  import {
    page,
    addObj,
    delObj,
    fabuObj
  } from '@/api/makeMerchant/decorationShop'
  import waves from '@/directive/waves' // 水波纹指令
  import Cookies from 'js-cookie'

  export default {
    directives: {
      waves
    },
    data() {
      return {
        listLoading: false,
        dialogVisible: false,
        editStatus: true,
        total: 0,
        list: [],
        listParams:{
        	offset: 1,
        	limit: 10,
        	pageType: 0,
        	merchantId: Cookies.get('merchantId')
        },
        form:　{
        	storeName: undefined,
        	pageType: 0,
        	merchantId: Cookies.get('merchantId'),
        	layouts:[
        		{
					layoutType:1,
					isDelete:0,
					sortOrder:1
				},
				{
					layoutType:2,
					isDelete:0,
					sortOrder:1
				},
				{
					layoutType:3,
					isDelete:0,
					sortOrder:1
				}
			]
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        page(this.listParams)
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
        this.listParams.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listParams.offset = val
        this.getList()
      },
      handleDelete(row) {
        this.$confirm(`确定删除当前商品？`, '提示', {
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
      add(){
      	addObj(this.form)
	      	.then(data => {
		      	this.dialogVisible = false
	            this.$notify({
	              title: '成功',
	              message: '添加成功',
	              type: 'success',
	              duration: 2000
	            })
	            this.getList()
		    })
      },
      fabuww(row){
      	fabuObj(row.id)
	      	.then(data => {
		      	this.dialogVisible = false
	            this.$notify({
	              title: '成功',
	              message: '发布成功',
	              type: 'success',
	              duration: 2000
	            })
	            this.getList()
		    })
      },
      beforeRouteLeave(to, from, next) {
	    this.onbeforeunloadHandler(next)
	  },
      onbeforeunloadHandler(next) {
	      if (this.editStatus) {
	        if (window.confirm('确定要放弃当前的操作吗？')) {
	          next()
	        } else {
	          next(false)
	        }
	      } else {
	        next()
	      }
	  }
    }
  }
</script>

<style scoped>
    .filter-label {
        font-size: 14px;
        color: #909399;
        font-weight: normal;
    }
    .el-button{
        margin-bottom: 5px;
    }
</style>
