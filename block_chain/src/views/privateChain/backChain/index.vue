<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :rules="rules"
        :inline="true"
      >
        <el-form-item
          label="Group:"
          prop="groupId"
        >
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
        <el-form-item
          label="合约名:"
          prop="contractId"
        >
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
        <!-- <el-form-item
          label="数据类型:"
          prop="type"
        >
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
        <el-form-item
          label="溯源码:"
          prop="sourceCode"
        >
          <el-input
            v-model.trim="listParams.sourceCode"
            style="width: 195px;"
            placeholder="请输入溯源码"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-button
          type="primary"
          @click="handleFilter"
        >查询</el-button>
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
        label="上链时间"
        width="200"
      >
        <template slot-scope="{ row }">
          <span>
            {{ row.timestamp }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="交易hash"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({name: 'transactionHash',query: { hash: row.transactionHash }})">{{ row.transactionHash }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="100"
        label="区块号"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({name: 'blockHeight',query: { blockNumber: row.blockNumber }})">{{ row.blockNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="text"
            @click="$router.push({name: 'backChainDataDetail',query: {id: row.id}})"
          >数据详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getContractName } from '@/api/chain-interaction'
import { getUserGroup, getDataHistory } from '@/api/group'

export default {
  data() {
    return {
      groupList: [],
      contractList: [],
      listParams: {
        groupId: '',
        contractId: '',
        sourceCode: ''
        // type: ''
      },
      list: null,
      listLoading: false,
      // typeMap: {
      //   '1': '商品',
      //   '2': '订单'
      // },
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
            message: '请选择合约名',
            trigger: 'change'
          }
        ],
        // type: [
        //   {
        //     required: true,
        //     message: '请选择数据类型',
        //     trigger: 'change'
        //   }
        // ],
        sourceCode: [
          { required: true, message: '请输入溯源码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route: 'fetchData'
  },
  async created() {
    this.getGroupList()
    if (this.$route.query.groupId) {
      this.listParams.groupId = this.$route.query.groupId
      this.listParams.contractId = this.$route.query.id
    }
    if (this.$route.query.groupId && this.$route.query.contractId) {
      this.fetchData()
      this.getContractList()
    }
  },
  methods: {
    fetchData() {
      this.listParams.groupId = this.$route.query.groupId
      this.listParams.contractId = this.$route.query.contractId
      this.listParams.sourceCode = this.$route.query.sourceCode
      // this.listParams.type = this.$route.query.type
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
      getDataHistory(this.listParams).then(data => {
        this.list = data.data
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs.listQueryForm.validate(valid => {
        if (valid) {
          this.$router.replace({
            name: 'backChain',
            query: {
              groupId: this.listParams.groupId,
              contractId: this.listParams.contractId,
              sourceCode: this.listParams.sourceCode
              // type: this.listParams.type
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
