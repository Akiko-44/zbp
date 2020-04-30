<template>
  <AppView class="mine">
    <div class="header cover">
      <img
        src="../../../assets/images/icon/icon_set.png"
        class="set icon"
        @click="$router.push({ name: 'user-settings' })"
      />
      <img
        v-if="user.mesNum"
        src="../../../assets/images/icon/icon_notices.png"
        class="notice icon"
        @click="$router.push({ name: 'user-tip' })"
      />
      <img
        v-else
        src="../../../assets/images/icon/icon_notice.png"
        class="notice icon"
        @click="$router.push({ name: 'user-tip' })"
      />
      <div class="user-info">
        <div class="d-left">
          <h4>{{ user.nickname || user.mobilePhone }}</h4>
          <p class="levle">会员</p>
        </div>
        <div class="d-right">
          <img
            v-if="user.userLogo"
            :src="user.userLogo | setImg({ w: 150 })"
            @click="$router.push({ name: 'user-profile' })"
          />
          <img
            v-else
            src="http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png"
            @click="$router.push({ name: 'user-profile' })"
          />
        </div>
        <van-row class="coupon">
          <van-col
            span="6"
            @click.native="$router.push({ name: 'user-collect' })"
          >
            <p>{{ user.collectionNum || "--" }}</p>
          </van-col>
          <van-col
            span="6"
            @click.native="$router.push({ name: 'user-concern' })"
          >
            <p>{{ user.concernNum || "--" }}</p>
          </van-col>
          <van-col
            span="6"
            @click.native="$router.push({ name: 'user-like' })"
          >
            <p>{{ user.likeNum || "--" }}</p>
          </van-col>
          <van-col span="6">
            <p>{{ user.couponNum || "--" }}</p>
          </van-col>
          <van-col
            span="6"
            class="border-r"
            @click.native="$router.push({ name: 'user-collect' })"
          >
            收藏
          </van-col>
          <van-col
            span="6"
            class="border-r"
            @click.native="$router.push({ name: 'user-concern', query: {type: 'mine'} })"
          >
            关注
          </van-col>
          <van-col
            span="6"
            class="border-r"
            @click.native="$router.push({ name: 'user-like' })"
          >
            喜欢
          </van-col>
          <van-col span="6">
            优惠券
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="block order-box">
      <h4 class="title van-hairline--bottom">
        我的订单
        <span
          class="more"
          @click="$router.push({ name: 'user-mine-double-list' })"
        >查看全部订单
          <van-icon name="arrow" /></span>
      </h4>
      <div class="row">
        <div
          class="span-4"
          @click="
            $router.push({
              name: 'user-mine-double-list',
              query: { tabIndex: 1 }
            })
          "
        >
          <p>
            <img src="../../../assets/images/icon/icon_payment.png" />
            <i
              class="state-num"
              v-if="stateNum.unPayNum"
            >{{
              stateNum.unPayNum
            }}</i>
          </p>
          待付款
        </div>
        <div
          class="span-4"
          @click="
            $router.push({
              name: 'user-mine-double-list',
              query: { tabIndex: 2 }
            })
          "
        >
          <p>
            <img src="../../../assets/images/icon/icon_shipped.png" /><i
              class="state-num"
              v-if="stateNum.unSendNum"
            >{{ stateNum.unSendNum }}</i>
          </p>
          待发货
        </div>
        <div
          class="span-4"
          @click="
            $router.push({
              name: 'user-mine-double-list',
              query: { tabIndex: 5 }
            })
          "
        >
          <p>
            <img src="../../../assets/images/icon/icon_received.png" /><i
              class="state-num"
              v-if="stateNum.unRecevedNum"
            >{{ stateNum.unRecevedNum }}</i>
          </p>
          待收货
        </div>
        <div
          class="span-4"
          @click="
            $router.push({
              name: 'user-mine-double-list',
              query: { tabIndex: 6 }
            })
          "
        >
          <p>
            <img src="../../../assets/images/icon/icon_commented.png" /><i
              class="state-num"
              v-if="stateNum.unRecommentNum"
            >{{ stateNum.unRecommentNum }}</i>
          </p>
          待评价
        </div>
        <div
          class="span-4"
          @click="$router.push({ name: 'user-orderRefund-list' })"
        >
          <p>
            <img src="../../../assets/images/icon/icon_refund.png" /><i
              class="state-num"
              v-if="stateNum.refundNum"
            >{{ stateNum.refundNum }}</i>
          </p>
          退款售后
        </div>
      </div>
      <div
        class="express-box"
        v-if="expressRespondDateVO && expressRespondDateVO.length &&expressRespondDateVO[0].expressRespondDate.length"
      >
        <van-swipe
          class="index-swipe"
          v-if="loadTabbar"
          :show-indicators="false"
          :autoplay="4000"
        >
          <van-swipe-item
            v-for="(item, index) in expressRespondDateVO"
            :key="index"
            @click.native="toExpressDetail(item.orderId)"
          >
            <h4>最新物流<span
                class="time fr"
                v-if="item.expressRespondDate && item.expressRespondDate.length"
              >{{item.expressRespondDate[0].time}}</span></h4>
            <div class="express-main">
              <img :src="item.pic" />
              <div class="d-right">
                <!-- <p class="text">快件到达</p> -->
                <p
                  class="express-info"
                  v-if="item.expressRespondDate && item.expressRespondDate.length"
                >{{item.expressRespondDate[0].context}}</p>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>

      </div>
    </div>
    <div class="block service-box">
      <h4 class="title van-hairline--bottom">更多服务</h4>
      <div class="row">
        <div
          class="span-5"
          @click="$router.push({ name: 'user-footPrint' })"
        >
          <p>
            <img src="../../../assets/images/icon/icon_tracks.png" />
          </p>
          我的足迹
        </div>
        <div
          class="span-5"
          @click="$router.push({ name: 'user-address' })"
        >
          <p><img src="../../../assets/images/icon/icon_address.png" /></p>
          收货地址
        </div>
        <div
          class="span-5"
          @click="toUserShop"
          v-if="!hasMerchantType"
        >
          <p><img src="../../../assets/images/icon/icon_shop..png" /></p>
          我要开店
        </div>
        <div
          class="span-5"
          @click="$router.push({ name: 'user-shop-IPR' })"
          v-if="hasMerchantType"
        >
          <p><img src="../../../assets/images/icon/icon_intellectual.png" /></p>
          知识产权
        </div>
        <!-- 为了520暂时屏蔽 -->
        <!-- <div
          class="span-5"
          @click="$router.push({ name: 'jewelryCircle-weMidea', query: {type: 'mine'} })"
        >
          <p><img src="../../../assets/images/icon/icon_circle.png" /></p>
          我的珠宝圈
        </div> -->
        <div
          class="span-5"
          @click="xiaoneng"
        >
          <p><img src="../../../assets/images/icon/icon_service.png" /></p>
          在线客服
        </div>
      </div>
    </div>
    <div class="padding">
      <!--<van-button :loading="loading"
                  @click="logout"
                  block
                  type="danger">退出登录</van-button>-->
    </div>
    <!-- <BindPhone
      :isCityEnter="showBindPhone"
      @listenToChild="showFromParent"
      @changeMobileSuccessEvent="changeMobileSuccessEvent"
    /> -->
    <AppTabbar
      :activeIndex="4"
      v-if="loadTabbar"
    />
  </AppView>
