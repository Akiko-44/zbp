<template>
	<div class="app-container calendar-list-container">
		<div class="filter-container">
            <label class="filter-label">商品名称：</label>
            <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.caseName"> </el-input>
            &nbsp;
            <label class="filter-label">商品ID：</label>
            <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.id"> </el-input>
            &nbsp;
            <label class="filter-label">状态：</label>
            <el-select v-model="listQuery.auditState" clearable placeholder="状态">
                <el-option
                        v-for="item in auditState"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                >
                </el-option>
            </el-select>
            &nbsp;
            <el-button type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
        </div>
		<ul class="clearfix">
			<li class="fl" v-for="(item, index) in list" :key="item.caseId" style="margin: 5px;">
				<el-card style="width:250px;" :body-style="{ padding: '0px' }">
			        <img :src="item.mainPic | setImg" class="image" width="100%" height="250">
			        <div style="padding: 14px;">
			          <div class="bottom clearfix">
			            <el-button type="primary" class="button" v-if="!item.isChoose" @click="addGood(item.caseId, index)">添加</el-button>
			            <el-button type="danger" class="button" v-if="item.isChoose" @click="cancelGood(item.caseId, index)">取消</el-button>
			          </div>
			        </div>
			    </el-card>
			</li>
		</ul>
		<div style="text-align: right;"><el-button type="primary" :loadingFloor="loadingFloor" class="button" @click="saveFloor">保存</el-button></div>
		<div v-show="!listLoading" class="pagination-container">
		    <el-pagination @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-size="listParams.limit" layout="total, prev, pager, next, jumper" :total="total"> </el-pagination>
		</div>
	</div>
</template>

<script>
import {
    getGoods,
    detailStore,
    saveOrUpdateFloor
} from '@/api/makeMerchant/decorationShop'
import { setImg } from '@/filters'
export default {
	data() {
	  return {
	  	total: null,
	  	listLoading:false,
	  	loadingFloor: false,
	  	list:[],
	  	listParams: {
          offset: 1,
          limit: 12
        },
        listQuery: {
          caseName: undefined,
          designerName: undefined,
          goodsSource: 6,
          id: undefined,
          auditState: undefined
        },
	  	form:{
	  		id:undefined,
  			storeId:undefined,
  			layoutId:undefined,
  			floorName:'楼层名称',
  			floorDesc:'楼层介绍',
  			isShow:0,
  			codeStyle: 0, //文字显示：0居中， 1左， 2右
  			showStyle: 3, //展示方式：3、4、5
  			sftgs:[{'goodsId':1}],
  			sortOrder:1
	  	},
	  	auditState: [
        { value: 0, label: '待审核' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核不通过' },
        { value: 3, label: '上架' },
        { value: 4, label: '下架' }
      ]
	  }
	},
	watch:{
		storeId(a, b){
			this.goods()
	  }
	},
	mounted() {
    this.getList()
    this.form.storeId = this.$route.query.storeId
    this.goods()
  },
  methods: {
  	getList(){
  		this.listLoading = true
        getGoods(this.listQuery, this.listParams)
          .then(data => {
            const res = data.data.records
            this.total = data.data.total
            this.listLoading = false
            let i
            for(i = 0;i<res.length; i++){
            	
            	if(res[i].isExistStore == 1){
            	  res[i].isChoose = false;
            	}else{
            	  res[i].isChoose = true;
            	  this.form.sftgs.push({'goodsId': res[i].caseId})
            	}
            }
            this.list = res
          })
  	},
  	goods(){
  		detailStore(this.form.storeId).then(data => {
		  const res = data.data.layouts
	      let i = 0
	      for(i=0;i<res.length;i++){
	      	if(res[i].layoutType == 3){
	      		this.form.layoutId = res[i].obj.layoutId
	      		this.form.storeId = res[i].obj.storeId
	      		this.form.id = res[i].obj.id
	      		return null
	      	}
	      }
  	    })
  	},
  	addGood(caseId, $index){
  		this.form.sftgs.push({'goodsId': caseId})
  		this.list[$index].isChoose = true
  	},
  	cancelGood(caseId, $index){
  		const sftgs = this.form.sftgs
  		sftgs.map((data)=>{
  			if(data.goodsId == caseId){
  				this.list[$index].isChoose = false
  				this.form.sftgs = this.form.sftgs.filter(i => {
            return i.goodsId !== caseId
          })
  			}
      })
  	},
  	saveFloor(){
  		this.loadingFloor = true
  		saveOrUpdateFloor(this.form)
  		.then((data) => {
  			this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
           	})
  			this.loadingFloor = false
  		})
  		.catch(()=>{
  			this.loadingFloor = false
  		})
  	},
  	handleFilter() {
      this.getList()
  	},
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    }
  }
}
</script>

<style scoped>
ul, li{list-style: none;}
.image {
  display: block;
  max-width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>