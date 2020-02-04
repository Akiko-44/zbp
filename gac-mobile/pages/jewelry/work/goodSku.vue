<template>
  <div>
    <van-cell
      title="选中珠宝身份（规格）"
      is-link
      :value="skuTitle"
      @click="openSku"
    />
    <van-popup
      v-model="show"
      position="bottom"
    >
      <div class="wrap">
        <div class="content">
          <div class="goods-info">
            <div class="goods-img">
              <div
                class="background lazy-img-box"
                v-if="detail.goodsGallerys"
                v-lazy:background-image="
                  $setImg(detail.goodsGallerys[0].imgUrl, { w: 100 })
                "
              ></div>
            </div>
            <div
              class="goods-num"
              v-if="skuObj.price"
            >
              <p
                class="sku-price"
                v-if="isAssemblePrice"
              >
                ￥{{ skuObj.groupPrice.toFixed(2) }}
              </p>
              <p
                class="sku-price"
                v-else-if="isPromote"
              >
                ￥{{ skuObj.promotionPrice.toFixed(2) }}
              </p>
              <p
                class="sku-price"
                v-else
              >￥{{ skuObj.price.toFixed(2) }}</p>
              <p
                class="goods-introduction"
                v-if="!isAssemble && !detail.hasMerNo"
              >
                库存：0
              </p>
              <p
                class="goods-introduction"
                v-else-if="isAssemblePrice || isPromote"
              >
                库存：{{ skuObj.activityStock }}
              </p>
              <p
                class="goods-introduction"
                v-else
              >库存：{{ skuObj.stock }}</p>
              <p class="goods-introduction">已选：{{ skuName }}</p>
              <p class="goods-introduction">
                参考价格：<span class="reference-price">￥{{ detail.lowProposePrice.toFixed(2) }}~{{
                    detail.highProposePrice.toFixed(2)
                  }}</span>
              </p>
            </div>
          </div>
          <van-icon
            name="close"
            class="close"
            @click="show = false"
          />
          <div class="good-sku">
            <div
              class="sku"
              v-for="(sku, skuIndex) in detail.goodsSpecs"
              :key="skuIndex"
            >
              <h3 class="sku-name">{{ sku.specsName }}</h3>
              <ul>
                <li
                  :class="{ active: item.active }"
                  v-for="(item, i) in sku.goodsSpecsAttrs"
                  :key="i"
                  @click="handleNorm(item, skuIndex, i)"
                >
                  {{ item.attrValue }}
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-buy">
            <span class="goods-buy-title">购买数量</span>
            <van-stepper
              class="goods-stepper"
              v-model="num"
              integer
              :disabled="isAssemblePrice || (isPromote && !skuObj.activityStock) || (!isAssemblePrice && !isPromote && !skuObj.stock)"
              :min="1"
              :max="skuObj.stock"
              :step="1"
            />
          </div>
        </div>
        <!--<van-button type="warning" size="large" @click="success" class="btn">确定</van-button>-->
        <div class="app-goods-action-space">
          <van-goods-action>
            <van-goods-action-button
              v-if="isAssemble"
              text="确定"
              @click="buy"
              class="buy"
              primary
            />
            <van-goods-action-button
              v-if="!isAssemble && detail.hasMerNo"
              text="加入购物车"
              class="addCart"
              @click="addCart"
            />
            <van-goods-action-button
              v-if="!isAssemble && detail.hasMerNo"
              text="立即购买"
              @click="buy"
              class="buy"
              primary
            />
            <van-goods-action-button
              v-if="!isAssemble && !detail.hasMerNo"
              class="waiting"
              disabled
              text="备货中，敬请期待"
            />
          </van-goods-action>
        </div>
      </div>
    </van-popup>
    <BindPhone
      :isCityEnter="isCityEnter"
      @listenToChild="showFromParent"
      @changeMobileSuccessEvent="changeMobileSuccessEvent"
    />
  </div>
</template>

<script>
import BindPhone from "~/components/common/bindPhone";
import { setImg } from "~/utils/qiniu";
import { setToken, getToken } from "~/utils/auth";

