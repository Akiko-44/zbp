<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      class="ruleForm"
      style="width: 100%;"
    >
      <el-form-item label="菜单名称:" prop="name">
        <el-input v-model="form.name" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="图标:" prop="icon">
        <el-input v-model="form.icon" placeholder="请输入图标" />
      </el-form-item>
      <el-form-item label="路径编码:" prop="code">
        <el-input v-model="form.code" placeholder="请输入路径编码" />
      </el-form-item>
      <el-form-item label="资源路径:" prop="href">
        <el-input v-model="form.href" placeholder="请输入资源路径" />
      </el-form-item>
      <!-- <el-form-item
        label="类型"
        prop="type"
      >
        <el-select
          v-model="form.type"
          class="filter-item"
          placeholder="请输入资源请求类型"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="排序:" prop="order">
        <el-input
          v-model.number="form.order"
          type="number"
          maxlength="2"
          placeholder="请输入排序"
        />
      </el-form-item>
    </el-form>
    <div class="text-center">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="update('form')">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { getMenu, saveOrUpdateMenu } from "@/api/menu";

export default {
  name: "MenuAdd",
  components: {},
  data() {
    return {
      typeOptions: ["menu", "dirt"],
      form: {
        id: undefined,
        code: undefined,
        name: undefined,
        parentId: undefined,
        href: undefined,
        icon: undefined,
        order: 1,
        level: undefined,
        levelNum: undefined
      },
      rules: {
        code: [{ required: true, message: "请输入路径编码", trigger: "blur" }],
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        href: [{ required: true, message: "请输入资源路径", trigger: "blur" }],
        icon: [{ required: true, message: "请输入图标", trigger: "blur" }],
        order: [{ required: true, message: "请输入排序", trigger: "blur" }]
      }
    };
  },
  created() {
    this.form.parentId = this.$route.query.parentId;
    this.form.levelNum = this.$route.query.levelNum;
    if (this.form.levelNum === 1) {
      this.form.level = "一级菜单";
    } else if (this.form.levelNum === 2) {
      this.form.level = "二级菜单";
    } else if (this.form.levelNum === 3) {
      this.form.level = "三级菜单";
    }
    if (this.$route.query.id) {
      this.form.id = this.$route.query.id;
      getMenu(this.form.id).then(data => {
        this.form = data.data;
      });
    }
  },
  methods: {
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          saveOrUpdateMenu(this.form).then(() => {
            this.$notify({
              name: "成功",
              message: "提交成功",
              type: "success",
              duration: 2000
            });
            this.success();
          });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    success() {
      this.$router.push({ name: "menu" });
    }
  }
};
</script>

<style scoped>
.image {
  max-width: 80%;
  max-height: 100%;
  display: block;
  margin: 10px auto 0;
}
</style>
