<template>
  <AppView
    title="举报详情"
    class="Info"
    :clickLeft="clickLeft"
  >
    <div class="block">
      <template v-if="[1,3].includes(info.reportStatus)">
        <!-- <template v-if="info.reportStatus === 1 || info.reportStatus === 3"> -->
        <van-cell
          title="举报进度："
          class="info-cell-theme"
          :value="reportStatusMap[info.reportStatus]"
        />
        <van-cell
          v-if="info.reportFail"
          title="失败原因："
          class="info-cell-dark"
          :value="info.reportFail"
        />
        <div class="card-title">举报的内容</div>
        <div class="card-main d-flex">
          <div
            class="card-image lazy-img-box"
            v-lazy:background-image="setImg(info.thumbnail, { w: 400 })"
          ></div>
          <div class="card-info d-flex flex-column j-sb">
            <p class="card-name text-hidden text-black">
              {{info.title}}
            </p>
            <p>
              <span class="text-light-black">作者：{{info.authorName}}</span>
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <van-cell
          title="申诉进度："
          class="info-cell-theme"
          :value="appealStatusMap[info.appealStatus]"
        />
        <van-cell
          v-if="info.appealFail"
          title="失败原因："
          class="info-cell-dark"
          :value="info.appealFail"
        />
        <div class="card-main d-flex appeal-main">
          <div
            class="card-image lazy-img-box"
            v-lazy:background-image="setImg(info.thumbnail, { w: 400 })"
          ></div>
          <div class="card-info d-flex flex-column j-sb">
            <p class="card-name text-hidden text-black">
              {{info.title}}
            </p>
            <p>
              <span class="text-light-black">作者：{{info.authorName}}</span>
            </p>
          </div>
        </div>
      </template>
    </div>

    <div
      class="type-tabs d-flex a-center"
      v-if="![1,3].includes(info.reportStatus) && info.appealStatus !== 0"
    >
      <span
        class="tab"
        :class="active === 0 ? 'active' : ''"
        @click="clickTab(0)"
      >举报详情</span>
      <span class="divider">|</span>
      <span
        class="tab"
        :class="active === 1 ? 'active' : ''"
        @click="clickTab(1)"
      >申诉详情</span>
    </div>

    <div
      class="block"
      v-show="showReport"
    >
      <van-cell
        title="举报类型："
        :value="info.reportTypeName"
      />
      <div class="card-title">举报理由:</div>
      <div class="card-main line-h-md">
        <p class="text-light-black">{{info.reportReason}}</p>
        <p class="text-dark-gray mt-1">{{info.createTime}}</p>
      </div>
      <div class="card-title">图片证据:</div>
      <div class="d-flex flex-wrap p-1 pb-0 pr-0">
        <div
          v-for="(item,index) in info.reportEvidenceArr"
          :key="index"
          class="card-image-big lazy-img-box"
          v-lazy:background-image="setImg(item, { w: 400 })"
        ></div>
      </div>
    </div>
    <div
      class="block"
      v-show="showAppeal"
    >
      <van-cell
        title="申诉类型："
        :value="info.appealTypeName"
      />
      <div class="card-title">申诉理由:</div>
      <div class="card-main line-h-md">
        <p class="text-light-black">{{info.appealReason}}</p>
        <p class="text-dark-gray mt-1">{{info.appealTime}}</p>
      </div>
      <div
        class="card-title"
        v-if="info.appealEvidenceArr && info.appealEvidenceArr.length"
      >图片证据:</div>
      <div
        class="d-flex flex-wrap p-1 pb-0 pr-0"
        v-if="info.appealEvidenceArr && info.appealEvidenceArr.length"
      >
        <div
          v-for="(item,index) in info.appealEvidenceArr"
          :key="index"
          class="card-image-big lazy-img-box"
          v-lazy:background-image="setImg(item, { w: 400 })"
        ></div>
      </div>
    </div>
    <!-- <van-button
      type="danger"
      @click="report"
    >发起申诉</van-button> -->
  </AppView>
</template>

<script>
import { setImg } from '~/utils/qiniu'
export default {
  data() {
    return {
      id: '',
      active: 0,
      info: {},
      showReport: true,
      showAppeal: false,
      reportStatusMap: {
        1: '待审核',
        2: '举报成功',
        3: '举报失败',
      },
      appealStatusMap: {
        0: '待申诉',
        1: '申诉中',
        2: '申诉成功',
        3: '申诉失败',
      },
    }
  },
  activated() {
    this.id = this.$route.query.id
    this.getDetail()
    if (this.$native.isApp()) {
      this.$native.getTitle("举报详情")
    }
  },
  deactivated() {
    this.$destroy()
  },
  head() {
    return {
      title: '举报详情'
    }
  },
  methods: {
    setImg,
    getDetail() {
      this.$service('reportDetail', {
        resources: [this.id]
      }).then(result => {
        this.info = result.data
        // this.showAppeal = this.info.appealTypeName
      }).catch(() => { })
    },
    clickTab(active) {
      this.active = active
      if (active === 0) {
        this.showReport = true
        this.showAppeal = false
      } else {
        this.showReport = false
        this.showAppeal = true
      }
    },
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    report() {
      const data = {
        id: this.info.id,
        contentId: this.info.contentId,
        reason: '竞争对手恶意举报',
        evidence: ['http://image.gacjc.com/1581578825142_1d5b48441a9c6.png', 'http://image.gacjc.com/FrTbsmwf30D5xgXwSNJIoUjq7JIy', 'http://pic.gacjc.com/group1/M00/00/17/rBUAD14Fv3OASGXcAACsQiSqHrU235.jpg', 'http://pic.gacjc.com/group1/M00/00/17/rBUAD14NWbGASXTcAAC5qqfYzbk214.jpg'],
        type: 2,
        reportOrAppealTypeId: '3',
      }
      this.$service('report', {
        data: data
      }).then(result => {
        console.log(result)
        this.getList()
      }).catch(() => { })
    }
  }
}
</script>

<style lang="postcss" scoped>
.Info {
  padding: 10px;
  & .block {
    margin-bottom: 10px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
  }
  & .card-title {
    margin-top: 20px;
    padding-left: 10px;
    font-size: 17px;
    color: #333333;
  }
  & .card-main {
    margin: 10px;
    padding: 10px;
    font-size: 12px;
    background: #f2f2f2;
    border-radius: 6px;
    &.appeal-main {
      margin: 16px 10px;
    }
  }
  & .card-image {
    width: 54px;
    height: 54px;
    border-radius: 4px;
  }
  & .card-image-big {
    margin-right: 10px;
    margin-bottom: 10px;
    width: 105px;
    height: 105px;
  }
  & .card-info {
    width: 245px;
    padding: 5px 0 13px 10px;
  }
  & .type-tabs {
    margin-bottom: 10px;
    font-size: 15px;
    color: #333333;
    background: #fff;
    border-radius: 5px;
    & .tab {
      width: 178px;
      line-height: 40px;
      text-align: center;
    }
    & .divider {
      color: #e5e5e5;
    }
    & .active {
      font-weight: bold;
      color: #df735a;
    }
  }
}
>>> .van-cell {
  padding: 22px 10px;
  font-size: 17px;
}
>>> .van-cell__value {
  font-size: 12px;
  color: #666666;
}
>>> .info-cell-theme .van-cell__value {
  color: #df735a;
}
>>> .info-cell-dark .van-cell__value {
  color: #999999;
}
>>> .van-cell:not(:last-child)::after {
  left: 0;
}
</style>
