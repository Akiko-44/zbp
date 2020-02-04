 <template>
  <AppView class="home" title="公示公告" :navToggle="true">
  	<van-list v-model="loading" :finished="finished" @load="onLoad">
  		<div>
	  		<div class="bulletin" v-for="(list,index) in list" @click="_bulletin(list.id)">
			<header v-lazy:background-image="setImg(list.path)"></header>
				<div class="left">
					<div class="activity_content">
							<h2 v-text="list.title"></h2>
							<div class="content" v-html="list.summary"></div>
					</div>
					<div class="activity_browse">
						<div class="browse_borw">
							<p><img src="~/static/icons/new4.png" alt="" /><span class="browseNum" v-text="list.lookNum"></span></p>
						</div>
					</div>
				</div>
	  		</div>
  		</div>
  	</van-list>
  </AppView>
</template>
<script>
	import { setImg } from '~/utils/qiniu'
export default {
  data () {
    if (this.$data) return
    return {
   		 offset:1,
   		 limit:10,
   		 list:[],
   		 total:null,
			 loading:false,
			 finished:false
    }
  },
  watch:{
  	$route(){
  		this.offset = 1
  		this.list = []
  		this.init()
  	}
  },
  beforeMount(){
			this.offset = 1
  		this.list = []
  		this.init()
  		if (this.$native.isApp()) {
	    	this.$native.getTitle('公示公告')
	    }
  },
  activated () {
    let that = this
    window.onload = function(){
      setTimeout(function(){
        if (that.$native.isApp()) {
		    	that.$native.getTitle('公示公告')
		    }
      },1)
    }
  },
  deactivated () {
    this.$destroy()
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
    async init(){
   		let res = await this.$service('newNotice',{
   			params:{
   				offset: this.offset,
					limit: this.limit
   			}
   		})
   		this.list = [...this.list, ...res.data.records]
   		this.total = res.data.total
   		if(res.data.records.length > 0){
					this.offset += 1
			}
   	},
	onLoad() {
		setTimeout(() => {
			this.init()
			this.loading = false
			if(this.list.length >= this.total) {
				this.finished = true
			}
		}, 500)
	},
	_bulletin(id){
		this.$router.push({path:'bulletinDetail',query:{id:id}})
	}
  }
}
</script>

<style lang="postcss" scoped>
.home {
  background-color: var(--light-gray);
}
.bulletin{
		background:#fff;
		display: flex;
		margin: 6px 10px;
		border-bottom: 1px solid #f8f8f8;
		& header{
			width: calc(50vw - 70px);
			height:calc(50vw - 62px);
			background-size:cover;
			background-repeat: no-repeat;
			background-position: center;
			flex-shrink: 0;
		}
		& .left{
			width:calc(50vw + 40px);
			margin-left: 10px;
			& h2{
				width:100%;
				padding-top: 8px;
				overflow: hidden; 
				text-overflow:ellipsis;
				margin-top: 16px;
			}
			& .content{
				margin-top: 10px;
				height:40px;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size:14px;
				color:rgba(102,102,102,1);
				line-height: 20px;
			}
			& .activity_browse{
				display: flex;
				justify-content: flex-end;
				margin-top: 16px;
				& .time{
					font-weight:400;
					color:rgba(153,153,153,1);
					font-size: 12px;
				}
				& .browse_borw{
					display: flex;
					align-items: center;
					& p{
						margin-right: 5px;
					}
					& img{
						width: 12px;
						background-size: 12px;
						margin-right: 2px;
					}
					& span{
						font-weight:400;
						color:rgba(153,153,153,1);
						font-size: 12px;
					}
				}
			}
		}
}
</style>
