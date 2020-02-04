<template>
<div class="ngtc-index">
	<NavBar title="溯源码查询" />
  <div class="logo lazy-img-box"></div>
  <p class="text">国家宝珠宝玉石质量监督检验中心</p>
  <div class="inputBox">
  	<input type="text" v-model="form.c" placeholder="请输入证书编码"/>
  	<input type="text" v-model="form.v" placeholder="请输入防伪码"/>
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
    		c: '',
      	v: '',
    	}
    }
  },
  head () {
    return {
      title: '国家宝珠宝玉石质量监督检验中心'
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
			if(!this.form.c || !this.form.v){
				this.$toast('请填写完整信息')
			}else{
        this.$router.push({
	        name: 'ngtc-text',
	        query: {
	          c: this.form.c,
	          v: this.form.v,
	          callback: 'zs',
	          r: 'f'
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
	  background-image: url("../../assets/images/pic_ngtc.png");
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