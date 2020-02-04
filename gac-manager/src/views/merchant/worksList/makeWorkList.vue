
<template>
    <div class="app-container calendar-list-container">
        <div>
		  	<el-form :inline="true" :model="listQuery" :rules="rules" ref="makeWorkListQueryForm" label-width="101px" class="listQueryForm">
				  <el-form-item label="商品名称:">
				    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.caseName"> </el-input>
				  </el-form-item>
				  <el-form-item label="商品ID:" prop="id">
				    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.id"> </el-input>
				  </el-form-item>
				  <el-form-item label="状态:">
				  	<el-select v-model="listQuery.auditState" clearable placeholder="状态" style="width: 195px;">
				      <el-option
				        size="size"
				        v-for="item in auditState"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value"
				      >
				      </el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="商品类型:">
				  	<el-select v-model="listQuery.caseType" clearable placeholder="商品类型" style="width: 195px;">
				      <el-option
				        v-for="item in caseType"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value"
				      >
				      </el-option>
				    </el-select>
				  </el-form-item>
		    	<el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
		    	<el-button type="text" @click="resetQuery">清空条件</el-button>
		    </el-form>
		</div>
        
        <div class="filter-container">
            <el-button type="primary" v-waves @click="$router.push({ name: 'makeAddWork' })">新增商品</el-button>
            <el-button
                    type="primary"
                    @click="handleBatchonOrOff(1)"
            >
                批量上架
            </el-button>
            <el-button
                    type="primary"
                    @click="handleBatchonOrOff(2)"
            >
                批量下架
            </el-button>
            <el-button type="danger" @click="handleBatchDelete()">批量删除</el-button>
        </div>
        <el-table :data="list" v-loading.body="listLoading" @selection-change="handleSelectionChange" border fit highlight-current-row style="width: 100%">
            <el-table-column type="selection" width="55" align="center"></el-table-column>

            <el-table-column width="100px" align="center" label="排序">
                <template slot-scope="{ row }">
                    <span>{{row.sortNum}}</span>
                </template>
            </el-table-column>

            <el-table-column width="100px" align="center" label="商品ID">
                <template slot-scope="{ row }">
                    <span>{{row.caseId}}</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="商品名称">
                <template slot-scope="{ row }">
                    <span>{{row.caseName}}</span>
                </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="商品库存">
                <template slot-scope="{ row }">
                    <span>{{row.stock}}</span>
                </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="销售价格">
                <template slot-scope="{ row }">
                    <span>{{row.price}}</span>
                </template>
            </el-table-column>
            
            <el-table-column width="80px" align="center" label="状态">
                <template slot-scope="{ row }">
                    <span>{{auditStateMap[row.auditState]}}</span>
                    <span v-if="row.auditState === 2" @click="reson(row)" style="cursor: pointer;"><i class="el-icon-warning"></i></span>
                </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="最小购买量">
                <template slot-scope="{ row }">
                    <span>{{row.batchNum}}</span>
                </template>
            </el-table-column>
            
            <el-table-column width="110px" align="center" label="商品类型">
              <template slot-scope="{ row }">
                <span>{{row.caseType == 1?'现货':'定制'}}</span>
              </template>
            </el-table-column>
            
            <el-table-column align="left" label="操作">
                <template slot-scope="{ row, $index }">
                    <el-button
                            size="small"
                            plain
                            type="primary"
                            @click="updateSortNum(row, $index)"
                    >
                        排序
                    </el-button>
                    <el-button
                            size="small"
                            plain
                            type="primary"
                            @click="$router.push({ name: 'workDetail', query: { id: row.caseId } })"
                    >
                        详情
                    </el-button>
                    <el-button
                            size="small"
                            type="success"
                            @click="$router.push({ name: 'makeAddWork', query: { id: row.caseId } })"
                    >
                        修改
                    </el-button>
                    <el-button
                            size="small"
                            type="primary"
                            @click="onOrOff(row, $index, 1)"
                            v-if="row.auditState == 1 || row.auditState == 4"
                    >
                        上架
                    </el-button>
                    <el-button
                            size="small"
                            type="primary"
                            @click="onOrOff(row, $index, 2)"
                            v-if="row.auditState == 3"
                    >
                        下架
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
        <sort-dialog ref="sortDialog" @success="sortSuccess" />
    </div>
</template>

