<template>
	<header :class="{float:active}">
		<p @click="open(1)">
			<span>{{regionName}}</span>
			<van-icon v-show="active==1" name="arrow"/>
			<van-icon v-show="active!=1" name="arrow-left"/>
		</p>
		<p @click="open(2)">
			<span>{{timeName}}</span>
			<van-icon v-show="active==2" name="arrow"/>
			<van-icon v-show="active!=2" name="arrow-left"/>
		</p>
		<p @click="open(3)">
			<span>{{brandName}}</span>
			<van-icon v-show="active==3" name="arrow"/>
			<van-icon v-show="active!=3" name="arrow-left"/>
		</p>
		<div class="shade" v-show="active!=0" @click="open(active)" > 
			<transition name='down'>
				<ul v-show="active==1">
					<li v-for="(item,index) in dirList" @click="setDir(item.value,item.name)" :class="{xuan:regionId==item.value}" :key="index">{{item.name}}</li>
				</ul>
			</transition>
			<transition name='down'>
				<ul v-show="active==2">
					<li v-for="(item,index) in timeList"  @click="setTime(item.value,item.name)" :class="{xuan:timeValue==item.value}" :key="index">{{item.name}}</li>
				</ul>
			</transition>
			<transition name='down'>
				<ul v-show="active==3">
					<li v-for="(item,index) in brandList" @click="setBrand(item.value,item.name)" :class="{xuan:brandId==item.value}":key="index">{{item.name}}</li>
				</ul>
			</transition>
		</div>
	</header>
</template>

<script>
	export default {
		props: ['type'],
		beforeMount(){
			this.timeName = '全部时间'
			this.brandName = '全部品牌'
			if(this.type==1){
				this.dirList = [{name:'国外',value:null}]
				this.regionName = '国外'
			}else{
				this.$service('jewelryDirList').then(res=>{
					this.dirList = [{name:'全国',value:null}]
					this.regionName = '全国'
					res.data.forEach(item=>{
						this.dirList.push({
							name:item.regionName,
							value:item.regionId,
						})
					})
				})
			}
			this.brandList = [{name:'全部品牌',value:null}]
			this.$service('jewelryBrandList').then(res=>{
				res.data.forEach(item=>{
					this.brandList.push({
						name:item.brandName,
						value:item.id,
					})
				})
			})
		},
		data(){
			return {
				active:0,
				regionId:null,
				timeValue:null,
				brandId:null,
				regionName:null,
				timeName:null,
				brandName:null,
				dirList:[],
				brandList:[],
				timeList:[{name:'全部时间',value:null},{name:'一个月以来',value:1},{name:'最近三个月',value:2},{name:'最近六个月',value:3}]
			}
		},
		computed:{
			startTime(){
				if(this.timeValue==1){
					return this.getNowFormatDate(1)
				}else if(this.timeValue==2){
					return this.getNowFormatDate(3)
				}else if(this.timeValue==3){
					return this.getNowFormatDate(6)
				}else{
					return null
				}
			},
			finishTime(){
				if(this.timeValue){
					return this.getNowFormatDate(0)
				}else{
					return null
				}
			}
		},
		watch:{
			active(value){
				if(value){
					this.$emit('lock',true)
				}else{
					this.$emit('lock',false)
				}
			},
			regionId(a,b){
				if(a!=b) this.em()
			},
			brandId(a,b){
				if(a!=b) this.em()
			},
			timeValue(a,b){
				if(a!=b) this.em()
			},
		},
		methods:{
			getNowFormatDate(m) {						
				let dt = new Date();
				dt.setMonth( dt.getMonth()-m )
				let mm = dt.getMonth()+ 1 + ''
				if(mm.length<2){
					mm = '0' + mm
				}
				let tt = dt.getDate() + ''
				if(tt.length<2){
					tt = '0' + tt
				}
				return [dt.getFullYear(),mm,tt].join('')+'000000'
		   	},
			open(num){
				if(this.active == num){
					this.active = 0
				}else{
					this.active = num
				}
			},
			setDir(value,name){
				this.regionId = value
				this.regionName = name
			},
			setTime(value,name){
				this.timeValue = value
				this.timeName = name
			},
			setBrand(value,name){
				this.brandId = value
				this.brandName = name
			},
			em(){
				this.$emit('myChange',{brandId:this.brandId,regionId:this.regionId,startTime:this.startTime,finishTime:this.finishTime})
			}
		}
	}
</script>
<style lang="postcss" scoped>
	header{
		background:#fff;
		display:flex;
		font-size: 12px;
		& p{
			flex-grow: 1;
			text-align: center;
			line-height: 14px; 
			margin:8px 0;
			width:33vw;
			color:#999;
			& i{
				font-size: 6px;
				position: relative;
				top:1px;
				margin-left:6px;
				transform:rotate(90deg);
			}
		}
		& p~p{
			border-left:1px solid #e3e3e3;
		}
		& .shade{
			position: fixed;
			top:72px;
			bottom:0;
			right:0;
			left:0;
			background:rgba(0,0,0,0.5);
			& ul{
				max-height:calc(100vh - 72px);
				background:#fff;
				overflow-y: scroll;
				& li{
					line-height: 40px;
					padding:0 10px;
				}
			}
		}
	}
.down-enter-active {
    transition: all 1s ease;
}
.down-enter{
    max-height:0 !important;
}
.xuan{
	color:#ff0000;
}
</style>