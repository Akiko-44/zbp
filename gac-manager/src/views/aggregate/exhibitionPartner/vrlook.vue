<template>
	<div>
		<div class="block">
			<el-form :inline="true" label-width="100px" style="width:50%">
				<el-form-item label="搜索">
					<el-input v-model="listQuery.title" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="btnGetData">查找</el-button>
				</el-form-item>
			</el-form>
			<el-form :inline="true" class="demo-form-inline" label-position="right" label-widt="50%">
				<el-form-item>
					<el-button type="primary" @click="$router.push({name: 'vrtranscriptPartnerList'})">增加VR展示</el-button>
				</el-form-item>
			</el-form>
		</div>
		
		<div class="box-s">
			<el-table ref="multipleTable" :data="tableData"style="width: 100%">
				<el-table-column label="分类ID" prop='id' width="120">
				</el-table-column>
				<el-table-column label="标题" prop="title">
				</el-table-column>
				<el-table-column label="VR展示图">
					<template slot-scope="scope">
						<img :src="scope.row.vrpicture | setImg" class="smallImg" /><!--:style="getImageStyle(scope.row)" -->
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type='text' @click="$router.push({name:'vrnewtranscriptPartnerList',query:{id:scope.row.id}})">编辑</el-button>
						<el-button type='text' @click="delData(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

		</div>
		<div class="block">
			<el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="pageSizes" :page-size="listQuery.limit" :total="allPages" @size-change="handleSizeChange" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
		<!--<div style="padding:20px">
			<h4>专利自定义图文区</h4>
			<el-form>
				<el-form-item label="专利自定义图文区" prop="brief">
					<Tinymce :height="500" ref="editor" v-model="biaodan"></Tinymce>
				</el-form-item>
				<el-form-item prop="brief">
					<el-button type="primary" @click="tuwen">修改</el-button>
				</el-form-item>
			</el-form>
		</div>-->
	</div>

</template>

<script>
	import {
		getPage,
		delExhibitionById,
//		getId,
//		getObj,
//		addObj,
 		getAllPage,
//		delPatent,
//		delPatents
	} from '@/api/aggregate/exhibition'
	import Tinymce from '@/components/Tinymce'
	import { setImg } from '@/filters'
	export default {
		data() {
			return {
				allPages: 0, // 数据总长度
				multipleSelection: [],
				pageSizes: [5, 10, 20, 40],
				biaodan: null,
				ids:null,
				listQuery: {
					offset: 1,
					limit: 5,
					title: undefined,
				},
				tableData: []
			}
		},
		components:{
			Tinymce
		},
		created() {
			// this.getAdd()
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
//			getAdd(){
//				getObj().then(res => {
//					if(res.success){
//						this.biaodan = res.data[0]?res.data[0].pictureText :null
//						this.ids = res.data[0]?res.data[0].id:null
//					}
//				})
//			},
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
				getAllPage({title:this.listQuery.title}).then(res => {
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
				delExhibitionById(id).then(res => {
					if(res.success) {
						this.delthis()
//						this.$message({
//							message: '删除成功',
//							type: 'success'
//						})
					}
				})
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