export default {
  components: {
    BindPhone
  },
  props: {
    detail: {
      type: Object,
      default: {}
    },
    isAssemble: {
      type: Boolean,
      default: false
    },
    isPromote: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      isCityEnter: false,
      num: 1,
      skuName: "",
      skuObj: {},
      addLoading: false,
      skuTitle: "已选",
      isAssemblePrice: false
    };
  },
  beforeMount() {
    this.addLoading = false;
    var self = this;
    let nameArr = [];
    this.detail.goodsSpecs.forEach(data => {
      data.goodsSpecsAttrs.forEach((item, index) => {
        if (index == 0) {
          item.active = true;
          nameArr.push(item.attrValue);
        } else {
          item.active = false;
        }
      });
    });
    this.skuName = nameArr.join("、");
    this.skuTitle += this.skuName;
    setTimeout(function () {
      var symbolArr = [];
      self.detail.goodsSpecs.forEach(sub1 => {
        sub1.goodsSpecsAttrs.forEach(sub2 => {
          if (sub2.active) {
            symbolArr.push(String(self.PrefixZero(sub2.symbol, 4)));
          }
        });
      });
      self.getRepertory(symbolArr);
    }, 10);
  },
  methods: {
    showFromParent(data) {
      this.isCityEnter = data;
    },
    changeMobileSuccessEvent(data) {
      this.$store.commit("user/setToken", data);
      setToken(data);
      this.$toast({
        type: "success",
        message: "成功"
      });
      this.$router.push({
        name: "swap-order-confirm",
        query: {
          id: this.detail.id,
          skuId: this.skuObj.id,
          number: this.num,
          from: this.$route.name,
          purchaseType: this.isAssemblePrice ? 1 : this.isPromote ? 2 : 0
        }
      });
    },
    openSku() {
      this.isAssemblePrice = this.isAssemble ? true : false;
      this.show = true;
    },
    addCart() {
      if (this.addLoading) return;
      if (getToken()) {
        if (!this.skuObj.id) {
          this.$toast("请选择规格");
          return;
        }
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin();
        } else {
          // this.$router.push({ name: 'user-login', query: { from: location.origin + this.$route.fullPath } })
          this.$router.push({
            name: "user-login"
          });
          localStorage.setItem(
            "fromUrl",
            location.origin + this.$route.fullPath
          );
        }
      }

      const noActivityStock =
        (this.isAssemblePrice || this.isPromote) && !this.skuObj.activityStock;
      const noStock =
        !this.isAssemblePrice && !this.isPromote && !this.skuObj.stock;
      if (noActivityStock || noStock) {
        this.$toast("库存不足");
        this.show = true;
        return;
      }

      this.addLoading = true;
      this.$loading(
        this.$service("orderAddCart", {
          data: {
            goodsId: this.detail.id,
            goodsSku: this.skuObj.id,
            number: this.num,
            goodsSource: this.detail.goodsSource
          }
        }),
        "添加中"
      )
        .then(() => {
          this.$toast({
            type: "success",
            message: "添加成功"
          });
          this.addLoading = false;
          this.show = false;
        })
        .catch(() => {
          this.addLoading = false;
          this.show = false;
        });
    },
    buy() {
      if (getToken()) {
        this.show = false;
        if (!this.skuObj.id) {
          this.$toast("请选择规格");
          return;
        }

        const noActivityStock =
          (this.isAssemblePrice || this.isPromote) &&
          !this.skuObj.activityStock;
        const noStock =
          !this.isAssemblePrice && !this.isPromote && !this.skuObj.stock;
        if (noActivityStock || noStock) {
          this.$toast("库存不足");
          this.show = true;
          return;
        }

        this.$service("isCityEnter")
          .then(data => {
            this.$router.push({
              name: "swap-order-confirm",
              query: {
                id: this.detail.id,
                skuId: this.skuObj.id,
                number: this.num,
                from: this.$route.name,
                purchaseType: this.isAssemblePrice ? 1 : this.isPromote ? 2 : 0
              }
            });
          })
          .catch(data => {
            if (!data.success) {
              this.isCityEnter = true;
            }
          });
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin();
        } else {
          // this.$router.push({ name: 'user-login', query: { from: location.origin + this.$route.fullPath } })
          this.$router.replace({
            name: "user-login"
          });
          localStorage.setItem(
            "fromUrl",
            location.origin + this.$route.fullPath
          );
        }
      }
    },
    getRepertory(symbolArr) {
      var symbolStr = symbolArr.sort().join(",");
      this.detail.goodsSkus.forEach((sub, index) => {
        let tempArr = sub.attrSymbolPath.split(',')
        let symbleArr = []
        tempArr.map(thirdItem => {
          symbleArr.push(String(this.PrefixZero(thirdItem, 4)))
        })
        var arr = symbleArr.sort().join(",");
        if (arr == symbolStr) {
          this.skuObj = sub;
          this.success();
        }
      });
    },
    handleNorm(item, prevIndex, index) {
      item.active = true;
      var symbolArr = [];
      var nameArr = [];
      this.detail.goodsSpecs.forEach((sub1, index1) => {
        sub1.goodsSpecsAttrs.forEach((sub2, index2) => {
          if (prevIndex == index1) {
            if (index2 !== index) {
              sub2.active = false;
            }
          }
          if (sub2.active) {
            // symbolArr.push(String(sub2.symbol));
            symbolArr.push(String(this.PrefixZero(sub2.symbol, 4)));
            nameArr.push(sub2.attrValue);
          }
        });
      });
      this.skuName = nameArr.join("、");
      this.skuTitle = "已选：" + this.skuName;
      this.getRepertory(symbolArr);
    },
    goodsNum(j) {
      if (j < 0) {
        if (this.num > 1) {
          this.num--;
        }
      } else if (j > 0) {
        if (this.num < this.skuObj.stock) {
          this.num++;
        }
      }
    },
    success() {
      this.skuObj.num = this.num;
      // this.skuObj.purchaseType = this.isAssemblePrice ? 1 : this.isPromote ? 2 : 0
      this.$emit("success", JSON.parse(JSON.stringify(this.skuObj)));
    },
    PrefixZero(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    }
  }
};
</script>

