<template>
  <AppView class="home" :title="$route.query.type==0?'专利服务':($route.query.type==1?'专利申请':'专利维权')" :navToggle="true">
  	<div class="patent" v-if="$route.query.type!=2">
		<div class="patent_application" v-if="$route.query.type==0">
			<span>专利申请</span>
			<a @click="more(1)">更多<van-icon name="arrow"/></a>
		</div>
		<van-list v-model="loading" :finished="finished" @load="onLoad">
			<footer class="new_patentlist">
				<dl v-for="(item,index) in patentList1" @click="_detailspage(item.id)" class="li">
					<dt v-lazy:background-image="setImg(item.logoPath)"></dt>
					<dd>
						<p v-text="item.companyName"></p>
						<div v-html="item.companyIntroduce"></div>
					</dd>
				</dl>
			</footer>
		</van-list>
	</div>
	<div class="patent patent_more" v-if="$route.query.type!=1">
		<div class="patent_application"  v-if="$route.query.type==0">
			<span >专利维权</span>
			<a @click="more(2)" >更多<van-icon name="arrow"/></a>
		</div>
		<van-list v-model="loading" :finished="finished" @load="onLoad">
			<footer class="new_patentlist">
			<dl v-for="(item,index) in patentList2" @click="_detailspage(item.id)" class="li">
				<dt v-lazy:background-image="setImg(item.logoPath)"></dt>
				<dd>
					<p v-text="item.companyName"></p>
					<div v-html="item.companyIntroduce"></div>
				</dd>
			</dl>
			</footer>
		</van-list>
		</div>
	</div>
  </AppView>
</template>
<script>
	import { setImg } from '~/utils/qiniu'
export default {
  data () {
    return {
    	patentList2:[],
    	patentList1:[],
    	page:null,
    	offset:1,
    	loading:false,
    	finished:false,
    }
  },
  watch:{
  	$route(){
		if(this.$route.query.type){
  			this.patentList1 = []
	  		this.patentList2 = []
	  		this.offset = 1
	  		this.init()
		}
  	}
  },
  beforeMount(){
  	this.patentList1 = []
  	this.patentList2 = []
  	this.offset = 1
  	if (this.$native.isApp()) {
    	this.$native.getTitle(this.title)
    }
  },
  activated(){
    this.init()
    let that = this
    window.onload = function(){
      setTimeout(function(){
      	if (that.$native.isApp()) {
        	that.$native.getTitle(that.$route.query.type==0?'专利服务':(that.$route.query.type==1?'专利申请':'专利维权'))
       }
      },500)
    }
  },
  deactivated () {
    this.$destroy()
  },
  computed:{
  	limit(){
  		if(this.$route.query.type==0){
  			return 4
  		}else{
  			return 20
  		}
  	},
  	list(){
  		if(this.$route.query.type==1){
  				return this.patentList1
  		}else if(this.$route.query.type==2){
  				return this.patentList2
  		}
  	}
  },
  methods: {
  	setImg,
    back () {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        history.back()
      }
    },
    init(){
    	if( this.$route.query.type==0){
    		this.getList(2).then(data=>{
					this.patentList2 = data.records
				})
				this.getList(1).then(data=>{
					this.patentList1 = data.records
				})
    	}else{
    		this.getData(this.$route.query.type)
    	}
    },
		getList(type){
			return new Promise((resolve, reject)=>{
				this.$service('newPatentList',{
		   			params:{
		   				offset: this.offset,
							limit: this.limit,
							patentType:type
		   			}
			  	 }).then(res=>{
			  	 	resolve(res.data)
			  	 })
			})
		},
		async getData() {
			let res = await this.getList(this.$route.query.type)
			this.page = res.total 
			if(this.$route.query.type==1){
				this.patentList1 = [...this.list, ...res.records]
			}else{
				this.patentList2 = [...this.list, ...res.records]
			}
			if(res.records.length > 0) {
				this.offset += 1
			}
		},
		onLoad() { 
			if(!this.list){
					this.finished = true
					this.loading = false
			}else{
				setTimeout(_ => {
						this.getData()
						this.loading = false
						if(this.list.length >= this.page){
							this.finished = true
						}	
				}, 500)
			}
		},
		more(id){
			this.$router.push({path:'PatentModules',query:{type:id}})
		},
		_detailspage(id){
			this.$router.push({path:'patentDetail',query:{id:id}})
		},
  }
}
</script>

<style lang="postcss" scoped>
.home {
  background-color: var(--light-gray);
}
.patent{
	width: 100vw;
	& .patent_application{
		width: calc(100vw - 20px);
		display: flex;
		justify-content: space-between;
		margin: 10px;
		& span{
			font-weight:600;
			color:rgba(51,51,51,1);
			font-size: 16px;
		}
		& a{
			font-size: 14px;
			color:#999;
		}
		& i:before{
			font-size:10px;
		}
	}
	& .new_patentlist{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		& dl{
			width: calc(50vw - 5px);
			background: #FFFFFF;
			& dt{
				width: calc(50vw - 5px);
				height:200px;
				background-size: cover;
			}
			& dd{
				width:calc(50vw - 35px);
				padding: 10px;
				& p{
					font-weight:600;
					color:rgba(102,102,102,1);
					font-size: 14px;
				}
				 & div{
				 	width: calc(50vw - 30px);
				 	margin: 10px 0 10px;
				 	color:rgba(102,102,102,1);
				 	height: 20px;
				 	font-size: 10px;
				 	line-height: 20px;
				 	overflow : hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				 }
			}
		}
		& dl:nth-child(n+3){
			margin-top: 9px;
		}
	}
}
</style>
