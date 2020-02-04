<template>
	<div class="boxDiv">
		<h2 v-text="datas.title"></h2>
		<div class="boximgs">
			<img class="imgss" v-lazy="setImg(datas.showPrint)" >
		</div>
		<span  class="detailbgc">展会简介</span>
		<p v-text="datas.describe" class="describe"></p>
		<span  class="detailbgc">展会时间</span>
		<p class="describe">{{setTimes(datas.startTime)}} - {{setTimes(datas.finishTime)}}</p>
		<span  class="detailbgc">展会地址</span>
		<p class="describe">{{datas.detailSite}}</p>
		<span  class="detailbgc">展会实景图</span>
		<div class="boxs">
			<div v-for="(item,key) in imgs" class="box">
				<img class="imgss" v-lazy="setImg(item.picturePath)" >
			</div>
		</div>
		<span  class="detailbgc">展会全景图</span>
		<div class="boximgs">
			<iframe class="vrbanner" :src="datas.overLookPrint" ></iframe>
			<div class="btn" @click="toVr"><van-icon name="search" color="#fff"/></div>
		</div>
	</div>
</template>

<script>
	import { setImg } from '~/utils/filters'
	export default {
	props: {
		datas: Object,
		imgs:Array
	},
	beforeMount() {
		console.log(this.datas)
	},
	methods: {
		setImg,
		setTimes(time) {
			if(time) {
				let datas = time.split(' ')[0].split('-')
				let tit = ['年', '月', '日']
				let setData = []
				for(let i = 0; i < 3; i++) {
					setData.push(datas[i])
					setData.push(tit[i])
				}
				return setData.join('')
			}
		},
		toVr(){
			this.$router.push({
				name:'jewelryFair-vr',
				query:{
					src:this.datas.overLookPrint
				}
			})
		},

	}
}
</script>

<style lang="postcss" scoped>
	.boxDiv{
		background-color: #f8f8f8;
		& h2{
			margin: 15px 2.5%;
		}
		& .colors {
			color: #666;
			font-size: 12px;
			margin: 15px 0 0 2.5%
		}
		& .boximgs{
			width: 95%;
			padding: 2.5%;
			position: relative;
		}
		& .describe{
			color: #666;
			font-size: 14px;
			padding: 2.5%;
			line-height: 20px;
		}
	}
	.detailbgc{
		display: block;
		width: 94px;
		padding: 5px;
		text-align: center;
		background-color: #FF0000;
		color: #fff;
		margin: 5px 2.5%;
		margin-top:20px;
	}
	.imgss{
		width: 100%;
	}
	.vrbanner{
		width: 100%;
		height:60vw;
	}
	.boxs{
		width: 100%;
		& .box{
			width: 46.5%;
			padding: 2.5% 0% 0% 2.5%;
			display: inline-block;

			 & img {
			 	
			 }
		}
		
	}
	.btn{
		position: absolute;
		color:333;
		padding:10px;
		border-radius: 50%;
		background:rgba(0,0,0,0.5);
		z-index: 1000;
		left:20px;
		bottom:20px;
	}
</style>