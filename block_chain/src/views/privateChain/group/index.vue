<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="plus"
        @click="handlerAdd()"
        >添加</el-button
      >
    </div>
    <tree-table :data="data" :columns="columns" expand-all border>
      <el-table-column width="200px" align="center" label="标签" prop="tag" />
      <el-table-column
        width="200px"
        align="center"
        label="组织级别"
        prop="level"
      />
      <el-table-column
        width="200px"
        align="center"
        label="更新时间"
        prop="updateTime"
      />
      <el-table-column width="400px" align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button size="small" @click="handlerAdd(row)">
            添加
          </el-button>
          <el-button size="small" type="primary" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button size="small" type="danger" @click="delGroup(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import { getAllGroup, deleteGroup } from "@/api/group";
import TreeTable from "@/components/TreeTable";

export default {
  components: {
    TreeTable
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        current: 1,
        size: 20,
        groupName: ""
      },
      columns: [
        {
          text: "组织名称",
          value: "groupName"
        }
      ],
      data: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      // groupList(this.listParams).then(data => {
      //   this.list = data.data.records
      //   this.listLoading = false
      // })
      getAllGroup().then(data => {
        this.data = data.data;
        this.rename(this.data);
        this.listLoading = false;
      });
    },
    delGroup(id) {
      this.$confirm("是否确认删除该组织（包含子组织数据）？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        deleteGroup({ id })
          .then(data => {
            // this.list.splice(index, 1)
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          })
          .catch(() => {});
      });
    },
    handlerAdd(row) {
      this.$router.push({
        name: "groupModify",
        query: {
          parentId: row && row.id ? row.id : 0,
          level: row && row.level ? row.level + 1 : 1
        }
      });
    },
    handleUpdate(row) {
      this.$router.push({
        name: "groupModify",
        query: { parentId: row.parentId, id: row.id, level: row.level }
      });
    },
    // 前台属性名转换并添加属性
    rename(list = []) {
      if (list.length > 0) {
        list.map(item => {
          item.name = item.groupName;
          item._level = item.level;
          if (item.children && item.children.length > 0) {
            this.rename(item.children);
          }
        });
      }
      return list;
    }
    // handleFilter() {
    //   this.$refs.listQueryForm.validate(valid => {
    //     if (valid) {
    //       this.getList()
    //     } else {
    //       return false
    //     }
    //   })
    // },
    // handleSizeChange(val) {
    //   this.listParams.size = val
    //   this.getList()
    // },
    // handleCurrentChange(val) {
    //   this.listParams.current = val
    //   this.getList()
    // }
  }
};
</script>

<style lang="postcss" scoped>
/* /deep/ .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} */
</style>
