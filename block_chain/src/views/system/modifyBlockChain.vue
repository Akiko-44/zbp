<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="blockChainForm"
        :model="blockChainForm"
        :rules="rules"
        label-width="140px"
        class="listForm"
        style="width: 100%;"
      >
        <el-form-item label="区块链平台名称:" prop="displayName">
          <el-input
            v-model="blockChainForm.displayName"
            :maxlength="30"
            placeholder="请输入区块链平台名称"
          />
        </el-form-item>

        <el-form-item label="区块链平台简称:" prop="blockchainName">
          <el-input
            v-model="blockChainForm.blockchainName"
            :maxlength="30"
            placeholder="请输入区块链平台简称"
          />
        </el-form-item>

        <el-form-item label="是否启用:" prop="enabled">
          <el-radio-group v-model="blockChainForm.enabled">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="区块链类型:" prop="enabled">
          <el-select
            v-model="blockChainForm.type"
            placeholder="请选择区块链类型"
            @change="$forceUpdate()"
            style="width: 100%;"
          >
            <el-option
              v-for="(item, i) in blockChainList"
              :key="i"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <template v-if="blockChainForm.type === 'ETH'">
          <el-form-item label="钱包文件:" prop="platformParams.keystore">
            <el-input
              v-model="blockChainForm.platformParams.keystore"
              :maxlength="30"
              placeholder="请输入钱包文件"
            />
          </el-form-item>

          <el-form-item label="密码:" prop="platformParams.password">
            <el-input
              v-model="blockChainForm.platformParams.password"
              placeholder="请输入密码"
              type="password"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item
            label="合约地址:"
            prop="platformParams.contract_address"
          >
            <el-input
              v-model="blockChainForm.platformParams.contract_address"
              :maxlength="30"
              placeholder="请输入合约地址"
            />
          </el-form-item>

          <el-form-item label="矿工费上限:" prop="platformParams.gasLimit">
            <el-input
              v-model="blockChainForm.platformParams.gasLimit"
              :maxlength="30"
              placeholder="请输入矿工费上限"
            />
          </el-form-item>

          <el-form-item
            label="钱包地址:"
            prop="platformParams.platform_address"
          >
            <el-input
              v-model="blockChainForm.platformParams.platform_address"
              :maxlength="30"
              placeholder="请输入钱包地址"
            />
          </el-form-item>

          <el-form-item label="URL:" prop="platformParams.url">
            <el-input
              v-model="blockChainForm.platformParams.url"
              :maxlength="30"
              placeholder="请输入URL"
            />
          </el-form-item>
        </template>

        <div class="text-center">
          <el-button class="btn cancel-btn" @click="cancel">取消</el-button>
          <el-button
            type="primary"
            class="btn save-btn"
            :loading="loading"
            @click="save"
            >保存</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveEthPlatform, getEthPlatform } from "@/api/system";
// import { getBlockChainList } from '@/api/common'
import { validURL } from "@/utils/validate";

export default {
  data() {
    return {
      loading: false,
      blockChainForm: {
        id: undefined,
        blockchainName: "",
        displayName: "",
        enabled: 1,
        type: "ETH",
        platformParams: {
          keystore: "",
          password: "",
          contract_address: "",
          gasLimit: "",
          platform_address: "",
          url: ""
        }
      },
      blockChainList: ["ETH", "EOS", "Fabric"],
      rules: {
        displayName: [
          { required: true, message: "请输入区块链平台名称", trigger: "blur" }
        ],
        blockchainName: [
          { required: true, message: "请输入区块链平台简称", trigger: "blur" }
        ],
        enabled: [
          { required: true, message: "请选择是否启用", trigger: "blur" }
        ],
        "platformParams.keystore": [
          { required: true, message: "请输入钱包文件", trigger: "blur" }
        ],
        "platformParams.platform_address": [
          { required: true, message: "请输入钱包地址", trigger: "blur" }
        ],
        "platformParams.password": [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // this.getBlockChainList()
    if (this.$route.query.id) {
      this.blockChainForm.id = this.$route.query.id;
      getEthPlatform({
        id: this.blockChainForm.id
      }).then(data => {
        this.blockChainForm = data.data;
      });
    }
  },
  methods: {
    // getBlockChainList() {
    //   getBlockChainList().then(data => {
    //     this.blockChainList = data.data
    //     if (this.$route.query.id) {
    //       this.blockChainForm.id = this.$route.query.id
    //       getEthPlatform({
    //         id: this.blockChainForm.id
    //       }).then(data => {
    //         this.blockChainForm = data.data
    //       })
    //     } else {
    //       this.blockChainForm.type = this.blockChainList[0].id
    //     }
    //   })
    // },
    add() {
      saveEthPlatform(this.blockChainForm)
        .then(data => {
          this.success();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs.blockChainForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.add();
        } else {
          this.$notify({
            title: "警告",
            message: "请务必填写必选项",
            type: "warning"
          });
          return false;
        }
      });
    },
    success() {
      this.$notify({
        title: "成功",
        message: "提交成功",
        type: "success",
        duration: 2000
      });
      this.$router.push({
        name: "blockChainPlatform"
      });
      this.loading = false;
    },
    cancel() {
      this.$router.go(-1);
    },
    validateUrl(rule, value, callback) {
      if (!validURL(value)) {
        callback(new Error("请输入正确的URL"));
      } else {
        callback();
      }
    },
    validatePass(rule, value, callback) {
      const reg = /^[A-Za-z0-9]{6,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入6-16位数字或字母"));
      } else {
        callback();
      }
    }
  }
};
</script>

<style scoped>
.filter-container {
  position: relative;
}
.btn {
  width: 90px;
}
.price-box .el-form-item {
  display: inline-block;
  margin-right: 10px;
}
</style>