<script>
  import {
    page,
    delObj,
    onOrOff,
    auditReson
  } from '@/api/merchant/works'
  import { goodsSource } from '@/utils/mixins/order'
  import waves from '@/directive/waves' // 水波纹指令
  import sortDialog from './sortDialog'

  export default {
    directives: {
      waves
    },
    components: {
      sortDialog
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listParams: {
          offset: 1,
          limit: 20
        },
        listQuery: {
          caseName: undefined,
          designerName: undefined,
          goodsSource: 6,
          id: undefined
        },
        auditState: [
          { value: 0, label: '待审核' },
          { value: 1, label: '审核通过' },
          { value: 2, label: '审核不通过' },
          { value: 3, label: '上架' },
          { value: 4, label: '下架' }
        ],
        auditStateMap: {
          0: '待审核',
          1: '审核通过',
          2: '未通过',
          3: '上架',
          4: '下架'
        },
        caseType: [
          { value: 1, label: '现货商品' },
          { value: 2, label: '定制商品' }
        ],
        goodsSource,
        index: undefined,
        multipleSelection: [],
        rules: {      	
	      	id: [
		        { pattern: /^[0-9]*$/, message: '商品ID需为纯数字', trigger: 'blur' }
		      ]
	      }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        page(this.listQuery, this.listParams)
          .then(data => {
            this.list = data.data.records
            this.total = data.data.total
            this.listLoading = false
          })
      },
      handleFilter() {
        this.$refs['makeWorkListQueryForm'].validate((valid) => {
	      if (valid) {
	        this.getList()
	      } else {
	        return false
	      }
	    })
      },
      resetQuery() {
	      this.listQuery.caseName = undefined
	      this.listQuery.designerName = undefined
	      this.listQuery.id = undefined
	      this.$refs['makeWorkListQueryForm'].resetFields()
//	      this.$router.replace({ name: 'worksList' })
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
            delObj(row.caseId)
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
      handleBatchDelete() {
        this.$confirm(`确定删除已选择商品？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            delObj(this.multipleSelection.join(','))
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
                for (let i = 0; i < this.multipleSelection.length; i++) {
                  for (let j = 0; j < this.list.length; j++) {
                    if (this.multipleSelection[i] === this.list[j].caseId) {
                      this.list.splice(j, 1)
                    }
                  }
                }
              })
          })
      },
      onOrOff(row, index, state) {
        this.$confirm(`确定执行当前操作？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            onOrOff(row.caseId, state)
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '操作成功',
                  type: 'success',
                  duration: 2000
                })
                this.list[index].auditState = state === 1 ? 3 : 4
              })
          })
      },
      handleBatchonOrOff(state) {
        const selection = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          for (let j = 0; j < this.list.length; j++) {
            if(state == 1){
              if(this.list[j].auditState === 4 || this.list[j].auditState === 1){
	              if (this.multipleSelection[i] === this.list[j].caseId  ) {
	                selection.push(this.multipleSelection[i])
	              }
              }
            }else if(state == 2){
            	if(this.list[j].auditState === 3 || this.list[j].auditState === 1){
	              if (this.multipleSelection[i] === this.list[j].caseId ) {
	                selection.push(this.multipleSelection[i])
	              }
	            }
            }
          }
        }
        if(selection.length == 0){
        	this.$notify({
              title: '成功',
              message: '暂无符合此操作的商品',
              type: 'success',
              duration: 2000
            })
        	return false
        }
        this.$confirm(`确定执行当前操作？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            onOrOff(selection.join(','), state)
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '操作成功',
                  type: 'success',
                  duration: 2000
                })
                for (let i = 0; i < selection.length; i++) {
                  for (let j = 0; j < this.list.length; j++) {
                    if (selection[i] === this.list[j].caseId) {
                      this.list[j].auditState = state === 1 ? 3 : 4
                    }
                  }
                }
                this.getList()
              })
          })
      },
      handleSelectionChange(val) {
        const select = []
        console.log(val)
        val.forEach(function(v, i, arr) {
          select.push(v.caseId)
        })
        this.multipleSelection = select
      },
      reson(row) {
        auditReson(row.caseId)
          .then(data => {
            this.$alert(data.data, '未通过原因', {
              confirmButtonText: '确定'
            })
          })
      },
      updateSortNum(row, index) {
        const dialog = this.$refs.sortDialog
        dialog.dialogFormVisible = true
        dialog.form.caseId = row.caseId
        dialog.form.sortNum = row.sortNum
        this.index = index
      },
      sortSuccess(form) {
        this.list[this.index].sortNum = form.sortNum
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
