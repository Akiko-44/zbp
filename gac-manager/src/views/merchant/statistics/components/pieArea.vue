<template>
  <div id="chart4" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import {
  areaView
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
      areadata: []
    }
  },
  mounted() {
    var self = this
    areaView(6)
      .then(succ => {
        let data = succ.data
        if(!data) {
          return
        }
        data.forEach(function(v, i) {
          self.areadata.push({
            value: v.perCentum,
            name: v.province,
          })
          self.initChart(self.areadata)
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
    initChart(xbranddata,ybranddata) {
      this.chart = echarts.init(document.getElementById('chart4'))

      this.chart.setOption({
        title : {
            text: '订单地区分布',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20
        },
        series : [
            {
                name: '统计',
                type: 'pie',
                radius : '60%',
                center: ['50%', '50%'],
                data: this.areadata,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      })
    }
  }
}
</script>
