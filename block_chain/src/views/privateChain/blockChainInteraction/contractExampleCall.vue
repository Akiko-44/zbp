<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="contractForm"
        :model="contractForm"
        :rules="rules"
        label-width="120px"
        class="listForm"
        style="width: 100%;"
      >
        <el-form-item
          label="Group:"
          prop="groupId"
        >
          <el-select
            v-model="contractForm.groupId"
            placeholder="请选择Group"
            style="width: 100%;"
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

        <el-form-item
          label="合约名:"
          prop="contractId"
        >
          <el-select
            v-model="contractForm.contractId"
            placeholder="请选择合约"
            style="width: 100%;"
            @change="changeContractName"
          >
            <el-option
              v-for="item in contractNameList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="合约实例地址:"
          prop="instanceId"
        >
          <el-select
            v-model="contractForm.instanceId"
            placeholder="请选择合约实例地址"
            style="width: 100%;"
            @change="changeAddress"
          >
            <el-option
              v-for="item in addressList"
              :key="item.id"
              :label="item.address"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="方法:"
          prop="methodId"
        >
          <el-select
            v-model="contractForm.methodId"
            placeholder="请选择方法"
            style="width: 100%;"
            @change="changeMethodName"
          >
            <el-option
              v-for="item in methodNameList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <!-- <el-form-item
          label="数据类型:"
          prop="type"
        >
          <el-select
            v-model="contractForm.type"
            placeholder="请选择数据类型"
            style="width: 100%;"
          >
            <el-option
              v-for="(item,index) in dataTypeList"
              :key="index"
              :label="item.name"
              :value="item.type"
            />
          </el-select>
        </el-form-item> -->

        <el-form-item
          v-for="(param, index) in contractForm.paramsList"
          :key="param.key"
          :label="param.name"
          :prop="'paramsList.' + index + '.value'"
          :rules="{
            required: true,
            message: '参数不能为空',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="param.value"
            @input="change($event)"
          />
        </el-form-item>

        <el-form-item label="执行结果:">
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
            <template v-if="result.result">
              <p>
                <span class="result-label">结果</span>
                <span class="result-value">{{ result.result }}</span>
              </p>
            </template>
          </div>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button
          class="btn cancel-btn"
          @click="cancel"
        >取消</el-button>
        <el-button
          type="primary"
          class="btn save-btn"
          :loading="loading"
          @click="save"
        >调用</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getContractName,
  getInstance,
  getMethod,
  getParam,
  // getDataType,
  callInstance
} from '@/api/chain-interaction'
import { getUserGroup } from '@/api/group'
import { isContractAddress } from '@/api/browser'

export default {
  data() {
    return {
      loading: false,
      contractForm: {
        groupId: '',
        contractId: '',
        instanceId: '',
        methodId: '',
        // type: undefined,
        params: {},
        paramsList: []
      },
      groupList: [],
      contractNameList: [],
      addressList: [],
      methodNameList: [],
      // dataTypeList: [],
      showAllInput: false,
      showAllLogs: false,
      result: {},
      rules: {
        groupId: [
          {
            required: true,
            message: '请选择Group',
            trigger: 'change'
          }
        ],
        contractId: [
          {
            required: true,
            message: '请选择合约',
            trigger: 'change'
          }
        ],
        instanceId: [
          {
            required: true,
            message: '请选择合约实例地址',
            trigger: 'change'
          }
        ],
        methodId: [
          {
            required: true,
            message: '请选择方法',
            trigger: 'change'
          }
        ]
        // type: [
        //   {
        //     required: true,
        //     message: '请选择数据类型',
        //     trigger: 'change'
        //   }
        // ]
      }
    }
  },
  created() {
    if (this.$route.query.data) {
      Object.assign(this.contractForm, JSON.parse(this.$route.query.data))
      this.contractForm.instanceId = this.contractForm.id
      this.getContractName()
      this.getInstance()
      this.getMethod()
      this.getParam()
    }
    this.getGroupList()
    // this.getDataType()
  },
  methods: {
    getGroupList() {
      getUserGroup().then(data => {
        this.groupList = data.data
        this.groupList.map(item => {
          item.label = item.group.join('-->')
        })
      })
    },
    changeGroup() {
      this.contractForm.contractId = ''
      this.contractForm.instanceId = ''
      this.contractForm.methodId = ''
      this.contractNameList = []
      this.addressList = []
      this.methodNameList = []
      this.contractForm.paramsList = []
      this.getContractName()
    },
    changeContractName() {
      this.contractForm.instanceId = ''
      this.contractForm.methodId = ''
      this.addressList = []
      this.methodNameList = []
      this.contractForm.paramsList = []
      this.getInstance()
    },
    changeAddress() {
      this.contractForm.methodId = ''
      this.methodNameList = []
      this.contractForm.paramsList = []
      this.getMethod()
    },
    changeMethodName() {
      this.contractForm.paramsList = []
      this.getParam()
    },
    getContractName() {
      getContractName({ groupId: this.contractForm.groupId }).then(data => {
        this.contractNameList = data.data
      })
    },
    getInstance() {
      getInstance({
        groupId: this.contractForm.groupId,
        contractId: this.contractForm.contractId
      }).then(data => {
        this.addressList = data.data
      })
    },
    getMethod() {
      getMethod({ contractId: this.contractForm.contractId }).then(data => {
        this.methodNameList = data.data
      })
    },
    getParam() {
      getParam({ methodId: this.contractForm.methodId }).then(data => {
        this.contractForm.paramsList = data.data
        this.$forceUpdate()
      })
    },
    // getDataType() {
    //   getDataType().then(data => {
    //     this.dataTypeList = data.data
    //   })
    // },
    add() {
      console.log(this.contractForm.paramsList)
      this.contractForm.paramsList.map(item => {
        console.log(this.contractForm.params)
        this.contractForm.params[item.name] = item.value
      })
      callInstance(this.contractForm)
        .then(data => {
          this.success(data.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    save() {
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
    change(e) {
      this.$forceUpdate()
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
    },
    toBreakWord(aString, intLen) {
      var strTemp = ''
      while (aString.length > intLen) {
        strTemp += aString.substr(0, intLen) + ' '
        aString = aString.substr(intLen, aString.length)
      }
      strTemp += ' ' + aString
      return strTemp
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
