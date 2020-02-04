<template>
<div class="app-card-item1">
	<span class="case" v-if="caseType == 2">定制</span>
  <div class="card-img lazy-img-box" v-lazy:background-image="setImg(imgUrl, { w: 400 })"></div>
  <div class="card-info">
    <div class="card-price row-between" v-if="price || info">
      <strong class="red" v-if="price"><span class="rmb">￥</span>{{price}}</strong>
    </div>
    <h4 class="card-title text-hidden">{{title}}</h4>
    <p class="dark-gray text-hidden" style="margin: 10px 0;" v-if="catName">{{catName}}</p>
    <van-row v-if="designerName">
	  <van-col span="4"><img class="merchant-logo" :src="setImg(merchantLogo, { w: 20 })"/></van-col>
	  <van-col span="20" style="line-height: 20px;">{{designerName}}</van-col>
	</van-row>
  </div>
</div>
</template>

<script>
import { setImg } from '~/utils/qiniu'

export default {
  props: {
    imgUrl: String,
    price: [String, Number],
    describe: String,
    title: String,
    info: String,
    caseType: [String, Number],
    designerName: String,
    merchantLogo: String,
    catName: String
  },
  methods: {
    setImg
  }
}
</script>

<style lang="postcss">
.app-card-item1 {
  background-color: white;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1); /*no*/
  border-radius: 7px;
  position: relative;
  overflow: hidden;
  & .case{
  	display: inline-block;
  	position: absolute;
  	left: 0;
  	top: 0;
  	z-index: 1;
  	width: 45px;
  	height: 22px;
  	text-align: center;
  	line-height: 22px;
  	color: #FFFFFF;
  	font-size: 10px;
  	background: rgba(107, 183, 74, .5);
  	border-bottom-right-radius: 12px;
  	border-top-right-radius: 12px;
  }
  & .card-img {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    width: 100%;
    height: 163px;
    background-color: var(--light-gray);
  }
  & .card-info {
    font-size: 12px;
    padding: 10px 7px;
  }
  & .card-price {
    height: 13px;
  }
  & strong,
  & h4 {
    font-size: 14px;
    height: 14px;
  }
  & .card-title {
    margin: 5px 0;
    padding: 5px 0;
  }
  & .rmb {
    font-size: 12px;
  }
}
.merchant-logo{
	width: 20px;
	height: 20px;
	border-radius: 50%;
	vertical-align: middle;
	overflow: hidden;
}
</style>
