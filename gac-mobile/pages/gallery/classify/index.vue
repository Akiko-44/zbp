<template>
	<AppView class="home" title="图集分类">
		<div class="share">
			<div class="share_left">
				<ul>
					<li v-for="(item,index) in navList1" :class="{ons:active==index}" @click="choice(index)">{{item.name}}</li>
				</ul>
			</div>
			<div class="share_right">
				<div class="award" v-for="(item1,index1) in subsetList" :key="index1">
					<div class="award_title">
						<h1>{{item1.name}}</h1>
						<p @click="more(item1.id,item1.name,1)">
							<span>更多</span>
							<van-icon name="arrow" class="vanicon"/>
						</p>
					</div>
					<div class="award_share">
						<ul>
							<li v-for="(item2,inde2) in item1.children" @click="more(item2.id,item2.name,2)">{{item2.name}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</AppView>
</template>
<script>
	export default {
		data(){
			return {
				active:0,
				list:[{children:[{children:[]}]}],	
				filterate1: ['赛事获奖作品','玉雕设计作品','首饰设计作品','国际设计师作品','专利作品'],
			}
		},
		watch: {
            $route(){
                 this.init()
            }
        },
		beforeMount () {
		    this.init()
		},
		computed:{
			subsetList(){
				if(this.list.length>0){
					return this.list[this.active].children
				}else{
					return []
				}
			},
			navList1(){
				return this.list.filter(item => {
					if(this.filterate1.indexOf(item.name) >= 0) {
						return false
					} else {
						return true
					}
				})
			}
		},
		methods:{
			async init(){
				this.list = (await this.$service('galleryTree')).data
			},
			choice(index){
				this.active = index
			},
			more(id,title,type){
				this.$router.push({
					name:'gallery-more',
					query:{
						id:id,
						title:title,
						type:type
					}
				})
			}
		}
	}
</script>

<style lang="postcss" scoped>
.share {
	width: 100vw;
	height: 93vh;
	background: #f8f8f8;
	display: flex;
	& .share_left {
		flex-shrink: 0;
		background: #ffffff;
		width: 130px;
		height: 100%;
		overflow-y: scroll;
		& ul {
			width: 100%;
		}
		& li {
			width: 100%;
			font-size: 14px;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			height: 50px;
			line-height: 50px;
			text-align: center;
		}
		& .ons {
			background: #f8f8f8;
			color: rgba(255, 0, 0, 1);
		}
	}
	& .share_right {
		flex-grow: 1;
		overflow-y: scroll;
		padding:0 18px;
		& .award{
			margin-top: 18px;
		}
		& .award-one{
			margin-top: 30px;
		}
		& .award_title {
			display: flex;
			justify-content: space-between;
			padding-bottom: 14px;
			border-bottom: 1px solid #bbb;
			& h1 {
				font-size: 14px;
				color: rgba(51, 51, 51, 1);
			}
			& p {
				font-size: 14px;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				display: flex;
				align-items: center;
				& .vanicon {
					color: rgba(102, 102, 102, 1);
					font-size: 12px;
				}
			}
		}
		& .award_share {
			& ul {
				display: flex;
				flex-wrap: wrap;
			}
			& li {
				font-size: 12px;
				border: 1px solid #bbb;
				color: rgba(102, 102, 102, 1);
				border-radius: 2.5px;
				padding: 5px 0;
				text-align: center;
				margin:0 4px;
				width: calc((100vw - 196px) / 3);
				margin-top: 10px;
			}
		}
	}
}
</style>