<template>
  <div>
  	<van-cell-group>
		  <van-cell title="优惠券" is-link arrow-direction="right" :value="couponsPrice" @click="show = true"/>
		</van-cell-group>
  	<van-popup v-model="show" position="bottom">
  		<div class="list">
  			<h2 style="text-align: center;line-height: 30px;">商家和平台不能同时使用</h2>
  			<ul v-if="list &&　list.length">
  				<li v-for="item in list" :key="item.id" @click="checed(item)">
  					<div class="coupons-l">
  						<p style="padding-top: 10px;">￥<span style="font-size: 20px;font-weight: bolder;">{{item.couponsPrice}}</span>店铺优惠券</p>
  						<p>{{item.couponsName}}</p>
  						<p>有效期:{{item.startDate}} - {{item.endDate}}</p>
  						<van-tag mark type="success" class="tag" v-if="isMerchantId">商家</van-tag>
  						<van-tag mark type="success" class="tag" v-if="!isMerchantId">平台</van-tag>
  					</div>
  				</li>
  			</ul>
  			<div v-else style="text-align: center;color: #999999;line-height: 300px;">
  				暂无优惠券
  			</div>
  		</div>
  		<van-button type="warning" size="large" class="btn" @click="show = false">确定</van-button>
  	</van-popup>
  </div>
</template>

<script>
export default {
	props: {
    skuId: String
  },
  data () {
    return {
    	show: false,
    	list:[],
    	isMerchantId: true,
    	couponsPrice: ''
    }
  },
  beforeMount () {
		this.$loading(this.$service('orderCoupons', {data: [this.skuId]}))
      .then(result => {
        let arr = []
        for(let key in result.data){
        	if(key == 0){this.isMerchantId = false}
        	arr = result.data[key]
        }
        this.list = arr
      })
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
  	checed(item){
  		this.show = false
  		this.couponsPrice = '-￥' + item.couponsPrice
      this.$emit('success', JSON.parse(JSON.stringify(item)))
  	}
  }
}
</script>

<style  lang="postcss" scoped>
.list{
	& ul{
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 70px;
		& li{
			width: 100%;
			margin-bottom: 10px;
			border: 1px solid #C2A374;
			background: #F3EDE3;
			color: #C2A374;
			border-radius: 6px;
			& .coupons-l{
				position: relative;
				& p{
					padding-left: 20px;
					line-height: 25px;
				}
				& .tag{
					position: absolute;
					top: 10px;
					right: 10px;
				}
			}
		}
	}
}
.btn{
	position: fixed;
	bottom: 0;
	left: 0;
}
</style>
