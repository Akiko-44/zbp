<template>
	<div class="app-container" style="padding-right: 40px">
		<el-form :model="form" :rules="rules" ref="form" label-width="130px">
			<el-form-item label="作品名称" prop="title">
				<el-input v-model="form.title" placeholder="请输入作品名称"></el-input>
			</el-form-item>
			<div class="box">
				<div class="boxOne">
					<el-form-item label="作品分类">
						<div v-for="(item,index) in CGList" class="duox">
							<p class="xial" @click="launch(item)">
								<i class="el-icon-arrow-down" v-show="item.active"></i>
								<i class="el-icon-arrow-right" v-show="!item.active"></i>
								<span>{{item.name}}</span>
							</p>
							<ul v-show="item.active" class="letp">
								<li v-for="(item2,index2) in item.children">
									<div class="xial" @click="launch(item2)">
										<i class="el-icon-arrow-down" v-show="item2.active"></i>
										<i class="el-icon-arrow-right" v-show="!item2.active"></i>
										<span>{{item2.name}}</span>
										<div @click.stop="tna(item2,index)" :class="{nsa:item2.append}"></div>
									</div>
									<ul v-show="item2.active" class="letp">
										<li v-for="(item3,index3) in item2.children">
											<div class="xial">
												<span>{{item3.name}}</span>
												<div @click.stop="tna(item3,index)" :class="{nsa:item3.append}"></div>
											</div>
										</li>
										<li v-if="item2.children.length==0">无子分类</li>
									</ul>
								</li>
							</ul>
						</div>

					</el-form-item>
				</div>
				<div class="boxTwo">
					<el-card class="box-card" v-show="visible == true">
						<div class="box-card-box" v-for='(item,key) in CGListData'>
							<h6>{{item}}</h6>
							<div @click.stop="addId(iten.id, keys)" v-for="(iten, keys) in item.children">
								<el-checkbox-button v-model="allDataPd[item.id]" :label="iten.name" key="iten.id" border class="Cbtn"><span>{{iten.name}}</span></el-checkbox-button>
							</div>
						</div>
					</el-card>
				</div>
			</div>
			<el-form-item label="作品作者" prop="designerName">
				<el-input v-model="form.designerName" placeholder="请输入作品作者"></el-input>
			</el-form-item>
			<el-form-item label="作品材质" prop="material">
				<el-input v-model="form.material" placeholder="作品材质"></el-input>
			</el-form-item>

			<el-form-item label="标签" prop="labels">
				<el-input v-model="form.labels" placeholder='如不填写自动获取，手动填写请用","分开'></el-input>
			</el-form-item>

			<el-form-item label="作品描述" prop="intro">
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="form.intro">
				</el-input>
			</el-form-item>

			<!--<el-form-item label="下载售价" prop="downPrice">
				<el-input v-model.number="form.downPrice" type="number" maxlength="8" placeholder="请输入下载售价"></el-input>
			</el-form-item>-->

			<el-form-item label="图片上传" prop="pics">
				<el-row class="row" v-show="form.pics.length">
					<draggable class="list-group" v-model="form.pics" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
						<el-col class="col" :span="6" v-for="(item, index) in form.pics" :key="index">
							<el-card :body-style="{ padding: '0px' }">
								<a target="_blank" :href="item.url | setImg" class="image" :style="getImageStyle(item)"></a>
								<div style="padding: 14px;">
									<p>{{item.name}}</p>
									<div class="bottom clearfix">
										<el-button type="text" icon="el-icon-edit" @click="handleUpdateOrCreate('update', item, index)"></el-button>
										<el-button type="text" icon="el-icon-delete" @click="handleDelete(index)"></el-button>
									</div>
								</div>
							</el-card>
						</el-col>
					</draggable>
				</el-row>
				<ImageUpload :multiple="true" :checkFile="checkFile" prefix="gallery" @successCBK="uploadSuccess" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" :loading="loading" @click="save">保存</el-button>
			</el-form-item>
		</el-form>

		<Edit ref="dialog" @success="updateOrcreateSuccess" />
	</div>
