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
            v-model="listParams.blockNumber"
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
            <span class="result-label">区块号</span>
            <span class="result-value">{{ result.number }}</span>
          </p>
          <p>
            <span class="result-label">区块hash</span>
            <span class="result-value">{{ result.hash }}</span>
          </p>
          <p>
            <span class="result-label">父区块hash</span>
            <span class="result-value">{{ result.parentHash }}</span>
          </p>
          <p>
            <span class="result-label">矿工</span>
            <span
              class="result-value blue-link"
              @click="
                $router.push({
                  name: 'walletAddress',
                  query: { address: result.miner }
                })
              "
            >{{ result.miner }}</span>
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
            <span class="result-label">区块难度</span>
            <span class="result-value">{{ result.difficulty }}</span>
          </p>
          <p>
            <span class="result-label">总难度</span>
            <span class="result-value">{{ result.totalDifficulty }}</span>
          </p>

          <p>
            <span class="result-label">日期时间</span>
            <span class="result-value">{{ result.timestamp }}</span>
          </p>
          <p>
            <span class="result-label">区块容量</span>
            <span class="result-value">{{ result.size }}</span>
          </p>
          <p>
            <span class="result-label">交易数量</span>
            <span class="result-value">{{ result.txnNumber }}</span>
          </p>
          <p>
            <span class="result-label">叔块数量</span>
            <span class="result-value">{{ result.uncleNumber }}</span>
          </p>
          <p>
            <span class="result-label">额外数据</span>
            <span class="result-value result-input-value">{{
              result.extraData
            }}</span>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { searchBlock, isContractAddress } from '@/api/browser'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        blockNumber: ''
      },
      showAllInput: false,
      showAllLogs: false,
      result: {}
    }
  },
  created() {
    if (this.$route.query.blockNumber) {
      this.listParams.blockNumber = this.$route.query.blockNumber
    }
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const reg = new RegExp('^[0-9]*$')
      if (this.listParams.blockNumber && !reg.test(this.listParams.blockNumber)) {
        // this.$message({
        //   message: '请输入正确的区块高度',
        //   type: 'warning'
        // })
        this.$message.error('请输入正确的区块高度值')
        return
      }
      searchBlock(this.listParams).then(data => {
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
