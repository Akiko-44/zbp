<template>
	<AppView>
	  <div class="app-nav-bar-span">
    <van-nav-bar
      title="互换坊订单"
      left-arrow
      @click-left="clickLeft"
    >
    </van-nav-bar>
  </div>
		<h4 class="order"><img src="../images/Order.png"  /> 我的订单</h4>
		<van-cell-group>
  			<van-cell v-for="(item,key) in data1" :title="item.title" :key="key" is-link @click="btnUrl(item,'orderPage')" :class="item.num>0? 'unread':''"/>	
		</van-cell-group>
		<h4 class="order"><img src="../images/Order.png"  /> 商家订单</h4>
		<van-cell-group>
  			<van-cell v-for="(item,key) in data2" :title="item.title" :key="key" is-link @click="btnUrls(item,'orderSwapPage')" :class="item.num>0? 'unread':''"/>	
		</van-cell-group>
	</AppView>
</template>

<script>
	export default {
		data(){
			return {
			  unreadNum: {},
				/*data1: [{title:'购买订单',type:'2'},{title:'互换订单',type: '1'},{title:'拍卖订单',type:'3'}],
				data2: [{title:'销售订单',type:'1'},{title:'互换订单',type: '2'},{title:'拍卖订单',type:'3'}],*/
				data1: [{title:'购买订单',type:'2'},{title:'拍卖订单',type:'3'}],
				data2: [{title:'销售订单',type:'1'},{title:'拍卖订单',type:'3'}]
			}
		},
		beforeMount () {
      this.$loading(this.$service('orderUnreadNumber', {data: {orderType: 0, userType:0}}))
        .then(result => {
          this.unreadNum = result.data
          /*this.data1 = [{title:'购买订单',type:'2',num:this.unreadNum.buyOrder},{title:'互换订单',type: '1',num:this.unreadNum.swapExchangeIn},{title:'拍卖订单',type:'3',num:this.unreadNum.myswapAuction}]
          this.data2 = [{title:'销售订单',type:'1',num:this.unreadNum.swapSale},{title:'互换订单',type: '2',num:this.unreadNum.swapExchangeOut},{title:'拍卖订单',type:'3',num:this.unreadNum.swapAuction}]*/
          this.data1 = [{title:'购买订单',type:'2',num:this.unreadNum.buyOrder},{title:'拍卖订单',type:'3',num:this.unreadNum.myswapAuction}]
          this.data2 = [{title:'销售订单',type:'1',num:this.unreadNum.swapSale},{title:'拍卖订单',type:'3',num:this.unreadNum.swapAuction}]
        })
    },
    deactivated () {
      this.$destroy()
    },
		methods:{
		  clickLeft () {
	        if (this.$native.isApp()) {
		        this.$native.goToHome()
		      } else {
		        this.$router.go(-1)
		      }
	      },
			btnUrl(data,name){
				if(data.type == 1){
					this.$router.push({name: 'user-mine-double-listy',query:{...data}})
				}else{
					this.$router.push({name: 'user-mine-double-list',query:{...data}})
				}
				
			},
			btnUrls(data,name){
				if(data.type == 1){
					this.$router.push({name: 'user-mine-double-listys',query:{...data}})
				}else if(data.type == 2){
					this.$router.push({name: 'user-mine-double-listy',query:{...data}})
				} else {
					this.$router.push({name: 'user-mine-double-orderAuction',query:{...data}})
				}
				
			}
		}
	}
</script>

<style lang="postcss" scoped>
	.order{
		height: 40px;
		line-height: 40px;
		font-size: 15px;
		padding: 0 2.5%;
		color: #1A1A1A;
		& img{
			position: relative;
			top: 3px;
			height: 16px;
		}
	}
	.unread{
	  position: relative;
	  &:before{
	    content: '';
	    position: absolute;
	    width: 6px;
	    height: 6px;
	    background: red;
	    border-radius: 50%;
	    left: 70px;
      top: 50%;
      margin-top: -10px;
	  }
	}
</style>