<template>
<div class="app-container">
  <el-form style="padding-right: 200px" :model="form" :rules="rules" ref="form" label-width="120px">

    <h4 id="BaseInfo">基本信息：</h4>
    <el-form-item label="商品名称" prop="caseName">
      <el-input v-model="form.caseName"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.subtitle"></el-input>
    </el-form-item>

    <el-form-item label="关键字" prop="keywords">
      <el-input v-model="form.keywords" placeholder="商品关键字,使用','号分隔,能准确搜到商品的,比如: 海尔电视,电视之类"></el-input>
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
        <ImageUpload
          :multiple="true"
          prefix="work"
          @successCBK="workUploadSuccess"
        />
        <div>共<span class="danger">{{form.picUrlList.length}}</span>张，还能上传<span class="danger">{{9 - form.picUrlList.length}}</span>张</div>
      </div>
    </el-form-item>

    <el-form-item label="设计理念" prop="designConcept">
      <el-input :autosize="{ minRows: 3, maxRows: 5}" type="textarea" v-model="form.designConcept" placeholder="请输入设计理念，不超过300字"></el-input>
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

    
    
    <el-form-item label="商品类型">
      <el-radio-group v-model="form.caseType">
        <el-radio label="1">现货商品</el-radio>
        <el-radio label="2">定制商品</el-radio>
      </el-radio-group>
    </el-form-item>
    
    <el-form-item label="是否支持七天无理由退换货">
      <el-radio-group v-model="form.serveType">
        <el-radio label="0">是</el-radio>
        <el-radio label="">否</el-radio>
      </el-radio-group>
    </el-form-item>
    
    <h4 id="WorkDetail">商品详情：</h4>
    <el-form-item label="参数设置" prop="caseAttrsDTOList">
      <el-table
        style="width: 540px;margin-bottom: 10px;"
        :data="form.caseAttrsDTOList"
        border
      >
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

    <el-form-item label="设计师" prop="designerName">
      <el-autocomplete
        style="width: 300px;"
        popper-class="my-autocomplete"
        v-model="form.designerName"
        placeholder="请输入设计师姓名"
        :trigger-on-focus="false"
        :fetch-suggestions="querySearchAsync"
        @select="handleDesignerSelect"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.userName }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    
<GoodsSpec :goodsSpec="goodsSpecData" :goodsSpecTable="goodsSpecTableData" @sendstock='getStock' @exChange="getExChange"></GoodsSpec>
    
    <el-form-item label="库存" prop="stock">
      <el-input v-model.number="form.stock" disabled></el-input>
      <el-radio-group v-model="form.stockType">
        <el-radio label="1">付款减库存</el-radio>
        <el-radio label="2">拍下减库存</el-radio>
      </el-radio-group>
    </el-form-item>
    
    <el-form-item label="商品详情" prop="caseInfo">
      <Tinymce :height="500" ref="editor" v-model="form.caseInfo"></Tinymce>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="save">提交</el-button>
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
import { setImg } from '@/filters'
import { domain } from '@/api/qiniu'
import Tinymce from '@/components/Tinymce'
import { getObj, putObj } from '@/api/designMerchant/works'
import { page as getDesigner } from '@/api/designMerchant/designer'
import { category } from '@/utils/mixins/goods'
import GoodsSpec from '@/components/GoodsSpec'
import {
		regions,
		getpage
	} from '@/api/designMerchant/freight'

