<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="contractForm"
        :model="contractForm"
        :rules="rules"
        label-width="100px"
        class="listForm"
      >
        <el-form-item
          label="Group:"
          prop="groupIds"
        >
          <el-select
            v-model="contractForm.groupIds"
            multiple
            placeholder="请选择Group"
            style="width: 100%;"
            @change="groupChange"
          >
            <el-option
              v-for="item in groupList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="合约类型:"
          prop="type"
        >
          <el-radio-group
            v-model="contractForm.type"
            disabled
          >
            <el-radio :label="0">公有合约</el-radio>
            <el-radio :label="1">私有合约</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- <el-form-item
          label="合约名:"
          prop="合约名"
        >
          <el-input
            v-model="contractForm.name"
            placeholder="请输入合约名"
            type="text"
            autocomplete="off"
          />
        </el-form-item> -->

        <el-form-item
          label="合约名:"
          prop="name"
        >
          <el-select
            v-model="contractForm.name"
            placeholder="请选择合约名"
            style="width: 100%;"
          >
            <el-option
              v-for="(item,index) in contractList"
              :key="index"
              :label="item.contract"
              :value="item.contract"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="btn save-btn"
            :loading="loading"
            @click="save"
          >确定</el-button>
          <el-button
            class="btn cancel-btn"
            @click="cancel"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveContract, getContract } from '@/api/chain-interaction'
import { getUserGroup } from '@/api/group'

export default {
  data() {
    return {
      loading: false,
      contractForm: {
        name: '',
        type: 0,
        groupIds: []
      },
      groupList: [],
      contractList: [],
      rules: {
        type: [
          { required: true, message: '请选择角色类型', trigger: 'change' }
        ],
        groupIds: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个group绑定',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请选择合约名',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getGroupList()
    this.getContractList()
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
    getContractList() {
      getContract().then(data => {
        this.contractList = data.data
        // this.groupList = data.data
        // this.groupList.map(item => {
        //   item.label = item.group.join('-->')
        // })
      })
    },
    groupChange(val) {
      if (val.length && val.includes('1')) {
        this.contractForm.type = 0
        this.groupList.map(item => {
          if (item.id !== '1') {
            item.disabled = true
          }
        })
      } else if (val.length && !val.includes('1')) {
        this.contractForm.type = 1
        this.groupList.map(item => {
          if (item.id === '1') {
            item.disabled = true
          }
        })
      } else {
        this.groupList.map(item => {
          item.disabled = false
        })
      }
    },
    add() {
      saveContract(this.contractForm)
        .then(data => {
          this.success()
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
    success() {
      this.$notify({
        title: '成功',
        message: '提交成功',
        type: 'success',
        duration: 2000
      })
      this.$router.push({
        name: 'privateContractManagement'
      })
      this.loading = false
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
</style>
