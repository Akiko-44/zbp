<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :inline="true"
      >
        <el-form-item label="区块链平台名称:">
          <el-input
            v-model="listParams.displayName"
            style="width: 195px;"
            placeholder="请输入区块链平台名称"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>

        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
        <el-button
          class="fr"
          type="warning"
          @click="$router.push({ name: 'modifyBlockChain' })"
        >添加</el-button>
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
        label="区块链平台名称"
      >
        <template slot-scope="{ row }">
          <span>{{ row.displayName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="简称"
      >
        <template slot-scope="{ row }">
          <span>{{ row.blockchainName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="是否启用"
        width="160"
      >
        <template slot-scope="{ row }">
          <span>{{ row.enabled == 1 ? "是" : "否" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="添加时间"
        width="160"
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
            size="small"
            @click="
              $router.push({ name: 'modifyBlockChain', query: { id: row.id } })
            "
          >修改</el-button>
          <el-button
            size="small"
            type="warning"
            @click="delSecond(row.id, $index)"
          >删除</el-button>
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
import { delEthPlatform, getEthPlatformList } from "@/api/system";

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        current: 1,
        size: 20,
        displayName: "",
        id: ""
      },
      createTime: [],
      buinessList: [],
      blockChainList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getEthPlatformList(this.listParams).then(data => {
        this.list = data.data.records;
        this.listLoading = false;
      });
    },
    delSecond(id, index) {
      this.$confirm("是否确认删除该区块链平台？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        delEthPlatform({ id: id })
          .then(data => {
            this.list.splice(index, 1);
          })
          .catch(() => { });
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
