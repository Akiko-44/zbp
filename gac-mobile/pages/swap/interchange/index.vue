<template>
  <AppView>
    <div class="Interchange">
      <div class="icon-address">
        <i class="ico-bg_address"></i>
      </div>
      <div class="address-bar">
        <div class="a-name">
          <p>{{addrObj.consignee}}</p>
          <!--<p class="a-tag">
            <van-tag plain type="danger">标签</van-tag>
          </p>-->

        </div>
        <div class="a-detail">
          <p>{{addrObj.mobile}}</p>
          <p class="a-size">{{addrObj.province}}{{addrObj.city}}{{addrObj.detail}}</p>
        </div>
        <div class="a-edit" @click="$router.push({name: 'user-address'})">
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </div>
      </div>

      <div style="min-height:100px;background:#ededed;">
        <van-card
				  :num="1"
				  :price="toGood.price"
				  :title="toGood.goodsName"
				  :thumb="$setImg(toGood.imgUrl, { w: 100 })"
				/>
      </div>

      <div class="i-commodity">
        <p class="i-title">请选择您用于交换的商品</p>
        <p class="i-tips">(交换商品只可从您已发布并审核通过的商品中选择)</p>
      </div>

      <div style="min-height:100px;background:#ededed;padding: 20px 0;">
      	<ul class="mygoods" v-if="myGood && myGood.length">
      		<li v-for="(item, index) in myGood" :key="item.id" v-if="item.stockNum>0">
      			<van-checkbox class="goods-checkbox" 
      				v-model="item.checked"
      				@change="changeCheck"></van-checkbox>
      			<van-card
						  :num="1"
						  :price="item.price"
						  :title="item.goodsName"
						  :thumb="$setImg(item.imgUrl, { w: 100 })"
						/>
      		</li>
      	</ul>
      	<ul v-else>
      		<li style="color: #999999;text-align: center;line-height: 20px;">您还没有发布过商品<br/>请登录PC端：www.gacjc.com发布商品</li>
      	</ul>
      </div>
      
			<!--<van-radio-group v-model="radio" style="display: flex;padding: 20px;">
			  <van-radio name="1" style="margin-right: 10px;">支付宝</van-radio>
			  <van-radio name="2" style="margin-right: 10px;">微信</van-radio>
			  <van-radio name="3" style="margin-right: 10px;">银联</van-radio>
			</van-radio-group>-->

      <div class="i-total-bar">
        <div class="i-total">
          <p>换入商品数量：1</p>
          <p>换入合计：
            <span class="price">￥{{toGood.price}}</span>
          </p>
        </div>
        <div class="icon-interchange">
          <i class="ico-sale"></i>
        </div>
        <div class="i-total">
          <p>换出商品数量：{{numIn}}</p>
          <p>换出合计：
            <span class="price">￥{{priceIn}}</span>
          </p>
        </div>
      </div>

      <van-button size="large" class="order-initiating-btn" @click="orderLaunch">发起订单</van-button>
    </div>
  </AppView>
</template>

<script>
import { setImg } from '~/utils/qiniu'
export default {
  components: {},
  data () {
    return {
    	toGood:{},
    	myGood:[],
    	addrObj:{},
    	checkGoods:[],
    	radio: '1',
    	query:{
    		swapble:1,
				current:1,
				size:1000,
				goodsStatus:2
    	},
    	numIn: 0,
    	priceIn: 0
    }
  },
  beforeMount () {
    this.$service('swapGoodsDetail', {
	    resources: [this.$route.query.id]
	  }).then(data => {
	  	this.toGood = data.data
	  })
	  this.$service('swapSaleList', {
	    data: this.query
	  }).then(data => {
	  	const records = data.data.records
	  	records.forEach(data => {
	  		data.checked = false
	  		this.myGood.push(data)
	  	})
	  })
	  this.$service('addrList', {}).then(data => {
	  	const addrList = data.data.records
	  	addrList.forEach(item => {
	  		if(item.isDefault == 1){
	  			this.addrObj = item
	  		}
	  	})
	  })
  },
  deactivated () {
    this.$destroy()
  },
  computed: {},
  methods: {
  	changeCheck(){
  		let num = 0
  		let price = 0
  		this.myGood.forEach(data => {
  			if(data.checked){
  				num += 1
  				price += data.price
  				this.checkGoods.push({
  					skuId: data.goodsSku.id,
  					number: 1
  				})
  			}
  		})
  		this.numIn = num
  		this.priceIn = price.toFixed(2)
  	},
  	orderLaunch(){
  		this.$service('orderLaunch', { data:{
  			addrId: this.addrObj.id,
  			payType: 2,
  			swapInDTO: {
  				skuId: this.toGood.goodsSku.id,
  				number:1
  			},
  			swapOutDTOList:this.checkGoods
  		} }).then(data => {
		  	this.$toast({ type: 'success', message: '提交成功' })
		  	this.$router.push({ name: 'user-mine-double-listy', query:{title:'互换订单',type: '1',launch:true}})
		  })
  	}
  }
}
</script>

<style lang="postcss">
.Interchange {
  color: #333;
  padding-bottom: 50px;
  & .icon-address {
    width: 100%;
    overflow: hidden;
  }
  & .address-bar {
    width: 100%;
    height: 67px;
    background: #fffced;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 1.5;
    & .a-name {
      box-sizing: border-box;
      padding: 0 5px;
      min-width: 55px;
      text-align: center;
    }
    & .a-detail {
      flex-grow: 1;
      padding: 0 10px;
    }
    & .a-size {
      font-size: 12px;
      color: #999;
      word-wrap: break-word;
      line-height: 1;
      margin-top: 5px;
    }
  }
  & .i-commodity {
    font-size: 12px;
    line-height: 1.5;
    vertical-align: middle;
    padding: 10px 15px;
    & .i-title {
      color: #333;
    }
    & .i-tips {
      color: #999;
    }
  }
  & .i-total-bar {
    display: flex;
    font-size: 13px;
    color: #333;
    & .icon-interchange {
      width: 36px;
      display: flex;
      justify-content: center;
      align-items: Center;
      & .ico-sale {
        width: 36px;
      }
    }
    & .i-total {
      margin: 10px 15px;
      padding: 0 5px;
      background: #f5f5f5;
      flex-grow: 1;
      line-height: 1.8;
    }
    & .price {
      color: #e31436;
    }
  }
  & .order-initiating-btn {
    background: #c2a374;
    border: 1px solid #c2a374;
    border-radius: 0;
    position: fixed;
    bottom: 0;
    color: #fff;
  }
  & .van-card__price{
    color: #FF0000;
  }
}
.mygoods{
	& li{
		position: relative;
		& .goods-checkbox{
			position: absolute;
			left: 10px;
			top: 10px;
			z-index: 9999999;
		}
	}
}
</style>
