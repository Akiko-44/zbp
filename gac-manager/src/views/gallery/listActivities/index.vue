<template>
	<div>
		<div class="block" style="borderBottom: 1px solid #000;">
			<h4>活动列表</h4>
		</div>
		<div class="block">
			<el-row>
				<el-input placeholder="输入活动名称" v-model="listQuery.title" clearable style="width: 200px"></el-input>
				<el-button type="primary" style="width:100px;marginLeft:10px" @click="btnGetData">查询</el-button>
				<el-button type="primary" style="width:100px;" @click="$router.push({name: 'Activities'})">添加活动</el-button>
			</el-row>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="title" label="活动名称" width="180">
				</el-table-column>
				<el-table-column prop="creationTime" label="创建时间" width="180">
				</el-table-column>
				<el-table-column prop="updateTime" label="修改时间">
				</el-table-column>
				<el-table-column prop="rate" label="点击率">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="{row}">
						<el-button type="text" size="small" v-if="row.stickState==1" @click='btnStick(row)'>取消置顶</el-button>
						<el-button type="text" size="small" v-else="row.stickState==0" @click='btnStick(row)'>置顶</el-button>
						<el-button type="text" size="small" v-if="row.putawayState==1" @click='updatePuta(row)'>下架</el-button>
						<el-button type="text" size="small" v-else="row.putawayState==0" @click='updatePuta(row)'>上架</el-button>
						<el-button type="text" size="small" @click="$router.push({name:'Active',query: { id: row.id }})">编辑</el-button>
						<el-button type="text" size="small" @click="delData(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination background layout="prev, pager, next" :page-size="listQuery.limit" :total="allPages" @size-change="handleSizeChange" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		page,
		allPage,
		updateStickstate,
		delActivityById,
		activityPutWayState
	} from '@/api/gallery/listActivities'
	export default {
		data() {
			return {
				tableData: [],
				listQuery: {
					offset: 1,
					limit: 10,
					title: undefined,
					supType: 1
				},
				zhiDing: false,
				allPages: 0
			}
		},
		created() {
			this.getAllpage()
		},
		methods: {
			getAge() {
				page(this.listQuery).then(data => {
					this.tableData = data.data
					if(data.data[0].stickState == 1){
						this.zhiDing = true
					}
				})
			},
			getAllpage() {
				this.getAge()
				allPage({
					title: this.listQuery.title,
					supType:1
				}).then(data => {
					/// this.$nextTick(_=>{
						this.allPages = data.data
					// })
					
				})
			},
			updatePuta(row) {
				let data = {
					id: Number(row.id),
					putawayState: row.putawayState
				}
				activityPutWayState(data).then(res => {
					this.getAllpage()
				}).catch(res => {
					console.log('上架失败')
				})
			},
			handleSizeChange(val) { // pageSize 改变时会触发
				
			},
			handleCurrentChange(val) { // currentPage 改变时会触发 显示当前页
				
				this.listQuery.offset = val
				this.getAllpage()
			},
			btnGetData() {
				this.getAllpage()
			},
			delData(row) {
				this.$confirm('<h3>是否删除该活动?</h3>', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					center: true
				}).then(() => {
					delActivityById(row.id).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getAge()
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			btnStick(row) {
				let data = {
					id: row.id,
					stickState: row.stickState
				}
				if(this.zhiDing){
					if(row.stickState == 1){
						updateStickstate(data).then(res => {
						this.zhiDing = false
						this.$message({
							type: 'success',
							message: '取消置顶!'
						});
						this.getAllpage()
					})
					}else{
						this.$message({
							message: '已经有信息置顶, 请先取消已置顶的',
							type: 'warning'
						});
					}
				}else{
						this.$confirm('<h3>是否置顶该活动?</h3>', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							dangerouslyUseHTMLString: true,
							center: true
						}).then(() => {
							updateStickstate(data).then(res => {
								this.zhiDing = true
								this.$message({
									type: 'success',
									message: '置顶成功!'
								});
								this.getAllpage()
							})
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '取消置顶'
							});
						});
				}
			}
		}
	}
</script>
<style scoped>
	.block {
		margin: 20px 0 10px 20px;
		width: 100%;
		overflow: hidden;
	}
</style>