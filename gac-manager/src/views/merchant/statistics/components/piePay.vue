<template>
  <div id="chart5" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import {
  payView
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
      paydata: []
    }
  },
  mounted() {
    var self = this
    payView(6)
      .then(succ => {
        let data = succ.data
        if(!data) {
          return
        }
        data.forEach(function(v, i) {
          let pay = ''
          if(v.payType == 1) {
            pay = '微信'
          }else if(v.payType == 2) {
            pay = '支付宝'
          }else if(v.payType == 3) {
            pay = '银联'
          }
          self.paydata.push({
            value: v.perCentum,
            name: pay,
          })
          self.initChart(self.paydata)
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
      this.chart = echarts.init(document.getElementById('chart5'))

      this.chart.setOption({
        title : {
            text: '支付',
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
                radius : ['50%', '70%'],
                center: ['50%', '50%'],
                data: this.paydata,
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
