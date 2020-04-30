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
        label="交易hash"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({name: 'transactionHash',query: { hash: row.hash }})">
            {{ row.hash }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="100"
        label="区块号"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({name: 'blockHeight',query:{blockNumber:row.blockNumber}}) ">
            {{ row.blockNumber }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="200"
        label="时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="交易发起方地址"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="linkToAddress(row.from)">{{ row.from }}</span>
          <!-- <span @click="$router.push({name: 'walletAddress',query: { address: row.from }})">
            {{ row.from }}
          </span> -->
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="交易接收方地址"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="linkToAddress(row.to)">{{ row.to }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="100"
        label="块内索引"
      >
        <template slot-scope="{ row }">
          <span>{{ row.transactionIndex }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="矿工费"
      >
        <template slot-scope="{ row }">
          <span>{{ row.txFee }} Ether</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getNewTxn } from '@/api/event'
import { isContractAddress } from '@/api/browser'

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
      getNewTxn().then(data => {
        this.list = data.data
        this.listLoading = false
      })
    },
    initWebSocket() {
      // 初始化weosocket
      const baseURL = '47.106.235.193:8084'
      const type = 'tx'
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
    },
    linkToAddress(address) {
      isContractAddress({ address }).then(data => {
        if (data.data) {
          this.$router.push({
            name: 'contractAddress',
            query: { address: address }
          })
        } else {
          this.$router.push({
            name: 'walletAddress',
            query: { address: address }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
