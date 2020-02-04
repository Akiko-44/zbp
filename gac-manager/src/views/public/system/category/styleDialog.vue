<template>
	<el-dialog title="关联款式" :visible.sync="dialogTableVisible">
		<el-input style="width: 195px;" placeholder="请输入款式名称" v-model="listParams.styleName"> </el-input>
		<el-button type="primary" class="btn" v-waves @click="getList">查询</el-button>
		<span class="tip" style="color: red;"> 提示：单击以下选项即可选中该款式</span>
		<el-table :data="styleList" ref="enterpriseTable" highlight-current-row @current-change="tableCurrentChange" style="width: 100%">
			<el-table-column type="index" label="序号" width="150"></el-table-column>
			<el-table-column property="styleName" label="款式名称"></el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, prev, pager, next" :total="total"> </el-pagination>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogTableVisible = false">取 消</el-button>
			<el-button type="primary" @click="selectStyle">保存</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import { stylePage } from '@/api/public/system'
	import waves from '@/directive/waves' // 水波纹指令

	export default {
		directives: {
			waves
		},
		data() {
			return {
				attributeSelected: [],
				dialogTableVisible: false,
				listParams: {
					offset: 1,
					limit: 10,
					styleName: ''
				},
				total: 0,
				selectedName: {},
				styleList: []
			}
		},
		methods: {
			getList() {
				stylePage(this.listParams).then(data => {
					this.styleList = data.data.records
					this.total = data.data.total
				})
			},
			openDialog() {
				this.dialogTableVisible = true
				this.getList()
			},
			tableCurrentChange(val) {
				this.selectedName = val
			},
			selectStyle() {
				this.dialogTableVisible = false
				this.$emit('selectStyle', this.selectedName)
			},
			handleCurrentChange(val) {
				this.listParams.offset = val
				this.getList()
			}
		}
	}
</script>

<style scoped lang="postcss">
	.pagination {
		text-align: right;
		margin-top: 10px;
	}
	
	.tip {
		margin-left: 20px;
		font-size: 12px;
	}
</style>