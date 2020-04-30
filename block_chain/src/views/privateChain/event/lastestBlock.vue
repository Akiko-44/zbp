<template>
  <div class="app-container">
    <el-table
      v-loading.body="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="区块号"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({name: 'blockHeight',query: { blockNumber: row.number }})">{{ row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="日期时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="矿工"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({name: 'walletAddress',query: { address: row.miner }})">
            {{ row.miner }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="100"
        label="交易数量"
      >
        <template slot-scope="{ row }">
          <span>{{ row.txSize }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="100"
        label="叔块数量"
      >
        <template slot-scope="{ row }">
          <span>{{ row.uncleSize }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="100"
        label="燃料用量"
      >
        <template slot-scope="{ row }">
          <span>{{ row.gasUsed }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="燃料限制"
      >
        <template slot-scope="{ row }">
          <span>{{ row.gasLimit }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getNewBlock } from '@/api/event'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      websocket: null
    }
  },
  created() {
    this.getList()
    this.initWebSocket()
  },
  destroyed() {
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
    getList() {
      this.listLoading = true
      getNewBlock().then(data => {
        this.list = data.data
        this.listLoading = false
      })
    },
    initWebSocket() {
      // 初始化weosocket
      const baseURL = '47.106.235.193:8084'
      const type = 'block'
      const userId = sessionStorage.getItem('userId')
      const randomString = sessionStorage.getItem('randomString')
      const websockUrl = `ws://${baseURL}/eventWS/${type}/${userId}/${randomString}`
      this.websock = new WebSocket(websockUrl)

      this.websock.onmessage = this.websocketonmessage
      this.websock.onerror = this.websocketonerror
      this.websock.onopen = this.websocketonopen
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      const data = {
        code: 0,
        msg: '这是client：初次连接'
      }
      this.websocketsend(JSON.stringify(data))
    },
    websocketonerror() {
      // console.log('WebSocket连接失败')
    },
    websocketonmessage(e) {
      // 数据接收
      // console.log('数据接收', JSON.parse(e.data))
      const data = JSON.parse(e.data)
      this.list.unshift(data)
      if (this.list.length > 100) {
        this.list.length = 100
      }
    },
    websocketsend(Data) {
      // 数据发送
      this.websock.send(Data)
    },
    websocketclose(e) {
      // 关闭
      // console.log('已关闭连接', e)
    }
  }
}
</script>

<style scoped lang="scss">
.no-btn-text {
  display: inline-block;
  width: 56px;
  text-align: center;
}
</style>
