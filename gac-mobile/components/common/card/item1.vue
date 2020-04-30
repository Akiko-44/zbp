<template>
  <div class="app-card-item1">
    <span
      class="discount"
      v-if="discount"
    >{{discount}}<i style="margin-left: 4px;font-size: 13px;">折</i></span>
    <div
      class="card-img lazy-img-box"
      v-lazy:background-image="setImg(imgUrl, { w: 400 })"
    >
      <div
        class="card-img-icon lazy-img-box"
        v-lazy:background-image="setImg(appBigIcon, { w: 400 })"
        v-if="appBigIcon != ''"
      ></div>
    </div>
    <div class="card-info">
      <h4 class="card-title text-hidden">{{title}}</h4>
      <!--<p class="dark-gray text-hidden" style="margin: 5px 0;">{{catName}}</p>-->
      <div
        class="card-price"
        v-if="lowPrice"
      >
        <strong class="red price"><span class="rmb">￥</span>
          <template v-if="lowPrice == hightPrice">
            {{lowPrice.toFixed(2)}}
          </template>
          <template v-if="lowPrice !== hightPrice">
            {{lowPrice.toFixed(2)}}~{{hightPrice.toFixed(2)}}
          </template>
        </strong>
        <p
          class="gray rp"
          v-if="navLowPrice && navHightPrice"
        >参考价:<span class="rmb">￥</span>
          <template v-if="navLowPrice == navHightPrice">{{navLowPrice.toFixed(2)}}</template>
          <template v-else-if="navLowPrice && navHightPrice">{{navLowPrice.toFixed(2)}}~{{navHightPrice.toFixed(2)}}</template>
        </p>
      </div>
      <div
        class="card-price"
        v-else
      >
        <strong class="red price"><span class="rmb">￥</span>
          {{price}}
        </strong>
      </div>
      <van-row v-if="merchantName">
        <van-col span="4"><img
            class="merchant-logo"
            :src="setImg(merchantLogo, { w: 20 })"
          /></van-col>
        <van-col
          span="20"
          class="merchant-name"
        >{{merchantName}}</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { setImg } from '~/utils/qiniu'

export default {
  props: {
    imgUrl: String,
    appBigIcon: String,
    price: [String, Number],
    lowPrice: [String, Number],
    hightPrice: [String, Number],
    navLowPrice: [String, Number],
    navHightPrice: [String, Number],
    describe: String,
    title: String,
    info: String,
    caseType: [String, Number],
    merchantName: String,
    merchantLogo: String,
    discount: [String, Number]
  },
  methods: {
    setImg
  }
}
</script>

<style lang="postcss" scoped>
.app-card-item1 {
  background-color: white;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1); /*no*/
  border-radius: 7px;
  position: relative;
  z-index: 0;
  overflow: hidden;
  margin-bottom: 10px;
  height: 283px;
  & .discount {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 10px;
    z-index: 2;
    width: 50px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: #ffffff;
    font-size: 15px;
    background: #fb746e;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
  }
  & .card-img {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    width: 100%;
    height: 172px;
    background-color: var(--light-gray);
  }
  & .card-img-icon {
    height: 100%;
  }
  & .card-info {
    font-size: 12px;
    padding: 10px 7px;
  }
  & .card-price {
    & .rp {
      margin: 5px 0;
      font-size: 10px;
      white-space: nowrap;
    }
  }
  & strong,
  & h4 {
    font-size: 15px;
    height: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & .card-title {
    margin: 5px 0;
    padding: 5px 0;
  }
  & .rmb {
    font-size: 12px;
  }
}
.merchant-logo {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  vertical-align: middle;
  overflow: hidden;
}
.card-price,
.rp,
.merchant-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.merchant-name {
  line-height: 20px;
}
</style>
