<template>
  <div class="dashboard-editor-container index">
    <div class="row1">
      <div class="app-container mr-2 schedule">
        <div class="font font-weight mb-2">待办事项</div>
        <el-row>
          <el-col :span="6">
            <div class="grid-content text-center">
              <img src="../../../assets/image/index/order1.png" />
              <p class="num my-1">30</p>
              <p class="font-sm">待付款订单数</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content text-center">
              <img src="../../../assets/image/index/order2.png" />
              <p class="num my-1">30</p>
              <p class="font-sm">待确认订单数</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content text-center">
              <img src="../../../assets/image/index/order3.png" />
              <p class="num my-1">30</p>
              <p class="font-sm">待发货订单数</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content text-center">
              <img src="../../../assets/image/index/order4.png" />
              <p class="num my-1">30</p>
              <p class="font-sm">待退款/货订单数</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="app-container outcomes">
        <div class="font font-weight mb-2">运营数据</div>
        <el-row>
          <el-col :span="8">
            <div class="grid-content text-center">
              <p class="num my-2">30</p>
              <p class="font-sm">上架商品数</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content text-center">
              <p class="num my-2">30</p>
              <p class="font-sm">粉丝数</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content text-center">
              <p class="num my-2">30</p>
              <p class="font-sm">店铺客户</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="app-container mt-2 statement">
      <div class="font font-weight mb-2">财务报表</div>
      <el-row class="mb-5 mx-2">
        <el-col :span="6">
          <div class="grid-content">
            <p class="num my-1">30<span class="withdraw text-center">提现</span></p>
            <p class="font-sm">账户余额(元)</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <p class="num my-1">30</p>
            <p class="font-sm">待入账金额(元)</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <p class="num my-1">30</p>
            <p class="font-sm">累计提现金额(元)</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <p class="num my-1">30</p>
            <p class="font-sm">累计提现手续费(元)</p>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb-5 mx-2">
        <el-col :span="6">
          <div class="grid-content">
            <p class="num my-1">30</p>
            <p class="font-sm">累计交易流水(GMV)</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <p class="num my-1">30</p>
            <p class="font-sm">累计订单数</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <p class="num my-1">30</p>
            <p class="font-sm">累计销售金额(元)</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <p class="num my-1">30</p>
            <p class="font-sm">累计退款金额(元)</p>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-radio-group
          v-model="tabPosition"
          style="margin-bottom: 30px;"
        >
          <el-radio-button label="top">最近7天</el-radio-button>
          <el-radio-button label="right">最近30天</el-radio-button>
          <el-radio-button label="bottom">下载统计图片</el-radio-button>
        </el-radio-group>
        <div
          id="chart"
          :style="{height:height,width:width}"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import {
  brandView
} from '@/api/makeMerchant/statistics'

export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      tabPosition: 'top',
      chart: null,
      xbranddata: [],
      ybranddata: []
    }
  },
  mounted() {
    var self = this
    brandView(6)
      .then(succ => {
        let data = succ.data

        if (!data) {
          return
        }
        const brandData = []
        const legendData = []
        data.forEach(function (v, i) {
          self.xbranddata.push(v.eachDate)
          self.ybranddata.push(v.saleNum)
          brandData.push({
            name: v.brandName,
            type: 'line',
            data: self.ybranddata
          })
          legendData.push(v.brandName)

        })
        self.initChart(self.xbranddata, brandData, legendData)
      })
  },
  created() {

  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(xbranddata, brandData, legendData) {
      this.chart = echarts.init(document.getElementById('chart'))

      this.chart.setOption({
        title: {
          top: 20,
          // text: '品牌统计',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 12,
            color: '#999'
          },
          left: '50%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#E3E3E5'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: legendData,
          left: '4%',
          textStyle: {
            fontSize: 12,
            color: '#999'
          }
        },
        grid: {
          top: 100,
          left: '3%',
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#E3E3E5'
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#999'
            }
          },
          data: xbranddata
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#E3E3E5'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12,
              color: '#999'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#E3E3E5'
            }
          }
        }],
        series: brandData
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
@import "src/styles/mixin.scss";
/deep/ .app-main {
  margin-top: 0 !important;
}
/deep/ .el-radio-button--medium .el-radio-button__inner {
  padding: 7px 20px;
}
/deep/ .el-radio-button:first-child .el-radio-button__inner,
/deep/ .el-radio-button__inner {
  border: 1px solid $primary;
}
.index {
  & .app-container {
    background: #fff;
  }
  & .row1 {
    display: flex;
  }
  & .schedule {
    width: 612px;
  }
  & .outcomes {
    width: 348px;
    & .num {
      margin-top: 30px;
      font-size: 18px;
    }
  }
  & .num {
    font-size: 20px;
  }
  & .statement {
    & .withdraw {
      display: inline-block;
      width: 40px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      font-size: 12px;
      background: $primary;
      border-radius: 10px;
    }
  }
}
</style>
