<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="contractForm"
        :model="contractForm"
        label-width="150px"
        class="listForm"
        style="width: 100%;"
      >
        <el-form-item label="Group:">
          <template v-if="contractForm.group && contractForm.group.length">
            <el-input
              v-model="contractForm.group[0]"
              disabled
            />
          </template>
        </el-form-item>

        <el-form-item label="合约名:">
          <el-input
            v-model="contractForm.name"
            disabled
          />
        </el-form-item>

        <el-form-item label="已部署合约实例个数:">
          <el-input
            v-model="contractCount"
            disabled
          />
        </el-form-item>

        <el-form-item label="部署结果:">
          <div class="result-box">
            <template v-if="result.status">
              <p>
                <span class="result-label">交易状态</span>
                <span class="result-value">{{ result.status }}</span>
              </p>
              <p>
                <span class="result-label">交易hash</span>
                <span
                  class="result-value blue-link"
                  @click="
                    $router.push({
                      name: 'transactionHash',
                      query: { hash: result.transactionHash }
                    })
                  "
                >{{ result.transactionHash }}</span>
              </p>
              <p>
                <span class="result-label">合约地址</span>
                <span class="result-value">{{ result.contractAddress }}</span>
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
                <span class="result-label">燃料限制</span>
                <span class="result-value">{{ result.gas }}</span>
              </p>
              <p>
                <span class="result-label">交易燃料花费</span>
                <span class="result-value">{{ result.transactionCost }}</span>
              </p>
              <p>
                <span class="result-label">执行燃料花费</span>
                <span class="result-value">{{ result.executionCost }}</span>
              </p>
              <p>
                <span class="result-label">输入</span>
                <span class="result-value result-input-value">{{
                  result.input
                }}</span>
              </p>
              <p>
                <span class="result-label">日志</span>
                <span class="result-value result-input-value">{{
                  result.logs
                }}</span>
              </p>
              <p>
                <span class="result-label">交易金额</span>
                <span class="result-value">{{ result.value }} wei</span>
              </p>
            </template>
          </div>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button
          type="primary"
          class="btn save-btn"
          :loading="loading"
          :disabled="contractCount > 2"
          @click="save"
        >部署</el-button>
        <el-button
          class="btn cancel-btn"
          @click="cancel"
        >取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  deployContract,
  getDeployedContractCount
} from '@/api/chain-interaction'
import { isContractAddress } from '@/api/browser'

export default {
  data() {
    return {
      loading: false,
      contractForm: {},
      groupName: [],
      groupList: [],
      contractCount: undefined,
      showAllInput: false,
      showAllLogs: false,
      result: {}
    }
  },
  created() {
    this.contractForm = JSON.parse(this.$route.query.data)
    this.contractForm.contractName = this.contractForm.name
    this.getDeployedContractCount()
  },
  methods: {
    getDeployedContractCount() {
      getDeployedContractCount({
        groupId: this.contractForm.groupId,
        contractName: this.contractForm.contractName
      })
        .then(data => {
          console.log(this.contractCount)
          this.contractCount = data.data
        })
        .catch(() => { })
    },
    add() {
      deployContract(this.contractForm)
        .then(data => {
          this.success(data.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    save() {
      this.$confirm(
        '合约实例一旦部署就不能删除，建议不要重复部署，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      )
        .then(() => {
          this.$refs.contractForm.validate(valid => {
            if (valid) {
              this.loading = true
              this.add()
            } else {
              this.$notify({
                title: '警告',
                message: '请务必填写必选项',
                type: 'warning'
              })
              return false
            }
          })
        })
        .catch(() => { })
    },
    success(data) {
      this.$notify({
        title: '成功',
        message: '部署成功',
        type: 'success',
        duration: 2000
      })
      this.loading = false
      this.result = data
    },
    cancel() {
      this.$router.go(-1)
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
  // width: 700px;
  width: 100%;
  height: 444px;
  overflow-y: scroll;
  padding: 5px 20px;
  border: 1px solid #e5e5e5;
}
.result-box p {
  display: flex;
  margin: 0;
}
.result-label {
  width: 150px;
}
.result-value {
  // flex: 1;
  display: inline-block;
  word-wrap: break-word;
  width: calc(100% - 150px);
}
.result-input-value.result-value {
  overflow-y: scroll;
  margin-top: 10px;
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
