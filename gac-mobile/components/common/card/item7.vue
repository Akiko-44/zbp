<template>
  <div class="app-card-item1">
    <van-row>
      <van-col span="9">
        <img
          class="merchant-logo"
          :src="setImg(data.logo, { w: 120 })"
        />
      </van-col>
      <van-col span="15">
        <div>
          <van-row>
            <van-col span="24">
              <h4>{{data.companyName}}</h4>
              <p class="category">主营:
                <span
                  v-for="(item, i) in data.categoryList"
                  :key="i"
                >{{item.secondCatName}}<template v-if="i < data.categoryList.length - 1">，</template></span>
              </p>
              <p class="type">
                <span class="company-type">{{data.companyType}}</span>
              </p>
            </van-col>
          </van-row>

          <van-row>
            <van-col
              span="16"
              class="location"
            >
              <!--<i class="ico-location2"></i>-->
              <van-icon
                name="location-o"
                class="icon-location"
              />{{data.provinceName}} {{data.cityName}}</van-col>
            <van-col span="8">
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
      companyName: String,
      companyType: String,
      provinceName: String,
      cityName: String,
      logo: String,
      sortOrder: [String, Number],
      categoryList: String
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
    color: var(--gray);
  }
  & h4 {
    padding: 6px 0;
    font-size: 15px;
    color: var(--black);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .category {
    max-height: 50px;
    font-size: 13px;
    color: #999999;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  & .type {
    margin-top: 10px;
  }
  & .company-type {
    padding: 2px 5px;
    font-size: 11px;
    color: white;
    background: #d57e6a;
    border-radius: 4px;
  }
  & .location {
    position: absolute;
    left: 125px;
    bottom: 15px;
  }
  & .icon-location {
    font-size: 18px;
    vertical-align: text-top;
  }
  & .level {
    position: absolute;
    right: 12px;
    bottom: 15px;
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
  width: 120px;
  height: 120px;
  vertical-align: middle;
  overflow: hidden;
}
</style>
