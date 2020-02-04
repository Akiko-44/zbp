<template>
	<div>
		<BannerSettings :getBanners="getBanners" :saveBanners="saveBanners" />
		<div class="block">
			<h4>赛事获奖作品</h4>
			<el-table :data="data1" size="medium">
				<el-table-column prop="orderBy" label="排序" width="400" align='center'>
				</el-table-column>
				<el-table-column label="图集ID" width="400" align='center'>
					<template slot-scope="{ row }">
						<el-input placeholder="请输入图集ID" v-model="row.name" clearable>
						</el-input>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-row width='200px'>
					<el-button type="primary" @click="save(1,data1)" class="btnMargin" size="width:150px;">保存</el-button>
				</el-row>
			</div>
		</div>
		<div class="block">
			<h4>玉雕设计作品</h4>
			<el-table :data="data2" size="medium">
				<el-table-column prop="orderBy" label="排序" width="400" align='center'>
				</el-table-column>
				<el-table-column label="图集ID" width="400" align='center'>
					<template slot-scope="scope">
						<el-input placeholder="请输入图集ID" v-model="scope.row.name" clearable>
						</el-input>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-row width='200px'>
					<el-button type="primary" @click="save(2,data2)" class="btnMargin" size="width:150px;">保存</el-button>
				</el-row>
			</div>
		</div>
		<div class="block">
			<h4>首饰设计作品</h4>
			<el-table :data="data3" size="medium">
				<el-table-column prop="orderBy" label="排序" width="400" align='center'>
				</el-table-column>
				<el-table-column label="图集ID" width="400" align='center'>
					<template slot-scope="{ row }">
						<el-input placeholder="请输入图集ID" v-model="row.name" clearable>
						</el-input>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-row width='200px'>
					<el-button type="primary" @click="save(3,data3)" class="btnMargin" size="width:150px;">保存</el-button>
				</el-row>
			</div>
		</div>
		<div class="block">
			<h4>国际设计师作品</h4>
			<el-table :data="data4" size="medium">
				<el-table-column prop="orderBy" label="排序" width="400" align='center'>
				</el-table-column>
				<el-table-column label="图集ID" width="400" align='center'>
					<template slot-scope="{ row }">
						<el-input placeholder="请输入图集ID" v-model="row.name" clearable>
						</el-input>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-row width='200px'>
					<el-button type="primary" @click="save(4,data4)" class="btnMargin" size="width:150px;">保存</el-button>
				</el-row>
			</div>
		</div>
		<div class="block">
			<h4>专利作品</h4>
			<el-table :data="data5" size="medium">
				<el-table-column prop="orderBy" label="排序" width="400" align='center'>
				</el-table-column>
				<el-table-column label="图集ID" width="400" align='center'>
					<template slot-scope="{ row }">
						<el-input placeholder="请输入图集ID" v-model="row.name" clearable>
						</el-input>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-row width='200px'>
					<el-button type="primary" @click="save(5,data5)" class="btnMargin" size="width:150px;">保存</el-button>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import BannerSettings from '@/components/app/bannerSettings/banner'
	import { getBanners, saveBanners } from '@/api/gallery/homeSettings'
	import {
		savePhoto,
		getPhoto
	} from '@/api/gallery/homeSettings'
	export default {
		data() {
			return {
				data1: [{
					orderBy: 1,
					name: ''
				}, {
					orderBy: 2,
					name: ''
				}, {
					orderBy: 3,
					name: ''
				}, {
					orderBy: 4,
					name: ''
				}, {
					orderBy: 5,
					name: ''
				}, {
					orderBy: 6,
					name: ''
				}],
				data2: [{
					orderBy: 1,
					name: ''
				}, {
					orderBy: 2,
					name: ''
				}, {
					orderBy: 3,
					name: ''
				}, {
					orderBy: 4,
					name: ''
				}],
				data3: [{
					orderBy: 1,
					name: ''
				}, {
					orderBy: 2,
					name: ''
				}, {
					orderBy: 3,
					name: ''
				}, {
					orderBy: 4,
					name: ''
				}],
				data4: [{
					orderBy: 1,
					name: ''
				}, {
					orderBy: 2,
					name: ''
				}, {
					orderBy: 3,
					name: ''
				}, {
					orderBy: 4,
					name: ''
				}],
				data5: [{
					orderBy: 1,
					name: ''
				}, {
					orderBy: 2,
					name: ''
				}, {
					orderBy: 3,
					name: ''
				}, {
					orderBy: 4,
					name: ''
				}, {
					orderBy: 5,
					name: ''
				}, {
					orderBy: 6,
					name: ''
				}],
			}
		},
		components: {
			BannerSettings
		},
		created() {
			this.getList()
		},
		methods: {
			getBanners,
			saveBanners,
			getList() {
				let data1 = [],
					data2 = [],
					data3 = [],
					data4 = [],
					data5 = [];
				getPhoto({classIFY:1,num:6}).then(res => {
					for(let i = 1; i < 7; i++) {
						data1.push({
							orderBy: i,
							name: res.data[i - 1] ? res.data[i - 1].id : null
						})
					}
					this.data1 = data1
				})
				getPhoto({classIFY:2,num:4}).then(res => {
					for(let i = 1; i < 5; i++) {
						data2.push({
							orderBy: i,
							name: res.data[i - 1] ? res.data[i - 1].id : null
						})
					}
					this.data2 = data2
				})
				getPhoto({classIFY:3,num:4}).then(res => {
					for(let i = 1; i < 5; i++) {
						data3.push({
							orderBy: i,
							name: res.data[i - 1] ? res.data[i - 1].id : null
						})
					}
					this.data3 = data3
				})
				getPhoto({classIFY:4,num:4}).then(res => {
					for(let i = 1; i < 5; i++) {
						data4.push({
							orderBy: i,
							name: res.data[i - 1] ? res.data[i - 1].id : null
						})
					}
					this.data4 = data4
				})
				getPhoto({classIFY:5,num:6}).then(res => {
					for(let i = 1; i < 7; i++) {
						data5.push({
							orderBy: i,
							name: res.data[i - 1] ? res.data[i - 1].id : null
						})
					}
					this.data5 = data5
				})
			},
			save(id, aaa) {
				let num = ''
				let data = []
				aaa.map(item => {
					let ies = `${item.orderBy},${item.name}`
					// console.log(ies)
					data.push(ies)
				})
				num = data.join(';')
				let xuJ = {
					ids: num,
					classIFY: id
				}
				console.log(xuJ)
				savePhoto(xuJ).then(res => {
					if(res.success) {
						this.$message({
							message: '发送成功消息',
							type: 'success'
						});
					}
				})
			}

		}
	}
</script>
<style scoped>
	.block {
		margin: 20px;
		width: 800px;
		overflow: hidden;
	}
	
	.btnMargin {}
</style>