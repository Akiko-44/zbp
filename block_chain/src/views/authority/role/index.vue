<template>
  <div class="app-container">
    <el-table
      v-loading.body="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" align="center" width="50" label="序号" />

      <el-table-column align="center" label="角色名称">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编辑时间">
        <template slot-scope="{ row }">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            type="primary"
            @click="bindMenuHandler(row.id, $index)"
            >绑定菜单</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="bindMenuName"
      size="large"
      :visible.sync="bindMenuVisible"
    >
      <bind-menu-dialog
        ref="bindMenu"
        @closeAuthorityDialog="closeAuthorityDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import { roleList } from "@/api/role";

export default {
  components: {
    "bind-menu-dialog": () => import("./bindMenuDialog")
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        current: 1,
        size: 20
      },
      bindMenuVisible: false,
      bindMenuName: "关联菜单",
      currentId: -1
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      roleList(this.listParams).then(data => {
        this.list = data.data;
        this.listLoading = false;
      });
    },
    bindMenuHandler(id) {
      this.bindMenuVisible = true;
      this.$nextTick(() => {
        this.$refs.bindMenu.roleId = id;
        this.$refs.bindMenu.getList();
      });
    },
    closeAuthorityDialog() {
      this.bindMenuVisible = false;
    }
  }
};
</script>
