<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :inline="true"
      >
        <el-form-item>
          <el-input
            v-model="listParams.hash"
            style="width: 800px;"
            placeholder="请输入内容"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-button
          type="primary"
          @click="handleFilter"
        >查询</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form>
    </div>
    <div class="content-container">
      <div class="result-box">
        <template>
          <h4 class="result-title">查询结果</h4>
          <p>
            <span class="result-label">交易hash</span>
            <span class="result-value">{{ result.transactionHash }}</span>
          </p>
          <p>
            <span class="result-label">交易状态</span>
            <span class="result-value">{{ result.status }}</span>
          </p>
          <p>
            <span class="result-label">区块号</span>
            <span
              class="result-value blue-link"
              @click="
                $router.push({
                  name: 'blockHeight',
                  query: { blockNumber: result.blockNumber }
                })
              "
            >{{ result.blockNumber }}</span>
          </p>
          <p>
            <span class="result-label">时间戳</span>
            <span class="result-value">{{ result.timestamp }}</span>
          </p>
          <p>
            <span class="result-label">交易发起方地址</span>
            <span
              class="result-value blue-link"
              @click="
                $router.push({
                  name: 'walletAddress',
                  query: { address: result.from }
                })
              "
            >{{ result.from }}</span>
          </p>
          <p>
            <span class="result-label">交易接收方地址</span>
            <span
              class="result-value blue-link"
              @click="linkToAddress(result.to)"
            >{{ result.to }}</span>
          </p>
          <p>
            <span class="result-label">交易金额</span>
            <span class="result-value">{{ result.value }} <span v-if="result.value">Ether</span></span>
          </p>
          <p>
            <span class="result-label">矿工费</span>
            <span class="result-value">{{ result.transactionFee }} <span v-if="result.transactionFee">Ether</span></span>
          </p>

          <p>
            <span class="result-label">燃料限制</span>
            <span class="result-value">{{ result.gasLimit }}</span>
          </p>
          <p>
            <span class="result-label">燃料消耗</span>
            <span class="result-value">{{ result.gasUsed }}</span>
          </p>
          <p>
            <span class="result-label">燃料价格</span>
            <span class="result-value">{{ result.gasPrice }} <span v-if="result.gasPrice">Ether</span></span>
          </p>
          <p>
            <span class="result-label">随机数</span>
            <span class="result-value">{{ result.nonce }}</span>
          </p>
          <p>
            <span class="result-label">输入数据</span>
            <span class="result-value result-input-value">{{
              result.input
            }}</span>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { searchTransaction, isContractAddress } from '@/api/browser'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        hash: ''
      },
      showAllInput: false,
      showAllLogs: false,
      result: {}
    }
  },
  created() {
    if (this.$route.query.hash) {
      this.listParams.hash = this.$route.query.hash
    }
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      // if (!this.listParams.hash) {
      //   this.$message({
      //     message: '请输入交易Hash查询',
      //     type: 'warning'
      //   })
      //   return
      // }
      searchTransaction(this.listParams).then(data => {
        this.result = data.data
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs.listQueryForm.validate(valid => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
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

<style scoped lang="scss">
.result-box {
  width: 100%;
  // padding: 5px 20px;
  line-height: 50px;
  border: 1px solid #e5e5e5;
}
.result-box .result-title {
  margin: 0;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 400;
  background: #f5f5f5;
  border-bottom: 2px solid #e5e5e5;
}
.result-box p {
  display: flex;
  margin: 0;
  padding-left: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.result-box p:last-child {
  border-bottom: 0;
}
.result-label {
  width: 250px;
  color: #333333;
}
.result-value {
  display: inline-block;
  word-wrap: break-word;
  width: calc(100% - 250px);
}
.result-input-value.result-value {
  overflow-y: scroll;
  margin: 10px 10px 10px 0;
  padding: 10px;
  height: 100px;
  line-height: 20px;
  font-size: 14px;
  color: #666666;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
.blue {
  color: $light-blue;
  cursor: pointer;
}
</style>
