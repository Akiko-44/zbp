<template>
	<div class="app-container calendar-list-container">
		<div class="filter-container">
			<el-button @click="showDialog" type="primary" icon="edit">设置规则</el-button>
		</div>
		<div class="filter-container">
			<el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入文章标题" v-model="listQuery.name" clearable> </el-input>
			<el-cascader clearable placeholder="栏目" :change-on-select="true" :options="categories" v-model="selectedCategory" @change="handleCategoryChange" :props="{value: 'id', label: 'name'}" />
			<el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
		</div>
		<el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
			<el-table-column width="200px" align="left" label="文章标题">
				<template slot-scope="{ row }">
					<span>{{row.title}}</span>
				</template>
			</el-table-column>

			<el-table-column width="180px" align="center" label="最新评论时间">
				<template slot-scope="{ row }">
					<span>{{row.createTime}}</span>
				</template>
			</el-table-column>

			<el-table-column width="110px" align="center" label="栏目">
				<template slot-scope="{ row }">
					<span>{{row.column}}</span>
				</template>
			</el-table-column>

			<el-table-column width="400px" align="left" label="最新评论内容">
				<template slot-scope="{ row }">
					<span>{{row.content}}</span>
				</template>
			</el-table-column>

			<el-table-column width="110px" align="center" label="评论数">
				<template slot-scope="{ row }">
					<span>{{row.commentNum}}</span>
				</template>
			</el-table-column>
			<el-table-column width="110px" align="center" label="点赞数">
				<template slot-scope="{ row }">
					<span>{{row.praiseNum}}</span>
				</template>
			</el-table-column>
			<el-table-column fixed="right" align="center" label="操作" width="150">
				<template slot-scope="{ row, $index }">
					<!--<el-button size="small" @click="reply(row)">回复</el-button>-->
					<el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
				</template>
			</el-table-column>

		</el-table>

		<div v-show="!listLoading" class="pagination-container">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
		</div>

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
	</div>
</template>

<script>
	import {
		page,
		delObj,
		getRegular,
		setRegular,
		refuse
	} from '@/api/news/comment'
	import waves from '@/directive/waves' // 水波纹指令
	import { category } from '@/utils/mixins/news'

	// 缓存过滤内容关键字
	let keyword

	export default {
		name: 'commentList',
		directives: {
			waves
		},
		data() {
			return {
				list: null,
				total: null,
				listLoading: true,
				listQuery: {
					offset: 1,
					limit: 20,
					name: undefined,
					columnId: null
				},
				tableKey: 0,
				categories: [],
				selectedCategory: [],
				dialogFormVisible: false,
				form: {
					keyword: ''
				},
				rules: {
					keyword: [{
						required: true,
						message: '请输入过滤词汇',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.getList()
			category.get().then(data => (this.categories = data))
		},
		methods: {
			reply(row) {
				this.$prompt('请输入回复信息', '提示', {
					confirmButtonText: '确定',
					//								showClose: false,
					//								showCancelButton: false,
					//								closeOnClickModal: false,
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

					let data = [row.id, value]

					refuse(data).then(res => {
						this.$message({
							message: '恭喜你，这是一条成功消息',
							type: 'success'
						});
					})
				})
			},
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
				this.$confirm(`确定删除当前文章的这条评论？`, '提示', {
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
				if(keyword === undefined) {
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
					if(valid) {
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
			handleCategoryChange(data) {
				this.listQuery.columnId = data[data.length - 1]
			}
		}
	}
</script>