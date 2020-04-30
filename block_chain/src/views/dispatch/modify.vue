<template>
  <div class="app-container">
    <el-form
      ref="dispatchForm"
      :model="dispatchForm"
      :rules="rules"
      label-width="100px"
      class="listForm"
      style="width: 100%;"
    >
      <div class="filter-container">
        <el-form-item label="调度名称:" prop="name">
          <el-input
            v-model="dispatchForm.name"
            :maxlength="30"
            placeholder="请输入调度名称"
          />
        </el-form-item>

        <el-form-item label="上链平台:" prop="platformId">
          <el-radio-group v-model="dispatchForm.platformId">
            <el-radio
              v-for="item in platformList"
              :key="item.id"
              :label="item.id"
              >{{ item.displayName }}</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <el-form-item label="数据接入:" prop="platformId">
          <el-radio-group v-model="dispatchForm.dataAccess">
            <el-radio :label="1">SFTP</el-radio>
            <el-radio :label="0">DB</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="调度类型:" prop="scheduleType">
          <el-radio-group
            v-model="dispatchForm.scheduleType"
            @change="changeSchedule"
          >
            <el-radio :label="1">表达式调度</el-radio>
            <el-radio :label="2">定时器调度</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <el-form-item label="执行操作:" prop="action">
        <el-radio-group v-model="dispatchForm.action">
          <template v-if="dispatchForm.dataAccess === 1">
            <el-radio :label="4">SFTP数据抽取</el-radio>
            <el-radio :label="5">SFTP补数申请</el-radio>
            <el-radio :label="6">SFTP补数</el-radio>
            <el-radio v-if="dispatchForm.scheduleType === 1" :label="1"
              >SFTP数据上链</el-radio
            >
            <el-radio v-if="dispatchForm.scheduleType === 1" :label="7"
              >SFTP篡改验证申请</el-radio
            >
            <el-radio v-if="dispatchForm.scheduleType === 1" :label="8"
              >SFTP篡改验证</el-radio
            >
          </template>
          <template v-else>
            <el-radio :label="0">DB数据抽取</el-radio>
            <el-radio :label="3">DB补数</el-radio>
            <el-radio v-if="dispatchForm.scheduleType === 1" :label="1"
              >DB数据上链</el-radio
            >
            <el-radio v-if="dispatchForm.scheduleType === 1" :label="2"
              >DB篡改验证</el-radio
            >
          </template>
        </el-radio-group>
      </el-form-item>

      <div v-if="dispatchForm.scheduleType === 1" class="filter-container">
        <el-form-item label="调度周期:" prop="timePattern">
          <el-radio-group
            v-model="dispatchForm.timePattern"
            @change="changeTimePattern"
          >
            <el-radio :label="1">每日</el-radio>
            <el-radio :label="2">每周</el-radio>
            <el-radio :label="3">每月</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="执行时间:" prop="sendTime">
          <el-time-picker
            v-model="dispatchForm.sendTime"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="请选择执行时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="按星期:">
          <el-radio-group
            v-model="dispatchForm.weekPoint"
            prop="weekPoint"
            :disabled="weekDisabled"
          >
            <el-radio :label="1">星期一</el-radio>
            <el-radio :label="2">星期二</el-radio>
            <el-radio :label="3">星期三</el-radio>
            <el-radio :label="4">星期四</el-radio>
            <el-radio :label="5">星期五</el-radio>
            <el-radio :label="6">星期六</el-radio>
            <el-radio :label="7">星期日</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="按日期:" class="date-form-item">
          <el-radio-group
            v-model="dispatchForm.monthPoint"
            prop="monthPoint"
            :disabled="monthDisabled"
          >
            <el-radio v-for="item in 31" :key="item" :label="item"
              >{{ item }}号</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </div>
      <template v-else>
        <el-form-item class="is-required" prop="roundCycle" label="定时周期:">
          <el-input
            v-model="dispatchForm.roundCycle"
            style="width: 195px;margin-right: 10px;"
          />小时
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
</template>

<script>
import { getDispatch, saveDispatch } from "@/api/dispatch";
import { getAllPlatformList } from "@/api/common";

