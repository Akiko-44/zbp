<template>
	<div>
		<div class="block">
			<el-form :inline="true" label-width="100px" style="width:50%">
				<el-form-item label="专利服务商">
					<el-input v-model="listQuery.title" placeholder="请输入服务商名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="btnGetData">查找</el-button>
				</el-form-item>
			</el-form>
			<el-form :inline="true" class="demo-form-inline" label-position="right" label-widt="50%">
				<el-form-item>
					<el-button type="primary" @click="delSelection">批量删除</el-button>
					<el-button type="primary" @click="$router.push({name: 'addPatent'})">增加服务商</el-button>
				</el-form-item>
			</el-form>
		</div>
		
		<div class="box-s">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="ID" prop='id' width="120">
				</el-table-column>
				<el-table-column label="服务类型">
					<template slot-scope="{row}">
						{{ formData[row.serveName] }}
					</template>
					
				</el-table-column>
				<el-table-column prop="companyName" label="公司名称">
				</el-table-column>
				<el-table-column prop="companyPath" label="公司地址">
				</el-table-column>
				<el-table-column label="logo图">
					<template slot-scope="scope">
						<img :src="scope.row.logoPath | setImg" :style="getImageStyle(scope.row)" class="smallImg" />
					</template>
				</el-table-column>
				<el-table-column prop="phone" label="联系电话">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type='text' @click="$router.push({name:'newPatent',query:{id:scope.row.id}})">编辑</el-button>
						<el-button type='text' @click="delData(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

		</div>
		<div class="block">
			<el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="pageSizes" :page-size="listQuery.limit" :total="allPages" @size-change="handleSizeChange" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
		<div style="padding:20px">
			<h4>专利自定义图文区</h4>
			<el-form>
				<el-form-item label="专利自定义图文区" prop="brief">
					<Tinymce :height="500" ref="editor" v-model="biaodan"></Tinymce>
				</el-form-item>
				<el-form-item prop="brief">
					<el-button type="primary" @click="tuwen">修改</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>

</template>

<script>
	import {
		getPage,
		getId,
		getObj,
		addObj,
		getAllPage,
		delPatent,
		delPatents
	} from '@/api/news/patent'
	import Tinymce from '@/components/Tinymce'
	import { setImg } from '@/filters'
	export default {
		data() {
			return {
				formData:['','专利申请','专利维权'],
				allPages: 0, // 数据总长度
				multipleSelection: [],
				pageSizes: [5, 10, 20, 40],
				biaodan: null,
				ids:null,
				listQuery: {
					offset: 1,
					limit: 5,
					title: undefined,
					supType: 6
				},
				tableData: []
			}
		},
		components:{
			Tinymce
		},
		created() {
			this.getAdd()
			this.getAllPage()
		},
		methods: {
			tuwen(){
				addObj({pictureText:this.biaodan,id:this.ids}).then(res => {
					if(res.success){
						this.$message({
							type: 'success',
							message: '保存成功'
						})
						this.getAdd()
					}
				})
			},
			getAdd(){
				getObj().then(res => {
					if(res.success){
						this.biaodan = res.data[0]?res.data[0].pictureText :null
						this.ids = res.data[0]?res.data[0].id:null
					}
				})
			},
			getImageStyle(item) {
				return {
					backgroundImage: 'url(' + setImg(item.logoPath, {
						w: 500
					}) + ')'
				}
			},
			getPage() {
				getPage(this.listQuery).then(res => {
					this.tableData = res.data
				})
			},
			getAllPage(title) {
				getAllPage().then(res => {
					this.allPages = res.data
					this.getPage()
				})

			},
			handleSizeChange(limit) { // 切换每页展示数量
				this.listQuery.limit = limit
				this.getAllPage()
			},
			handleCurrentChange(page) { // 切换页数
				this.listQuery.offset = page
				this.getAllPage()
			},
			btnGetData() {
				getAllPage(this.listQuery.title).then(res => {
					this.allPages = res.data
					this.getPage()
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			delthis() {
				this.$message({
					message: '删除成功',
					type: 'success'
				});
				this.getAllPage()
			},
			delData(id) {
				delPatent({
					id: id
				}).then(res => {
					if(res.success) {
						this.delthis()
						this.$message({
							message: '删除成功',
							type: 'success'
						})
					}
				})
			},
			delSelection() {
				let arr = this.multipleSelection
				if(arr.length > 0) {
					let data = []
					arr.map(item => {
						data.push(item.id)
					})
					// 在此处发送删除请求
					let text = data.join(',')
					delPatents(text).then(res => {
						if(res.success) {
							this.$message({
								message: '删除成功',
								type: 'success'
							})
							this.delthis()
						}
					})
				} else {
					console.log('请选择要删除的id')
				}

			}
		}
	}
</script>

<style>
	.block {
		margin: 20px 0 0 20px;
		display: flex;
	}
	
	.box-s {
		width: 100%;
		margin: 20px
	}
	.smallImg{
		width: 100px;
	}
</style>