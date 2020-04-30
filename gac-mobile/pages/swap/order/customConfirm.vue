<template>
  <AppView
    class="confirm-order"
    title="确认定制信息"
  >
    <DefaultAddress ref="address" />
    <div
      class="block"
      v-if="detail.id"
    >
      <div class="block-header row-between van-hairline--bottom">
        <div class="vertical merchant-box">
          <img
            class="merchant-logo"
            :src="detail.userLogo"
          />
          <span>第三方{{ detail.userName }}<i class="icon-arrow-right"></i></span>
        </div>
      </div>
      <div class="block-item">
        <div class="card-main flex-row van-hairline--bottom">
          <div
            class="card-image lazy-img-box"
            v-lazy:background-image="setImg(detail.imgUrl, { w: 400 })"
          ></div>
          <div class="card-info">
            <div class="case-name">{{detail.caseName}}</div>
            <div>
              <span class="price"><span>￥</span>{{detail.price}}</span>
              <span class="num">X{{num}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-cell-group>
      <van-cell
        center
        title="是否有原料"
      >
        <van-switch
          v-model="checked"
          slot="right-icon"
          size="24"
          active-color="#DF735A"
          @input="onSwtich"
        />
      </van-cell>
      <van-field
        v-if="checked"
        v-model="materialInformation"
        label="*原料信息"
        placeholder="请填写原料种类  如：黄金"
      />
      <div
        class="consignee"
        v-if="checked"
      >
        <div class="title">设计师收货地址<span>(请与设计师确认收货地址)</span></div>
        <div class="flex-row info">
          <img src="../../../assets/images/icon/address_icon.png" />
          <div>
            <div class="consignee-name">王语嫣<span>13560242344</span></div>
            <div class="consignee-addr">广东省深圳市福田区车公庙创新科技广场1期B座1508C室</div>
          </div>
        </div>
      </div>
      <div
        class="chat"
        v-if="checked"
      >
        <div style="padding-bottom:10px;">*上传议价或聊天截图</div>
        <div>
          <van-uploader
            v-model="imgs"
            :max-count="9"
            :before-read="beforeRead"
            :after-read="afterRead"
            :before-delete="beforeDelete"
          >
            <div class="uploadbg"></div>
          </van-uploader>
          <p class="tips">支持jpg、png格式，数量9张以内，大小：2m以内</p>
        </div>
      </div>
      <van-field
        v-model="message"
        label="买家留言"
        type="textarea"
        placeholder="选填，先于商家协商一致"
        rows="1"
        autosize
        maxlength="150"
      />
    </van-cell-group>
    <van-collapse
      v-model="activeNames"
      accordion
      v-if="detail.isSupportInvoice == 0"
    >
      <van-collapse-item
        title="开具发票"
        name="1"
      >
        <van-radio-group
          v-model="invoiceRadio"
          @change="invoiceRadioChange"
          style="display: flex"
        >
          <van-radio
            name="1"
            style="margin-right: 10px"
          >开票</van-radio>
          <van-radio name="0">不开票</van-radio>
        </van-radio-group>
        <van-dialog
          v-model="invoiceShow"
          show-cancel-button
          :before-close="beforeClose"
          style="padding: 10px 10px 0 10px"
        >
          <van-radio-group
            v-model="receiptRadio"
            @change="receiptRadioChange"
            style="display: flexline-height: 30px"
          >
            <van-radio name="1">企业</van-radio>
            <van-radio
              name="2"
              style="margin-left: 10px"
            >个人</van-radio>
          </van-radio-group>
          <van-field
            v-model="companyName"
            required
            clearable
            label="抬头名称"
            placeholder="请输入抬头名称"
          />
          <van-field
            v-show="isReceipt"
            v-model="code"
            required
            clearable
            label="纳税人识别号"
            placeholder="纳税人识别号"
          />
          <van-field
            v-show="!isReceipt"
            v-model="code"
            required
            clearable
            :maxlength="11"
            label="手机号"
            placeholder="请输入手机号"
          />
        </van-dialog>
      </van-collapse-item>
    </van-collapse>
    <van-dialog
      v-model="collectionShow"
      class="collect"
      :show-confirm-button="false"
    >
      <img
        class="collect-close"
        @click="collectionShow = false"
        src="../../../assets/images/collect_close.png"
      />
    </van-dialog>
    <van-submit-bar
      :price="getTotal()"
      label="合计："
      button-text="提交订单"
      @submit="submit"
      :loading="loading"
    >
      <div slot="tip">
        <van-checkbox v-model="agree">我已阅读并同意</van-checkbox><span class="blue">《签署电子合同》</span>
      </div>
    </van-submit-bar>
  </AppView>
</template>
<script>
import goodsCoupon from "./goodsCoupon"
import DefaultAddress from "./defaultAddress"
import AppCard from "~/components/common/card/item4"
import { setImg } from '~/utils/qiniu'
import { lazyImgHtml } from '~/utils/filters'
import { customUpload, getKey, uploadSectionFile } from "~/utils/qiniu"
import { Dialog } from "vant"

export default {
  components: {
    DefaultAddress,
    AppCard,
    goodsCoupon
  },
  middleware: "auth",
  data() {
    return {
      loading: false,
      goods: {},
      detail: {
        goodsSku: {}
      },
      message: "",
      materialInformation: "",
      objCoupon: {},
      activeNames: "",
      isFrom: this.$route.query.from,
      //发票
      invoiceShow: false,
      isReceipt: true,
      invoiceRadio: "0",
      receiptRadio: "1",
      invoiceType: "0",
      companyName: "",
      code: "",
      contractShow: false,
      contractDetail: {},
      arrOrderType: [], //来自定制的商品来源
      isContract: false,
      billId: "",
      num: this.$route.query.number,
      skuDescribe: "",
      collectionShow: false,
      checked: false,
      imgs: [],
      picUrl: [],
      chatPic: "",
      orderNum: "",
      agree: false
    }
  },
  beforeMount() {
    this.$store.dispatch("user/checkLogin", this.$router)
    if (this.$native.isApp()) {
      this.$native.getTitle("确认定制信息")
    }
  },
  head() {
    return {
      title: "确认定制信息"
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "user-address" && sessionStorage.getItem("orderInfo")) {
      let orderObj = JSON.parse(sessionStorage.getItem("orderInfo"))
      next(vm => {
        vm.message = orderObj.message
        vm.invoiceShow = orderObj.invoiceShow
        vm.isReceipt = orderObj.isReceipt
        vm.invoiceRadio = orderObj.invoiceRadio
        vm.receiptRadio = orderObj.receiptRadio
        vm.invoiceType = orderObj.invoiceType
        vm.companyName = orderObj.companyName
        vm.code = orderObj.code
      })
    } else {
      next()
    }
  },
  deactivated() {
    let orderObj = {
      message: this.message,
      invoiceShow: this.invoiceShow,
      isReceipt: this.isReceipt,
      invoiceRadio: this.invoiceRadio,
      receiptRadio: this.receiptRadio,
      invoiceType: this.invoiceType,
      companyName: this.companyName,
      code: this.code
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(orderObj))
    this.$destroy()
  },
  mounted() {
    this.$loading(
      this.$service('designerCustomInfo', { params: { userId: this.$route.query.userId } })
    )
      .then(data => data.data)
      .then(detail => {
        let that = this
        /* detail.goodsSkus.forEach(function(item, i) {
          if (item.id == that.$route.query.skuId) {
            detail.price = item.price
          }
        })
        this.goods = {
          imgUrl: detail.picList[0],
          title: detail.caseName,
          price: "￥" + detail.price,
          describe: detail.secondaryCgyName,
          num: "x" + this.num
        }
        detail.userName = detail.merchantName */
        this.loading = false
        return detail
      })
      .then(this.success)
      .catch(() => {
        this.loading = false
      })
  },
  methods: {
    setImg,
    lazyImgHtml,
    beforeClose(action, done) {
      if (action === "confirm") {
        this.activeNames = ""
        setTimeout(done, 1000)
      } else {
        done()
      }
    },
    onSwtich(checked) {
      this.checked = checked
    },
    invoiceRadioChange(name) {
      this.invoiceType = name
      if (name == "0") {
        this.invoiceShow = false
      } else {
        this.invoiceShow = true
      }
    },
    receiptRadioChange(name) {
      this.companyName = ""
      this.code = ""
      this.invoiceType = name
      if (name == "2") {
        //个人发票
        this.isReceipt = false
      } else {
        //企业发票
        this.isReceipt = true
      }
    },
    getTotal() {
      return this.detail.price * this.num
        ? this.$toFixed(
          (this.detail.price * this.num) * 100
        )
        : 0
    },
    success(detail) {
      this.detail = detail
    },
    confirmSuccess(form) {
      this.objCoupon = form
    },
    getAddressId() {
      let addressId = null
      const addressList = this.$refs.address.addressList
      if (addressList.length > 0) {
        addressList.forEach(address => {
          if (address.isDefault === 1) {
            addressId = address.id
          }
        })
        if (!addressId) {
          addressId = addressList[0].id
        }
      }

      return addressId
    },
    getSkuList() {
      const data = []
      data.push({
        skuId: this.$route.query.id,
        goodsNumber: this.$route.query.number,
        source: 5,
        message: this.message
      })
      return data
    },
    submit() {
      let that = this
      if (!this.materialInformation && this.checked) {
        this.$toast('请先填写原料信息')
        return
      }
      if (!this.imgs.length && this.checked) {
        this.$toast('请上传议价或聊天截图')
        return
      }
      if (!this.getAddressId()) {
        this.$toast("请先填写收货地址")
        return
      }
      if (Number(this.invoiceType) == 1) {
        let TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        if (this.companyName == "") {
          this.$toast("请填写抬头名称")
          return
        }
        if ((this.code == "") & this.isReceipt) {
          this.$toast("请填写纳税人识别号")
          return
        } else if ((this.code == "") & !this.isReceipt) {
          this.$toast("请填写手机号")
          return
        } else if (!TEL_REGEXP.test(this.code) & !this.isReceipt) {
          this.$toast("请填写正确的手机号")
          return
        }
      }
      if (!this.agree) {
        this.$toast('请先阅读并同意协议')
        return
      }
      Dialog.alert({
        message: '请等待设计师确认订单后再进付款',
        confirmButtonText: '我知道了',
        confirmButtonColor: '#007AFF'
      }).then(() => {
        this.loading = true
        this.$loading(
          this.$service("orderSubmit", {
            data: {
              addrId: this.getAddressId(),
              buySkuDTOList: this.getSkuList(),
              source: 2,
              invoiceType: Number(this.invoiceType),
              companyName: this.companyName,
              code: this.code,
              payType: 2,
              message: this.message,
              materialInformation: this.materialInformation,
              chatPic: this.picUrl.join(','),
            }
          }),
          "提交中"
        )
          .then(result => {
            that.loading = false
            that.billId = result.data.id
            sessionStorage.removeItem("orderInfo")
            if (result.success) {
              this.$loading(
                this.$service("orderContract", {
                  resources: [that.billId]
                })
              ).then(contractResult => {
                that.contractDetail = contractResult.data
                that.orderNum = contractResult.data[0].orderNumber
                if (contractResult.data.length) {
                  contractResult.data.forEach(function (item) {
                    if (that.arrOrderType.indexOf(item.orderType) < 0) {
                      that.arrOrderType.push(item.orderType)
                    }
                    if (item.caseType == 2) {
                      that.contractShow = true
                      that.isContract = true
                      return null
                    } else {
                      if (that.$native.isApp()) {
                        that.$native.goToPay({
                          billID: that.billId,
                          payOrderType: 0
                        })
                      } else {
                        if (that.$native.isACity() == 2) {
                          that.$native.goToPay({
                            billID: that.billId,
                            payOrderType: 0
                          })
                        } else {
                          that.$router.replace({
                            name: "swap-order-detail",
                            query: {
                              id: 1,
                              orderNumber: that.orderNum
                            }
                          })
                        }
                      }
                    }
                  })
                } else {
                  if (that.$native.isApp()) {
                    that.$native.goToPay({
                      billID: that.billId,
                      payOrderType: 0
                    })
                  } else {
                    if (that.$native.isACity() == 2) {
                      that.$native.goToPay({
                        billID: that.billId,
                        payOrderType: 0
                      })
                    } else {
                      that.$router.replace({
                        name: "swap-order-detail",
                        query: {
                          id: 1,
                          orderNumber: that.orderNum
                        }
                      })
                    }
                  }
                }
              })
            }
          })
          .catch(() => {
            this.loading = false
          })
      })

    },
    beforeRead(file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif"
      ) {
        this.$toast("请上传 jpg/png/gif 格式图片")
        return false
      }

      if (file.size > 1.5 * 1024 * 1024) {
        this.$toast("图片大小不得超过1.5兆（M）")
        return false
      }
      return true
    },
    afterRead(file) {
      uploadSectionFile(file.file, 1.5).then((res) => {
        customUpload(res)
          .then(response => {
            const result = response.data
            this.picUrl.push(result.data.picUrl)
            this.imgs = [...new Set(this.imgs)]
          })
          .catch(() => {
            this.$toast({ type: "fail", message: "上传错误" })
          })
      })
    },
    beforeDelete(file, detail) {
      let index
      this.imgs.map((item, i) => {
        if (item.file && item.file.name == file.file.name) {
          index = i
        } else if (item.url && item.url == file.url) {
          index = i
        }
      })
      this.imgs.splice(index, 1)
      this.picUrl.splice(index, 1)
    },
  }
}
</script>

