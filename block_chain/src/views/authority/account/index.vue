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
          label="手机号码:"
          prop="phone"
        >
          <el-input
            v-model="listParams.phone"
            style="width: 195px;"
            placeholder="请输入手机号码"
            :maxlength="11"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item label="用户账号:">
          <el-input
            v-model="listParams.userName"
            style="width: 195px;"
            placeholder="请输入用户账号"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          查找
        </el-button>
        <el-button
          class="fr"
          type="warning"
          @click="$router.push({ name: 'addAccount' })"
        >
          添加
        </el-button>
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
        type="index"
        align="center"
        width="50"
        label="序号"
      />

      <el-table-column
        align="center"
        label="手机号码"
      >
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="用户账号"
      >
        <template slot-scope="{ row }">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="角色类型"
      >
        <template slot-scope="{ row }">
          <span>{{ roleMap[row.type] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="添加时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="center"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="row.userName !== 'admin'"
            size="small"
            type="warning"
            @click="delAccount(row.id, $index)"
          >删除</el-button>
          <el-button
            size="small"
            @click="toAccountDetail(row.id)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 50]"
        :total="total"
        :page-size="listParams.size"
        :current-page.sync="listParams.current"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { deleteAccount, accountList } from "@/api/account";

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        current: 1,
        size: 20,
        userName: "",
        phone: ""
      },
      roleMap: {
        0: "admin",
        1: "普通用户"
      },
      groupMap: {
        1: "中宝平",
        2: "好实再"
      },
      rules: {
        phone: [
          {
            pattern: /^[0-9]*$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      accountList(this.listParams).then(data => {
        this.list = data.data.records;
        this.total = data.data.total;
        this.listLoading = false;
      });
    },
    delAccount(id, index) {
      this.$confirm("是否确认删除该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        deleteAccount({ id })
          .then(data => {
            this.list.splice(index, 1);
            this.total -= 1;
          })
          .catch(() => { });
      });
    },
    toAccountDetail(id) {
      this.$router.push({
        name: "accountDetail",
        query: { id }
      });
    },
    handleFilter() {
      this.$refs.listQueryForm.validate(valid => {
        if (valid) {
          this.getList();
        } else {
          return false;
        }
      });
    },
    handleSizeChange(val) {
      this.listParams.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listParams.current = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
.no-btn-text {
  display: inline-block;
  width: 56px;
  text-align: center;
}
</style>
