<template>
	<div class="block">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="公司名称">
				<el-input v-model="form.companyName"></el-input>
			</el-form-item>
			<el-form-item label="服务类型">
				<el-select v-model="formData[form.serveName]" placeholder="请选择服务类型" @change="valueChange">
					<el-option label="专利维权" value="2"></el-option>
					<el-option label="专利申请" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="服务价格">
				<el-input v-model="form.servePrice"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
			<el-form-item label="公司地址">
				<el-input v-model="form.companyPath"></el-input>
			</el-form-item>
			<el-form-item label="LOGO图">
				<el-row class="row" v-show="ruleForm.phonePath.length">
						<draggable class="list-group" v-model="ruleForm.phonePath" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
							<el-col class="col" :span="6" v-for="(item, index) in ruleForm.phonePath" :key="index">
								<el-card :body-style="{ padding: '0px' }">
									<a target="_blank" :href="item.url | setImg" class="image" :style="getImageStyle(item)"></a>
									<div style="padding: 14px;">
										<p>{{item.name}}</p>
										<div class="bottom clearfix">
											<el-button type="text" icon="el-icon-delete" @click="handleUpdateOrCreate(index)"></el-button>
										</div>
									</div>
								</el-card>
							</el-col>
						</draggable>
					</el-row>
					<ImageUpload :multiple="true" :checkFile="checkFile" prefix="news" @successCBK="uploadSuccess" />
				<!--<el-upload class="upload-demo" 
					action="https://httpbin.org/post" 
					:on-preview="handlePreview" 
					:on-remove="handleRemove" 
					:file-list="fileList2" 
					list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
				</el-upload>-->
				
				<!--<img :src="base64" alt="" />
				<input type="file" v-show="false" ref="file" @change="changeBase($event)"/>
				<el-button @click="uploadSuccess()">上传</el-button>-->
			</el-form-item>

			<el-form-item label="公司简介" prop="brief">
				<Tinymce :height="500" ref="editor" v-model="form.companyIntroduce"></Tinymce>
			</el-form-item>
			<el-form-item label="服务内容" prop="content">
				<Tinymce :height="500" ref="editor" v-model="form.serveContent"></Tinymce>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">修改提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import ImageUpload from '@/components/Upload'
	import Tinymce from '@/components/Tinymce'
	import Draggable from 'vuedraggable'
	import { setImg } from '@/filters'
	import { getPatent, updataPatent } from '@/api/news/patent'
	export default {
		data() {
			return {
				formData:['','专利申请','专利维权'],
				fileList2: [],
				form: {},
				base64: null,
				ruleForm: {
					phonePath: [],
				},
				dragOptions: {
					animation: 150,
					disabled: false,
					ghostClass: 'ghost',
					scroll: true,
					preventOnFilter: true,
					handle: '.col'
				}
			}
		},
		components: {
			ImageUpload,
			Draggable,
			Tinymce
		},
		created(){
			this.getPatent()
		},
		methods: {
			valueChange(value){
				this.form.serveName = value
			},
			getPatent(){
				getPatent(this.$route.query.id).then(res =>{
					this.ruleForm.phonePath[0] = {url:res.data.logoPath,name:null}
					this.form.id = this.$route.query.id
					this.form = res.data
				})
			},
			 handleRemove(file, fileList) {
        		console.log(file, fileList);
      		},
      		handlePreview(file) {
        		console.log(file);
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
			handleUpdateOrCreate(index) {
				this.ruleForm.phonePath = [] 
				console.log(index)
//				const dialog = this.$refs.dialog
//				dialog.dialogStatus = status
//				dialog.dialogFormVisible = true
//				dialog.resetForm('form', () => {
//					if(row) {
//						dialog.form = JSON.parse(JSON.stringify(row))
//						this.editIndex = index
//					} else {
//						this.editIndex = undefined
//					}
//				})
			},
			updateOrcreateSuccess(row) {
				if(this.editIndex !== undefined) {
					this.form.phonePath.splice(this.editIndex, 1, row)
				} else {
					this.form.phonePath.push(row)
				}
			},
			uploadSuccess(imgs) {
				imgs.forEach(img => {
					this.ruleForm.phonePath.push({
						url: img.key,
						name: '这个主人很懒，什么都没留下'
					})
				})
			},
			changeBase({
				target
			}) {
				const fr = new FileReader()
				fr.readAsDataURL(target.files[0])
				fr.onloadend = e => {
					this.base64 = e.target.result
					target.value = null
					console.log(this.base64.split(',')[1])
				}
			},
			checkFile(file, img) {
				// const size = this.bannerRule[this.form.location - 1]
				// if (img.width !== size.width || img.height !== size.height) {
				//   return '图片尺寸不对，请重新上传'
				// }
			},
			onSubmit() {
				this.form.logoPath = this.ruleForm.phonePath[0].url
				console.log(this.form)
				updataPatent(this.form).then(res =>{
					if(res.success){
						this.$message({
							type: 'success',
							message: '提交成功'
						})
						this.$router.push({name: 'patent'})
					}
				})
			}
		}
	}
</script>

<style>
	.block {
		margin: 20px
	}
	
	.image {
		display: block;
		max-width: 100%;
		height: 280px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>