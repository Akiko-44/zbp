<template>
<div>
  <van-cell-group>
	  <van-cell title="商品规格" is-link arrow-direction="right" :value="skuName" @click="show = true"/>
	</van-cell-group>
	<van-popup v-model="show"  position="bottom">
		<div class="wrap">
			<div class="content">
				<div class="goods-info">
					<div class="background lazy-img-box" v-if="detail.imgUrl" v-lazy:background-image="$setImg(detail.imgUrl, { w: 100 })"></div>
					<div class="goods-num">
						<p style="color: #FF0000; font-size: 16px;">￥{{skuObj.price}}</p>
						<p>剩余{{skuObj.stock}}件</p>
						<p>请选择规格</p>
					</div>
				</div>
				<van-icon name="close" class="close" @click="show = false"/>
				<div class="good-sku">
					<div class="sku" v-for="(sku, skuIndex) in detail.goodsSpecs">
						<h3>{{sku.specsName}}</h3>
						<ul>
							<li :class="{'active': item.active}" v-for="(item, i) in sku.goodsSpecsAttrs" @click="handleNorm(item, skuIndex, i)">{{item.attrValue}}</li>
						</ul>
					</div>
				</div>
				<div style="padding: 0 20px;">
					<h3 style="font-size: 15px;line-height: 40px;color: #999999;">购买数量</h3>
					<van-stepper
					  v-model="num"
					  integer
					  :min="1"
					  :max="skuObj.stock"
					  :step="1"
					/>
				</div>
			</div>
			<!--<van-button type="warning" size="large" @click="success" class="btn">确定</van-button>-->
			<div class="app-goods-action-space">
        <van-goods-action>
          <van-goods-action-big-btn text="加入购物车" @click="addCart" />
          <van-goods-action-big-btn text="立即购买" @click="buy" primary />
        </van-goods-action>
      </div>
		</div>
	</van-popup>
</div>
</template>

<style lang="postcss" scoped>
.wrap{
	background: #FFFFFF;
	height: 400px;
	overflow-y: scroll;
	overflow-x: hidden;
	padding-bottom: 70px;
	& .btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	& .close{
		position: absolute;
		top: 10px;
		right: 10px;
	}
}
.content{
	position: relative;
	& .goods-info{
		display: flex;
		height: 100px;
		padding: 0 20px;
		& .lazy-img-box{
			margin-top: 12px;
      width: 64px;
      height: 64px;
			overflow: hidden;
		}
		& .goods-num{
			padding-top: 10px;
			line-height: 24px;
			margin-left: 20px;
			color: #999999;
		}
	}
	& .good-sku{
		padding: 0 20px;
		font-size: 16px;
		& h3{
			margin: 10px 0;
			color: #999999;
		}
		& .sku{
			padding-bottom: 10px;
			& ul{
				display: flex;
				& li{
					padding: 5px 8px;
					margin-right: 5px;
					border: 1px solid #999999;
					text-align: center;
					border-radius: 3px;
				}
				& li.active{
					background: #c2a374;
					color: #FFFFFF;
					border-color: #c2a374;
				}
			}
		}
	}
}
</style>

<script>
import { setImg } from '~/utils/qiniu'
import { getToken } from '~/utils/auth'
export default {
  props: {
    detail: {
    	type: Object,
    	default: {}
    }
  },
  data () {
    return {
      show:false,
      num: 1,
      skuName:'',
			skuObj:{},
      addLoading: false
    }
  },
  beforeMount(){
  	var self = this
  	this.detail.goodsSpecs.forEach(data => {
  		data.goodsSpecsAttrs.forEach((item, index) => {
  			if(index == 0){
  				item.active = true
  			}else{
  				item.active = false
  			}
	  	})
  	})
  	setTimeout(function(){
  		var symbolArr = []
  		self.detail.goodsSpecs.forEach(sub1=>{
				sub1.goodsSpecsAttrs.forEach(sub2=>{
					if(sub2.active){
						symbolArr.push(String(sub2.symbol))
					}
				})
			})
			
			self.getRepertory(symbolArr)
  	},10)
  },
  methods: {
    addCart(){
      if (this.addLoading) return
      if(getToken()){
        if(!this.skuObj.id){
          this.$toast('请选择规格')
          return
        }
      }else{
        this.$native.goToLogin()
      }
      this.addLoading = true
      this.$loading(this.$service('orderAddCart', {
        data: {
          goodsId: this.detail.id,
          goodsSku: this.skuObj.id,
          number: this.num,
          goodsSource: this.skuObj.source
        }
      }), '添加中').then(() => {
        this.$toast({ type: 'success', message: '添加成功' })
        this.addLoading = false
        this.show = false
      }).catch(() => {
        this.addLoading = false
        this.show = false
      })
    },
    buy(){
      if(getToken()){
        this.show = true
        if(!this.skuObj.id){
          this.$toast('请选择规格')
          return
        }
        this.$router.push({
          name: 'swap-order-confirm',
          query: {
            id: this.detail.id,
            skuId: this.skuObj.id,
            number: this.num,
            from: this.$route.name
          }
        })
      }else{
        this.$native.goToLogin()
      }
    },
    getRepertory(symbolArr){
			var symbolStr = symbolArr.sort().join(",")
			this.detail.goodsSkus.forEach((sub,index)=>{
				var arr = sub.attrSymbolPath.split(',').sort().join(',')
				if(arr === symbolStr){
					this.skuObj = sub
					this.success()
				}
			})
		},
		handleNorm(item, prevIndex, index){
			item.active = true
			var symbolArr = []
			var nameArr = []
			this.detail.goodsSpecs.forEach((sub1,index1)=>{
				sub1.goodsSpecsAttrs.forEach((sub2,index2)=>{
					if(prevIndex == index1){
						if(index2 !== index){
							sub2.active = false
						}
					}
					if(sub2.active){
						symbolArr.push(String(sub2.symbol))
						nameArr.push(sub2.attrValue)
					}
				})
			})
			this.skuName = nameArr.join('、')
			this.getRepertory(symbolArr)
		},
		goodsNum( j ){
			if(j<0){
				if( this.num >1){
					this.num--
				}
			}else if(j >0){
				if( this.num < this.skuObj.stock){
					this.num++
				}
			}
		},
		success() {
      this.skuObj.num = this.num
      this.$emit('success', JSON.parse(JSON.stringify(this.skuObj)))
   	}
  }
}
</script>
