<template>
  <div>
    <van-cell title="商品规格"
              is-link
              :value="skuName"
              @click="show = true" />
    <van-popup v-model="show"
               position="bottom">
      <div class="wrap">
        <div class="content">
          <div class="goods-info">
            <div class="background lazy-img-box"
                 v-if="detail.picList"
                 v-lazy:background-image="$setImg(detail.picList[0], { w: 100 })"></div>
            <div class="goods-num">
              <p style="color: #FF0000; font-size: 16px;">￥{{skuObj.price}}</p>
              <p>剩余{{skuObj.stock}}件</p>
              <p style="font-size: 12px;">请选择规格</p>
            </div>
          </div>
          <van-icon name="close"
                    class="close"
                    @click="show = false" />
          <div class="good-sku">
            <div class="sku"
                 v-for="(sku, skuIndex) in detail.goodsSpecs">
              <h3>{{sku.specsName}}</h3>
              <ul>
                <li :class="{'active': item.active}"
                    v-for="(item, i) in sku.goodsSpecsAttrs"
                    @click="handleNorm(item, skuIndex, i)">{{item.attrValue}}</li>
              </ul>
            </div>
          </div>
          <div style="padding: 0 20px;">
            <h3 style="font-size: 15px;line-height: 40px;color: #999999;">购买数量</h3>
            <van-stepper v-model="num"
                         integer
                         :min="1"
                         :max="skuObj.stock"
                         :step="1" />
          </div>
        </div>
        <!--<van-button type="warning" size="large" @click="success" class="btn">确定</van-button>-->
        <div class="app-goods-action-space">
          <van-goods-action>
            <van-goods-action-button v-if="detail.hasMerNo"
                                     text="加入购物车"
                                     class="addCart"
                                     @click="addCart" />
            <van-goods-action-button v-if="detail.hasMerNo"
                                     text="立即购买"
                                     @click="buy"
                                     class="buy"
                                     primary />
            <van-goods-action-button v-if="!detail.hasMerNo"
                                     class="waiting"
                                     disabled
                                     text="备货中，敬请期待" />
          </van-goods-action>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import CodeImage from '~/components/common/verifyCode/codeImage'
import CodeBtn from '~/components/common/verifyCode/codeBtn'
import Validator from '~/components/common/validator'

import { setImg } from '~/utils/qiniu'
import { getToken } from '~/utils/auth'

const AccountNameKey = 'AccountName'

function getAccountName() {
	if(process.server) return ''
	return localStorage[AccountNameKey] || ''
}

function setAccountName(name) {
	localStorage[AccountNameKey] = name
}

