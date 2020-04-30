<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :inline="true"
      >
        <el-form-item label="Group:">
          <el-select
            v-model="listParams.groupId"
            placeholder="请选择Group"
            clearable
            @change="changeGroup"
          >
            <el-option
              v-for="item in groupList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合约名:">
          <el-select
            v-model="listParams.contractId"
            placeholder="请选择合约"
            clearable
          >
            <el-option
              v-for="item in contractList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="数据类型:">
          <el-select
            v-model="listParams.type"
            clearable
            placeholder="请选择数据类型"
          >
            <el-option
              v-for="(value,key) in typeMap"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item> -->
        <el-button
          type="primary"
          @click="handleFilter"
        >过滤</el-button>
      </el-form>
    </div>
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
        label="组织"
      >
        <template slot-scope="{ row }">
          <span>
            {{ row.groupName }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="合约名"
      >
        <template slot-scope="{ row }">
          <span>
            {{ row.contractName }}
          </span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        align="center"
        label="数据类型"
      >
        <template slot-scope="{ row }">
          <span>{{ typeMap[row.type] }}</span>
        </template>
      </el-table-column> -->

      <el-table-column
        align="center"
        label="时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="数据详情"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="text"
            @click="$router.push({name: 'lastestChainDataDetail',query: {id: row.id}})"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getNewContractTx } from '@/api/event'
import { getContractName } from '@/api/chain-interaction'
import { getUserGroup } from '@/api/group'

export default {
  data() {
    return {
      groupList: [],
      contractList: [],
      listParams: {
        groupId: '',
        contractId: ''
        // type: ''
      },
      list: [],
      listLoading: false,
      websocket: null
      // typeMap: {
      //   '1': '商品',
      //   '2': '订单'
      // }
    }
  },
  watch: {
    $route: 'fetchData'
  },
  async created() {
    this.getGroupList()
    this.fetchData()
    if (this.$route.query.groupId && this.$route.query.contractId) {
      this.getContractList()
    }
  },
  mounted() {
    this.initWebSocket()
  },
  destroyed() {
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
    fetchData() {
      this.listParams.groupId = this.$route.query.groupId || ''
      this.listParams.contractId = this.$route.query.contractId || ''
      // this.listParams.type = this.$route.query.type || ''
      this.getList()
    },
    getGroupList() {
      getUserGroup().then(data => {
        this.groupList = data.data
        this.groupList.map(item => {
          item.label = item.group.join('-->')
        })
      })
    },
    getContractList() {
      getContractName({ groupId: this.listParams.groupId }).then(data => {
        this.contractList = data.data
      })
    },
    changeGroup() {
      this.listParams.contractId = ''
      if (this.listParams.groupId) {
        this.getContractList()
      } else {
        this.contractList = []
      }
    },
    getList() {
      this.listLoading = true
      getNewContractTx(this.listParams).then(data => {
        this.list = data.data
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs.listQueryForm.validate(valid => {
        if (valid) {
          // this.getList()
          // 过滤断开重连websocket
          this.websock.close()
          this.initWebSocket()
          this.$router.replace({
            name: 'latestChain',
            query: {
              groupId: this.listParams.groupId,
              contractId: this.listParams.contractId
              // type: this.listParams.type
            }
          })
        } else {
          return false
        }
      })
    },
    initWebSocket() {
      // 初始化weosocket
      // this.baseURL = '192.168.8.110:8084'
      const baseURL = '47.106.235.193:8084'
      const type = 'contractTx'
      const userId = sessionStorage.getItem('userId')
      const randomString = sessionStorage.getItem('randomString')
      const websockUrl = `ws://${baseURL}/eventWS/${type}/${userId}/${randomString}?group=${this.listParams.groupId}&contract=${this.listParams.contractId}`
      // console.log(websockUrl)
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
      // console.log('建立连接')
    },
    websocketonerror() {
      // console.log('WebSocket连接失败')
    },
    websocketonmessage(e) {
      // 数据接收
      // console.log('数据接收', JSON.parse(e.data))
      // console.log(e)
      if (e.data !== '连接成功') {
        const data = JSON.parse(e.data)
        this.list.unshift(data)
        if (this.list.length > 100) {
          this.list.length = 100
        }
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

<style scoped lang="scss"></style>