</template>

<script>
	import {
		putObj,
		getObj,
		getTree
	} from '@/api/gallery/atlas'
	import { category } from '@/utils/mixins/gallery'
	import waves from '@/directive/waves' // 水波纹指令
	import Edit from './components/edit'
	import Draggable from 'vuedraggable'
	import { setImg } from '@/filters'
	import ImageUpload from '@/components/Upload'
	export default {
		directives: {
			waves
		},
		components: {
			Draggable,
			Edit,
			ImageUpload,
			getTree
		},
		created() {
			if(!this.$route.query.id){
				this.getCateGoryList()
			}
		},
		data() {
			return {
				xList:[],
				visible: false,
				loading: false,
				isDragging: false,
				delayedDragging: false,
				aaaa:{},
				dragOptions: {
					animation: 150,
					disabled: false,
					ghostClass: 'ghost',
					scroll: true,
					preventOnFilter: true,
					handle: '.col'
				},
				newData: [],
				CGList: [],
				allDataPd: {},
				CGListData: [],
				checkeds: [],
				checked3: false,
				checked4: false,
				checked5: false,
				checked6: false,
				checked7: undefined,
				selectedCategory: [],
				selectedCategory2: [],
				selectedCategory3: [],
				selectedCategory4: [],
				selectedCategory5: [],
				age: 0,
				listI:0,
				tree:null,
				form: {
					id: undefined,
					categoryId: undefined,
					galleryAtlasCat: [],
					designerId: 10,
					designerName: '',
					awardId: undefined,
					awardName: '',
					patentId: undefined,
					patentName: '',
					labels: '',
					intro: '',
					downPrice: 1,
					picNum: undefined,
					title: '',
					pics: [],
					category: {},
					material: undefined
				},
				rules: {
					categoryId: [{
						required: true,
						message: '请选择分类',
						trigger: 'change'
					}],
					designerName: [{
						required: true,
						message: '请填写作品作者',
						trigger: 'blur'
					}],
					intro: [{
						required: true,
						message: '请填写作品描述',
						trigger: 'blur'
					}],
					labels:[{
						required: true,
						message: '请填写作品材质',
						trigger: 'blur'
					}],
//					downPrice: [{
//						required: true,
//						message: '请填写下载售价',
//						trigger: 'blur'
//					}],
					title: [{
						required: true,
						message: '请填写作品名称',
						trigger: 'blur'
					}],
					material: [{
						required: true,
						message: '请填写作品材质',
						trigger: 'blur'
					}],
					awardName: [{
						required: true,
						message: '请填写获得的赛事奖项',
						trigger: 'blur'
					}],
					pics: [{
						required: true,
						message: '请上传缩略图',
						type: 'array',
						trigger: 'blur'
					}]
				},
				tree:null,
				editStatus: true,
				// 当前编辑图片的索引，用于更新和创建
				editIndex: undefined,
				category: [],
				newcategory: []
			}
		},
		computed:{
			aList(){
				return this.aList.map(function(item){
					return {categoryId:item.id,name:''}
				})
			}
		},
		watch: {
			isDragging(newValue) {
				if(newValue) {
					this.delayedDragging = true
					return
				}
				this.$nextTick(() => {
					this.delayedDragging = false
				})
			}
		},
		async beforeRouteEnter(to, from, next) {
			const categoryData = await category.get()
			let formData
			let ids
			if(to.query.id) {
				formData = await getObj(to.query.id).then(data => data.data)
				ids = formData.galleryAtlasCat.map(function(item){
					return item.categoryId
				})
			}
			next(vm => {
				vm.getCateGoryList(ids)
				vm.category = JSON.parse(JSON.stringify(categoryData))
				vm.newcategory = [
					[categoryData[0]],
					[categoryData[1]],
					[categoryData[2]],
					[categoryData[3]],
					[categoryData[4]]
				]
				if(formData) {
					// 加定时器修复IE数据没有渲染到页面问题
					setTimeout(() => {
						vm.form = formData
						const arr = formData.galleryAtlasCat
						let item
						for(item of arr) {
							if(item.name === 'A') {
								vm.selectedCategory = category.getParentId(item.categoryId)
							} else if(item.name === 'B') {
								vm.selectedCategory2 = category.getParentId(item.categoryId)
							} else if(item.name === 'C') {
								vm.selectedCategory3 = category.getParentId(item.categoryId)
							} else if(item.name === 'D') {
								vm.selectedCategory4 = category.getParentId(item.categoryId)
							} else if(item.name === 'E') {
								vm.selectedCategory5 = category.getParentId(item.categoryId)
							}
						}
					}, 10)
				}
			})
		},
		beforeRouteLeave(to, from, next) {
			this.onbeforeunloadHandler(next)
		},
		methods: {
			tna(item){
				console.log(item)
				if(!item.append){
					item.append = true
					this.xList.push(item)
					if(item.parent){
						item.parent.append = false
						this.xList = this.xList.filter(li => {
							if(li.id == item.parent.id){
							  	return false
							}else{
							    return true
							}
						})
					}else{
						item.children.forEach(li => {
							li.append = false
						})
						this.xList = this.xList.filter(li => {
							if(li.parent && li.parent.id == item.id){
							  	return false
							}else{
							    return true
							}
						})
					}
					this.CGList = [...this.CGList]
				}else{
					item.append = false
					this.xList = this.xList.filter(li => {
						if(li.id == item.id){
						  	return false
						}else{
						    return true
						}
					})
					this.CGList = [...this.CGList]
				}
			},
			launch(item){
				item.active = !item.active
				this.CGList = [...this.CGList]
			},
			addId(id, age) {
				let data = ['A','B','C','D','E']
				if(this.aaaa[id]==1){
					this.aaaa[id] = {'name': data[this.age], 'categoryId':id}
				}else if(!this.aaaa[id]){
					this.aaaa[id] = 1
				}else{
					delete this.aaaa[id]
				}
			},
			getCateGoryList(ids) {
				getTree().then(res => {
					let arry = res.data
					if(!ids){
						arry.forEach(item1=>{
							item1.children.forEach(item2=>{
								item2.children.forEach(item3=>{
									item3.parent = item2
								})
							})
						})
					}else{
						arry.forEach(item1=>{
							item1.children.forEach(item2=>{
								if(ids.indexOf(item2.id)>=0){
									item1.active = true
									item2.append = true
									this.xList.push(item2)
								}
								item2.children.forEach(item3=>{
									if(ids.indexOf(item3.id)>=0){
										item1.active = true
										item2.active = true
										item3.append = true
										this.xList.push(item3)
									}
									item3.parent = item2
								})
							})
						})
					}
					this.CGList = res.data
				})
			},
			addActive(arry){
				let _this = this
				return arry.map(function(item){
					item.active = false
					item.children = []
					item.append = false
					return item
				})
			},
			save() {
				const set = this.$refs
				let arry = this.xList.map(function(item){
					return {categoryId:item.id,name:''}
				})				
				set.form.validate(valid => {
					if(arry.length==0){
						this.$notify({
							title: '警告',
							message: '请选择分类',
							type: 'warning'
						})
					}else if(valid) {
						this.form.galleryAtlasCat = arry
						this.loading = true
						putObj(this.form).then(data => {
							this.editStatus = false
							this.$notify({
								title: '成功',
								message: '提交成功',
								type: 'success',
								duration: 2000
							})
							this.$router.push({
								path: '/picture/atlas'
							})
							this.loading = false
						}).catch(() => {
							this.loading = false
						})
					} else {
						this.$notify({
							title: '警告',
							message: '请务必填写必选项',
							type: 'warning'
						})
						return false
					}
				})
			},
			reset() {
				this.$refs.form.resetFields()
			},
			getChecked(event) { // 本来是用于关闭 弹出框，暂时不用
				const el = event.target
				if(el.className == "el-card__body" || el.className == "el-checkbox-button__original") {
					if(el.className == 'el-checkbox-button__original') {
						console.log(el.getActiveAttrib('data-id'))
					}

					this.visible = true
				} else {
					this.visible = false
				}
				if(el.checked == false && el.parentNode.parentNode.className != 'box-card-box') {
					this.visible = false
				}
			},
			onbeforeunloadHandler(next) {
				if(this.editStatus) {
					if(window.confirm('确定要放弃当前的操作吗？')) {
						next()
					} else {
						next(false)
					}
				} else {
					next()
				}
			},
			handleChange(data) {
				const c = this.selectedCategory[this.selectedCategory.length - 1]
				const c2 = this.selectedCategory2[this.selectedCategory2.length - 1]
				const c3 = this.selectedCategory3[this.selectedCategory3.length - 1]
				const c4 = this.selectedCategory4[this.selectedCategory4.length - 1]
				const c5 = this.selectedCategory5[this.selectedCategory5.length - 1]
				this.form.categoryId = data[data.length - 1]
				this.form.galleryAtlasCat = [{
					'name': 'A',
					'categoryId': c
				}, {
					'name': 'B',
					'categoryId': c2
				}, {
					'name': 'C',
					'categoryId': c3
				}, {
					'name': 'D',
					'categoryId': c4
				}, {
					'name': 'E',
					'categoryId': c5
				}]
			},
			handleDelete(index) {
				this.form.pics.splice(index, 1)
			},
			getImageStyle(item) {
				return {
					backgroundImage: 'url(' + setImg(item.url, {
						w: 500
					}) + ')'
				}
			},
			onMove({
				relatedContext,
				draggedContext
			}) {
				const relatedElement = relatedContext.element
				const draggedElement = draggedContext.element
				return(!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
			},
			handleUpdateOrCreate(status, row, index) {
				const dialog = this.$refs.dialog
				dialog.dialogStatus = status
				dialog.dialogFormVisible = true
				dialog.resetForm('form', () => {
					if(row) {
						dialog.form = JSON.parse(JSON.stringify(row))
						this.editIndex = index
					} else {
						this.editIndex = undefined
					}
				})
			},
			updateOrcreateSuccess(row) {
				if(this.editIndex !== undefined) {
					this.form.pics.splice(this.editIndex, 1, row)
				} else {
					this.form.pics.push(row)
				}
			},
			uploadSuccess(imgs) {
				imgs.forEach(img => {
					this.form.pics.push({
						url: img.key,
						name: '这个主人很懒，什么都没留下'
					})
				})
			},
			checkFile(file, img) {
				// const size = this.bannerRule[this.form.location - 1]
				// if (img.width !== size.width || img.height !== size.height) {
				//   return '图片尺寸不对，请重新上传'
				// }
			}
		}
	}
</script>

<style scoped>
	.image {
		display: block;
		max-width: 100%;
		height: 280px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	
	.row {
		position: relative;
		left: -20px;
		margin-top: 10px;
	}
	
	.col {
		margin-bottom: 20px;
		margin-left: 20px;
		max-width: 22.8%;
		max-height: 400px;
	}
	
	.col p {
		margin: 0;
		height: 39px;
		line-height: 19px;
		word-break: break-all;
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.el-checkbox-button__inner() {
		padding: 0!important;
	}
	
	.Cbtn span {
		width: 200px;
		height: 100%;
		text-align: center;
		display: inline-block;
	}
	
	.Cbtn label {
		display: inline-block;
		width: 200px;
		text-align: center;
	}
	
	.spBtn {
		display: block;
		width: 200px;
		height: 40px;
		border: 1px solid #d8dbe3;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
		color: #666;
		border-radius: 5px;
	}
	
	.box-card {
		width: 100%;
		margin-left: 20px;
	}
	
	.box {
		display: flex;
	}
	
	.box-card-box {
		margin: 10px
	}
	.xial{
		cursor:pointer;
		position: relative;
		padding-right:20px;
	}
	.xial div{
		width:14px;
		height:14px;
		border:1px solid #d3d3d3;
		position: absolute;
		right:0;
		top:12px;
	}
	.nsa{
		background:#409EFF;
		border:1px solid #409EFF !important;
	}
	li{list-style:none;}
	
</style>