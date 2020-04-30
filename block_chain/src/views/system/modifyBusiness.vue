<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="buinessForm"
        :model="buinessForm"
        :rules="rules"
        label-width="140px"
        class="listForm"
        style="width: 100%;"
      >
        <el-form-item label="平台名称（中文）:" prop="displayName">
          <el-input
            v-model="buinessForm.displayName"
            :maxlength="30"
            placeholder="请输入平台名称，30字以内"
          />
        </el-form-item>

        <el-form-item label="平台名称（英文）:" prop="platformName">
          <el-input
            v-model="buinessForm.platformName"
            :maxlength="30"
            placeholder="请输入平台名称，30字以内"
          />
        </el-form-item>

        <el-form-item label="是否回调上链平台:" prop="callback">
          <el-radio-group
            v-model="buinessForm.callback"
            @change="changeCallBack"
          >
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="请求回调地址URL:" prop="callbackUrl">
          <el-input
            v-model="buinessForm.callbackUrl"
            :disabled="!buinessForm.callback"
            placeholder="请输入请求回调地址URL"
          />
        </el-form-item>

        <el-form-item label="是否验证回调:" prop="checkCallback">
          <el-radio-group
            v-model="buinessForm.checkCallback"
            @change="changeCheckCallBack"
          >
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="请求验证回调URL:" prop="checkCallbackUrl">
          <el-input
            v-model="buinessForm.checkCallbackUrl"
            :disabled="!buinessForm.checkCallback"
            placeholder="请输入请求回调地址URL"
          />
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="buinessForm.password"
            :maxlength="16"
            placeholder="请输入密码"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="是否启用:" prop="isEnable">
          <el-radio-group v-model="buinessForm.enabled">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

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
import { getPlatform, savePlatform } from "@/api/system";
import { validURL } from "@/utils/validate";

export default {
  data() {
    return {
      loading: false,
      buinessForm: {
        displayName: "",
        platformName: "",
        callback: 1,
        callbackUrl: "",
        checkCallback: 1,
        checkCallbackUrl: "",
        password: "",
        enabled: 1
      },
      rules: {
        displayName: [
          { required: true, message: "请输入平台名称", trigger: "blur" }
        ],
        platformName: [
          { required: true, message: "请输入平台名称", trigger: "blur" }
        ],
        callbackUrl: [
          { required: true, validator: this.validateUrl, trigger: "blur" }
        ],
        checkCallbackUrl: [
          { required: true, validator: this.validateCheckUrl, trigger: "blur" }
        ],
        password: [
          { required: true, validator: this.validatePass, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      this.buinessForm.id = this.$route.query.id;
      getPlatform(this.buinessForm.id).then(data => {
        this.buinessForm = data.data;
      });
    }
  },
  methods: {
    add() {
      savePlatform(this.buinessForm)
        .then(data => {
          this.success();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs.buinessForm.validate(valid => {
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
        name: "businessPlatform"
      });
      this.loading = false;
    },
    changeCallBack(val) {
      if (!val) {
        this.buinessForm.callbackUrl = "";
        this.$refs.buinessForm.validateField("callbackUrl");
      }
    },
    changeCheckCallBack(val) {
      if (!val) {
        this.buinessForm.checkCallbackUrl = "";
        this.$refs.buinessForm.validateField("checkCallbackUrl");
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    validateUrl(rule, value, callback) {
      if (!this.buinessForm.callback) {
        callback();
        return;
      }
      if (!validURL(value)) {
        callback(new Error("请输入正确的URL"));
      } else {
        callback();
      }
    },
    validateCheckUrl(rule, value, callback) {
      if (!this.buinessForm.checkCallback) {
        callback();
        return;
      }
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