export default {
  data() {
    return {
      loading: false,
      dispatchForm: {
        id: undefined,
        name: "",
        scheduleType: 1,
        dataAccess: 1,
        platformId: undefined,
        action: 4,
        timePattern: 1,
        sendTime: "00:00",
        weekPoint: undefined,
        monthPoint: undefined,
        roundCycle: ""
      },
      weekDisabled: true,
      monthDisabled: true,
      platformList: [],
      rules: {
        name: [{ required: true, message: "请输入调度名称", trigger: "blur" }],
        sendTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        platformId: [
          { required: true, message: "请选择上链平台", trigger: "change" }
        ],
        dataAccess: [
          { required: true, message: "请选择数据接入", trigger: "change" }
        ],
        scheduleType: [
          { required: true, message: "请选择调度类型", trigger: "change" }
        ],
        action: [
          { required: true, message: "请选择执行操作", trigger: "change" }
        ],
        timePattern: [
          { required: true, message: "请选择调度周期", trigger: "change" }
        ],
        weekPoint: [{ required: true, message: "请选择", trigger: "change" }],
        monthPoint: [{ required: true, message: "请选择", trigger: "change" }],
        roundCycle: [
          // { required: true, message: '请输入合法的定时周期', trigger: 'blur' },
          {
            validator: this.validateRoundCycle,
            message: "请输入合法的定时周期",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getAllPlatformList();
  },
  methods: {
    getAllPlatformList() {
      getAllPlatformList().then(data => {
        this.platformList = data.data;
        if (this.$route.query.id) {
          this.dispatchForm.id = this.$route.query.id;
          this.getDispatch();
        } else {
          const myDate = new Date();
          this.dispatchForm.sendTime =
            myDate.getHours() + ":" + myDate.getMinutes();
          this.dispatchForm.platformId = this.platformList[0].id;
        }
      });
    },
    getDispatch() {
      getDispatch({ id: this.dispatchForm.id }).then(data => {
        this.dispatchForm = data.data;
        if (this.dispatchForm.timePattern === 2) {
          this.weekDisabled = false;
        } else if (this.dispatchForm.timePattern === 3) {
          this.monthDisabled = false;
        }
      });
    },
    add() {
      if (this.dispatchForm.scheduleType === 1) {
        this.dispatchForm.roundCycle = "";
      }
      saveDispatch(this.dispatchForm)
        .then(data => {
          this.success();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs.dispatchForm.validate(valid => {
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
        name: "dispatchPage"
      });
      this.loading = false;
    },
    changeSchedule(value) {
      if (value === 1) {
        this.dispatchForm.timePattern = 1;
        this.dispatchForm.sendTime = "00:00";
        this.dispatchForm.weekPoint = 1;
        this.dispatchForm.monthPoint = 1;
        this.dispatchForm.roundCycle = "";
      } else {
        this.dispatchForm.timePattern = undefined;
        this.dispatchForm.sendTime = "";
        this.dispatchForm.week = undefined;
        this.dispatchForm.monthPoint = undefined;
        this.dispatchForm.roundCycle = "";
      }
    },
    changeTimePattern(value) {
      if (value === 1) {
        this.weekDisabled = true;
        this.monthDisabled = true;
        this.dispatchForm.weekPoint = undefined;
        this.dispatchForm.monthPoint = undefined;
      } else if (value === 2) {
        this.weekDisabled = false;
        this.monthDisabled = true;
        this.dispatchForm.weekPoint = 1;
        this.dispatchForm.monthPoint = undefined;
      } else {
        this.weekDisabled = true;
        this.monthDisabled = false;
        this.dispatchForm.weekPoint = undefined;
        this.dispatchForm.monthPoint = 1;
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    validateRoundCycle(rule, value, callback) {
      const reg = /^[0-9]*$/;
      // if (this.dispatchForm.scheduleType === 2 && this.dispatchForm.action !== 3) {
      //   callback()
      //   return
      // }
      if (!value) {
        callback(new Error("请输入定时周期"));
      } else {
        if (!reg.test(value) || Number(value) > 24) {
          callback(new Error("请输入合法的定时周期"));
        } else {
          callback();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
/deep/ .date-form-item .el-radio {
  width: 50px;
  line-height: 2;
}
</style>