<style lang="postcss" scoped>
.confirm-order {
  min-height: 100%;
  padding-top: 10px;
  /* background-color: var(--light-gray); */
  padding-bottom: 50px;
  & /deep/ .van-button.van-button--danger {
    background: #d67d6b;
    border-color: #d67d6b;
  }
  & /deep/ .van-submit-bar__price {
    text-align: center;
  }
  & /deep/ .van-submit-bar__price-integer {
    color: #fb746e;
  }
  & /deep/ .van-submit-bar__price-decimal {
    color: #fb746e;
  }
  & /deep/ .theme-color-value .van-cell__value {
    color: #fb746e;
  }
  & /deep/ .free-freight .van-cell__value {
    color: #aaaaab;
  }
}

.block {
  margin-top: 10px;
  background-color: white;
}

.block-header {
  padding: 10px;
  height: 30px;
  font-size: 16px;
  & .cart-block-header {
    padding: 5px 0;
    font-size: 12px;
  }
  & .merchant-logo {
    margin-right: 10px;
    width: 31px;
    height: 31px;
    border-radius: 50%;
  }
  & .ico-business {
    margin-left: 10px;
  }
}

.contract-dialog {
  font-size: 14px;
  & p {
    margin-top: 10px;
  }
  & table {
    margin: 5px 0;
    width: 100%;
    border: 1px solid;
    text-align: center;
    & th,
    & td {
      padding: 5px;
    }
  }
}

