<template>
	<van-swipe :autoplay="3000">
	  <van-swipe-item v-for="(item,index) in list" :key="index">
	  	<section v-lazy:background-image="setImg(item.showPrint)" @click="toDetail(item.id)">
	  		<div class="time">
	  			<ul>
	  				<li>
	  					<span>天</span>
	  					<p>{{item.time.d}}</p>
	  				</li>
	  				<li>
	  					<span>时</span>
	  					<p>{{item.time.h}}</p>
	  				</li>
	  				<li>
	  					<span>分</span>
	  					<p>{{item.time.m}}</p>
	  				</li>
	  				<li>
	  					<span>秒</span>
	  					<p>{{item.time.s}}</p>
	  				</li>
	  			</ul>
	  			<!--<div class="button" @click.stop="toForm(item.id,item.detailSite,item.startTime)">预约</div>-->
	  		</div>
	  	</section>
	  </van-swipe-item>
	</van-swipe>
</template>
<script>
	import { setImg } from '~/utils/qiniu'
	export default {
		data() {
			return {
				list:[],
			}
		},
		beforeMount() {
			this.$service('jewelryReservation')
		    	.then(result => {
		    		this.list = result.data.map(item=>{
						let date = new Date(item.finishTime.replace(/-/g, '/'))
						item.finishTime = Date.parse(date)
						return item
					})
		    		this.setDate()
		    })
		},
		methods:{
			setImg,
			getDate(endtime){
				let begintime = new Date().getTime()
				let nTimeD = endtime - begintime
				if(nTimeD<0) nTimeD = 0
				let nTimeH = nTimeD%86400000
				let nTimeM = nTimeH%3600000
				let nTimeS = nTimeM%60000
				let d = Math.floor(nTimeD/86400000)
				let h = Math.floor(nTimeH/3600000)
				let m = Math.floor(nTimeM/60000)
				let s = Math.floor(nTimeS/1000)
				return {d,h,m,s}
			},
			setDate(){
				this.list.forEach(item=>{
					item.time = this.getDate(item.finishTime)
				})
				setInterval(_=>{
					this.list.forEach(item=>{
						item.time = this.getDate(item.finishTime)
					})
					this.list = [...this.list]
				},1000)
			},
			toForm(id,dir,time){
				this.$router.push({
					name:'jewelryFair-form',
					query:{id,dir,time}
				})
			},
			toDetail(id){
				this.$router.push({
					name:'jewelryFair-detail',
					query:{id,type:1}
				})	
			}
		}
	}
</script>
<style scoped>
	section{
		width:100vw;
		height:40vw;
		background-size:cover;
		background-repeat: no-repeat;
		background-position: center;
		display:flex;
	}
	.time{
			margin:auto;
			background:rgba(0,0,0,0.4);
			padding:6px 20px;
		& ul{
			width: calc(50vw - 20px);
			display: flex;
			justify-content: space-between;
			margin:0 auto;
			& li{
				display: flex;
				flex-direction: column;
				text-align: center;
				& p{
					padding: 4px;
					width:20px;
					text-align: center;
					background:#CFAD5B;
					margin-top: 5px;
					color:#ffffff;
				}
				& span{
					color:#fff;
					font-size:12px;
				}
			}
		}
		& .button{
			width: 90px;
			height: 30px;
			background: #ff0000;
			border:0;
			margin: 14px auto;
			margin-bottom: 4px;
			text-align: center;
			line-height: 30px;
			color:#ffffff;
		}
	}
</style>