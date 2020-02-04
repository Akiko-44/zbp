<template>
  <div class="app-card-item1">
    <van-row>
      <van-col span="9">
        <img
          class="merchant-logo"
          :src="setImg(data.merchantPicUrl, { w: 126 })"
        />
      </van-col>
      <van-col span="15">
        <div>
          <h4>{{data.merchantName}}</h4>
          <p>主营:
            <template v-for="item in data.classifyName">{{item}} </template>
          </p>
          <van-row style="padding: 10px 0 20px;">
            <van-col span="8">销量:{{data.merchantSellNum}}</van-col>
            <van-col span="8">商品数:{{data.merchantOnSellgoodsNum}}</van-col>
            <van-col
              span="8"
              v-if="!data.isSortOrder"
            >
              <span
                v-if="data.sortOrder == 1"
                class="level one"
              >{{data.sortOrder}}</span>
              <span
                v-else-if="data.sortOrder == 2"
                class="level two"
              >{{data.sortOrder}}</span>
              <span
                v-else-if="data.sortOrder == 3"
                class="level three"
              >{{data.sortOrder}}</span>
              <span
                v-else
                class="level four"
              >{{data.sortOrder}}</span>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="8">诚信度:{{data.honestDegree}}</van-col>
            <van-col span="8">获奖数:{{data.rewardNumber}}</van-col>
            <van-col span="8">投诉:{{data.complaintNumber}}</van-col>
          </van-row>
          <!--<van-row style="padding: 10px 0 20px;">
	  			<van-col span="6">销量:{{data.merchantSellNum}}</van-col>
	  			<van-col span="6">商品数:{{data.merchantOnSellgoodsNum}}</van-col>
	  		</van-row>
	  		<van-row>
	  			<van-col span="6">诚信度:{{data.honestDegree}}</van-col>
	  			<van-col span="6">获奖数:{{data.rewardNumber}}</van-col>
	  			<van-col span="6">投诉:{{data.complaintNumber}}</van-col>
	  			<van-col span="6">
	  				<span v-if="data.sortOrder == 1" class="level one">{{data.sortOrder}}</span>
	  				<span v-else-if="data.sortOrder == 2" class="level two">{{data.sortOrder}}</span>
	  				<span v-else-if="data.sortOrder == 3" class="level three">{{data.sortOrder}}</span>
	  				<span v-else class="level four">{{data.sortOrder}}</span>
	  			</van-col>
	  		</van-row>-->
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { setImg } from '~/utils/qiniu'

export default {
  props: {
    data: {
      merchantPicUrl: String,
      merchantName: String,
      honestDegree: String,
      rewardNumber: [String, Number],
      complaintNumber: [String, Number],
      sortNum: [String, Number],
      merchantSellNum: [String, Number],
      merchantOnSellgoodsNum: [String, Number],
      addTime: String,
      classifyName: String
    }
  },
  methods: {
    setImg
  }
}
</script>

<style lang="postcss" scoped>
.app-card-item1 {
  margin: 10px;
  padding: 8px 5px;
  background-color: white;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1); /*no*/
  border-radius: 7px;
  position: relative;
  overflow: hidden;
  & .van-row {
    font-size: 12px;
    color: #aaaaac;
  }
  & h4 {
    padding: 6px 0;
    font-size: 15px;
    height: 0.3733rem;
    color: #26273c;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & p {
    padding: 0.16rem 0;
    font-size: 0.3467rem;
    color: #58585a;
    height: 26px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  & .level {
    position: absolute;
    right: 40px;
    bottom: 35px;
    width: 30px;
    height: 31px;
    line-height: 22px;
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    color: white;
  }
  & .one {
    background: url(../../../assets/images/icon_one.png) no-repeat center;
    background-size: 100%;
  }
  & .two {
    background: url(../../../assets/images/icon_two.png) no-repeat center;
    background-size: 100%;
  }
  & .three {
    background: url(../../../assets/images/icon_three.png) no-repeat center;
    background-size: 100%;
  }
  & .four {
    /* background: url(../../../assets/images/icon_four.png) no-repeat center;
  	background-size: 100%; */
    display: inline-block;
    bottom: 45px;
    padding: 0 3px;
    width: auto;
    height: 20px;
    min-width: 14px;
    line-height: 20px;
    background: #df735a;
    /* border: 2px solid #e5e5e5; */
    border-radius: 10px;
  }
}
.merchant-logo {
  width: 126px;
  height: 126px;
  border-radius: 50%;
  vertical-align: middle;
  overflow: hidden;
}
</style>
