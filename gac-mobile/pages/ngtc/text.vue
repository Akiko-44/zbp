<template>
<div class="text-index">
	<NavBar title="溯源码查询结果" />
	<header class="app-goods-detail-images">
		<van-swipe class="detail-swipe">
	      <van-swipe-item v-for="(img, index) in imgs" :key="index">
	        <div class="background lazy-img-box" v-lazy:background-image="setImg(img, { w: 800 })"></div>
	      </van-swipe-item>
	   </van-swipe>
    </header>
	<div v-for="item in data" v-if="data">
		<van-row type="flex" v-if="item.status != '1'">
		  <van-col span="8"> {{ item.CHName }} </van-col>
		  <van-col class="val" span="16"> {{ item.value }} </van-col>
		</van-row>
	</div>
	<div v-else style="text-align: center;">{{str}}</div>
</div>
</template>
<script>
import { setImg } from '~/utils/qiniu'
import NavBar from '~/components/dm/navbar/noAppIndex'
export default {
  components: {
    NavBar
  },
  data () {
    return {
    	data: null,
    	imgs: [],
    	str: ''
    }
  },
  head () {
    return {
      title: '珠宝信息'
    }
  },
  beforeMount (){
  	this.$loading(this.$service('ngtcLook', {data: this.$route.query}))
      .then(result => {
      	const index = result.data.indexOf('(') + 1
      	const res = JSON.parse( result.data.slice(index, result.data.length-1) )
      	if(res.isExist == 1){
        	const data = res.certData
        	data.forEach(item => {
        		if(item.status == 1){
        			this.imgs.push(item.value)
        		}
        	})
        	this.data = data
       	}else{
       		this.str = '暂无查询结果'
       	}
      })
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
    setImg
  }
}
</script>

<style lang="postcss" scoped>
.text-index {
	padding: 20px;
	font-size: 16px;
	background: #FFFFFF;
}
.van-row{
	margin-bottom: 20px;
	color: #333333;
	& .val{
		color: #666666;
	}
}
img{
	width: 100%;
}
.app-goods-detail-images {
  position: relative;
  height: 150px;
  margin-bottom: 20px;
  & .detail-swipe {
    position: relative;
    height: 100%;
    background-color: var(--light-gray);
    & .background {
      height: 100%;
      width: 100%;
    }
  }
}
</style>