<style lang="postcss" scoped>
.wrap {
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 70px;
  height: 400px;
  font-size: 12px;
  background: #ffffff;
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
    height: 105px;
    margin: 0 10px;
    border-bottom: 1px solid #e9ebf1ff;
    & .goods-img {
      width: 100px;
      height: 100px;
      border-radius: 3px;
    }
    & .lazy-img-box {
      margin: 3px;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    & .goods-num {
      margin-left: 20px;
      line-height: 18px;
      color: #363636ff;
      & .sku-price {
        line-height: 38px;
        font-size: 18px;
        color: #fb746eff;
      }
      & .reference-price {
        color: #fb746eff;
      }
    }
  }
  & .good-sku {
    margin: 5px 10px 0;
    padding-bottom: 5px;
    color: #585859ff;
    border-bottom: 1px solid #e9ebf1ff;
    & .sku-name {
      padding: 10px 0;
    }
    & .sku {
      padding-bottom: 10px;
      & ul {
        /*display: flex;*/
        width: 100%;
        margin-right: 5px;
        & li {
          display: inline-block;
          margin-right: 5px;
          margin-bottom: 5px;
          min-width: 45px;
          line-height: 22px;
          border: 1px solid #999999;
          text-align: center;
          border-radius: 3px;
        }
        & li.active {
          background: #d57e6aff;
          color: #ffffff;
          border-color: #d57e6aff;
        }
      }
    }
  }
  & .goods-buy {
    margin: 0 10px;
    height: 52px;
    border-bottom: 1px solid #e9ebf1ff;
    & .goods-buy-title {
      line-height: 52px;
    }
    & .goods-stepper {
      float: right;
      margin-top: 10px;
    }
  }
}

.van-goods-action .van-goods-action-button--first {
  background-color: #e1c584ff;
}

.van-goods-action .van-goods-action-button--last {
  background-color: #d67d6bff;
}

.waiting.van-goods-action-big-btn {
  background-color: #aaaaab;
}

.addCart {
  margin-left: 0;
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

.van-cell__value {
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