</template>

<script>
import AppTabbar from "~/components/swap/tabbar";
import BindPhone from "~/components/common/bindPhone";
import { setToken, getToken } from "~/utils/auth";

const AccountNameKey = "AccountName";
function getAccountName() {
  if (process.server) return "";
  return localStorage[AccountNameKey] || "";
}

export default {
  // middleware: 'auth',
  async beforeMount() {
    await this.$store.dispatch("user/checkLogin", this.$router);
    this.$store.dispatch("user/getUserInfo");
  },
  computed: {
    user() {
      return this.$store.state.user.info;
    }
  },
  components: {
    AppTabbar,
    BindPhone
  },
  data() {
    return {
      loading: false,
      loadTabbar: true,
      isMerchant: false,
      hasMerchantType: false,
      showBindPhone: false,
      mobilePhone: getAccountName(),
      stateNum: {
        unPayNum: 0,
        unSendNum: 0,
        unRecevedNum: 0,
        unRecommentNum: 0,
        refundNum: 0
      },
      expressRespondDateVO: []
      // mobilePhone: ''
    };
  },
  activated() {
    document.title = "我的";
    this.loadTabbar = false;
    this.$nextTick(() => {
      this.loadTabbar = true;
    });

    history.pushState(null, null, location.href);
    this.$service("userInfo")
      .then(result => {
        this.$store.commit("user/set", {
          name: "info",
          data: result.data
        });
        this.mobilePhone = result.data.mobilePhone;
        this.stateNum.unPayNum = result.data.unPayNum
        this.stateNum.unSendNum = result.data.unSendNum
        this.stateNum.unRecevedNum = result.data.unRecevedNum
        this.stateNum.unRecommentNum = result.data.unRecommentNum
        this.stateNum.refundNum = result.data.refundNum
        this.expressRespondDateVO = result.data.expressRespondDateVO
        localStorage.setItem('userType', result.data.userType)
        // 根据角色显示菜单 1个人 2商家
        if (result.data.userType != 1) {
          this.isMerchant = true;
        }
      })
      .catch(err => { });
    this.$service("checkUser")
      .then(result => {
        let isHide = result.data.isHide;
        let merchantType = result.data.merchantType;
        let errorMessage = result.data.errorMessage;
        if (isHide == 1 && merchantType != 0) {
          this.hasMerchantType = true;
        }
      })
      .catch(err => { });
    // this.getNum();
  },
  methods: {
    getNum() {
      this.$service("userOrderNum", { resources: [0, 0] })
        .then(result => {
          result.data.map((item, i) => {
            if (item.STATE === 1 || item.STATE === 100) {
              this.stateNum.state1 += +item.STATENUM;
            }
            if (item.STATE === 2 || item.STATE === 4) {
              this.stateNum.state2 += +item.STATENUM;
            }
            if (item.STATE === 5) {
              this.stateNum.state5 += +item.STATENUM;
            }
            if (item.STATE === 6) {
              this.stateNum.state6 += +item.STATENUM;
            }
            if ([10, 11, 12, 13, 14, 18, 19, 20, 21, 22].includes(item.STATE)) {
              this.stateNum.state8 += +item.STATENUM;
            }
          });
        })
        .catch(err => { });
    },
    clickRight() {
      this.$router.push({ name: "user-settings" });
    },
    logout() {
      this.$loading(this.$service("userLogout"), "退出登录").then(() => {
        this.$store.commit("user/removeToken");
        this.$router.push({ name: "user-login" });
      });
    },
    xiaoneng() {
      NTKF.im_openInPageChat("zd_1000_9999");
    },
    toUserShop() {
      if (this.mobilePhone) {
        this.$router.push({ name: "user-shop" });
      } else {
        // this.showBindPhone = true;
        this.$router.push({ name: "user-mine-bindPhone" });
      }
    },
    toExpressDetail(id) {
      this.$router.push({ name: "swap-order-logistics", query: { bar: id } })
    }
    // showFromParent(data) {
    //   this.showBindPhone = data;
    // },
    // changeMobileSuccessEvent(data) {
    //   this.$store.commit("user/setToken", data);
    //   setToken(data);
    //   this.$toast({
    //     type: "success",
    //     message: "成功"
    //   });
    //   this.$router.push({ name: "user-shop" });
    // }
  }
};
</script>

