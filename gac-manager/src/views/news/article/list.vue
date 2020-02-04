<template>
	<div class="app-container calendar-list-container">
		<div class="filter-container">
			<!--<el-button @click="showDialog" type="primary" icon="edit">设置规则</el-button>-->
			<el-button @click="$router.push({name: 'addArticle'})" type="primary" icon="edit">添加文章</el-button>
		</div>
		<div class="filter-container">
			<el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入标题/发布人" v-model="listQuery.name"> </el-input>
			<el-date-picker v-model="dateValue" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
			</el-date-picker>
			<el-cascader clearable placeholder="栏目" :options="categories" v-model="selectedCategory" @change="handleCategoryChange" :change-on-select="true" :props="{value: 'id', label: 'name'}" />
			<el-select v-model="listQuery.auditState" clearable placeholder="审核状态">
				<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
		</div>
		<el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
			<el-table-column width="80px" align="center" label="ID">
				<template slot-scope="{ row }">
					<span>{{row.id}}</span>
				</template>
			</el-table-column>
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

			<el-table-column width="180px" align="center" label="状态">
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
		        <!--<span>{{publishStatus[row.publicStatus]}}</span>-->
		        <span v-if="row.auditState == 2 || row.auditState == 1">已发布</span>
		        <span v-else>未发布</span>
		      </template>
		    </el-table-column>
			<el-table-column fixed="right" align="center" label="操作" width="350">
				<template slot-scope="{ row, $index }">
					<el-button size="small" type="success" @click="$router.push({ name: 'addArticle', query: { id: row.id } })">
						编辑
					</el-button>
					<el-button v-if="row.auditState !== 2" size="small" type="primary" @click="audit(row, 2)">审核通过</el-button>
					<el-button v-if="row.auditState !== 3" size="small" type="warning" @click="audit(row, 3)">审核拒绝</el-button>
					<el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
				</template>
			</el-table-column>

		</el-table>
		
		<el-dialog title="设置规则" :visible.sync="dialogFormVisible">
		    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
		      <el-form-item label="过滤词汇" prop="keyword">
		        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入过滤词汇，使用；分隔，如：关键词1；关键词2；" v-model="form.keyword"> </el-input>
		      </el-form-item>
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		      <el-button @click="cancel('form')">取 消</el-button>
		      <el-button type="primary" @click="update('form')">确 定</el-button>
		    </div>
		</el-dialog>

		<div v-show="!listLoading" class="pagination-container">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		page,
		delObj,
		audit,
		refuse
	} from '@/api/news/article'
	import {
	  getRegular,
	  setRegular
	} from '@/api/news/comment'
	import waves from '@/directive/waves' // 水波纹指令
	import { category } from '@/utils/mixins/news'
	// 缓存过滤内容关键字
	let keyword
	export default {
		name: 'articleList',
		directives: {
			waves
		},
		data() {
			return {
				list: null,
				total: null,
				listLoading: true,
				publishStatus: ['已存稿','已发布'],
				listQuery: {
					offset: 1,
					limit: 20,
					name: undefined,
					auditState: null,
					columnId: null,
					updateTimeStart: undefined,
					updateTimeEnd: undefined
				},
				
				
				dialogFormVisible: false,
			      form: {
			        keyword: ''
			      },
			      rules: {
			        keyword: [
			          {
			            required: true,
			            message: '请输入过滤词汇',
			            trigger: 'blur'
			          }
			        ]
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
				status: [{
						value: 1,
						label: '审核中'
					},
					{
						value: 2,
						label: '审核通过'
					},
					{
						value: 3,
						label: '审核拒绝'
					}
				],
				auditState: {
					1: '待审核',
					2: '审核通过',
					3: '审核拒绝'
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
				console.log(this.listQuery)
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
			async showDialog() {
		      if (keyword === undefined) {
		        keyword = await getRegular().then(data => data.data.keyword)
		      }
		      this.form.keyword = keyword
		      this.dialogFormVisible = true
		    },
		    cancel(formName) {
		      this.dialogFormVisible = false
		    },
		    update(formName) {
		      const set = this.$refs
		      set[formName].validate(valid => {
		        if (valid) {
		          setRegular(this.form).then(() => {
		            this.dialogFormVisible = false
		            // 更新缓存
		            keyword = this.form.keyword
		            this.$notify({
		              title: '成功',
		              message: '操作成功',
		              type: 'success',
		              duration: 2000
		            })
		          })
		        } else {
		          return false
		        }
		      })
		    },
			audit(row, state) {
				let self = this;
				this.$confirm(`确定执行当前操作？`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
							if(state == 2) {
								audit(row.id, state).then(data => {
									this.$notify({
										title: '成功',
										message: '操作成功',
										type: 'success',
										duration: 2000
									})
									row.auditState = state
								})
							} else if(state == 3) {
								this.$prompt('审核信息', '提示', {
									confirmButtonText: '确定',
									showClose: false,
									showCancelButton: false,
									closeOnClickModal: false,
									inputValidator: function(value) {
										if(value && value.length > 0) {
											
											return true
										} else {
											return '请输入评论'
										}
									}
								}).then(({
									value
								}) => {
									let data = {
										id: row.id,
										auditReason: value
									}
									audit(row.id, state).then(data => {
										this.$notify({
											title: '成功',
											message: '操作成功',
											type: 'success',
											duration: 2000
										})
									})
									row.auditState = state
									refuse(data).then(res => {
										this.$message({
											message: '恭喜你，这是一条成功消息',
											type: 'success'
										});
										
									})
									self.getList()
								})

							}
							
						})
							
						},
						handleCategoryChange(data) {
							this.listQuery.columnId = data[data.length - 1]
						}
					}
			}
</script>