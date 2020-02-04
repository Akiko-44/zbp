<template>
  <AppView class="Cart"
           :title="title">
    <!--<span slot="nav-bar-right">{{ active ? '完成' : '编辑' }}</span>-->
    <p class="btn-edit" v-if="cart.cartItemList.length" @click="edit">{{ active ? '完成' : '编辑商品' }}</p>
    <div v-if="cart.cartItemList.length"
         v-for="(item, index) in cart.cartItemList"
         :key="index"
         class="cart-block">
      <div v-if="item.goods.length"
           class="cart-block-header row-between van-hairline--bottom">
        <div class="vertical">
          <van-checkbox class="checkbox"
                        @click.native="cartItemClick(item.checked, index)"
                        v-model="item.checked"></van-checkbox>
          <i class="ico-business"></i>
          &nbsp;
          <span>{{item.goods[0].merchantName}}</span>
        </div>
        <!--<div class="vertical">
          <p class="shop-edit"
             @click="edit">{{ active ? '完成' : '编辑' }}</p>
        </div>-->
      </div>
      <div class="cart-block-items">
        <div class="cart-block-item"
             v-for="(goods, i) in item.goods"
             :key="i">
          <!--<div class="animate vertical"
               :class="{ active: active }">-->
          <div class="animate vertical">
            <van-checkbox class="checkbox"
                          v-model="goods.checked"></van-checkbox>
            <AppCard :data="{
                goodsId: goods.goodsId,
                goodsSource: goods.goodsSource,
                imgUrl: goods.goodsLogo,
                title: goods.goodsName,
                price: '￥' + (goods.skuPrice),
                num: 'x' + goods.quantity,
                describe: goods.skuDescribe,
                goodstate: goods.goodstate
              }">
              <van-stepper @change="stepperChange(goods.goodsSku, goods.quantity)"
                           v-model="goods.quantity"
                           integer
                           disable-input />
            </AppCard>
            <!-- describe: '吊坠：八成新', -->
          </div>
          <!--<div class="delete-goods item-center"
               @click="remove(goods, index, i)">删除</div>-->
        </div>
      </div>
      <van-cell-group v-if="item.goods.length">
        <van-cell>
          运费：<span class="red">￥{{item.freightMoney}}</span>
        </van-cell>
      </van-cell-group>
    </div>
    <div v-if="shopNum === 0 && !dataLoading"
         class="dark-gray center" style="margin-top: 80px;">
   		<img class="empty-cart" src="../../../assets/images/shopCarNo.png"/>
   		<p style="text-align: center;">天呐，您的购物车居然是空的</p>
    </div>
    <div class="height-span" v-if="shopNum !== 0">
      <div class="cart-footer van-hairline--top row-between vertical">
        <div class="select-all item-center">
          <van-checkbox class="checkbox"
                        v-model="allChecked"></van-checkbox>
          <span class="select-all-text">全选</span>
        </div>
        <div class="clearing item-center"v-if="active">
          <van-button @click="remove"
                      class="primary-btn"
                      type="primary">
            删除
          </van-button>
        </div>
        <div class="clearing item-center" v-else>
          <span>合计:&nbsp;</span>
          <span class="red">￥{{totalPrice}}</span>
          <!-- <p class="postage">(运费:&nbsp;<span class="red">￥{{freightMoney}}</span>)</p> -->
          <van-button @click="submit"
                      class="primary-btn"
                      type="primary">
            结算
          </van-button>
        </div>
      </div>
    </div>
    <AppTabbar :activeIndex="3"
               v-if="loadTabbar" />
    
    <BindPhone :isCityEnter="isCityEnter"
    						@listenToChild="showFromParent"
    						@changeMobileSuccessEvent="changeMobileSuccessEvent"/>
  </AppView>
</template>

<script>
import AppCard from '~/components/common/card/item4'
import AppTabbar from '~/components/swap/tabbar'
import BindPhone from '~/components/common/bindPhone'
import { setToken } from '~/utils/auth'

const filter = {
  checkedGoods: function (goods) {
    return goods.filter(item => item.checked)
  }
}

