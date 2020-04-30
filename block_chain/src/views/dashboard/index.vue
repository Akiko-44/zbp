<template>
  <div class="app-container">
    <el-tabs
      v-model="activeName"
      type="card"
    >
      <el-tab-pane
        label="私链"
        name="privateChain"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span class="card-header">已上链数据</span>
          </div>
          <el-table
            :data="chainData"
            header-row-class-name="table-header"
            style="width: 100%"
          >
            <el-table-column
              align="center"
              prop="groupName"
              label="Group"
            />
            <el-table-column
              align="center"
              prop="count"
              label="已上链数量"
            />
          </el-table>
        </el-card>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span class="card-header">账本数据</span>
          </div>

          <el-table
            :data="costTableData"
            header-row-class-name="table-header"
            style="width: 100%"
          >
            <el-table-column
              align="center"
              prop="groupName"
              label="Group"
            />
            <el-table-column
              align="center"
              prop="cost"
              label="上链金额（eth）"
            />
            <el-table-column
              align="center"
              prop="balance"
              label="余额（eth）"
            />
          </el-table>

          <div class="chart-container">
            <div
              id="privateChart"
              class="privateChart"
              :style="{ width: 'calc(100vw - 350px)', height: '500px' }"
            />
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane
        label="公链"
        name="publicChain"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span class="card-header">待上链数据</span>
          </div>
          <el-table
            :data="upLinkTableData"
            header-row-class-name="table-header"
            style="width: 100%"
          >
            <el-table-column
              align="center"
              prop="platformName"
              label="上链平台"
            />
            <el-table-column
              class-name="blue-column"
              align="center"
              label="待上链数量"
            >
              <template slot-scope="{ row }">
                <span @click="$router.push({ name: 'upperChainPage' })">
                  {{ row.count }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span class="card-header">账本数据</span>
          </div>

          <div class="summary">
            <span class="summary-title">汇总统计</span>
            <el-row>
              <el-col :span="12">
                <span class="label">累计上链金额（eth）：</span>
                <span class="money">{{ cost }}</span>
              </el-col>
              <el-col :span="12">
                <span class="label">余额（eth）：</span>
                <span class="money">{{ balance }}</span>
              </el-col>
            </el-row>
          </div>

          <el-table
            :data="upLinkCostTableData"
            header-row-class-name="table-header"
            style="width: 100%"
          >
            <el-table-column
              align="center"
              label="上链平台"
            >
              <template slot-scope="{ row }">
                <span>{{ row.platform.displayName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="上链金额（eth）"
            >
              <template slot-scope="{ row }">
                <span>{{ row.cost }}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="chart-container">
            <div
              id="myChart"
              class="myChart"
              :style="{ width: 'calc(100vw - 350px)', height: '500px' }"
            />
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import echarts from 'echarts'
import {
  getCount,
  getAllCost,
  getLedgerCount,
  getChartData,
  getPrivateChainData,
  getPrivateAccountData,
  getPrivateaccountKLine
} from '@/api/dashboard'

export default {
  name: 'Dashboard',
  data() {
    return {
      activeName: 'privateChain',
      upLinkTableData: [],
      upLinkCostTableData: [],
      cost: '',
      balance: '',
      chart: null,
      seriesData: [],
      legendData: [],
      xAxisData: [],
      // 私链
      chainData: [],
      costTableData: [],
      privateChart: null,
      privateSeriesData: [],
      privateLegendData: [],
      privateXAxisData: []
    }
  },
  watch: {
    seriesData() {
      this.setOptions(this.chart, this.legendData, this.xAxisData, this.seriesData)
    },
    privateSeriesData() {
      this.setOptions(this.privateChart, this.privateLegendData, this.privateXAxisData, this.privateSeriesData)
    }
  },
  async created() {
    this.getCount()
    this.getAllCost()
    this.getLedgerCount()
    this.getChartData()
    // 私链
    this.getPrivateChainData()
    this.getPrivateAccountData()
    this.getPrivateaccountKLine()
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    } else {
      this.chart.dispose()
      this.chart = null
    }
    if (!this.privateChart) {
      return
    } else {
      this.privateChart.dispose()
      this.privateChart = null
    }
  },
  methods: {
    getCount() {
      getCount().then(data => {
        this.upLinkTableData = data.data
      })
    },
    getAllCost() {
      getAllCost({ blockchainId: 1 }).then(data => {
        this.cost = data.data.allCost
        this.balance = data.data.balance
      })
    },
    getLedgerCount() {
      getLedgerCount().then(data => {
        this.upLinkCostTableData = data.data
      })
    },
    // 私链已上链数据
    getPrivateChainData() {
      getPrivateChainData().then(data => {
        this.chainData = data.data
      })
    },
    // 私链账本数据
    getPrivateAccountData() {
      getPrivateAccountData().then(data => {
        this.costTableData = data.data
      })
    },
    // 私链账本K线图
    getPrivateaccountKLine() {
      getPrivateaccountKLine().then(data => {
        this.privateXAxisData = data.data.xAxisData
        this.privateLegendData = data.data.legendData
        data.data.seriesData.map(item => {
          item.type = 'line'
          item.smooth = true
          item.symbol = 'circle'
          item.lineStyle = {
            normal: {
              width: 2
            }
          }
          item.itemStyle = {
            normal: {
              label: {
                show: true
              }
            }
          }
        })
        this.privateSeriesData = data.data.seriesData
        // console.log(this.privateSeriesData)
      })
    },
    getChartData() {
      getChartData().then(data => {
        this.xAxisData = data.data.xAxisData
        this.legendData = data.data.legendData
        data.data.seriesData.map(item => {
          item.type = 'line'
          item.smooth = true
          item.symbol = 'circle'
          item.lineStyle = {
            normal: {
              width: 2
            }
          }
          item.itemStyle = {
            normal: {
              label: {
                show: true
              }
            }
          }
        })
        this.seriesData = data.data.seriesData
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('myChart'))
      this.privateChart = echarts.init(document.getElementById('privateChart'))
      this.setOptions(this.chart, this.legendData, this.xAxisData, this.seriesData)
      this.setOptions(this.privateChart, this.privateLegendData, this.privateXAxisData, this.privateSeriesData)
    },
    setOptions(chart, legendData, xAxisData, seriesData) {
      chart.setOption({
        legend: {
          top: 50,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: legendData,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#666'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            data: xAxisData
          }
        ],
        yAxis: [
          {
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
                color: '#ccc'
              }
            }
          }
        ],
        color: ['#ffc100', '#ed7c30', '#5a9bd5', '#a5a5a5'],
        series: seriesData
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .box-card {
    margin-bottom: 20px;
    .card-header {
      font-weight: bold;
    }
    .summary {
      position: relative;
      margin-bottom: 20px;
      padding: 30px 20px;
      text-align: center;
      border: $border-1;
      border-radius: 5px;
      &-title {
        position: absolute;
        top: -7px;
        left: 20px;
        width: 70px;
        font-size: 14px;
        background: #fff;
      }
      .money {
        color: $red;
      }
    }
  }
}
</style>
