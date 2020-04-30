<template>
  <div class="chart1" id="chart1" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import {
  orderView
} from '@/api/merchant/statistics'

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
      xdata: [],
      ydata: []
    }
  },
  mounted() {
    var self = this
    orderView(6)
      .then(succ => {
        let data = succ.data
        data.forEach(function(v, i) {
          self.xdata.push(v.eachTime)
          self.ydata.push(v.totalNum)
        })
        self.initChart(self.xdata,self.ydata)
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
    initChart(xdata,ydata) {
      this.chart = echarts.init(document.getElementById('chart1'))

      this.chart.setOption({
        title: {
          top: 20,
          text: '订单数量统计',
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
          data: xdata
        }],
        yAxis: [{
          type: 'value',
          name: '单位(个)',
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
          data: ydata          
        }]
      })
    }
  }
}
</script>
