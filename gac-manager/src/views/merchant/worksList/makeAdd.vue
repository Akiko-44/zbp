<template>
	<div class="app-container">
		<el-form style="padding-right: 200px" :model="form" :rules="rules" ref="form" label-width="120px">

			<h4 id="BaseInfo">基本信息：</h4>
			<!--<el-form-item label="品牌" prop="brandId">
				<el-select @change="brandChange" v-model="form.brandId" placeholder="选择商品品牌">
					<el-option v-for="item in brandList" :key="item.id" :label="item.brandName" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>-->
			<el-form-item label="商品名称" prop="caseName">
				<el-input v-model="form.caseName"></el-input>
			</el-form-item>

			<el-form-item label="副标题">
				<el-input v-model="form.subtitle"></el-input>
			</el-form-item>

			<el-form-item label="关键字" prop="keywords">
				<el-input v-model="form.keywords" placeholder="商品关键字,使用','号分隔,能准确搜到商品的,比如: 海尔电视,电视之类"></el-input>
			</el-form-item>

			<el-form-item label="商品货号">
				<el-input v-model="form.goodsNO"></el-input>
			</el-form-item>

			<el-form-item label="条形码">
				<el-input v-model="form.barCode"></el-input>
			</el-form-item>

			<h4 id="WorkInfo">商品信息：</h4>
			<el-form-item label="商品分类" prop="primaryCgyName">
		        <template v-if="!form.id || categoryShow">
		          <el-cascader
		            change-on-select
		            placeholder="选择商品分类"
		            :options="categories"
		            v-model="selectedCategory"
		            @change="handleCategoryChange"
		            :props="{value: 'id', label: 'name'}"
		          />
		        </template>
		        <template v-if="form.id && !categoryShow">
		          <span>{{form.primaryCgyName}} - {{form.secondaryCgyName}} - {{form.thridaryCgyName}}</span>
		          <el-button type="text" @click="categoryShow = true">修改</el-button>
		        </template>
		      </el-form-item>

			<el-form-item label="商品主图" prop="picUrlList">
				<el-row class="row" v-if="form.picUrlList.length">
					<el-col class="col" :span="6" v-for="(picUrl, index) in form.picUrlList" :key="index">
						<el-card style="width:250px;" :body-style="{ padding: '0px' }">
							<a target="_blank" :href="picUrl | setImg" class="image" :style="getImageStyle(picUrl)"></a>
							<div style="padding: 14px;">
								<div class="bottom clearfix">
									<el-button type="text" class="button" @click="form.picUrlList.splice(index, 1)">删除</el-button>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<div v-if="form.picUrlList.length < 9">
					<ImageUpload :multiple="true" prefix="work" @successCBK="workUploadSuccess" />
					<div>共<span class="danger">{{form.picUrlList.length}}</span>张，还能上传<span class="danger">{{9 - form.picUrlList.length}}</span>张</div>
				</div>
			</el-form-item>
			<el-form-item label="视频介绍">
				<video controls="controls" v-if="form.videoUrl" style="width: 450px; height: 250px;" :src="form.videoUrl">
					您的浏览器不支持 html5 video 属性，下载视频查看：
					<el-button size="mini" type="text">
						<a :href="form.videoUrl" target="_blank">下载视频</a>
					</el-button>
				</video>
				<el-button v-if="form.videoUrl" type="text" @click="form.videoUrl = ''">删除视频</el-button>
				<template v-else>
					<video-upload @success="videoUploadScccess" />
				</template>
			</el-form-item>

			<el-form-item label="设计理念">
				<el-input :autosize="{ minRows: 3, maxRows: 5}" type="textarea" v-model="form.designConcept" placeholder="请输入设计理念，不超过500字"></el-input>
			</el-form-item>

			<!--<div class="pay">
	    		<el-form-item label="运费设置">
				    <el-select v-model="form.freightId" placeholder="请选择运费模板">
				      <el-option v-for="item in regionmodel" :label="item.name" :value="item.id" :key="item.name"></el-option>
				    </el-select>
				     <el-button type="primary" @click="onSubmit">添加模板</el-button>
				  </el-form-item>
	    		<el-form-item label="商品重量">
				    <el-input v-model="form.goodsWeight" class="comm"></el-input>g
				  </el-form-item>
				  <el-form-item label="发货地">
				    <el-select v-model="address1" placeholder="请选择省" @visible-change="onChange($event)" ref="data1">
				      <el-option :label="item.regionName" :value="item.regionName" v-for="item in regionData" :key="item.regionName"></el-option>
				    </el-select>
				    <el-select v-model="address2" placeholder="请选择市">
				      <el-option :label="item.regionName" :value="item.regionName" v-for="item in regionData1" :key="item.regionName"></el-option>
				    </el-select>
				  </el-form-item>
	    	</div>-->
			
			<el-form-item label="最小购买量" prop="batchNum">
        	<el-input v-model="form.batchNum"></el-input>
	      </el-form-item>
				
				<el-form-item label="商品类型">
	        <el-radio-group v-model="form.caseType">
	          <el-radio label="1">现货商品</el-radio>
	          <el-radio label="2">定制商品</el-radio>
	        </el-radio-group>
	      </el-form-item>

			<el-form-item label="商品服务">
				<el-checkbox-group v-model="serveChecked" @change="serveTypeChange">
					<el-checkbox v-for="item in serveCheckList" :key="item.id" :label="item.id">{{item.menu}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>

			<!--<el-form-item label="关联商品">
				<el-table style="margin-bottom: 10px;" :data="associateGoods" border>
					<el-table-column align="center" label="商品ID">
						<template slot-scope="{ row }">
							<el-input @blur="isgoodsExist(row)" style="width: 200px;" placeholder="输入商品ID" v-model.number="row.goodsid"></el-input>
						</template>
					</el-table-column>
					<el-table-column width="200px" align="center" label="商品主图">
						<template slot-scope="{ row, $index }">
							<el-card class="card" v-if="row.mainPic" :body-style="{ padding: '0px' }">
								<img :src="row.mainPic | setImg" class="image" width="100%" style="display: block;">
							</el-card>
						</template>
					</el-table-column>
					<el-table-column align="left" label="操作">
						<template slot-scope="{ row, $index }">
							<el-button type="text" class="button" @click="associateGoods.splice($index, 1)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-button size="small" plain type="primary" @click="addMerchant()">添加商品</el-button>
			</el-form-item>-->
			<GoodsSpec :goodsSpec="goodsSpecData" :goodsSpecTable="goodsSpecTableData" @sendstock='getStock' @exChange="getExChange"></GoodsSpec>
			
      <el-form-item label="库存" prop="stock">
        <el-input v-model.number="form.stock" disabled></el-input>
        <el-radio-group v-model="form.stockType">
          <el-radio label="1">付款减库存</el-radio>
          <el-radio label="2">拍下减库存</el-radio>
        </el-radio-group>
      </el-form-item>
			<!--<el-form-item label="商品规格">

				<el-button size="small" plain type="primary" @click="saveSpec()">保存</el-button>
				<el-button size="small" plain type="primary" @click="addSpec()">添加规格</el-button>
				<el-card class="box-card" v-for="(card,cardIndex) in goodsSpecData" :key="cardIndex">

					<div slot="header" class="clearfix">
						<el-input style="width: 200px;" placeholder="输入商品ID" v-model="card.specsName"></el-input>
						<el-button style="" type="text" @click="addSpecItem(card,cardIndex)">添加规格项</el-button>
						<el-button style="color: red;" type="text" @click="removeSpec(card,cardIndex)">删除</el-button>
					</div>
					<div v-for="(attr,attrIndex) in card.goodsSpecsAttrs" :key="attrIndex" class="text item">
						<el-input style="width: 200px;" placeholder="输入商品ID" v-model="attr.attrValue"></el-input>
						<el-button style="color: red;" type="text" @click="removeSpecItem(card,attr,attrIndex)">删除</el-button>
					</div>
				</el-card>

				<el-table style="margin-bottom: 10px;" :data="goodsSpecTableData" border>
					<el-table-column align="center" :label="item.specsName" :prop="'attrValue'+(index+1)" :class="['attrValue'+index,'wwww']" v-for="(item,index) in goodsSpecData">
					</el-table-column>
					<el-table-column align="center" label="库存">
						<template slot-scope="{ row }">
							<el-input placeholder="输入库存数量" v-model="row.stock"></el-input>
						</template>
					</el-table-column>
					<el-table-column align="center" label="价格">
						<template slot-scope="{ row }">
							<el-input placeholder="输入价格" v-model.number="row.price"></el-input>
						</template>
					</el-table-column>
					<el-table-column align="left" label="操作">
						<template slot-scope="{ row, $index }">
							<el-button type="text" class="button" @click="associateGoods.splice($index, 1)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

			</el-form-item>-->

			<h4 id="WorkDetail">商品详情：</h4>
			<el-form-item label="参数设置" prop="caseAttrsDTOList">
				<el-table style="width: 540px;margin-bottom: 10px;" :data="form.caseAttrsDTOList" border>
					<el-table-column width="180px" align="center" label="参数名称">
						<template slot-scope="{ row }">
							<el-input v-model="row.attrName" placeholder="请输入参数名称"></el-input>
						</template>
					</el-table-column>
					<el-table-column width="180px" align="center" label="参数值">
						<template slot-scope="{ row }">
							<el-input v-model="row.attrValue" placeholder="请输入参数值"></el-input>
						</template>
					</el-table-column>
					<el-table-column width="180px" align="center" label="操作">
						<template slot-scope="{ row, $index }">
							<el-button type="text" class="button" @click="form.caseAttrsDTOList.splice($index, 1)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-button type="primary" icon="el-icon-plus" @click="form.caseAttrsDTOList.push({ attrName: '', attrValue: '' })">添加参数</el-button>
			</el-form-item>

			<el-form-item label="商品价格" prop="price">
				<el-input v-model="form.price"></el-input>
			</el-form-item>

			<el-form-item label="原价" prop="originalPrice">
				<el-input v-model="form.originalPrice"></el-input>
			</el-form-item>
			
			<el-form-item label="运费" prop="freightPrice">
		      <el-input v-model="form.freightPrice"></el-input>
		    </el-form-item>

			<el-form-item label="商品详情" prop="caseInfo">
				<Tinymce :height="500" ref="editor" v-model="form.caseInfo"></Tinymce>
			</el-form-item>

			<el-form-item label="备注">
				<el-input :autosize="{ minRows: 3, maxRows: 5}" type="textarea" v-model.number="form.remark" placeholder="请输入内容,不超过100字" maxlength="100"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" :loading="loading" @click="save">提交</el-button>
			</el-form-item>
		</el-form>
		<el-tabs @tab-click="tabClick" :tab-position="'right'" class="right-nav">
			<el-tab-pane label="基本信息" target="#BaseInfo"></el-tab-pane>
			<el-tab-pane label="商品信息" target="#WorkInfo"></el-tab-pane>
			<el-tab-pane label="商品详情" target="#WorkDetail"></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import waves from '@/directive/waves' // 水波纹指令
	import ImageUpload from '@/components/Upload'
	import VideoUpload from '@/components/VideoUpload'
	import { setImg } from '@/filters'
	import { domain } from '@/api/qiniu'
	import Tinymce from '@/components/Tinymce'
	import GoodsSpec from '@/components/GoodsSpec'
	import { getObj, putObj } from '@/api/designMerchant/works'
	import { category } from '@/utils/mixins/goods'
	import { isgoodsExist } from '@/api/aggregate/merchant'
	import {
		regions,
		getpage
	} from '@/api/designMerchant/freight'
//	import { getBrandList } from '@/api/makeMerchant/craft'

	export default {
		directives: {
			waves
		},
		components: {
			ImageUpload,
			VideoUpload,
			Tinymce,
			GoodsSpec
		},
		data() {
			var checkPrice = (rule, value, callback) => {
		        if (!value || value === '0') {
		          return callback(new Error('商品价格不能为空'));
		        }
		        setTimeout(() => {
		        	var reg = /^[0-9]+(.[0-9]{1,2})?$/;
		        	if (!reg.test(value)) {
			            callback(new Error('请输入数字值，如果有小数点则保留两位小数'));
			        } else {			            
			            callback();
			        }
		        }, 200);
		    };
		    var checkOriginalPrice = (rule, value, callback) => {
		        if (!value || value === '0') {
		          return callback(new Error('商品原价不能为空'));
		        }
		        setTimeout(() => {
		        	var reg = /^[0-9]+(.[0-9]{1,2})?$/;
		        	if (!reg.test(value)) {
			            callback(new Error('请输入数字值，如果有小数点则保留两位小数'));
			        } else {			            
			            callback();
			        }
		        }, 200);
		    };
		    var checkFreightPrice = (rule, value, callback) => {
		        if (value == undefined || value == null) {
		          return callback(new Error('商品运费不能为空'));
		        }
		        setTimeout(() => {
		        	var reg = /^[0-9]+(.[0-9]{1,2})?$/;
		        	if (!reg.test(value)) {
			            callback(new Error('请输入数字值，如果有小数点则保留两位小数'));
			        } else {			            
			            callback();
			        }
		        }, 200);
		    };
			return {
				domain,
				categoryShow: false,
        categories: [],
        selectedCategory: [],
				loading: false,
				serveChecked: [],
				serveCheckList: [{
					id: '0',
					menu: '7天无理由退货'
				}, {
					id: '1',
					menu: '正品担保'
				}, {
					id: '2',
					menu: '闪速配送'
				}],
				form: {
					brandId:"",
					brandName: "",
					id: undefined,
					caseName: undefined,
					subtitle: undefined,
					keywords: undefined,
					goodsNO: undefined,
					barCode: undefined,
					remark: undefined,
					associateGoodsId: [],
					primaryCgyId: undefined,
		      primaryCgyName: undefined,
		      secondaryCgyId: undefined,
		      secondaryCgyName: undefined,
		      thridaryCgyId: undefined,
		      thridaryCgyName: undefined,
					price: null,
					originalPrice: null,
					designConcept: undefined,
					freightPrice: undefined,
					batchNum: undefined,
					stock: undefined,
					stockType: '1',
					caseType: '1',
					videoUrl: undefined,
					caseInfo: undefined,
					goodsSource: 6,
					picUrlList: [],
					caseAttrsDTOList: [],
//				deliverAddress:[],
//			  freightId:'',
//			  goodsWeight:''
				},
				regionmodel:[],
		    address1:'',
		    address2:'',
		    regionData:[],
				regionData1:[],
				associateGoods: [],
				rules: {
					caseName: [
						{
							required: true,
							message: '请输入商品名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 30,
							message: '长度在 2 到 30 个字符',
							trigger: 'blur'
						}
					],
					keywords: [{
						required: true,
						message: '请输入商品关键字',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						validator: checkPrice,
						trigger: 'blur'
					}],
					originalPrice: [{
						required: true,
						validator: checkOriginalPrice,
						trigger: 'blur'
					}],
					stock: [{
						required: true,
						message: '请填写商品规格库存',
						trigger: 'blur'
					}],
					freightPrice: [{
						required: true,
						validator: checkFreightPrice,
						trigger: 'blur'
					}],
					batchNum: [{
			            required: true,
			            message: '请输入最小购买量',
			            trigger: 'change'
			          }],
					caseInfo: [{
						required: true,
						message: '请输入商品详情',
						trigger: 'blur'
					}],
					picUrlList: [{
						required: true,
						message: '请上传商品图片',
						type: 'array',
						trigger: 'blur'
					}],
					caseAttrsDTOList: [{
						required: true,
						message: '请添加商品参数',
						type: 'array',
						trigger: 'blur'
					}],
					primaryCgyName: [{
						required: true,
						message: '请选择分类',
						trigger: 'blur'
					}]
				},
				editStatus: true,
				timeout: null,
				goodsSpecData: [],
				goodsSpecTableData: [],
				brandList:[]
			}
		},
		watch: {
			goodsSpecData: {
				handler(curVal, oldVal) {　　　　　　　　　　　　
//					this.doExchange()　　　　　　　　　
				},
				deep: true
			}
		},
		beforeRouteLeave(to, from, next) {
			this.onbeforeunloadHandler(next)
		},
		async beforeRouteEnter(to, from, next) {
			let form
			if(to.query.id) {
				form = await getObj(to.query.id).then(data => data.data)
				if(typeof form.associateGoodsId === 'string') form.associateGoodsId = []
			}
			next(vm => {
				setTimeout(() => {
					if(form) {
						form.associateGoodsId.forEach(goods => {
							vm.associateGoods.push(goods)
						})
						vm.form = form
						vm.serveChecked = form.serveType.split(",")
						vm.form.caseType = String(form.caseType)
						vm.goodsSpecData = form.goodsSpecs
						vm.goodsSpecTableData = form.goodsSkus
					}
				}, 10)
			})
		},
		created() {
			this.getCategory()
			//this.newaddress()
//			this.doExchange()
//			this.getBrandList()
		},
		methods: {
			brandChange(brandId){				
				const length = this.brandList.length
				for(let i = 0; i < length; i++) {
					if(this.brandList[i].id === brandId) {
						this.form.brandName = this.brandList[i].brandName
						return
					}
				}
			},
			/*getBrandList(){
				getBrandList().then(result => {
					this.brandList = result.data.records
				}).catch(res => {
					this.$message({
						message: '获取品牌列表失败',
						type: 'error',
						duration: 5 * 1000
					})
				})
			},*/
			async getCategory() {
		        const categories = await category.get(1)
		        this.categories = categories
		      },
			categoryChange(id) {
				const length = this.categories.length
				for(let i = 0; i < length; i++) {
					if(this.categories[i].id === id) {
						this.form.secondaryCgyName = this.categories[i].name
						return
					}
				}
			},
			serveTypeChange() {
				this.form.serveType = this.serveChecked.join(',')
			},
			isgoodsExist(row) {
				const id = row.goodsid
				if(!id) return
				this.disabled = true
				isgoodsExist(id).then(result => {
					row.goodsid = id
					row.skuid = result.data.skuId
					row.mainPic = result.data.mainPic
					this.disabled = false
				}).catch(res => {
					this.$message({
						message: '商品不存在，请重新输入',
						type: 'error',
						duration: 5 * 1000
					})
				})
			},
			addMerchant() {
				this.associateGoods.push({
					goodsid: undefined,
					skuid: undefined,
					mainPic: undefined
				})
			},
			save() {
				const set = this.$refs
				let self = this
				let flag = false
	  			this.form.goodsSkus.forEach(function(item, index){
	  				if(item.attrSymbolPath == '' || item.attrValue0 == '' || item.price == '' || item.stock == ''){
	  					self.$notify({
				            title: '提示',
				            message: '请填写完整商品sku',
				            type: 'warning'
				        })
	  					flag = false 
	  				}else{
	  					flag = true
	  				}
	  			})
				if(flag){
					set.form.validate(valid => {
						if(valid) {
							this.loading = true
							this.form.associateGoodsId = this.associateGoods
							putObj(this.form).then(data => {
								this.editStatus = false
								this.$notify({
									title: '成功',
									message: '操作成功',
									type: 'success',
									duration: 2000
								})
								this.$router.push({
									name: 'makeWorkList'
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
				}
			},
			reset() {
				this.$refs.form.resetFields()
			},
			getImageStyle(picUrl) {
				return {
					backgroundImage: 'url(' + setImg(picUrl, {
						w: 500
					}) + ')'
				}
			},
			newaddress(){
		    	regions(0).then(data =>{
		    		this.regionData = data.data;
		    	})
		    	getpage().then( data =>{
		    		this.regionmodel = data.data.records;
		    	})
		    },
		    onSubmit(){
		    	this.$router.push({name:'freightList'})
		    },
		    onChange(val,event){
		    	this.regionData1 =[]
		    	if(!this.address1 == ''){
		    		this.regionData.map((data) =>{
			    		if(data.regionName == this.address1){
			    			regions(data.regionId).then(data =>{
					    		this.regionData1 = data.data;
					    	})
			    		}
			    	})
		    	}else{
		    		return;
		    	}
		    },
			workUploadSuccess(imgs) {
				imgs.forEach(key => {
		    		this.form.picUrlList.push(key)
		    	})
				if(this.form.picUrlList.length > 9) {
		          this.form.picUrlList.splice(9, this.form.picUrlList.length)
		          this.$notify({
		            title: '提示',
		            message: '最多只能添加9张图片，已删除多余图片',
		            type: 'warning'
		          })
		        }
			},
			videoUploadScccess(key) {
				this.form.videoUrl = key
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
			tabClick(vm) {
				const target = document.querySelector(vm.$attrs.target)
				if(target) {
					window.scrollTo(0, target.offsetTop)
				}
			},
			getExChange(goodsSpecData,goodsSpecTableData){
				this.form.goodsSpecs = goodsSpecData
				this.form.goodsSkus = goodsSpecTableData
			},
			getStock(stock){
        this.form.stock = stock
      },
      handleCategoryChange(data) {
        const fieldIds = ['primaryCgyId', 'secondaryCgyId', 'thridaryCgyId']
        const fields = ['primaryCgyName', 'secondaryCgyName', 'thridaryCgyName']
        data.forEach((id, index) => {
          this.form[fieldIds[index]] = id
          this.form[fields[index]] = category.map[id].name
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
	.image {
		display: block;
		max-width: 100%;
		height: 200px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	
	.danger {
		color: #F56C6C;
	}
	
	.el-col-6 {
		margin-bottom: 20px;
	}
	
	.my-autocomplete {
		li {
			line-height: normal;
			padding: 7px;
			.name {
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.addr {
				font-size: 12px;
				color: #b4b4b4;
			}
			.highlighted .addr {
				color: #ddd;
			}
		}
	}
	
	.right-nav {
		position: fixed;
		right: 0;
		top: 150px;
	}
	.right-nav {
  position: fixed;
  right: 0;
  top: 150px;
}
.sinput{
	width: 376px;
}
.comm{
	width:206px;
	padding-right: 5px;
}
</style>