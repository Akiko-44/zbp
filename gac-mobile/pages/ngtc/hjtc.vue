<template>
<div class="ngtc-index">
	<NavBar title="溯源码查询" />
  <div class="logo lazy-img-box"></div>
  <p class="text">华津国检</p>
  <div class="inputBox">
  	<input type="text" v-model="form.testNo" placeholder="请输入证书编号"/>
  	<input type="text" v-model="form.queryCode" placeholder="请输入查询码"/>
  </div>
  <van-button @click="look" :loading="loading" type="primary" block class="primary-btn block">提交查询</van-button>
</div>
</template>
<script>
import NavBar from '~/components/dm/navbar/noAppIndex'
export default {
	components: {
    NavBar
  },
  data () {
    return {
    	loading: false,
    	form: {
    		testNo: '',
      		queryCode: '',
    	}
    }
  },
  head () {
    return {
      title: '华津国检'
    }
  },
  beforeMount() {
    if (this.$native.isApp()) {
    	this.$native.getTitle('溯源码查询')
    }
  },
  activated () {
    let that = this
    window.onload = function(){
      setTimeout(function(){
        if (that.$native.isApp()) {
		    	that.$native.getTitle('溯源码查询')
		    }
      },1)
    }
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
	look(){
		if(!this.form.testNo || !this.form.queryCode){
			this.$toast('请填写完整信息')
		}else{
	    	this.$loading(this.$service('hjtcLook', {data: this.form}))
		    .then(result => {
		      	let data = JSON.parse(result.data)
				if(data.success){
					window.location.href = data.data.orderInfo.HtmlUrl
				}else{
					this.$toast('查询暂无结果')
				}
		    })
	    }
	}
  }
}
</script>

<style lang="postcss" scoped>
.ngtc-index {
	height: 100%;
	background: #FFFFFF;
	& .logo {
	  margin: 32px auto 17px;
	  width: 91px;
	  height: 83px;
	  background-image: url("../../assets/images/pic_hjtc.png");
	}
	& .text{
		font-size: 16px;
		color: #000000;
		text-align: center;
		font-weight: bolder;
		margin-bottom: 50px;
	}
	& .inputBox{
		margin: 0 auto;
		width: 80%;
		& input{
			box-sizing: border-box;
			width: 100%;
			height: 44px;
			padding-left: 22px;
			padding-right: 22px;
			border: none;
			border-radius: 22px;
			border: 1px solid #BBBBBB;
			margin-bottom: 15px;
		}
	}
	& .primary-btn{
		width: 80%;
		margin: 0 auto;
		background: #890F1C;
		margin-top: 25px;
	}
}

</style>