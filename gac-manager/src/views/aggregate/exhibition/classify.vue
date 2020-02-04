<template>
	<div class="box">
		<div class="button">
			<el-button @click="onSubmit">新建分类</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="ID" width="180">
			</el-table-column>
			<el-table-column prop="vrName" label="类别" width="200">
			</el-table-column>
			<el-table-column prop="address" label="操作" fixed="right">
				<template slot-scope="{ row }">
					<el-button @click="handleUpdate(row.id)">编辑</el-button>
					<el-button type="primary" @click="handleDelete(row.id)">删除</el-button>
				</template>

			</el-table-column>
		</el-table>
		<el-dialog title="新建分类" :visible.sync="openBox" width="30%" :before-close="handleClose">
			<span>
				<el-input v-model="vrName"></el-input>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="openBox = false">取 消</el-button>
				<el-button type="primary" :disabled="vrName?false:true"  @click="save">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="openBoxs" width="30%" :before-close="handleClose">
			<span>
				<el-input v-model="vrNames"></el-input>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="openBoxs = false">取 消</el-button>
				<el-button type="primary" :disabled="vrNames?false:true"  @click="saves">确 定</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
	import {
		getIndustryPatentBanner,
		saveExhibitionVrcolumn,
		delExhibitionVrcolumn,
		updaExhibitionVrcolumn
	} from '@/api/aggregate/exhibition'
	export default {
		data() {
			return {
				tableData: [],
				openBox: false,
				openBoxs: false,
				vrName: undefined,
				vrNames: undefined,
				ids: undefined
			}
		},
		created() {
			this.getClassify()
		},
		methods: {
			handleUpdate(id) {
				this.ids = id
				this.openBoxs = true
			},
			handleDelete(id) {
				this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delExhibitionVrcolumn(id).then(res => {
						if(res.success) {
							if(res.data > 0) {
								this.$message({
									type: 'success',
									message: `此分类内还有数据${res.data}条,无法删除`
								});
							} else {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							}
							this.getClassify()
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			onSubmit() {
				this.openBox = true
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			getClassify() {
				getIndustryPatentBanner().then(res => {
					this.tableData = res.data
				})
			},
			save() {
				this.openBox = false
				saveExhibitionVrcolumn({
					vrName: this.vrName
				}).then(res => {
					if(res.success) {
						this.vrName = undefined
						this.getClassify()
						// window.location.reload()
					}
				})
			},
			saves() {
				this.openBoxs = false
				updaExhibitionVrcolumn({
					id: this.ids,
					vrName: this.vrNames
				}).then(res => {
					if(res.success) {
						this.vrNames = undefined
						this.ids = undefined
						this.getClassify()
						// window.location.reload()
					}
				})

			}
		},

	}
</script>

<style>
	.box {
		padding: 20px
	}
</style>