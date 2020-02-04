<template>
  <div>
  	<van-cell-group>
		  <van-cell title="优惠券" is-link arrow-direction="right" @click="show = true"/>
		</van-cell-group>
  	<van-popup v-model="show" position="bottom">
  		<div class="list">
  			<ul v-if="couponsList &&　couponsList.length">
  				<li v-for="item in couponsList" :key="item.id">
  					<div class="coupons-l">
  						<p style="padding-top: 10px;">￥<span style="font-size: 20px;font-weight: bolder;">{{item.couponsPrice}}</span>店铺优惠券</p>
  						<p>{{item.couponsName}}</p>
  						<p>有效期:{{item.startDate}} - {{item.endDate}}</p>
  					</div>
  					<div class="coupons-r" @click="getCoupons(item)">
  						立即领取
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
    couponsList: Array
  },
  data () {
    return {
    	show: false
    }
  },
  beforeMount () {
    
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
  	getCoupons(row){
  		this.$loading(this.$service('makerCoupons', {resources: [row.id]}))
	      .then(result => {
	        this.show = false
	      })
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
			display: flex;
			border: 1px solid #C2A374;
			background: #F3EDE3;
			color: #C2A374;
			border-radius: 6px;
			& .coupons-l{
				width: 70%;
				border-right: 1px dashed #C2A374;
				& p{
					padding-left: 20px;
					line-height: 25px;
				}
			}
			& .coupons-r{
				width: 30%;
				height: 100px;
				text-align: center;
				line-height: 100px;
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
