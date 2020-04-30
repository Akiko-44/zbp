<template>
  <el-dialog title="绑定Group" :visible.sync="dialogTableVisible">
    <div>
      <el-tree
        ref="groupTree"
        class="filter-tree"
        node-key="id"
        :data="treeData"
        check-strictly
        show-checkbox
        highlight-current
        :props="defaultProps"
        :filter-node-method="filterNode"
        default-expand-all
      />
    </div>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveGroup">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllGroup } from "@/api/group";
import waves from "@/directive/waves"; // 水波纹指令

export default {
  name: "GroupTree",
  directives: {
    waves
  },
  data() {
    return {
      dialogTableVisible: false,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "groupName"
      },
      treeKey: "",
      groupList: []
    };
  },
  methods: {
    getList() {
      getAllGroup().then(data => {
        this.treeData = data.data;
        this.treeData.map(item => {
          if (item.id === "1") {
            item.disabled = true;
          }
        });
        this.initAuthoritys();
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    initAuthoritys() {
      this.$refs.groupTree.setCheckedKeys(this.treeKey);
    },
    // 获取当前树节点和其父级节点
    getTreeNode(node, i) {
      if (node) {
        if (node.parent) {
          // 在数组头部添加元素
          this.groupList[i].unshift(node.data.groupName);
          // 递归
          this.getTreeNode(node.parent, i);
        }
      }
    },
    saveGroup() {
      // const nodes = this.$refs.groupTree.getCheckedNodes(true);
      const nodes = this.$refs.groupTree.getCheckedNodes();
      const ids = [];
      for (let i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].id);
        this.groupList[i] = [];
        this.getTreeNode(this.$refs.groupTree.getNode(nodes[i].id), i);
      }
      this.$emit("saveGroup", ids, this.groupList);
      this.dialogTableVisible = false;
    }
  }
};
</script>

<style scoped></style>
