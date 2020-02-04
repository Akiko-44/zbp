<template>
	<div class="app-container" style="padding-right: 40px">
		<el-form :model="form" :rules="rules" ref="form" label-width="150px">
			<el-form-item label="展会名称" prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="展会区域" prop="exhibitionType">
				<el-select v-model="form.exhibitionType" placeholder="请选择" @change="stateChange">
    				<el-option
     				 v-for="item in state"
      				:key="item.value"
      				:label="item.label"
      				:value="item.value">
    				</el-option>
  				</el-select>
			</el-form-item>
			<el-form-item label="展会地址" prop="detailSite">
					 <el-cascader
					 	:disabled="lock"
    					:options="options"
   						v-model="selectedOptions"
    					@change="handleChangeChildren">
  						</el-cascader>
  						<el-input style="width: 300px;" v-model="form.detailSite" placeholder="详细地址"></el-input>
  			</el-form-item>
  			<el-form-item label="开始-结束时间" prop="dateValue">
					<el-date-picker v-model="form.dateValue" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
					</el-date-picker>
			</el-form-item>
			
				<el-form-item label="展示图" prop="showPrint">
					<el-card v-if="form.showPrint" style="width:250px;" :body-style="{ padding: '0px' }">
						<img :src="form.showPrint | setImg" class="image" width="100%">
						<div style="padding: 14px;">
							<div class="bottom clearfix">
								<el-button type="text" class="button" @click="form.showPrint = ''">删除</el-button>
							</div>
						</div>
					</el-card>
					<el-button @click="showCrop('showPrint', 1200, 400)" type="primary" size="small">上传</el-button>
				</el-form-item>
				<el-form-item label="VR路径" prop="overlookPrint">
					<el-input v-model="form.overlookPrint"></el-input>
				</el-form-item>
			<el-form-item label="内部展示图" prop="picturePaths">
					<el-row class="row" v-show="form.picturePaths.length">
						<el-col class="col" :span="6" v-for="(item, index) in form.picturePaths" :key="index">
							<el-card style="width:250px;" :body-style="{ padding: '0px' }">
								<a style="min-height: 200px;" target="_blank" :href="item | setImg" class="image" :style="getImageStyle(item)"></a>
								<div style="padding: 14px;">
									<div class="bottom clearfix">
										<el-button type="text" class="button" @click="form.picturePaths.splice(index, 1)">删除</el-button>
									</div>
								</div>
							</el-card>
						</el-col>
					</el-row>
				<div v-show="form.picturePaths.length < innerLength">
					<el-button size="small" @click="showCrop('picturePaths', 400, 300)" type="primary">上传</el-button>
					<div>共<span class="danger">{{form.picturePaths.length}}</span>张，还能上传<span class="danger">{{innerLength - form.picturePaths.length}}</span>张</div>
				</div>
			</el-form-item>
			<el-form-item prop="brandIds" label="商家品牌">
				<el-checkbox-group v-model="form.brandIds">
    				<el-checkbox :label="item.id" v-for="(item,key) in getList" :key="key">{{item.brandName}}</el-checkbox>
  				</el-checkbox-group>
  			</el-checkbox-group>
			</el-form-item>
			<el-form-item label="会展简介" prop="describe">
				<el-input :autosize="{ minRows: 3, maxRows: 5}" type="textarea" v-model="form.describe" placeholder="请输入简介，建议不超过500字"></el-input>
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
	import { getRegion ,getRegionById, getBrandList,addEx} from '@/api/aggregate/exhibition'
	export default {
		components:{
			ImageCropper
		},
		data(){
			return {
				form: {
					title: undefined,
					regionId:undefined  , // 展会地区ID
					detailSite:undefined,  // 详细地址 
					showPrint: undefined, // 展示图
					overlookPrint: undefined, // vr路径
					picturePaths: [],  // 内部展示图
					describe: undefined, // 简介
					exhibitionType: 2,  // 展会区域（国内，国外）
					brandIds:[],
					dateValue:[],
					// aeriaPaths:[]   // 鸟览图区
					
				},
				state:[{label: '国内展区',value: 2},{label: '国外展区',value: 1}], // 
				stateData:[],
				currentCropperName: undefined,
				// airscapeLength: 4, // 可以上传鸟览图最大数量
				innerLength: 6,  // 内部展示图最大数量
				prefix: 'pic',
				dateValue:undefined, // 开始到结束时间
				selectedOptions:[],
				options:[],
				cropShow: false, // 打开上传图区
				width: undefined, // 限制图片 width
				height: undefined, // 你应该懂得
				lock: false,  // 是否禁用展会区域下拉框
				getList:[],
				rules:{
					title:[{
						required: true,
						message: '请输入展会名称',
						trigger: 'blur'
					}],
					regionId:[{
						required: true,
						message: '请选择地区',
						trigger: 'blur'
					}],
					detailSite:[{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}],
					describe:[{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					showPrint:[{
						required: true,
						message: '请放置图片',
						trigger: 'blur'
					}],
//					overlookPrint:[{
//						required: true,
//						message: '请放置VR路径',
//						trigger: 'blur'
//					}],
					picturePaths:[{
						required: true,
						message: '请放置图片',
						trigger: 'blur'
					}],
					dateValue:[{
						required: true,
						message: '请选择时间',
						trigger: 'blur'
					}],
					detailSite:[{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}],
					brandIds:[{
						required: true,
						message: '请选择参加品牌',
						trigger: 'blur'
					}]
				}
			}
		},
		created(){
			this.getBrandList()
			this.handleChange()
		},
		methods:{
			save(formName){
				if(this.form.dateValue){
					this.form.startTime = this.form.dateValue[0] // 开始时间
					this.form.finishTime = this.form.dateValue[1]  // 结束时间
				}
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	let a = this.form.brandIds.join(','),
		          	b = this.form.picturePaths.join(',');
		          	let data = {}
		          	data.overlookPrint = this.form.overlookPrint
		          	data.showPrint = this.form.showPrint
		          	data.startTime = this.form.startTime
		          	data.finishTime = this.form.finishTime
		          	data.title= this.form.title
		          	data.regionId= this.form.regionId
		          	data.detailSite= this.form.detailSite
		          	data.exhibitionType= this.form.exhibitionType
		          	data.describe= this.form.describe
		          	data.brandId = a
		          	data.picturePath = b
		          	data.aeriaPath = '0'
		            addEx(data).then(res => {
		            	if(res.success){
		            		this.$router.push('/exhibition/list')
		            	}
		            })
		          } else {
		            return false;
		          }
		        });
			},
			getBrandList(){
				getBrandList().then(res => {
					if(res.success){
						this.getList = res.data
					}
				})
			},
			handleChange(){
					getRegion().then(res => {
					let data = res.data
					let bbb = []
					data.map(item =>{
						bbb.push({
							value: item.regionId,
            				label: item.regionName,
						})
						this.options = bbb
						this.handleChangeChildren(item.regionId)
					})					
				})					
			},
			stateChange(value){
				if(value == 2){this.lock = false;}
				if(value == 1){this.lock = true; this.form.regionId = 0}
			},
			handleChangeChildren(value){
				this.options.map(item => {
					if(item.value == value){
						getRegionById(value).then(res => {
							if(res.success){
								let ccc = []
								res.data.map(iten => {
									ccc.push({
										value: iten.regionId,
            							label: iten.regionName,
									})			
								})
								item.children = ccc
							}
						})
					}
				})
				this.form.regionId = this.selectedOptions[1]
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
				if(this.currentCropperName === 'showPrint') {
					this.form[this.currentCropperName] = key
					return
				}
				if(this.currentCropperName === 'overlookPrint') {
					this.form[this.currentCropperName] = key
					return
				}
				if(this.currentCropperName === 'aeriaPaths') {
					this.form.aeriaPaths.push(key)
					return
				}
				if(this.currentCropperName === 'picturePaths') {
					this.form.picturePaths.push(key)
					return
				}
//				if(this.currentCropperName === 'overlookPrint') {
//					this.hotImg = key
//					this.form.overlookPrint.push({
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