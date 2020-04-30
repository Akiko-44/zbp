<template>
  <AppView
    class="Info"
    :clickLeft="onClickLeft"
    title="奖品物流"
  >
    <template v-if="!dataLoading">
    	<div class="boxCon block" v-if="data.consignee" style="margin-bottom: 10px;">
    		<div class="address">
    			<img src="~/assets/images/luck/address_icon.png"/>
    			<div class="address-content">
    				<p><span style="color:#333333;font-size: 16px;margin-right: 8px;">{{data.consignee}}</span><span style="color: #999999;font-size: 14px;">{{data.consigneeMobile}}</span></p>
    				<p style="color: #666666;font-size: 14px;margin-top: 8px;">{{data.province}}{{data.city}}{{data.area}}{{data.detail}}</p>
    			</div>
    		</div>
    	</div>
      <div class="boxCon block" v-if="data.expressRespondDate && data.expressRespondDate.length">
        <van-cell v-if="data.expressCompany" :title="data.expressCompany" :value="data.expressNum" />
        <div class="steps">
          <div class="steps-items">
            <div
              class="step"
              v-for="(item, key) in data.expressRespondDate"
              :key="key"
            >
              <div class="step-title">{{item.context}}</div>
              <div class="step-time">
              	<p class="step-time-date">{{item.dtime}}</p>
              	<p>{{item.vtime}}</p>
              </div>
              <div class="step-circle-container">
                <img
                  src="@/assets/images/current_state_icon.png"
                  v-if="key == 0"
                  width="15"
                />
                <img
                  src="@/assets/images/start_state_icon.png"
                  v-else-if="key == data.expressRespondDate.length - 1"
                  width="15"
                />
                <i
                  class="step-circle"
                  v-else
                ></i>
              </div>
              <div class="step-line"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="tc" v-else>
      	<img src="@/assets/images/luck/noPrize.png" style="width: 85%;"/>
      	<div><p style="color:#333333;font-size:16px;margin-bottom: 10px;">请耐心等待</p><p style="color:#999999;font-size:13px">活动结束后，将统一发送~</p></div>
      </div>
    </template>
  </AppView>
</template>

<script>
import { setImg } from '~/utils/qiniu'
export default {
  data() {
    return {
      data: {},
      dataLoading: true,
      expressData: {}
    }
  },
  deactivated() {
    this.$destroy()
  },
  beforeMount() {
    this.getExpressMap()
  },
  head() {
    return {
      title: '奖品物流'
    }
  },
  methods: {
    setImg,
    onClickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    getLogistics() {
      this.dataLoading = true
      let self = this
      this.$loading(this.$service('drawExpress', { resources: [this.$route.query.id] }))
        .then(result => {
          this.dataLoading = false
          result.data.expressRespondDate.forEach(item=>{
          	let time = item.time.split(' ')
          	item.dtime = time[0].split('-')[1] + '-' + time[0].split('-')[2]
          	item.vtime = time[1]
          })
          this.data = result.data
        }).catch(() => {
          this.dataLoading = false
        })
    },
    getExpressMap() {
      this.$service('expressMap', {})
        .then(result => {
          this.expressData = result.data
          this.getLogistics()
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.Info {
  padding-top: 10px;
}
.block {
  margin: 0 10px 10px;
  width: 355px;
  border-radius: 5px;
  background: #fff;
}
.boxCon {
  padding: 15px 10px;
  box-sizing: border-box;
  & .express-num {
    font-size: 14px;
    color: #333;
  }
}
.address{
	padding: 0 5px;
	position: relative;
	& img{
		width: 34px;
		position: absolute;
		top: 50%;
		left: 5px;
		margin-top: -17px;
	}
	& .address-content{
		padding-left: 47px;
	}
}
.steps {
  padding-left: 90px;
  padding-top: 10px;
  font-size: 12px;
  color: #999;
  & .step {
    position: relative;
    display: block;
    float: none;
    padding: 10px 10px 10px 0;
    line-height: 18px;
    &:last-child .step-line {
      width: 0;
    }
    &:first-child {
      color: #df735a;
    }
  }
  & .step-time {
    position: absolute;
    top: 19px;
    left: -50px;
    z-index: 2;
    line-height: 1;
    text-align: center;
    transform: translate(-50%, -50%);
    font-size: 12px;
    & .step-time-date{
    	font-size: 14px;
    }
  }
  & .step-circle-container {
    position: absolute;
    top: 19px;
    left: -15px;
    z-index: 2;
    line-height: 1;
    transform: translate(-50%, -50%);
  }
  & .step-circle {
    display: block;
    width: 7px;
    height: 7px;
    background-color: #e5e5e5;
    border-radius: 50%;
  }
  & .step-line {
    top: 16px;
    left: -15px;
    width: 1px;
    height: 100%;
    position: absolute;
    background-color: #e5e5e5;
  }
}
</style>