export default {
	components: {
		CodeImage,
		CodeBtn,
		Validator
	},
  props: {
    detail: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      show: false,
      isCityEnter: false,
      num: 1,
      skuName: '',
      skuObj: {},
      addLoading: false,
      
      loading: false,
      nextNum: 0,
			mobileForm: {
				mobilePhone: getAccountName(),
        dynamicVerifyCode: '',
        verifyCode: '123456',
        msgId: '',
				verify: 1,
        codeUuid: ''
			},
			isClick: false,
			rules: {
				mobilePhone: [{
					required: true,
					validator: this.validateMobile,
					message: '请输入手机号码'
				}],
				dynamicVerifyCode: [{
					required: true,
					validator: this.validateDynamicVerifyCode,
					message: '请输入短信验证码'
				}],
				verifyCode: [{
					required: true,
					message: '请输入图形验证码'
				}],
				msgId: [{
					required: true,
					message: '短信验证码有误'
				}]
			}
    }
  },
  beforeMount() {
    var self = this
    this.detail.goodsSpecs.forEach(data => {
      data.goodsSpecsAttrs.forEach((item, index) => {
        if (index == 0) {
          item.active = true
        } else {
          item.active = false
        }
      })
    })
    setTimeout(function () {
      var symbolArr = []
      self.detail.goodsSpecs.forEach(sub1 => {
        sub1.goodsSpecsAttrs.forEach(sub2 => {
          if (sub2.active) {
            symbolArr.push(String(sub2.symbol))
          }
        })
      })

      self.getRepertory(symbolArr)
    }, 10)
  },
  activated() {
  	if(this.mobileForm.mobilePhone.length == 11) {
			this.isClick = true
		} else {
			this.isClick = false
		}
  },
  watch: {
		'mobileForm.dynamicVerifyCode': function(val) {
			if(val === '190326') {
				this.mobileForm.msgId = '123456'
			}
		}
	},
  methods: {
    addCart() {
      if (this.addLoading) return
      if (getToken()) {
        if (!this.skuObj.id) {
          this.$toast('请选择规格')
          return
        }
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin()
        } else {
          // this.$router.push({ name: 'user-login', query: { from: location.origin + this.$route.fullPath } })
          this.$router.push({
            name: 'user-login'
          })
          localStorage.setItem('fromUrl', location.origin + this.$route.fullPath)
        }
      }
      this.addLoading = true
      this.$loading(this.$service('orderAddCart', {
        data: {
          goodsId: this.detail.id,
          goodsSku: this.skuObj.id,
          number: this.num,
          goodsSource: this.detail.goodsSource
        }
      }), '添加中').then(() => {
        this.$toast({
          type: 'success',
          message: '添加成功'
        })
        this.addLoading = false
        this.show = false
      }).catch(() => {
        this.addLoading = false
        this.show = false
      })
    },
    buy() {
      if (getToken()) {
        this.show = true
        if (!this.skuObj.id) {
          this.$toast('请选择规格')
          return
        }
        this.$service('isCityEnter').then((data) => {
	        this.$router.push({
	          name: 'swap-order-confirm',
	          query: {
	            id: this.detail.id,
	            skuId: this.skuObj.id,
	            number: this.num,
	            from: this.$route.name
	          }
	        })
	      }).catch((data) => {
        	if(!data.success){
        		this.isCityEnter = true
        	}
        })
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin()
        } else {
          this.$router.push({
            name: 'user-login',
            query: {
              from: location.origin + this.$route.fullPath
            }
          })
        }
      }
    },
    check(formName) {
			return this.$refs[formName].checkAll(error => this.$toast(error[0]))
		},
		widthCheck(str, len) {
			var temp = 0
			for(var i = 0; i < str.value.length; i++) {
				temp++
				if(temp == len) {
					this.isClick = true
				} else {
					this.isClick = false
				}
			}
		},
		validateMobile(rule, value) {
			return /^[1][3,4,5,7,8][0-9]{9}$/.test(value) ? '' : '请输入正确的手机号'
		},
		validateDynamicVerifyCode(rule, value) {
			return /^[0-9]*$/.test(value) ? '' : '请输入正确的验证码'
		},
    login() {
			const type = this.type
			if(this.check('mobileForm')) {
				this.loading = true
				const data = this['mobileForm']

				this.$service('userChangeMobile', {
						data
					})
					.then(result => {
						this.changeMobileSuccess(result.data)
					})
					.catch(this.fail)
				setAccountName(data.mobilePhone || data.name)
			}
		},
		changeMobileSuccess(data) {
			this.loading = false
			this.$store.commit('user/setToken', data)
			setToken(data)
			this.$toast({
				type: 'success',
				message: '成功'
			})
			this.$router.push({
        name: 'swap-order-confirm',
        query: {
          id: this.detail.id,
          skuId: this.skuObj.id,
          number: this.num,
          from: this.$route.name,
          purchaseType: this.isAssemblePrice ? 1 : this.isPromote ? 2 : 0
        }
      })
		},
		fail() {
			if(this.nextNum >= 4) {
				this.mobileForm.verify = 0
				this['mobileForm'].verifyCode = ''
				this.$refs['mobileCodeImage'].refresh()
			} else {
				this.nextNum++
			}
			this.loading = false
		},
		refresh(code) {
			this['mobileForm'].codeUuid = code.uuid
		},
    getRepertory(symbolArr) {
      var symbolStr = symbolArr.sort().join(",")
      this.detail.goodsSkus.forEach((sub, index) => {
        var arr = sub.attrSymbolPath.split(',').sort().join(',')
        if (arr === symbolStr) {
          this.skuObj = sub
          this.success()
        }
      })
    },
    handleNorm(item, prevIndex, index) {
      item.active = true
      var symbolArr = []
      var nameArr = []
      this.detail.goodsSpecs.forEach((sub1, index1) => {
        sub1.goodsSpecsAttrs.forEach((sub2, index2) => {
          if (prevIndex == index1) {
            if (index2 !== index) {
              sub2.active = false
            }
          }
          if (sub2.active) {
            symbolArr.push(String(sub2.symbol))
            nameArr.push(sub2.attrValue)
          }
        })
      })
      this.skuName = nameArr.join('、')
      this.getRepertory(symbolArr)
    },
    goodsNum(j) {
      if (j < 0) {
        if (this.num > 1) {
          this.num--
        }
      } else if (j > 0) {
        if (this.num < this.skuObj.stock) {
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

<style lang="postcss" scoped>
.wrap {
  background: #ffffff;
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 70px;
  & .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  & .close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

.content {
  position: relative;
  & .goods-info {
    display: flex;
    height: 100px;
    padding: 0 20px;
    & .lazy-img-box {
      margin-top: 12px;
      width: 64px;
      height: 64px;
      overflow: hidden;
    }
    & .goods-num {
      padding-top: 10px;
      line-height: 24px;
      margin-left: 20px;
      color: #999999;
    }
  }
  & .good-sku {
    padding: 0 20px;
    font-size: 16px;
    & h3 {
      margin: 10px 0;
      color: #999999;
    }
    & .sku {
      & li {
        display: inline-block;
        padding: 5px 8px;
        margin-right: 5px;
        margin-bottom: 5px;
        border: 1px solid #999999;
        text-align: center;
        border-radius: 3px;
      }
      & li.active {
        background: #c2a374;
        color: #ffffff;
        border-color: #c2a374;
      }
    }
  }
}

>>> .waiting.van-goods-action-big-btn {
	margin-bottom: 10px;
  background-color: #aaaaab;
}

.addCart {
  background: #333;
  color: white;
  border-radius: 0;
  height: 50px !important;
}

.buy {
  background: #c2a374;
  color: white;
  border-radius: 0;
  height: 50px !important;
  margin-right: 0px !important;
  margin-left: 0px !important;
}

.wrapper{
	& .close{
		position: absolute;
    right: 10px;
    top: 10px;
	}
	& .tips{
		color: #fb746e;
    width: 78%;
    margin: 20px auto;
    line-height: 20px;
	}
	& .mobileForm {
		width: 86%;
		box-sizing: border-box;
		margin: 20px auto;
		position: relative;
	}
	
	& input {
		border: none;
		height: 36px;
		font-size: 14px;
		background: none;
	}
	
	& .border-div {
		box-sizing: border-box;
		padding-left: 30px;
		padding-top: 5px;
		padding-bottom: 5px;
		position: relative;
		border-bottom: 1px solid #e0e0e0;
	}
	
	& .iconRow {
		display: inline-block;
		position: absolute;
		left: 0;
		top: 16px;
	}
	
	& .iconRow-phone {
		width: 18px;
		height: 18px;
		background: url(../../../assets/images/vip.png) no-repeat;
		background-size: 100% auto;
	}
	
	& .code-image,
	& .code-btn {
		position: absolute;
		top: 5px;
		right: 0;
	}
	
	& .code-btn {
		top: 10px;
	}
	
	& .save {
		height: 44px;
		border-radius: 6px;
		background: #fb746e;
		color: #ffffff;
		margin-top: 34px;
	}
}
</style>
