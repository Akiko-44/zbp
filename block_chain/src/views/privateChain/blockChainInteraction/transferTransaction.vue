<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="transferForm"
        :model="transferForm"
        :rules="rules"
        label-width="100px"
        class="listForm"
        style="width: 100%;"
      >
        <el-form-item label="From钱包:">
          <el-input
            v-model="fromWallet"
            disabled
            placeholder="账号--钱包余额"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="To钱包:"
          prop="toAddress"
        >
          <el-select
            v-model="transferForm.toAddress"
            style="width: 100%;"
            placeholder="请选择"
          >
            <el-option
              v-for="item in toWalletList"
              :key="item.walletAddress"
              :label="item.userName + '--' + item.walletAddress"
              :value="item.walletAddress"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="转账金额:"
          prop="amount"
        >
          <el-input
            v-model.number="transferForm.amount"
            type="number"
            style="width: calc(100% - 100px);"
          />
          <el-select
            v-model="transferForm.unit"
            style="width: 94px;"
            placeholder="请选择"
          >
            <el-option
              v-for="item in optionsWallet"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注:"
          prop="remark"
        >
          <el-input
            v-model="transferForm.remark"
            type="text"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="转账结果:">
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
          @click="save"
        >转账</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFromToWallet, transfer } from '@/api/chain-interaction'
import { isContractAddress } from '@/api/browser'

export default {
  data() {
    return {
      loading: false,
      fromWallet: '',
      transferForm: {
        toAddress: '',
        amount: '',
        remark: '',
        unit: '4'
      },
      unit: '4',
      toWalletList: [],
      optionsWallet: [
        {
          value: '1',
          label: 'wei'
        },
        {
          value: '2',
          label: 'gwei'
        },
        {
          value: '3',
          label: 'finney'
        },
        {
          value: '4',
          label: 'ether'
        }
      ],
      showAllInput: false,
      showAllLogs: false,
      result: {},
      rules: {
        remark: [
          { required: true, message: '请输入备注信息', trigger: 'blur' }
        ],
        amount: [
          {
            type: 'number',
            min: 0,
            required: true,
            message: '请输入转账金额',
            trigger: 'blur'
          }
        ],
        toAddress: [
          {
            required: true,
            message: '请选择To钱包',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getFromToWallet()
  },
  methods: {
    getFromToWallet() {
      getFromToWallet().then(data => {
        this.fromWallet = `${data.data.userName}--${data.data.amount}`
        this.toWalletList = data.data.to
      })
    },
    add() {
      transfer(this.transferForm)
        .then(data => {
          this.success(data.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    save() {
      this.$refs.transferForm.validate(valid => {
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
    },
    success(data) {
      this.$notify({
        title: '成功',
        message: '提交成功',
        type: 'success',
        duration: 2000
      })
      this.loading = false
      this.result = data
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
/deep/ input {
  text-align: left !important;
}
</style>
