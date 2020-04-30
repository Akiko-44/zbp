<template>
	<div class="app-container calendar-list-container">
		<div>
			<el-cascader
			    :options="menusArr"
			    change-on-select
			    v-model="selectedOptions"
			    @change="handleChange"
			    :props="defaultmenus">
			</el-cascader>
			<el-button type="primary" @click="dialogVisible = true">编辑</el-button>
		</div>
		<BannerSettings :storeId="formMenus.storeId"/>
		<div class="block">
			<h4>自定义内容设置</h4>
			<Tinymce :height="500" ref="editor" v-model="form.showContent"></Tinymce>
			<p style="text-align: right;"><el-button type="primary" :loadingCustom="loadingCustom" @click="saveCustom">保存</el-button></p>
		</div>
		<div>
			<h4>商品楼层</h4>
			<goodsFloor :storeId="formMenus.storeId"/>
		</div>
		<el-dialog
		  title="添加分类"
		  :visible.sync="dialogVisible"
		  width="50%"
		  :before-close="handleClose">
		  <el-tabs>
		    <el-tab-pane label="商品分类" name="first">
		    	<el-tree
				  :data="menusForm"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  highlight-current
				  :props="defaultprops">
			    </el-tree>
		    </el-tab-pane>
		    <el-tab-pane label="自定义" name="second">
		    	<el-table
				    :data="definedFormArr"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="menuName"
				      label="链接名称"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="menuUrl"
				      label="链接地址"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="menuDesc"
				      label="描述">
				    </el-table-column>
				</el-table>
		    	<el-form ref="definedForm" :model="definedForm" label-width="80px" style="margin-top: 20px;">
				  <el-form-item label="链接名称">
				    <el-input v-model="definedForm.menuName"></el-input>
				  </el-form-item>
				  <el-form-item label="链接地址">
				    <el-input v-model="definedForm.menuUrl"></el-input>
				  </el-form-item>
				  <el-form-item label="描述">
				    <el-input type="textarea" v-model="definedForm.menuDesc"></el-input>
				  </el-form-item>
				</el-form>
				<el-button type="primary" @click="getDefinedForm">确定</el-button>
		    </el-tab-pane>
		  </el-tabs>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" :loading="loading" @click="saveMenus">保存</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import BannerSettings from './banner/banner'
import goodsFloor from './components/goods'
import Tinymce from '@/components/Tinymce'
import { getCategory, saveOrUpdateMenu, detailStore, saveOrUpdateCustom } from '@/api/makeMerchant/decorationShop'

export default {
  components: {
    BannerSettings,
    Tinymce,
    goodsFloor
  },
  data(){
  	return {
  		editStatus: true,
  		dialogVisible: false,
  		loading:false,
  		loadingCustom: false,
  		definedForm:{
  			menuName: '',
  			menuUrl: '',
  			menuDesc: '',
  		},
  		definedFormArr: [],
  		formMenus:{
  			storeId: undefined,
  			menus:[],
  			menuCssStyle: '#page{}'
  		},
  		defaultprops:{
  			value:'id',
  			label: 'catName',
  			children: 'children'
  		},
  		defaultmenus:{
  			value: 'catId',
  			label: 'menuName'
//			children: 'ssms'
  		},
  		form:{
  			id:undefined,
			storeId:undefined,
			layoutId:undefined,
			isShow:0,//0显示，1不显示
			modelName:'商品楼称',
			showContent:undefined,
			sortOrder:1
  		},
  		menusArr:[],
  		selectedOptions: [],
  		menusForm:[]
  	}
  },
  watch:{
  	storeId(a, b){
  		this.formMenus.storeId = a
  	}
  },
  created(){
  	this.formMenus.storeId = this.$route.query.storeId;
  	this.detailStore(this.formMenus.storeId).then(data => {
  		// 导航
		this.menusArr = data.data.menus
		let i
		for(i = 0;i<this.menusArr.length;i++){
			this.menusArr[i].ssms = []
		}
		
		//自定义区域
		const layouts = data.data.layouts
		let j
		for(j = 0;j<layouts.length;j++){
			if(layouts[j].layoutType == 2){
				this.form = layouts[j].obj
			}
		}
  	})
  },
  async beforeRouteEnter(to, from, next) {
    const form = await getCategory().then(data => data.data)
    next(vm => {
      setTimeout(() => {
      	vm.menusForm = form
      }, 10)
    })
  },
  methods: {
  	detailStore,
    beforeRouteLeave(to, from, next) {
	    this.onbeforeunloadHandler(next)
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
  	handleClose(done) {
  		done()
  	},
  	getDefinedForm(){
  		this.definedFormArr.push(this.definedForm)
  		this.definedForm = {
  			menuName: '',
  			menuUrl: '',
  			menuDesc: '',
  		}
  	},
  	handleChange(value) {
        
   	},
   	saveCustom(){
   		this.loadingCustom = true
   		saveOrUpdateCustom(this.form).then((data) => {
   			this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
           	})
   			this.loadingCustom = false
   		})
   		.catch(() => {
	        this.loadingCustom = false
	    })
   	},
  	saveMenus(){
  		this.loading = true
  		const arr1 = this.$refs.tree.getCheckedNodes()
  		const arr2 = this.definedFormArr
  		this.formMenus.menus = []
  		for(let i = 0; i<arr1.length; i++){
  			/*
  			if(arr1[i].parentId == '0'){
	  			var obj = {
		  			catId:arr1[i].id,
		  			menuCssStyle:'#page{}',
		  			menuDesc:'',
		  			menuName: arr1[i].catName,
		  			menuUrl: '',
		  			sortOrder: i,
		  			ssms:[]
		  		}
	  			for(let j = 0; j<arr1[i].children.length; j++){
	  				var s = arr1[i].children[j]
	  				var objs = {
			  			catId:s.id,
			  			menuCssStyle:'#page{}',
			  			menuDesc:'',
			  			menuName: s.catName,
			  			menuUrl: '',
			  			sortOrder: j,
			  			ssms:[]
			  		}
	  				obj.ssms.push(objs)
	  			}
	  			this.formMenus.menus.push(obj)
	  		}
	  		*/
	  		var obj = {
	  			catId:arr1[i].id,
	  			menuCssStyle:'#page{}',
	  			menuDesc:'',
	  			menuName: arr1[i].catName,
	  			menuUrl: '',
	  			sortOrder: i,
	  			ssms:[]
	  		}
	  		this.formMenus.menus.push(obj)
  		}
  		for(let i = 0; i<arr2.length; i++){
  			var obj = {
	  			catId:'',
	  			menuCssStyle:'#page{}',
	  			menuDesc:arr2[i].menuDesc,
	  			menuName: arr2[i].menuName,
	  			menuUrl: arr2[i].menuUrl,
	  			sortOrder: i,
	  			ssms:[]
	  		}
  			this.formMenus.menus.push(obj)
  		}
  		
  		saveOrUpdateMenu(this.formMenus).then((data) => {
			this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
           	})
			this.menusArr = this.formMenus.menus
			this.loading = false
			this.dialogVisible = false
  		})
  		.catch(() => {
	        this.loading = false
	    })
  	}
  }
}
</script>