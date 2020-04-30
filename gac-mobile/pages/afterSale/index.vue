<template>
  <AppView
    title="申请售后"
    :clickLeft="onClickLeft"
  >
    <div v-if="!dataLoading">
      <!--<van-nav-bar title="售后申请"
                 right-text="立即提交"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />-->
      <!--<van-cell title="服务类型" is-link value="退货退款" />-->

      <div class="goods-box block">
        <div class="card-bar row-between vertical">
          <p>
            <img
              class="icon-shop"
              src="../../assets/images/icon/shop.png"
              alt=""
            />
            <span>{{ sellUserName }}</span>
          </p>
          <p
            class="red"
            v-if="state == 6 && form.isCommented == 2"
          >
            已评价
          </p>
          <p
            class="red"
            v-else
          >{{ orderState[state] }}</p>
        </div>
        <div v-for="item in orderGoodVOList">
          <van-row style="padding:  0 10px;">
            <van-col
              span="2"
              class="mt-35"
            >
              <van-checkbox
                shape="square"
                v-model="item.checked"
                @change="checkedChange"
                v-if="item.isRefund == 0 && item.caseType != 2"
              ></van-checkbox>
            </van-col>
            <van-col
              span="22"
              class="card-header flex-row"
            >
              <div
                class="card-image lazy-img-box"
                v-lazy:background-image="setImg(item.skuMainPic, { w: 400 })"
              ></div>
              <div class="card-info">
                <div class="row-between">
                  <div class="card-name">{{ item.skuName }}</div>
                </div>
                <div class="card-describe">
                  <p class="gray">
                    <span v-for="(skuitem, skui) in item.skuExplain">{{ skuitem.specsName }}：{{ skuitem.attrValue
                      }}<span v-if="skui !== item.skuExplain.length - 1">；</span></span>
                  </p>
                  <p class="card-unit-price">
                    ￥{{ item.unitPrice
                    }}<span class="card-number">x{{ item.goodsNumber }}</span>
                  </p>
                  <p
                    v-if="item.caseType == 2"
                    class="caseGood"
                  >
                    (定制商品请联系商家)
                  </p>
                </div>
              </div>
              <!--<van-card class="goods-info"
                :num="item.goodsNumber"
                :price="item.unitPrice"
                :title="item.skuName"
                :thumb="item.skuMainPic | setImg"
              >
                <div slot="desc" style="margin-top: 10px;">
                  <p
                    style="color: #999;"
                    v-for="skuExplainItem in item.skuExplain"
                  >
                    <span>{{ skuExplainItem.specsName }}</span
                    >:
                    <span>{{ skuExplainItem.attrValue }}</span>
                  </p>
                  <p v-if="item.caseType == 2" class="caseGood">
                    (定制商品请联系商家)
                  </p>
                </div>
              </van-card>-->
            </van-col>
          </van-row>
        </div>
        <div class="card-line"></div>
        <div class="card-footer row-between">
          <p>
            <span>共{{ orderGoodVOList.length }}件商品 小计：</span>
            <span class="card-price red">{{ goodsTotalMoney }}</span>
          </p>
        </div>
      </div>

      <div class="refund-box block">
        <p>售后类型：{{ form.refundType === 1 ? "仅退款" : "退货退款" }}</p>
        <p>退款金额：￥{{ form.refundAmount }}</p>
      </div>

      <div class="input-box refund-box block">
        <div class="upload-title">退款原因：</div>
        <textarea
          placeholder="请输入内容"
          v-model="form.comments"
          maxlength="100"
        ></textarea>

        <van-cell>
          <template slot="title">
            <div class="upload-title">上传凭证：</div>
            <!-- <VUpload
              ref="picUploader"
              :imgs="imgs"
              :limit="9"
              :props="{ src: 'imgUrl' }"
            >
            </VUpload> -->
            <!-- <van-uploader
              v-model="imgs"
              :max-count="9"
              :before-read="beforeRead"
              :after-read="afterRead"
              :before-delete="beforeDelete"
            >
              <div class="bg"></div>
            </van-uploader> -->
            <CUploadList
              ref="picUploader"
              :imgs="imgs"
              :limit=9
              :props="{src: 'imgUrl'}"
              @success="uploadSuccess"
            >
            </CUploadList>
          </template>
        </van-cell>

        <div class="tip">9张以内，支持jpg、gif、png格式，大小：5m以内</div>
      </div>

      <van-button
        type="primary"
        class="submit"
        @click="onClickRight"
      >提交</van-button>
    </div>
  </AppView>
</template>

<script>
import VUpload from "~/components/common/upload";
import CUploadList from '~/components/common/upload/customList'
import { setImg, customUpload, uploadSectionFile } from "~/utils/qiniu";
import { orderState } from "~/utils/status";

