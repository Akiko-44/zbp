<template>
  <div class="chart2" id="chart2" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import {
  saleStatistics
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
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      xsaledata: [],
      ysaledata: []
    }
  },
  mounted() {
    var self = this
    saleStatistics(6)
      .then(succ => {
        let data = succ.data
        data.forEach(function(v, i) {
          self.xsaledata.push(v.eachMouth)
          self.ysaledata.push(v.totalPrice)
          self.initChart2(self.xsaledata,self.ysaledata)
        })
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
    initChart2(xsaledata,ysaledata) {
      this.chart = echarts.init(document.getElementById('chart2'))

      this.chart.setOption({
        title: {
          top: 20,
          text: '销售额统计',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16
          },
          left: '50%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['统计'],
          right: '4%',
          textStyle: {
            fontSize: 12
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
              color: '#57617B'
            }
          },
          data: xsaledata
        }],
        yAxis: [{
          type: 'value',
          name: '单位(元)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: '统计',
          type: 'line',
          data: ysaledata          
        }]
      })
    }
  }
}
</script>
