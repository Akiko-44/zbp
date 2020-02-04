<template>
  <AppView title="售后申请" :clickLeft="onClickLeft">
    <div>
      <!--<van-nav-bar title="售后申请"
                 right-text="立即提交"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />-->
      <!--<van-cell title="服务类型" is-link value="退货退款" />-->
      <div v-for="item in orderGoodVOList">
        <van-row style="padding:  0 16px;">
          <van-col span="3" style="margin-top: 40px;">
            <van-checkbox
              v-model="item.checked"
              @change="checkedChange"
              v-if="item.isRefund == 0 && item.caseType != 2"
            ></van-checkbox>
          </van-col>
          <van-col span="21">
            <van-card
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
            </van-card>
          </van-col>
        </van-row>
      </div>
      <p style="padding: 16px;background: #FFFFFF;">
        退款金额： {{ form.refundAmount }}
      </p>
      <textarea placeholder="请输入内容" v-model="form.comments"></textarea>
      <van-cell-group>
        <van-cell style="border-top: 15px solid #F8F8F8;">
          <template slot="title">
            <div class="upload-title">退款凭证</div>
            <VUpload
              ref="picUploader"
              :imgs="imgs"
              :limit="9"
              :props="{ src: 'imgUrl' }"
            >
            </VUpload>
          </template>
        </van-cell>
      </van-cell-group>
      <van-button type="primary" class="submit" @click="onClickRight"
        >立即提交</van-button
      >
    </div>
  </AppView>
</template>

<script>
import VUpload from "~/components/common/upload";
import { setImg } from "~/utils/qiniu";
export default {
  components: {
    VUpload
  },
  data() {
    return {
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
      orderGoodVOList: []
    };
  },
  computed: {},
  deactivated() {
    this.$destroy();
  },
  created() {
    this.form.orderId = this.$route.query.orderId;
    this.$service("orderInfo", {
      resources: [this.$route.query.orderNumber]
    }).then(result => {
      const data = result.data;
      if (data.state > 5) {
        this.form.refundType = 2;
      } else {
        this.form.refundType = 1;
      }
      data.orderGoodVOList.forEach(goods => {
        goods.checked = false;
      });
      this.orderGoodVOList = data.orderGoodVOList;
    });
  },
  methods: {
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
      this.imgs.forEach(data => {
        this.form.picList.push(data.imgUrl);
      });
      if (!self.flag) {
        self.form.skuDTOList = self.unique(self.form.skuDTOList);
        this.$loading(this.$service("afterSale", { data: this.form })).then(
          result => {
            if (result.success) {
              self.$toast.success("提交成功");
              if (self.$native.isApp()) {
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

<style lang="postcss">
textarea {
  width: 100%;
  box-sizing: border-box;
  height: 150px;
  resize: none;
  padding: 15px 20px;
  border: none;
}
.van-card__content {
  position: relative;
}
.caseGood {
  color: #ff0000;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
}
.submit.van-button {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0;
  background: #c2a374;
}
</style>