<style lang="postcss" scoped>
.mine {
  min-height: 100vh;
  height: 100%;
  background-color: var(--light-gray);
}
.header {
  position: relative;
  /* overflow: hidden; */
  height: 213px;
  background-image: url("../../../assets/images/mine_background.png");
  background-color: var(--light-gray);
  background-size: 100% 100%;
  & .icon {
    position: absolute;
    top: 47px;
    right: 29px;
    width: 20px;
    height: 23px;
    &.set {
      right: 62px;
      width: 24px;
    }
  }
}
>>> .van-nav-bar {
  background-color: transparent;
  & .van-icon {
    color: white;
  }
  &:after {
    border: none;
  }
}
.user-info {
  position: absolute;
  top: 92px;
  margin: 0 12px;
  padding-bottom: 14px;
  width: 350px;
  background: #fff;
  border-radius: 6px;

  & .d-left {
    display: inline-block;
    padding: 34px 22px 13px;
    width: 204px;
    vertical-align: top;
    font-size: 12px;
    color: #999;
    & h4 {
      margin-bottom: 8px;
      font-size: 22px;
      color: #333;
    }
  }
  & .d-right {
    display: inline-block;
    padding-top: 20px;
    & img {
      width: 71px;
      height: 71px;
      border-radius: 50%;
      background-color: #e5e5e5;
    }
  }
  & .coupon {
    /* padding: 10px; */
    margin-top: 14px;
    text-align: center;
    color: #666;
    font-size: 14px;
    & .border-r {
      border-right: 1px solid #aaa;
    }
    & p {
      margin-bottom: 9px;
      font-weight: bold;
      font-size: 14px;
      color: #333;
    }
  }
}
.block {
  padding-bottom: 18px;
  color: #666;
  background-color: white;
  margin: 10px 12px;
  border-radius: 6px;
  &.order-box {
    margin-top: 44px;
  }
  &.service-box {
    padding-bottom: 0;
  }
  &.service-box .row {
    padding: 5px 0 0;
  }
  & .title {
    padding: 20px 12px;
    font-size: 15px;
    color: #333;
    & .more {
      float: right;
      color: #999;
      font-size: 12px;
    }
  }
  & .row {
    display: flex !important;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box !important;
    padding: 20px 0 15px;
    & .span-4 {
      min-height: 1px;
      box-sizing: border-box !important;
      width: 20%;
      text-align: center;
      font-size: 12px;
      & img {
        margin-bottom: 10px;
        height: 23px;
      }
    }
    & .span-5 {
      margin-bottom: 15px;
      min-height: 1px;
      box-sizing: border-box !important;
      width: 25%;
      text-align: center;
      font-size: 12px;
      & img {
        margin-bottom: 10px;
        height: 37px;
      }
    }
    & p {
      position: relative;
      & i {
        display: inline-block;
        position: absolute;
        top: -8px;
        right: 8px;
        min-width: 18px;
        height: 18px;
        background: #fe0000;
        line-height: 18px;
        text-align: center;
        color: #fff;
        border-radius: 9px;
      }
    }
  }
  & .express-box {
    margin: 0 12px;
    padding: 8px 16px;
    font-size: 12px;
    color: #666666;
    background: #f2f2f2;
    border-radius: 6px;

    & h4 {
      margin-bottom: 8px;
      color: #333;
      & .time {
        color: #999;
      }
    }
    & .express-main {
      overflow: hidden;
    }
    & img {
      float: left;
      margin-right: 10px;
      width: 44px;
      height: 44px;
      border-radius: 4px;
    }
    & .d-right {
      float: left;
      width: 240px;
      vertical-align: top;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
    }
  }
  & /deep/ .van-cell__title {
    margin-left: 5px;
    font-size: 15px;
  }
  & .order-group /deep/ .van-cell__title {
    line-height: 32px;
  }
  & ul {
    padding: 12px 12px 0 0;
    &.w80 {
      & li {
        width: 80px;
      }
    }
  }
  & li {
    padding-bottom: 5px;
    width: 70px;
    text-align: center;
    & p {
      padding-top: 8px;
      font-size: 13px;
    }
  }
}

.banner {
  height: 80px;
  background: var(--light-gray);
}

.padding {
  padding: 30px 20px;
}
</style>
