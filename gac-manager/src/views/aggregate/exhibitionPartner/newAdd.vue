<template>
	<div class="app-container" style="padding-right: 40px">
		<el-form :model="form" :rules="rules" ref="form" label-width="150px">
			<el-form-item label="展会名称" prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="展会区域" prop="exhibitionType">
				<el-select v-model="form.exhibitionType" placeholder="请选择" @change="stateChange">
					<el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="展会地址" prop="detailSite">
				<el-cascader :disabled="lock" :options="options" v-model="selectedOptions" :placeholder="placeholder" @change="handleChangeChildren">
				</el-cascader>
				<el-input style="width: 300px;" v-model="form.detailSite" placeholder="详细地址"></el-input>
			</el-form-item>
			<el-form-item label="开始-结束时间" prop="dateValue">
				<span  v-show="!times" class="clTime">{{dateValue[0]}} -  {{dateValue[1]}}</span>
				<el-date-picker  v-show="times" v-model="dateValue" @blur="alerts" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
				<el-button @click="btnTime" type="primary" v-show="!times">修改时间</el-button>
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
			<el-form-item label="内部展示图" prop="picturePath">
				<el-row class="row" v-show="form.picturePath.length">
					<el-col class="col" :span="6" v-for="(item, index) in form.picturePath" :key="index">
						<el-card style="width:250px;" :body-style="{ padding: '0px' }">
							<a style="min-height: 200px;" target="_blank" :href="item | setImg" class="image" :style="getImageStyle(item)"></a>
							<div style="padding: 14px;">
								<div class="bottom clearfix">
									<el-button type="text" class="button" @click="form.picturePath.splice(index, 1)">删除</el-button>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<div v-show="form.picturePath.length < innerLength">
					<el-button size="small" @click="showCrop('picturePath', 400, 300)" type="primary">上传</el-button>
					<div>共<span class="danger">{{form.picturePath.length}}</span>张，还能上传<span class="danger">{{innerLength - form.picturePath.length}}</span>张</div>
				</div>
			</el-form-item>
			<el-form-item prop="brandId" label="商家品牌">
				<el-checkbox-group v-model="form.brandId">
					<el-checkbox v-for="(item,key) in getList" :label="item.id" :key='key'>{{item.brandName}}</el-checkbox>
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
		<ImageCropper ref="cropper" v-model="cropShow" :noCircle="true" :noSquare="true" :withCredentials="true" imgFormat="jpg" :width="width" :height="height" :prefix="prefix" @crop-upload-success="uploadSuccess" />
	</div>
