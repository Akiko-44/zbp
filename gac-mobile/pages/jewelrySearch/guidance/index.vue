<template>
  <AppView title="今日指导价">
    <div class="guidance">
      <div
        class="assemble-item"
        v-for="(item,i) in guidePriceList"
        :key="i"
      >
        <p class="item-name">{{item.name}}</p>
        <div>
          <p class="item-unit">{{item.todayGuidedPriceVOS[6].price}}{{item.priceUnit}}</p>
          <p
            class="item-state"
            style="padding-top: 6px;"
          >零售均价</p>
        </div>
        <div>
          <div
            class="echart"
            ref="echarts"
          >
            <span
              v-for="(subItem, subIndex) in item.todayGuidedPriceVOS"
              :key="subIndex"
            ><i></i>{{subItem.price}}</span>
          </div>
          <p class="item-state">近7日走势</p>
        </div>
      </div>
    </div>
  </AppView>
</template>

<script>
export default {
  data() {
    return {
      guidePriceList: []
    }
  },
  activated() {
    this.$service('guidePrice').then((data) => {
      this.guidePriceList = data.data
    }).catch(() => { })
  },
  updated() {
    if (this.$refs.echarts) {
      this.drawLine()
    }
  },
  methods: {
    drawLine() {
      let self = this
      let echartsArr = this.$refs.echarts
      echartsArr.forEach(function (item, i) {
        let myEchart = self.$echarts.init(echartsArr[i])
        let sdata = []
        self.guidePriceList[i].todayGuidedPriceVOS.forEach(function (citem, i) {
          sdata.push(citem.price)
        })
        let max = Math.max.apply(null, sdata)
        let min = Math.min.apply(null, sdata)
        myEchart.setOption({
          grid: {
            top: 5,
            left: 5,
            bottom: 5
          },
          // x轴的数据
          xAxis: {
            show: false,
            data: [1, 2, 3, 4, 5, 6, 7]
          },
          // y轴的数据
          yAxis: {
            show: false,
            min: min,
            max: max
          },
          animation: false,
          // 折线图 （写几条折线图就写几个对象；是这个{}对象）
          series: [
            {
              type: "line",
              symbol: "circle",
              data: sdata,
              color: "#fb746e"
            }
          ]
        })
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.guidance {
  padding-top: 18px;
  & .assemble-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 89px;
    width: 350px;
    margin: 0 auto 10px;
    padding: 0 19px;
    background: white;
    border-radius: 8px;
    text-align: center;
    box-sizing: border-box;
    & .item-name {
      overflow: hidden;
      width: 85px;
      line-height: 50px;
      font-size: 15px;
      color: var(--black);
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & .item-unit {
      color: var(--red);
      font-size: 17px;
    }
    & .item-state {
      color: var(--gray);
      font-size: 12px;
      line-height: 24px;
    }
    & .echart {
      width: 80px;
      height: 26px;
    }
  }
}
</style>
