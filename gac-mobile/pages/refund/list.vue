<template>
  <div class="refund-list">
		<!--<NavBar title="售后列表"/>-->
		<van-nav-bar
      title="售后列表"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="tab-content">
      <ListModule
        name="refundPage"
        :query="{
          offset: 1,
          limit: 20
        }"
        :ref="'list' + 0"
      >
        <template slot-scope="{ list }">
          <Card v-for="(item, i) in list"
          :key="i"
          :id="item.id"
          :refundLog="item.refundLog"
          :sellUserId="item.sellUserId"
          :data="{
            goodsList: item.revoList,
            barLeftText: '订单编号：' + item.orderNumber,
            barRightText: refundState[item.auditState],
            price: '￥' + item.refundAmount,
            auditState: item.auditState,
            orderNumber: item.orderNumber
          }"
          @refundAddr="getShowAddr" 
          />
        </template>
      </ListModule>
    </div>
    <van-dialog
		  v-model="showAddr"
		  :before-close="beforeClose"
		  style="padding: 10px;"
		>
			<div style="line-height: 30px;">
			  <p>收件人地址：{{refundAddrDetail.addr}}</p>
		    <p>收件人姓名：{{refundAddrDetail.consignee}}</p>
		    <p>收件人手机号：{{refundAddrDetail.mobileNum}}</p>
			</div>
		</van-dialog>
  </div>
</template>
<script>
import Card from './item'
import { refundState } from '~/utils/status'
import ListModule from '~/components/common/list'
import NavBar from '~/components/dm/navbar/noAppIndex'

export default {
  components: {
    Card,
    ListModule,
    NavBar
  },
  data () {
    return {
    	showAddr: false,
      refundState,
      refundAddrDetail: {}
    }
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
    onClickLeft () {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    click (index) {
//    this.removeEvent(index)
    },
    linkTo (id) {
      this.$router.push({
        name: '',
        query: { id }
      })
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
      	this.refundAddrDetail = {}
        setTimeout(done, 500)
      } else {
        done()
      }
    },
    getShowAddr(refundAddrDetail){
    	this.refundAddrDetail = refundAddrDetail
    	this.showAddr = true
    }
  }
}
</script>

<style lang="postcss" scoped>
.refund-list {
  & .header {
    padding: 10px 15px;
  }
  & .module-list {
    display: flex;
    & li {
      flex-grow: 1;
      text-align: center;
      line-height: 45px;
      background: #f5f5f5;
      color: #333;
      border-bottom: 1px solid #f5f5f5;
    }
    & li.active {
      background: #fff;
      color: #c2a374;
    }
  }
  & .title-list {
    display: flex;
    box-shadow: 0 5px 7px #e6e8ee;
    & li {
      flex-grow: 1;
      text-align: center;
      line-height: 42px;
      color: #333;
    }
    & li.active {
      color: #c2a374;
    }
  }
}
</style>