export default {
  directives: {
    waves
  },
  components: {
    ImageUpload,
    Tinymce,
    GoodsSpec
  },
  /*props: {
    caseType: {
      type: Number
    }
  },*/
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
      form: {
        id: undefined,
        caseName: undefined,
        subtitle: undefined,
        keywords: undefined,
        primaryCgyId: undefined,
        primaryCgyName: undefined,
        secondaryCgyId: undefined,
        secondaryCgyName: undefined,
        thridaryCgyId: undefined,
        thridaryCgyName: undefined,
        cateFirst: undefined,
        cateSecond: undefined,
        cateThree: undefined,
        price: null,
        originalPrice: null,
        designerId: undefined,
        designerName: undefined,
        designConcept: undefined,
        freightPrice: undefined,
        stock: undefined,
        stockType: '1',
        caseType: '1',
        caseInfo: undefined,
        goodsSource: 5,
        picUrlList: [],
        caseAttrsDTOList: [],
        serveType: '',
        //deliverAddress:[],
        freightId:'',
        goodsWeight:''
      },
      regionmodel:[],
      address1:'',
      address2:'',
      rules: {
        caseName: [
          {
            required: true,
            message: '请输入商品名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        designerName: [
          {
            required: true,
            message: '请输入设计师姓名',
            trigger: 'blur'
          }
        ],
        keywords: [
          {
            required: true,
            message: '请输入商品关键字',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            validator: checkPrice,
            trigger: 'blur'
          }
        ],
        originalPrice: [
          {
            required: true,
            validator: checkOriginalPrice,
            trigger: 'blur'
          }
        ],
        designConcept: [
          {
            required: true,
            message: '请输入设计理念',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 300,
            message: '长度在 1 到 300 个字符',
            trigger: 'blur'
          }
        ],
        stock: [
          {
            required: true,
            message: '请填写商品规格库存',
            trigger: 'blur'
          }
        ],
        freightPrice: [
          {
            required: true,
            validator: checkFreightPrice,
            trigger: 'blur'
          }
        ],
        caseInfo: [
          {
            required: true,
            message: '请输入商品详情',
            trigger: 'blur'
          }
        ],
        picUrlList: [
          {
            required: true,
            message: '请上传商品图片',
            type: 'array',
            trigger: 'blur'
          }
        ],
        caseAttrsDTOList: [
          {
            required: true,
            message: '请添加商品参数',
            type: 'array',
            trigger: 'blur'
          }
        ],
        primaryCgyName: [
          {
            required: true,
            message: '请选择一级分类',
            trigger: 'blur'
          }
        ],
        goodsSpecData:[
          {
            required:true,
            message:'请填写商品规格',
            trigger:'blur'
          }
        ]
      },
      editStatus: true,
      timeout: null,
      goodsSpecTableData: [],
			goodsSpecData:[],
			goodsSpecData2:[],
			regionData:[],
			regionData1:[]
    }
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  async beforeRouteEnter(to, from, next) {
    let form
    if (to.query.id) {
      form = await getObj(to.query.id).then(data => data.data)
    }
    next(vm => {
      setTimeout(() => {
        if (form) {
          vm.form = form
          vm.form.caseType = String(form.caseType)
          vm.form.caseInfo = form.caseInfo.replace(/pa95ui71l.bkt.clouddn/g, 'image.gacjc')
          vm.goodsSpecData = form.goodsSpecs
					vm.goodsSpecTableData = form.goodsSkus
        }
      }, 10)
    })
  },
  created() {
    this.getCategory()
    //this.newaddress()
  },
  methods: {
    async getCategory() {
      const categories = await category.get(0)
      this.categories = categories
    },
    save() {
      const set = this.$refs
      /*
      this.form.deliverAddress.push(this.address1);
      this.form.deliverAddress.push(this.address2);
      this.form.deliverAddress = this.form.deliverAddress.join(',');
      */
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          putObj(this.form).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              name: 'designWorkList'
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
    newaddress(){
    	regions(0).then(data =>{
    		this.regionData = data.data;
    	})
    	getpage().then( data =>{
    		this.regionmodel = data.data.records
    	})
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
    onSubmit(){
    	this.$router.push({name:'freightList'})
    },
    reset() {
      this.$refs.form.resetFields()
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    workUploadSuccess(imgs) {
      imgs.forEach((key) => {
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
    onbeforeunloadHandler(next) {
      if (this.editStatus) {
        if (window.confirm('确定要放弃当前的操作吗？')) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    },
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        getDesigner({ flag: 0, userName: queryString, size: 20 }).then(result => result.data.records).then(data => {
          cb(data)
        })
      }, 100)
    },
    handleDesignerSelect(item) {
      this.form.designerId = item.id
      this.form.designerName = item.userName
    },
    tabClick(vm) {
      const target = document.querySelector(vm.$attrs.target)
      if (target) {
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
.sinput{
	width: 376px;
}
.comm{
	width:206px;
	padding-right: 5px;
}
</style>
