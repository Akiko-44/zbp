<template>
	<div>
		<top :title="title" :id="id" :url="url" :position="position"/>
		<footer>
			<ood v-for="(item,index) in list" :key="index" :type="type" :data="item" :position="position"/>
		</footer>
	</div>
</template>
<script>
import Top from './top'
import Ood from '@/components/common/ood'
export default {
	props: ['type','position'],
	data(){
		return {
			list:[],
		}
	},
	watch:{
		$route(){
			this.$service(this.api,{params:this.params})
		      .then(result => {
		        this.list = result.data
		    })
		}
	},
	beforeMount () {
	    this.$service(this.api,{params:this.params})
	      .then(result => {
	        this.list = result.data
	    })
	},
	computed: {
		url(){
			let url
			switch(this.type){
		    	case 1:
		    		url = "gallery-more"
		    		break
		    	case 2:
		    		url = "news-more"
		    		break
		    	case 3:
		    		url = "jewelryFair-more"
		    		break
		    }
			return url
		},
		id(){
			let id
			switch(this.type){
		    	case 1:
		    		switch(this.position){
				    	case 1:
				    		id = 518
				    		break
				    	case 2:
				    		id = 499
				    		break
				    	case 3:
				    		id = 500
				    		break
				    	case 4:
				    		id = 509
				    		break
				    	case 5:
				    		id = 510
				    		break
				    	case 6:
				    		id = null
				    		break
				    }
		    		break
		    	case 2:
		    		switch(this.position){
				    	case 1:
				    		id = 401
				    		break
				    	case 2:
				    		id = 402
				    		break
				    	case 3:
				    		id = 262
				    		break
				    	case 4:
				    		id = null
				    		break
				    }
		    		break
		    	case 3:
		    		switch(this.position){
				    	case 2:
				    		id = 1
				    		break
				    	case 3:
				    		id = 2
				    		break
				    	case 4:
				    		id = 9
				    		break
				    	case 5:
				    		id = 14
				    		break
				    	case 6:
				    		id = 19
				    		break
				    }
		    		break
		    }
			return id
		},
		title(){
			let title
			switch(this.type){
		    	case 1:
		    		switch(this.position){
				    	case 1:
				    		title = '赛事获奖作品'
				    		break
				    	case 2:
				    		title = '玉雕设计作品'
				    		break
				    	case 3:
				    		title = '首饰设计作品'
				    		break
				    	case 4:
				    		title = '国际设计师作品'
				    		break
				    	case 5:
				    		title = '专利作品'
				    		break
				    	case 6:
				    		title = '最近上传'
				    		break
				    }
		    		break
		    	case 2:
		    		switch(this.position){
				    	case 1:
				    		title = '重要新闻'
				    		break
				    	case 2:
				    		title = '重要文献'
				    		break
				    	case 3:
				    		title = '行业资讯'
				    		break
				    	case 4:
				    		title = '热点新闻'
				    		break
				    }
		    		break
		    	case 3:
		    		switch(this.position){
				    	case 2:
				    		title = '主题墙'
				    		break
				    	case 3:
				    		title = '展会'
				    		break
				    	case 4:
				    		title = '珠宝大市场'
				    		break
				    	case 5:
				    		title = '珠宝博物馆'
				    		break
				    	case 6:
				    		title = '珠宝小镇'
				    		break
				    }
		    		break
		    }
			return title
		},
	  	api(){
		  	let api
		    switch(this.type){
		    	case 1:
		    		if(this.position==6){
		    			api = 'galleryList'
		    		}else{
		    			api = 'galleryHomeList'
		    		}
		    		break
		    	case 2:
		    		if(this.position==4){
		    			api = 'newsHotList'
		    		}else{
		    			api = 'newsHomeList'
		    		}
		    		break
		    	case 3:
		    		if(this.position>3){
		    			api = 'jewelryVRList'
		    		}else{
		    			api = 'jewelryList'
		    		}
		    		break
		    }
		    return api
	  	},
	  	params(){
	  		let params
	  		if(this.type==1 && this.position==6){
	  			params = {offset:1,limit:4}
	  		}else if(this.type==2 && this.position==4){
	  			params = {offset:1,limit:4}
	  		}else{
	  			params = {classIFY:this.position,num:4}
	  		}
	  		return params
	  	}
	},
  	components: {
	    Top,
	    Ood,
	}
}
</script>
<style lang="postcss" scoped>
	footer{
		display:flex;
		justify-content: space-between;
		flex-wrap: wrap;
		& >*:nth-child(n+3){
			margin-top: 9px;
		}
	}
</style>