export default {
  components: {
    VUpload,
    CUploadList
  },
  data() {
    return {
      dataLoading: true,
      orderState,
      imgs: [],
      form: {
        comments: "",
        orderId: "",
        picList: [],
        refundAmount: 0,
        skuDTOList: [],
        refundType: undefined,
        flag: false
      },
      orderGoodVOList: [],
      sellUserName: "",
      state: undefined,
      goodsTotalMoney: undefined
    };
  },
  computed: {},
  deactivated() {
    this.$destroy();
  },
  mounted() {
    this.form.orderId = this.$route.query.orderId;
    this.$nextTick(() => {
      this.getOrderInfo()
    })
  },
  methods: {
    setImg,
    getOrderInfo() {
      this.dataLoading = true
      this.$loading(this.$service("orderInfo", {
        resources: [this.$route.query.orderNumber]
      })).then(result => {
        this.dataLoading = false
        const data = result.data;
        if (data.state > 5) {
          this.form.refundType = 2;
        } else {
          this.form.refundType = 1;
        }
        this.sellUserName = data.sellUserName;
        this.state = data.state;
        this.goodsTotalMoney = data.goodsTotalMoney;
        data.orderGoodVOList.forEach(goods => {
          goods.checked = false;
        });
        this.orderGoodVOList = data.orderGoodVOList;
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onClickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome();
      } else {
        this.$router.go(-1);
      }
    },
    checkedChange() {
      let totalPrice = 0;
      this.orderGoodVOList.forEach(row => {
        if (row.checked) {
          totalPrice += row.totalPrice;
        }
      });
      this.form.refundAmount = totalPrice.toFixed(2);
    },
    onClickRight() {
      let self = this;
      self.orderGoodVOList.forEach(row => {
        if (self.orderGoodVOList.length == 1 && row.caseType == 2) {
          self.flag = true;
          self.$toast("定制商品售后请联系商家");
          return false;
        }
        if (row.checked) {
          self.form.skuDTOList.push({
            number: row.goodsNumber,
            skuId: row.skuId
          });
        }
      });
      if (!self.flag) {
        if (self.form.skuDTOList.length == 0) {
          self.$toast("请选择要操作的商品");
          return false;
        }
      }
      // this.imgs.forEach(data => {
      //   this.form.picList.push(data.imgUrl);
      // });
      if (!self.flag) {
        self.form.skuDTOList = self.unique(self.form.skuDTOList);
        this.$loading(this.$service("afterSale", { data: this.form })).then(
          result => {
            if (result.success) {
              self.$toast.success("提交成功");
              if (self.$native.isAndroid()) {
                self.$native.toRefund();
              } else {
                self.$router.push({ name: "user-orderRefund-list" });
              }
            } else {
              self.$toast(result.msg);
            }
          }
        );
      }
    },
    uploadSuccess(imgs) {
      this.form.picList = imgs
    },
    beforeRead(file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif"
      ) {
        this.$toast("请上传 jpg/png/gif 格式图片");
        return false;
      }

      /* if (file.size > 3 * 1024 * 1024) {
        this.$toast("图片大小不得超过3兆（M）");
        return false;
      } */
      return true;
    },
    afterRead(file) {
      uploadSectionFile(file.file, 3).then((res) => {
        customUpload(res)
          .then(response => {
            const result = response.data;
            this.form.picList.push(result.data.picUrl);
            this.imgs = [...new Set(this.imgs)];
          })
          .catch(() => {
            this.$toast({ type: "fail", message: "上传错误" });
          });
      })
    },
    beforeDelete(file, detail) {
      let index;
      this.imgs.map((item, i) => {
        if (item.file && item.file.name == file.file.name) {
          index = i;
        } else if (item.url && item.url == file.url) {
          index = i;
        }
      });
      this.imgs.splice(index, 1);
      this.form.picList.splice(index, 1);
    },
    unique(array) {
      // 对象去重方法
      var allArr = []; //建立新的临时数组
      for (var i = 0; i < array.length; i++) {
        var flag = true;
        for (var j = 0; j < allArr.length; j++) {
          if (array[i].skuId == allArr[j].skuId) {
            flag = false;
          }
        }
        if (flag) {
          allArr.push(array[i]);
        }
      }
      return allArr;
    }
  }
};
</script>

<style lang="postcss" scoped>
.block {
  margin: 10px;
  color: var(--black);
  background-color: white;
  border-radius: 6px;
}
.goods-box {
  font-size: 12px;
  line-height: 18px;
  & .card-bar {
    padding: 10px;
  }
  & .card-header {
    padding-bottom: 10px;
  }
  & .card-bar img {
    margin-right: 9px;
    height: 13px;
    vertical-align: middle;
  }
  & .goods-info {
    padding-left: 0;
    padding-right: 0;
  }
  & .card-image {
    width: 89px;
    height: 89px;
  }
  & .card-info {
    flex: 1;
    margin-left: 10px;
  }
  & .card-name {
    flex: 1;
    margin-bottom: 5px;
  }
  & .card-keyword {
    margin-left: 5px;
    width: 90px;
    text-align: right;
  }
  & .card-describe {
    line-height: 22px;
  }
  & .card-unit-price {
    margin-top: 5px;
    font-size: 13px;
    color: #333333;
    & .card-number {
      float: right;
      color: #999999;
      font-size: 10px;
    }
  }
  & .card-price {
    font-size: 15px;
  }
  & .card-line {
    margin: 0 10px;
    height: 1px;
    background: #f4f5f6;
  }
  & .card-footer {
    padding: 10px;
    align-items: center;
    justify-content: flex-end;
    &.card-action-box {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
}
.refund-box {
  padding: 10px;
  font-size: 14px;
  line-height: 26px;
}
textarea {
  width: 100%;
  box-sizing: border-box;
  height: 85px;
  resize: none;
  padding: 0 5px;
  border: none;
  background: #f4f4f4;
}
.van-card__content {
  position: relative;
}
.VUpload-area.min {
  width: 73px !important;
  height: 73px !important;
}
.van-cell {
  padding: 0;
}
.tip {
  padding: 0;
  font-size: 12px;
  color: #aaaaab;
  background: #fff;
}
.caseGood {
  color: #ff0000;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
}
.submit.van-button {
  /*position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0;
  background: #c2a374;*/

  margin: 40px 12px 58px;
  width: 351px;
  border-radius: 4px;
  font-size: 16px;
  border-color: #df735a;
  background: #df735a;
}
.mt-35 {
  margin-top: 35px;
}
.bg {
  width: 84px;
  height: 84px;
  background: #fff url(../../assets/images/icon_uploadadd.png) no-repeat center;
  background-size: 50px;
}
.van-cell:not(:last-child)::after {
  border: 0;
}
</style>
