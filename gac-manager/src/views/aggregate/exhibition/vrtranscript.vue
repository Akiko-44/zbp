<template>
	<div class="app-container" style="padding-right: 40px">
		<el-form :model="form" :rules="rules" ref="form" label-width="150px">
			<el-form-item label="标题" prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="分类" prop="classifyId">
				<el-select v-model="form.classifyId" placeholder="请选择">
    				<el-option
     				 v-for="item in getList"
      				:key="item.value"
      				:label="item.vrName"
      				:value="item.id">
    				</el-option>
  				</el-select>
			</el-form-item>
			<el-form-item label="描述" prop="describe">
				<el-input :autosize="{ minRows: 3, maxRows: 5}" type="textarea" v-model="form.describe" placeholder="请输入简介，建议不超过500字"></el-input>
			</el-form-item>
			<!--<el-form-item label="展示图" prop="picture">
					<el-card v-if="form.picture" style="width:250px;" :body-style="{ padding: '0px' }">
						<img :src="form.picture | setImg" class="image" width="100%">
						<div style="padding: 14px;">
							<div class="bottom clearfix">
								<el-button type="text" class="button" @click="form.picture = ''">删除</el-button>
							</div>
						</div>
					</el-card>
					<el-button @click="showCrop('picture', 600, 400)" type="primary" size="small">上传</el-button>
			</el-form-item>-->
			<el-form-item label="内容" prop="content">
					<Tinymce :height="500" ref="editor" v-model="form.content"></Tinymce>
			</el-form-item>
			<el-form-item label="VR展示图" prop="vrpicture">
					<el-card v-if="form.vrpicture" style="width:250px;" :body-style="{ padding: '0px' }">
						<img :src="form.vrpicture | setImg" class="image" width="100%">
						<div style="padding: 14px;">
							<div class="bottom clearfix">
								<el-button type="text" class="button" @click="form.vrpicture = ''">删除</el-button>
							</div>
						</div>
					</el-card>
					<el-button @click="showCrop('vrpicture', 600, 400)" type="primary" size="small">上传</el-button>
			</el-form-item>
			<el-form-item label="VR展示图链接地址">
					<el-input v-model="form.vrsite"></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="save('form')">提交</el-button>
			</el-form-item>
  		</el-form>
		<ImageCropper 
			ref="cropper" 
			v-model="cropShow" 
			:noCircle="true"
			:noSquare="true" 
			:withCredentials="true" 
			imgFormat="jpg" 
			:width="width" 
			:height="height" :prefix="prefix"
			@crop-upload-success="uploadSuccess" />
	</div>
</template>
<script type="text/javascript">
	import ImageCropper from '@/components/ImageCropper'
	import { isExist } from '@/api/aggregate/merchant'
	import { setImg } from '@/filters'
	import { getRegion ,getRegionById, getBrandList,addEx, getIndustryPatentBanner,saveExhibitionVr} from '@/api/aggregate/exhibition'
	import Tinymce from '@/components/Tinymce'
	export default {
		components:{
			ImageCropper,
			Tinymce
		},
		data(){
			return {
				form: {
					title: undefined,
					picture: "0"
				},
				state:[], // 
				stateData:[],
				currentCropperName: undefined,
				prefix: 'pic',
				selectedOptions:[],
				options:[],
				cropShow: false, // 打开上传图区
				width: undefined, // 限制图片 width
				height: undefined, // 你应该懂得
				getList:[],
				rules:{
					title:[{
						required: true,
						message: '请输入展会名称',
						trigger: 'blur'
					}],
					classifyId:[{
						required: true,
						message: '请选择分类',
						trigger: 'blur'
					}],
					describe:[{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					content:[{
						required: true,
						message: '请填入内容',
						trigger: 'blur'
					}],
					vrpicture:[{
						required: true,
						message: '请放置图片',
						trigger: 'blur'
					}]
				}
			}
		},
		created(){
			this.getBrandList()
		},
		methods:{
			save(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		            saveExhibitionVr(this.form).then(res => {
		            	if(res.success){
		            		this.$router.push('/exhibition/vrlook')
		            	}
		            })
		          } else {
		            return false;
		          }
		        });
			},
			getBrandList(){
				getIndustryPatentBanner().then(res => {
					if(res.success){
						this.getList = res.data
					}
				})
			},
			showCrop(name, width, height) {
				console.log(name)
				this.cropShow = true
				this.width = width
				this.height = height
				this.currentCropperName = name
			},
			uploadSuccess( // 保存图片
				key
			) {
				this.cropShow = false
				this.$refs.cropper.setStep(1)
//				if(this.currentCropperName === 'airscape') {
//					this.form.airscapeList.push({
//						airscape: key,
//						exhibitionId: this.$route.query.id
//					})
//					return
//				}
				if(this.currentCropperName === 'vrpicture') {
					this.form[this.currentCropperName] = key
					return
				}
//				if(this.currentCropperName === 'overLookPrint') {
//					this.hotImg = key
//					this.form.overLookPrint.push({
//						airscape: key,
//						exhibitionId: this.$route.query.id
//					})
//					return
//				}
//				if(this.currentCropperName === 'logo') {
//					this.notPlatformMerchants[this.currentIndex].logo = key
//				}
			},
			getImageStyle(picUrl) {
				return {
					backgroundImage: 'url(' + setImg(picUrl, {
						w: 500
					}) + ')'
				}
			},
		}
	}
</script>
<style type="text/css">
	.image {
		display: block;
		max-width: 100%;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>