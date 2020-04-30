<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="groupForm"
        :model="groupForm"
        :rules="rules"
        label-width="100px"
        class="listForm"
        style="width: 100%;"
      >
        <el-form-item label="组织名称:" prop="groupName">
          <el-input
            v-model="groupForm.groupName"
            :maxlength="30"
            placeholder="请输入组织名称，30字以内"
          />
        </el-form-item>

        <el-form-item label="标签:" prop="tag">
          <el-input v-model="groupForm.tag" placeholder="请输入标签" />
        </el-form-item>

        <el-form-item label="排序" prop="order">
          <el-input
            v-model.number="groupForm.order"
            :min="1"
            type="number"
            maxlength="2"
            placeholder="请输入排序"
          />
        </el-form-item>
      </el-form>
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
    </div>
  </div>
</template>

<script>
import { getGroup, addGroup } from "@/api/group";

export default {
  data() {
    return {
      loading: false,
      groupForm: {
        id: undefined,
        groupName: "",
        tag: "",
        order: 1,
        level: undefined,
        parentId: ""
      },
      rules: {
        groupName: [
          { required: true, message: "请输入组织名称", trigger: "blur" }
        ],
        tag: [{ required: true, message: "请输入标签", trigger: "blur" }],
        order: [{ required: true, message: "请输入排序", trigger: "blur" }]
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      getGroup({ id: this.$route.query.id }).then(data => {
        this.groupForm = data.data;
        this.groupForm.id = this.$route.query.id;
      });
    }
  },
  methods: {
    add() {
      this.groupForm.level = this.$route.query.level;
      this.groupForm.parentId = this.$route.query.parentId;
      addGroup(this.groupForm)
        .then(data => {
          this.success();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs.groupForm.validate(valid => {
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
        name: "group"
      });
      this.loading = false;
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
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
</style>
