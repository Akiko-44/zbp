<template>
	<div>
		<h4>Banner图设置</h4>
		<div style="width: 900px;padding: 20px;position:relative">
			<el-carousel :interval="5000" arrow="always" @change="getKey">
				<el-carousel-item v-for="(item,index) in banner" :key="index">
					<img :src="item.bannerUrl | setImg" style="width: 100%" />
					<div class="posit"><span @click="gaiBanner(item)">编辑</span> <span @click="delBanner(item)">删除</span></div>
				</el-carousel-item>
			</el-carousel>
			<el-button @click="openUpdata = true">添加</el-button>
			<el-dialog title="提示" :visible.sync="openUpdata" width="60%" :before-close="handleClose">
				<el-form>
					<div v-for="(ite,bbb) in phonePath" style="width: 200px" >
						<img :src="ite.url | setImg" style="width: 200px" />
					</div>
					<span @click="phonePath=[]" v-if="phonePath.length>0">删除</span>
					<ImageUpload :multiple="true" :checkFile="checkFile" prefix="news" @successCBK="uploadSuccess" />
					<el-form-item label="路径">
						<el-input v-model="pcUrl" clearable></el-input>
					</el-form-item>
					<el-form-item label="移动端路径">
						<el-input v-model="mobileUrl" clearable></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
    				<el-button @click="aaa">取 消</el-button>
    				<el-button type="primary" @click="setBanner">确 定</el-button>
  				</span>
			</el-dialog>
			<el-dialog title="提示" :visible.sync="changeUpdata" width="60%" :before-close="handleClose">
				<el-form>
					<div v-for="(ite,bbb) in phonePath" style="width: 200px" >
						<img :src="ite.url | setImg" style="width: 200px" />
					</div>
					<span @click="phonePath=[]" v-if="phonePath.length>0">删除</span>
					<ImageUpload :multiple="true" :checkFile="checkFile" prefix="news" @successCBK="uploadSuccess" />
					<el-form-item label="路径">
						<el-input v-model="pcUrl" clearable></el-input>
					</el-form-item>
					<el-form-item label="移动端路径">
						<el-input v-model="mobileUrl" clearable></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
    				<el-button @click="changeUpdata = false">取 消</el-button>
    				<el-button type="primary" @click="changeBanner">确 定</el-button>
  				</span>
			</el-dialog>
		</div>
		<div class="block">
			<h4>重要新闻</h4>
			<el-table :data="data0" size="medium">
				<el-table-column prop="orderBy" label="排序" width="400" align='center'>
				</el-table-column>
				<el-table-column label="文章ID" width="400" align='center'>
					<template slot-scope="{ row }">
						<el-input placeholder="name" v-model="row.name" clearable>
						</el-input>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-row width='200px'>
					<el-button type="primary" @click="save(1)" class="btnMargin" size="width:150px;">保存</el-button>
				</el-row>
			</div>
		</div>
		<div class="block">
			<h4>重要文献</h4>
			<el-table :data="data1" size="medium">
				<el-table-column prop="orderBy" label="排序" width="400" align='center'>
				</el-table-column>
				<el-table-column label="文章ID" width="400" align='center'>
					<template slot-scope="{ row }">
						<el-input placeholder="name" v-model="row.name" clearable>
						</el-input>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-row width='200px'>
					<el-button type="primary" @click="save(2)" class="btnMargin" size="width:150px;">保存</el-button>
				</el-row>
			</div>
		</div>
		<div class="block">
			<h4>资讯头条 政策聚焦   领袖观点   行业动向   </h4>
			<el-table :data="data2" size="medium">
				<el-table-column label="排序" width="400" align='center'>
					<template slot-scope="{ row }">
						{{row.orderBy}}
						<span v-if="row.orderBy == 1">资讯头条</span>
						<span v-if="row.orderBy == 2">政策聚焦</span>
						<span v-if="row.orderBy == 3">领袖观点</span>
						<span v-if="row.orderBy == 4">行业动向</span>
					</template>
				</el-table-column>
				<el-table-column label="文章ID" width="400" align='center'>
					<template slot-scope="{ row }">
						<el-input placeholder="name" v-model="row.name" clearable>
						</el-input>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-row width='200px'>
					<el-button type="primary" @click="save(3)" class="btnMargin" size="width:150px;">保存</el-button>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import ImageUpload from '@/components/Upload'
	import {
		getBanners,
		saveBanners,
		delBanner,
		updataBanners,
		getHomePage,
		setHomePage
	} from '@/api/news/home'
	import { setImg } from '@/filters'
	export default {
		data() {
			return {
				openUpdata: false,
				activeName: [],
				data0: [],
				data1: [],
				data2: [],
				bannerUrl: null,
				pcUrl: null,
				mobileUrl: null,
				phonePath: [],
				banner:[],
				changeUpdata:false,
				setId:null,
			}
		},
		watch: {
			pcUrl: function(newVal, oldVal) {
				console.log(this.ruleForm)
			},
			mobileUrl: function(newVal, oldVal) {
				console.log(this.ruleForm)
			}
		},
		components: {
			ImageUpload
		},
		created() {
			this.getBanner()
			this.getList()
		},
		methods: {
			gaiBanner(item){
				this.phonePath[0] = {url:item.bannerUrl}
				this.pcUrl = item.pcUrl
				this.mobileUrl = item.mobileUrl
				this.changeUpdata = true
				this.setId = item.id
			},
			changeBanner(){
				if(this.phonePath.length > 0){
					this.changeUpdata = false
					this.bannerUrl = this.phonePath[0].url
					let data = {
						id:this.setId,
						bannerUrl: this.phonePath[0].url,
						pcUrl: this.pcUrl,
						mobileUrl: this.mobileUrl,
						flag:6
					}
					saveBanners(data).then(res => {
						if(res.success){
							this.$message({
								type: 'success',
								message:'保存成功'
							})
							this.phonePath = []
							this.pcUrl = null
							this.mobileUrl = null
							this.setId = null
							this.getBanner()
						}
					})
				} else {
					this.$message({
						type: 'warning',
						message: '警告 此项为必填项',
					})
				}
			},
			setBanner(){
				if(this.phonePath.length > 0){
					this.openUpdata = false
					this.bannerUrl = this.phonePath[0].url
					let data = {
						bannerUrl: this.bannerUrl,
						pcUrl: this.pcUrl,
						mobileUrl: this.mobileUrl,
						flag:6
					}
					saveBanners(data).then(res => {
						if(res.success){
							this.$message({
								type: 'success',
								message:'保存成功'
							})
							this.phonePath = []
							this.pcUrl = null
							this.mobileUrl = null
							this.getBanner()
						}
					})
				} else {
					this.$message({
						type: 'warning',
						message: '警告 此项为必填项',
					})
				}
				
			},
			uploadSuccess(imgs) {
				imgs.forEach(img => {
					this.phonePath.push({
						url: imgs[imgs.length - 1],
						name: '这个主人很懒，什么都没留下'
					})
				})
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.aaa()
						done();
					})
					.catch(_ => {});
			},
			checkFile(file, img) {
				// const size = this.bannerRule[this.form.location - 1]
				// if (img.width !== size.width || img.height !== size.height) {
				//   return '图片尺寸不对，请重新上传'
				// }
			},
			aaa() {
				this.openUpdata = false
				this.phonePath = []
				this.pcUrl = null
				this.mobileUrl = null
			},
			getBanner() {
				getBanners({
					flag: 6
				}).then(res => {
					if(res.success){
						this.banner = res.data
					}
				})
			},
			delBanner(item) {
				console.log(item.id)
				this.$confirm('<h3>是否删除该图片?</h3>', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					center: true
				}).then(() => {
					delBanner(item.id).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getBanner()
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			addBanner(item) {

			},
			getKey(key) {
				console.log(this.ruleForm)
				console.log(key)
			},
			handleClick() {},
			getList() {
				getHomePage({
					classIFY: 1,
					num: 4
				}).then(res => {
					let data = []
					for(let i = 1; i < 5; i++) {
						data.push({
							orderBy: i,
							name: res.data[i - 1] ? res.data[i - 1].id : null
						})
					}
					this.data0 = data
				})
				getHomePage({
					classIFY: 2,
					num: 4
				}).then(res => {
					let data = []
					for(let i = 1; i < 5; i++) {
						data.push({
							orderBy: i,
							name: res.data[i - 1] ? res.data[i - 1].id : null
						})
					}
					this.data1 = data
				})
				getHomePage({
					classIFY: 3,
					num: 4
				}).then(res => {
					let data = []
					for(let i = 1; i < 5; i++) {
						data.push({
							orderBy: i,
							name: res.data[i - 1] ? res.data[i - 1].id : null
						})
					}
					this.data2 = data
				})
			},
			save(id) {
				let num = ''
				let datas = [this.data0, this.data1, this.data2, this.data3]
				let data = []
				let aaa = id - 1;
				datas[aaa].map(item => {
					let ies = `${item.orderBy},${item.name}`
					data.push(ies)
				})
				num = data.join(';')
				let xuJ = {
					ids: num,
					classIFY: id
				}
				console.log(xuJ)
				setHomePage(xuJ).then(res => {
					if(res.success) {
						this.$message({
							type: 'success',
							message: '发送成功'
						})
					}
				})
				//console.log(this.tableData)
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
	
	.posit {
		position: absolute;
		right: 5px;
		bottom: 5px;
		font-size: 14px;
		cursor: auto!important;
		color: #1890FF;
	}
	
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>