export default {
  components: {
    AppCard,
    AppTabbar,
		BindPhone
  },
  // middleware: 'auth',
  data() {
    return {
      isCityEnter: false,
      dataLoading: false,
      active: false,
      cart: {
        cartItemList: []
      },
      skuIds: '',
      goodsSku: '',
      loadTabbar: true
    }
  },
  computed: {
    title() {
      return `购物车`
    },
    shopNum() {
      let shopNum = 0
      this.cart.cartItemList.forEach(item => {
        item.goods.forEach(goods => {
          shopNum += 1
        })
      })
      return shopNum
    },
    totalPrice() {
      let totalPrice = 0
      this.cart.cartItemList.forEach(item => {
        item.goods.forEach(goods => {
          if (goods.checked) {
            totalPrice += (goods.quantity * goods.skuPrice)
          }
        })
      })
      return this.$toFixed(totalPrice + this.freightMoney)
    },
    freightMoney() {
      let freightMoney = 0
      this.cart.cartItemList.forEach(item => {
        if (filter.checkedGoods(item.goods).length) {
          freightMoney += item.freightMoney
        }
      })
      return freightMoney
    },
    allChecked: {
      get: function () {
        const cartItems = this.cart.cartItemList.filter(item => {
          const cartItemChecked = filter.checkedGoods(item.goods).length === item.goods.length
          item.checked = cartItemChecked
          return cartItemChecked
        })
        return cartItems.length === this.cart.cartItemList.length
      },
      set: function (value) {
        this.cart.cartItemList.filter(item => {
          item.goods.forEach(goods => {
            goods.checked = value
          })
          item.checked = value
        })
      }
    }
  },
  beforeMount() {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated() {
    this.loadTabbar = false
    this.$nextTick(() => {
      this.loadTabbar = true
    })
    this.dataLoading = true
    this.$loading(this.$service('orderCartList'))
      .then(result => {
        const cart = result.data
        cart.cartItemList.forEach(item => {
          item.checked = false
          item.goods.forEach(goods => {
            goods.checked = false
            if(goods.skuList && goods.skuList.length > 0) {
              goods.skuList.forEach(sku => {
                goods.skuDescribe = ''
                goods.skuList.forEach(sku => {
                  goods.skuDescribe += sku.specsName + '：' + sku.attrValue + ' '
                })
              })
            }
          })
        })
        this.cart = cart
        this.dataLoading = false
      })
      .catch(() => {
        this.dataLoading = false
      })
  },
  deactivated() {
    this.dataLoading = false
    this.$destroy()
  },
  methods: {
  	showFromParent(data) {
  		this.isCityEnter = data
  	},
  	changeMobileSuccessEvent(data) {
			this.$store.commit('user/setToken', data)
			setToken(data)
			this.$toast({
				type: 'success',
				message: '成功'
			})
			this.$router.push({
        name: 'swap-order-cartConfirm',
        query: { skuIds: this.skuIds }
      })
  	},
    edit() {
      this.active = !this.active
    },
    /*async remove(goods, cartIndex, goodsIndex) {
      await this.$loading(this.$service('orderDeleteCart', { resources: [goods.goodsSku] }), '')
      this.cart.cartItemList[cartIndex].goods.splice(goodsIndex, 1)
    },*/
    async remove() {
    	
      let goodsSku = []
    	this.cart.cartItemList.forEach(item => {
        item.goods.forEach(goods => {
          if (goods.checked) {
            goodsSku.push(goods.goodsSku)
          }
        })
      })
      this.goodsSku = goodsSku.join(',')
      if (!this.goodsSku) return this.$toast('请勾选你要删除的商品')
      await this.$loading(this.$service('orderDeleteCart', { resources: [this.goodsSku] }), '')
      this.$router.go(0)
    },
    submit() {
      if (this.shopNum === 0) return this.$toast('购物车没有商品')
      if (this.totalPrice === 0) return this.$toast('请勾选你要购买的商品')
      this.setCartData()
      this.$service('isCityEnter').then((data) => {
      	this.$router.push({
	        name: 'swap-order-cartConfirm',
	        query: { skuIds: this.skuIds }
	      })
      }).catch((data) => {
      	if(!data.success){
      		this.isCityEnter = true
      	}
      })
      
    },
    setCartData() {
      // const cart = JSON.parse(JSON.stringify(this.cart))
      // cart.cartItemList = cart.cartItemList.filter(item => {
      //   item.goodsNumber = 0
      //   item.goods = item.goods.filter(goods => {
      //     if (goods.checked) {
      //       item.goodsNumber += goods.quantity
      //     }
      //     return goods.checked
      //   })
      //   return item.goods.length
      // })
      // cart.totalPrice = this.totalPrice
      // localStorage.CartData = JSON.stringify(cart)
      let skuIds = []
      this.cart.cartItemList.forEach(item => {
        item.goods.forEach(goods => {
          if (goods.checked) {
            skuIds.push(goods.goodsSku)
          }
        })
      })
      this.skuIds = skuIds.join(',')
    },
    cartItemClick(value, index) {
      this.cart.cartItemList[index].goods.forEach(goods => {
        goods.checked = !value
      })
    },
    stepperChange(skuId, num) {
      this.$service('orderCartUpdate', { resources: [skuId, num] })
    }
  }
}
</script>

<style lang="postcss">
.Cart {
  /*background-color: var(--light-gray);*/
  min-height: 100%;
  color: var(--black);
  & .btn-edit{
  	padding: 10px;
  	text-align: right;
  	font-size: 14px;
  	background: #FFFFFF;
    border-bottom: 1px solid #F8F8F8;
  }
  & .cart-block-items {
    & .cart-block-item:last-child .card-main {
      &:after {
        border: none;
      }
    }
  }
  & .cart-block {
    margin-bottom: 10px;
    background-color: white;
  }
  & .cart-block-item {
    position: relative;
    margin-bottom: 1px;
  }
  & .cart-block-header {
    padding: 5px 0;
    font-size: 12px;
  }
  & .ico-business,
  & .checkbox {
    margin-left: 10px;
  }
  & .app-card-item4 {
    flex: 1;
  }
  & .shop-edit {
    padding-right: 10px;
    font-size: 14px;
  }
  & .delete-goods {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 100%;
    font-size: 14px;
    color: white;
    background-color: var(--brown);
    z-index: 0;
  }
  & .animate {
    position: relative;
    transition: transform 0.3s;
    transform: translate3d(0, 0, 0);
    z-index: 0;
    &.active {
      transform: translate3d(-60px, 0, 0);
    }
  }
  & .cart-footer {
    position: fixed;
    z-index: 0;
    bottom: 48px;
    width: 100%;
    height: 47px;
    background-color: white;
  }
  & .select-all-text {
    padding-left: 5px;
  }

  & .clearing {
    height: 100%;
    & .primary-btn {
      margin-left: 15px;
      font-size: 15px;
      display: block;
      width: 104px;
      height: 100%;
      border-radius: 0;
    }
  }
  & .height-span {
    height: 94px;
  }
  & .postage {
    margin-left: 10px;
    font-size: 12px;
  }
  & .van-stepper{
    text-align: right;
  }
}
.empty-cart{
	display: block;
	width: 200px;
	margin: 20px auto;
}
</style>
