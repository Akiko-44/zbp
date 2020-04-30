<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="accountForm"
        :model="accountForm"
        :rules="rules"
        label-width="100px"
        class="listForm"
        style="width: 100%;"
      >
        <el-form-item
          label="手机号码:"
          prop="phone"
        >
          <el-input
            v-model="accountForm.phone"
            :disabled="!!id"
            :maxlength="11"
            placeholder="请输入手机号码"
          />
        </el-form-item>

        <el-form-item
          label="用户账号:"
          prop="userName"
        >
          <el-input
            :disabled="!!id"
            v-model="accountForm.userName"
            :maxlength="20"
            placeholder="请输入用户账号，20字以内"
          />
        </el-form-item>

        <el-form-item
          v-if="!id"
          label="设置密码:"
          prop="password"
        >
          <el-input
            v-model="accountForm.password"
            :maxlength="16"
            placeholder="请输入6-16位数字或字母"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          v-if="!id"
          label="确认密码:"
          prop="queryPassword"
        >
          <el-input
            v-model="accountForm.queryPassword"
            :maxlength="16"
            placeholder="请再次输入密码"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="助记词:"
          prop="mnemonics"
        >
          <el-input
            v-model="accountForm.mnemonics"
            disabled
            type="textarea"
            :rows="5"
            placeholder="请输入助记词，单词之间用空格隔开"
          />
        </el-form-item>

        <el-form-item
          v-if="id"
          label="公钥:"
          prop="mnemonics"
        >
          <el-input
            v-model="accountForm.publicKey"
            disabled
          />
        </el-form-item>

        <el-form-item
          v-if="id"
          label="私钥:"
          prop="mnemonics"
        >
          <el-input
            v-model="accountForm.privateKey"
            disabled
          />
        </el-form-item>

        <el-form-item
          v-if="id"
          label="钱包地址:"
          prop="mnemonics"
        >
          <el-input
            class="input-link"
            v-model="accountForm.walletAddress"
            @click.native="
              $router.push({
                name: 'walletAddress',
                query: { address: accountForm.walletAddress }
              })
            "
            readonly
          />
        </el-form-item>

        <el-form-item
          v-if="id"
          label="钱包余额:"
          prop="mnemonics"
        >
          <el-input
            v-model="walletAccount"
            disabled
            style="width: calc(100% - 200px);"
          />
          <el-select
            v-model="unit"
            style="width: 196px;"
            @change="changeUnit"
          >
            <el-option
              v-for="item in unitList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="id"
          label="keystore:"
          prop="mnemonics"
        >
          <el-input
            v-model="accountForm.keystorePath"
            disabled
          />
        </el-form-item>

        <el-form-item
          label="角色类型:"
          prop="type"
        >
          <el-radio-group
            v-model="accountForm.type"
            :disabled="!!id"
          >
            <el-radio :label="0">admin</el-radio>
            <el-radio :label="1">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="绑定Group:">
          <el-input
            v-if="!!id"
            v-model="groupNameStr"
            disabled
            type="textarea"
            :rows="5"
          />
          <template v-if="groupName.length && !id">
            <span
              v-for="(item, i) in groupName"
              :key="i"
            >{{ item.join("-->") }}
              <span v-if="i < groupName.length - 1">、</span>
            </span>
          </template>

          <el-button
            v-if="!(accountForm.groupId && accountForm.groupId.length) && !id"
            @click="openGroup"
          >
            绑定
          </el-button>
          <el-button
            v-if="accountForm.groupId && accountForm.groupId.length && !id"
            @click="openGroup"
          >
            重新绑定
          </el-button>
        </el-form-item>

        <div class="text-center">
          <el-button
            class="btn cancel-btn"
            @click="cancel"
          >{{
            id ? "返回" : "取消"
          }}</el-button>
          <el-button
            v-if="!id"
            type="primary"
            class="btn save-btn"
            :loading="loading"
            @click="save"
          >保存</el-button>
        </div>
      </el-form>
    </div>
    <group-dialog
      ref="groupDialog"
      @saveGroup="saveGroup"
    />
  </div>
</template>

<script>
import { addAccount, getAccountDetail, getMnemonics } from "@/api/account"

import { validMobile } from "@/utils/validate"
import groupDialog from "./group"

export default {
  components: {
    groupDialog
  },
  data() {
    return {
      loading: false,
      id: '',
      accountForm: {
        userName: '',
        phone: '',
        password: '',
        queryPassword: '',
        balance: '',
        type: undefined,
        groupId: ['1'],
        mnemonics: ''
      },
      walletAccount: undefined,
      unit: '1',
      unitList: [
        { value: '1', label: 'ether' },
        { value: '2', label: 'finney' },
        { value: '3', label: 'gwei' },
        { value: '4', label: 'wei' }
      ],
      groupName: [['public group']],
      groupNameStr: '',
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: this.validateMobile, trigger: 'blur' }
        ],
        mnemonics: [
          { required: true, message: '请输入助记词', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: this.validatePass, trigger: 'blur' }
        ],
        queryPassword: [
          { required: true, validator: this.validatePass2, trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择角色类型', trigger: 'change' }
        ],
        groupId: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个group绑定',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) {
      this.getAccountDetail()
    } else {
      this.getMnemonics()
    }
  },
  methods: {
    getMnemonics() {
      getMnemonics()
        .then(data => {
          this.accountForm.mnemonics = data.data
        })
        .catch(() => { })
    },
    getAccountDetail() {
      getAccountDetail({ userId: this.id })
        .then(data => {
          this.accountForm = data.data
          // this.groupName = this.accountForm.group;
          this.walletAccount = this.accountForm.balance
          let groupList = [];
          this.accountForm.group.map((item, index) => {
            groupList[index] = item.join('-->')
          })
          this.groupNameStr = groupList.join('、')
        })
        .catch(() => { });
    },
    changeUnit(val) {
      if (val === '1') {
        this.walletAccount = this.accountForm.balance
      } else if (val === '2') {
        this.walletAccount = this.accountForm.balance * Math.pow(10, 3)
      } else if (val === '3') {
        this.walletAccount = this.accountForm.balance * Math.pow(10, 9)
      } else if (val === '4') {
        this.walletAccount = this.accountForm.balance * Math.pow(10, 18)
      }
    },
    add() {
      addAccount(this.accountForm)
        .then(data => {
          this.success()
        })
        .catch(() => {
          this.loading = false
        })
    },
    save() {
      this.$refs.accountForm.validate(valid => {
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
        name: 'account'
      })
      this.loading = false
    },
    openGroup() {
      this.$refs.groupDialog.dialogTableVisible = true
      this.$refs.groupDialog.treeKey = this.accountForm.groupId
      this.$refs.groupDialog.getList()
    },
    saveGroup(ids, groupName) {
      this.accountForm.groupId = ids
      this.groupName = groupName
    },
    cancel() {
      this.$router.go(-1)
    },
    validateMobile(rule, value, callback) {
      if (!validMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    },
    validatePass(rule, value, callback) {
      const reg = /^[A-Za-z0-9]{6,16}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入6-16位数字或字母'))
      } else {
        if (this.accountForm.queryPassword !== '') {
          this.$refs.accountForm.validateField('queryPassword')
        }
        callback()
      }
    },
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.accountForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.filter-container {
  position: relative;
}
.button-box {
  margin-left: 100px;
}
.btn {
  width: 90px;
}
.price-box .el-form-item {
  display: inline-block;
  margin-right: 10px;
}
/deep/ .input-link input {
  background-color: #f5f7fa;
  border-color: #dfe4ed;
  color: $light-blue;
  cursor: pointer;
}
</style>
