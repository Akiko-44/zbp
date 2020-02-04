<template>
  <AppView title="逛直播" :clickLeft="onClickLeft">
    <div class="bg">
      <div class="live-room-info">
        <div class="live-room-inner">
          <p>由中宝协旗下中宝协（北京）珠宝文化打造出中国最具权威性的珠宝直播在线交易平台—“红巢”,致力于用自有的知识产权视频直播技术，为全球珠宝界各大品牌企业、名匠名家提供一站式营销服务；力邀珠宝业内资深名家进行现场品鉴，为消费者提供珠宝专业知识及在线咨询服务。红巢本着以用户为本、诚信至上的品牌发展理念，努力为珠宝企业降本创收，为消费者传递行业之声,展卖上万珠宝精品，成为百万珠宝人的云居。</p>
          <p>红巢自主研发的AR技术、全景多维时时交互专利技术，可实现手机、全景、VR、专业摄像机等多种设备的视频直播。运用红巢多种形式的直播方式，帮助珠宝企业轻松实现F2B2C线上线下无缝融合；商户也可通过平台的视频直播、全景展示、AR三维建模、电商系统、VRSHOP、店铺saas、会员管理营销工具系统，让消费者完美体验真实的源头供货场景，亦有身临其境之感；同时用户又可一键分享直播、VR店铺、短视频、AR展示至微信、微博等社交应用，观看用户无需下载APP，可直接观看直播下单，轻松实现用户观看及购买一体化诉求。红巢专注于赋能珠宝全产业链，助力珠宝新零售的转型升级，打造国内珠宝直播第一平台。 "</p>
        </div>
      </div>
      <div class="to-live-room"
           @click="getLiveRoomToken"></div>
    </div>
  </AppView>
</template>

<script>
import { getToken } from '~/utils/auth'
export default {
  head() {
    return {
      title: '逛直播'
    }
  },
  data() {
    return {
      query: {
        token: '',
        userName: ''
      }
    }
  },
  methods: {
    getUser() {
      this.$service('userInfo').then(result => {
        this.query.userName = result.data.mobilePhone
        
        this.$service('liveRoomToken', {
	        data: this.query
	      }).then(result => {
	        const { SID, userId, userToken } = result.data.resp.userInfo
	        location.href = `http://h5.chinahongchao.cn/appPage/zbxh5/#/?sid=${SID}&flag=h5&token=${userToken}`
	      }).catch((err) => { })
      }).catch((err) => { })
    },
    getLiveRoomToken() {
    	this.query.token = getToken()
    	this.getUser()
    },
    onClickLeft() {
    	this.$router.replace({
				name: 'index'
			})
    }
  }
}
</script>

<style lang="postcss" scoped>
.bg {
  position: relative;
  overflow: hidden;
  width: 100%;
  font-size: 15px;
  background-image: url("../../../assets/images/live_room_bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #4364fe;
  & .live-room-info {
    box-sizing: border-box;
    margin: 240px 15px 130px;
    padding: 15px 10px;
    width: calc(100% - 30px);
    line-height: 24px;
    color: #414141;
    border-radius: 12px;
    background: #fff;
    & .live-room-inner {
      padding: 20px 17px 44px;
      border: 2px solid #b9c3ff;
      border-radius: 8px;
      & p {
        text-indent: 2em;
      }
    }
  }
  & .to-live-room {
    position: fixed;
    bottom: 54px;
    left: 50%;
    transform: translateX(-50%);
    width: 174px;
    height: 52px;
    background-image: url("../../../assets/images/live_room_btn.png");
    background-size: contain;
  }
}
</style>