.collect.van-dialog {
  overflow: visible;
  width: 311px;
  height: 460px;
  text-align: center;
  background: url("../../../assets/images/collect_bg.png") no-repeat;
  background-size: contain;
  & .collect-close {
    position: absolute;
    top: -34px;
    right: 8px;
    width: 28px;
    height: 53px;
  }
  & .title {
    margin-top: 45px;
    line-height: 24px;
    font-size: 18px;
    color: #fff;
  }
  & .shield {
    margin-top: 23px;
    width: 252px;
    height: 233px;
  }
  & .dialog-body {
    padding: 10px;
    line-height: 20px;
    text-align: left;
    font-size: 12px;
    color: #575757;
  }
}
.card-main {
  padding: 10px;
  & .card-image {
    position: relative;
    width: 90px;
    height: 90px;
  }
  & .card-info {
    margin-left: 10px;
    position: relative;
    flex: 1;
    font-size: 12px;
    color: #333;
    line-height: 18px;
  }
  & .case-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  & .price {
    position: absolute;
    bottom: 10px;
    left: 0;
    font-size: 15px;
    & span {
      font-size: 12px;
    }
  }
  & .num {
    position: absolute;
    bottom: 10px;
    right: 0;
    color: #999;
  }
}
.uploadbg {
  width: 76px;
  height: 76px;
  background: #fff url(../../../assets/images/uploadImg.png) no-repeat center;
  background-size: 76px;
}
.tips {
  font-size: 12px;
  line-height: 18px;
  color: #999;
}
.consignee {
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f4f5f6;
  & .title > span {
    color: #df735a;
  }
  & .info {
    margin-top: 15px;
    color: #999;
    line-height: 20px;
    align-items: center;
    & img {
      width: 34px;
      height: 34px;
      margin-right: 15px;
    }
  }
  & .consignee-name {
    font-size: 16px;
    color: #666;
  }
  & .consignee-addr {
    font-size: 13px;
  }
}
.chat {
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f4f5f6;
}
.blue {
  color: #4a98fa;
}
/deep/ .van-submit-bar__tip {
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  & > div {
    display: flex;
  }
}
</style>
