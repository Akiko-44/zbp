<template>
  <div id="chart3" :style="{height:height,width:width}"></div>
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
      default: '200px'
    }
  },
  data() {
    return {
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
        
        if(!data) {
          return
        }
        const brandData = []
        const legendData = []
        data.forEach(function(v, i) {
          self.xbranddata.push(v.eachDate)
          self.ybranddata.push(v.saleNum)
          brandData.push({
            name: v.brandName,
            type: 'line',
            data: self.ybranddata
          })
          legendData.push(v.brandName)
          
        })
        self.initChart2(self.xbranddata,brandData,legendData)
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
    initChart2(xbranddata,brandData,legendData) {
      this.chart = echarts.init(document.getElementById('chart3'))

      this.chart.setOption({
        title: {
          top: 20,
          text: '品牌统计',
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
          data: legendData,
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
          data: xbranddata
        }],
        yAxis: [{
          type: 'value',
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
        series: brandData
      })
    }
  }
}
</script>
