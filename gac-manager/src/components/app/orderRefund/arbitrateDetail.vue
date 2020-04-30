<template>
  <div
    class="app-container"
    v-loading="loading"
    style="padding-left: 40px"
  >
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>仲裁详情</span>
    </div>
    <h3>仲裁详情</h3>
    <div class="info refund-info">
      <div class="info-title">退款信息</div>
      <div class="info-body">
        <div class="clearfix">
          <div class="info-item">退款订单：{{refundInfo.refundOrderId}}</div>
          <div class="info-item">申请时间：{{refundInfo.createTime}}</div>
          <div class="info-item">退款申请人：{{refundInfo.refundUserName}}</div>
          <div class="info-item">退款金额：{{refundInfo.refundAmount}}元</div>
          <div class="info-item">退款原因：{{refundInfo.comments}}</div>
        </div>
        <div class="img-box">
          <img
            @click="showBigImg(item)"
            class="small-img"
            :src="getImg(item)"
            v-for="item in picList"
          />
        </div>
      </div>
    </div>
    <div class="info arbitrate-info">
      <div class="info-title">仲裁信息</div>
      <div class="info-body">
        <div class="clearfix">
          <div class="info-item">仲裁编号：{{arbitrationInfo.refundOrderId}}</div>
          <div class="info-item">申请时间：{{arbitrationInfo.arbitrationTime}}</div>
          <div class="info-item">仲裁状态：{{auditState[arbitrationInfo.auditState]}}</div>
          <div class="info-item">申请人：{{arbitrationInfo.applicantName}}</div>
          <div class="info-item">申请人角色：{{arbitrateRole[arbitrationInfo.arbitrationType]}}</div>
          <div class="info-item">申请人手机号码：{{arbitrationInfo.applicantMobile}}</div>
          <div class="info-item">被仲裁人：{{arbitrationInfo.arbitrateName}}</div>
          <div class="info-item">被仲裁人手机号码：{{arbitrationInfo.arbitrateMobile}}</div>
          <div class="info-item">仲裁原因：{{arbitrationInfo.arbitationReason}}</div>
        </div>
        <div class="img-box">
          <img
            @click="showBigImg(item)"
            class="small-img"
            :src="getImg(item)"
            v-for="item in arbitrationPic"
          />
        </div>
      </div>
    </div>
    <div class="btns">
      <el-button @click="goback">返回</el-button>
      <el-button
        @click="audit(1)"
        v-if="refundType === 1 && arbitrationInfo.auditState === 7"
      >同意退款</el-button>
      <el-button
        @click="audit(2)"
        v-if="refundType === 1 && arbitrationInfo.auditState === 7"
      >拒绝退款</el-button>
      <el-button
        @click="audit(1)"
        v-if="refundType === 2 && arbitrationInfo.auditState === 7"
      >同意退货</el-button>
      <el-button
        @click="audit(2)"
        v-if="refundType === 2 && arbitrationInfo.auditState === 7"
      >拒绝退货</el-button>
      <!--<el-button @click="audit(3)" v-if="arbitrationInfo.auditState === 7">退回</el-button>-->
    </div>
    <el-dialog
      title="大图"
      :visible.sync="imgDialogVisible"
      width="30%"
    >
      <img
        class="big-img"
        :src="getImg(imgUrl)"
      />
    </el-dialog>
    <arbitrate-dialog
      ref="auditDialog"
      @success="goback"
    />
  </div>
</template>

<script>
import arbitrateDialog from './arbitrateDialog'
import { setImg } from '@/filters'

export default {
  components: {
    arbitrateDialog
  },
  data() {
    return {
      //    orderState, payType,
      id: this.$route.query.id,
      imgDialogVisible: false,
      imgUrl: '',
      loading: false,
      //    form: {},
      refundType: 0,
      auditState: {
        0: '审核中',
        1: '退款中(服务中)',
        2: '商家同意退款买家发货',
        3: '退款成功',
        4: '退款失败',
        5: '用户取消',
        6: '审核拒绝',
        7: '仲裁中',
        8: '仲裁通过',
        9: '仲裁拒绝',
        10: '仲裁退回',
        11: '商家拒绝收货'
      },
      arbitrateRole: {
        1: '用户',
        2: '商家'
      },
      refundInfo: {
        refundOrderId: '',
        createTime: '',
        refundUserName: '',
        refundAmount: '',
        comments: ''
      },
      arbitrationInfo: {
        refundOrderId: '',
        arbitrationTime: '',
        auditState: '',
        applicantName: '',
        arbitrationType: 1,
        arbitrateName: '',
        arbitrateMobile: '',
        arbitationReason: ''

      },
      picList: [],
      arbitrationPic: []
    }
  },
  props: {
    getDetail: Function
  },
  async mounted() {
    this.loading = true
    const form = await this.getDetail(this.id).then(data => data.data)
    setTimeout(() => {
      this.refundType = form.refundType
      this.refundInfo.refundOrderId = form.refundOrderId
      // this.refundInfo.createTime = form.createTime
      this.refundInfo.createTime = form.arbitrationTime
      this.refundInfo.refundUserName = form.refundUserName
      this.refundInfo.refundAmount = form.refundAmount
      this.refundInfo.comments = form.comments
      this.picList = form.picList
      this.arbitrationInfo.refundOrderId = form.refundOrderId
      this.arbitrationInfo.arbitrationTime = form.arbitrationTime
      this.arbitrationInfo.auditState = form.auditState
      this.arbitrationInfo.applicantName = form.applicantName
      this.arbitrationInfo.applicantMobile = form.applicantMobile
      this.arbitrationInfo.arbitrationType = form.arbitrationType
      this.arbitrationInfo.arbitrateName = form.arbitrateName
      this.arbitrationInfo.arbitrateMobile = form.arbitrateMobile
      this.arbitrationInfo.arbitationReason = form.arbitationReason
      this.arbitrationPic = form.arbitrationPic
      this.loading = false
    }, 10)
  },
  methods: {
    audit(state) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.refundId = this.refundInfo.refundOrderId
      dialog.form.auditState = state
    },
    goback() {
      this.$router.go(-1)
    },
    showBigImg(imgUrl) {
      this.imgDialogVisible = true
      this.imgUrl = imgUrl
      this.getImg(imgUrl)
    },
    getImg(imgUrl) {
      return setImg(imgUrl)
    }
  }
}
</script>
<style scoped>
.info-title {
  line-height: 30px;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  background: #b3d8ff;
}
.info-body {
  width: 800px;
  padding-left: 20px;
}
.info-body .info-item {
  width: 300px;
  line-height: 30px;
  float: left;
}
.info-body .small-img {
  width: 100px;
  margin-right: 10px;
}
.btns {
  margin-top: 20px;
}
.big-img {
  width: 100%;
}
</style>