</template>
<script type="text/javascript">
	import ImageCropper from '@/components/ImageCropper'
	import { isExist } from '@/api/aggregate/merchant'
	import { setImg } from '@/filters'
	import { getRegion, getRegionById, getBrandList, addEx, getExById, updateExById } from '@/api/aggregate/exhibition'
	export default {
		components: {
			ImageCropper
		},
		data() {
			return {
				form: {
					title: undefined,
					regionId: undefined, // 展会地区ID
					detailSite: undefined, // 详细地址 
					showPrint: undefined, // 展示图
					overlookPrint: undefined, // 大鸟览图
					picturePath: [], // 内部展示图
					describe: undefined, // 简介
					exhibitionType: 2, // 展会区域（国内，国外）
					brandId: [],
					// aeriaPath:[]   // 鸟瞰图区
				},
				state: [{
					label: '国内展区',
					value: 2
				}, {
					label: '国外展区',
					value: 1
				}], // 
				stateData: [],
				times:false,
				placeholder: undefined,
				currentCropperName: undefined,
				airscapeLength: 4, // 可以上传鸟览图最大数量
				innerLength: 10, // 内部展示图最大数量
				prefix: 'pic',
				dateValue: [], // 开始到结束时间
				selectedOptions: [],
				options: [],
				cropShow: false, // 打开上传图区
				width: undefined, // 限制图片 width
				height: undefined, // 你应该懂得
				lock: false, // 是否禁用展会区域下拉框
				getList: [],
				rules: {
					title: [{
						required: true,
						message: '请输入展会名称',
						trigger: 'blur'
					}],
					regionId: [{
						required: true,
						message: '请选择地区',
						trigger: 'blur'
					}],
					detailSite: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}],
					describe: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					showPrint: [{
						required: true,
						message: '请放置图片',
						trigger: 'blur'
					}],
//					overlookPrint: [{
//						required: true,
//						message: '请放置VR路径',
//						trigger: 'blur'
//					}],
					picturePath: [{
						required: true,
						message: '请放置图片',
						trigger: 'blur'
					}],
					startTime: [{
						required: true,
						message: '请选择时间',
						trigger: 'blur'
					}],
					detailSite: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}],
					brandId: [{
						required: true,
						message: '请选择参加品牌',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.handleChange()
			this.getBrandList()
		},
		methods: {
			alerts(value) {
				this.times = !this.times;
			},
			btnTime(){
				this.times = !this.times;
			},
			save(formName) {
				if(this.dateValue) {
					this.form.startTime = this.dateValue[0].split('.')[0] // 开始时间
					this.form.finishTime = this.dateValue[1].split('.')[0]  // 结束时间
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let data = Object.assign({},this.form);
						let a = data.brandId.join(','),
							b = data.picturePath.join(',');
						
						data.brandId = a
						data.picturePath = b
						data.aeriaPath = '0'
						data.id = this.$route.query.id
						console.log(data)
						// delete data.brandName
						updateExById(data).then(res => {
							if(res.success) {
								this.$router.push('/exhibition/list')
							}
						})
					} else {
						return false;
					}
				});
			},
			getBrandList() {
				getBrandList().then(res => {
					if(res.success) {
						this.getList = res.data
					}
				})
			},
			async handleChange() {
				getRegion().then(res => {
					let data = res.data
					let bbb = []
					data.map(item => {
						bbb.push({
							value: item.regionId,
							label: item.regionName,
						})
						this.options = bbb
						this.handleChangeChildren(item.regionId)
					})
				})
				if(this.$route.query.id) {
					let datae = await getExById(this.$route.query.id)
					let datas = datae.data
					this.form = datas
					let dataw = datas.brandId.split(',')
					let aaa = []
					dataw.map(item => {
						aaa.push(item - 0)
					})
					this.form.brandId = aaa
					this.form.picturePath = datas.picturePath.split(',')
					this.dateValue[0] = datas.startTime.split('.')[0] // 开始时间
					this.dateValue[1] = datas.finishTime.split('.')[0] // 结束时间
					this.selectedOptions[1] = datas.regionId
					this.placeholder = datas.regionName
				}

			},
			stateChange(value) {
				if(value == 2) {
					this.lock = false;
				}
				if(value == 1) {
					this.lock = true;
					this.form.regionId = 100000
				}
			},
			handleChangeChildren(value) {
				this.options.map(item => {
					if(item.value == value) {
						getRegionById(value).then(res => {
							if(res.success) {
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
				this.cropShow = true
				this.width = width
				this.height = height
				this.currentCropperName = name
			},
			uploadSuccess({ // 保存图片
				key
			}) {
				this.cropShow = false
				this.$refs.cropper.setStep(1)
				if(this.currentCropperName === 'showPrint') {
					this.form[this.currentCropperName] = key
					return
				}
				if(this.currentCropperName === 'overlookPrint') {
					this.form[this.currentCropperName] = key
					return
				}
				if(this.currentCropperName === 'picturePath') {
					this.form.picturePath.push(key)
					return
				}
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
	.clTime{
		display: inline-block;
		width: 350px;
		height:  35px;
		border: 1px solid #99A9BF;
		border-radius: 5px;
		line-height: 35px;
		font-size: 15px;
		color: #99A9BF;
		text-align: center;
		
	}
	.clTime:hover{
		cursor:default;
	}
</style>