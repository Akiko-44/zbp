<template>
  <div>
    <div>
      <el-tree
        ref="menuTree"
        class="filter-tree"
        :check-strictly="checkStrictly"
        node-key="id"
        :data="treeData"
        show-checkbox
        highlight-current
        :props="defaultProps"
        :filter-node-method="filterNode"
        default-expand-all
        @node-click="getNodeData"
      />
    </div>
    <div class="text-center">
      <el-button
        type="primary"
        @click="update"
      >保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getRoleMenu, bindMenu } from '@/api/role'

export default {
  name: 'GroupMenu',
  data() {
    return {
      roleId: '',
      filterText: '',
      list: null,
      total: null,
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkStrictly: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val)
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      this.checkStrictly = true
      getRoleMenu({ roleId: this.roleId }).then(data => {
        this.treeData = data.data.roleMenu
        this.initAuthoritys()
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData(data) { },
    update() {
      this.$emit('closeAuthorityDialog')
      const nodes = this.$refs.menuTree.getCheckedNodes(false, true)
      const ids = []
      for (let i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].id)
      }
      bindMenu({
        roleId: this.roleId,
        menuIds: ids
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    initAuthoritys() {
      const ids = this.collectId(this.treeData)
      this.$refs.menuTree.setCheckedKeys(ids)
      this.checkStrictly = false
    },
    collectId(arr, ids = []) {
      arr.forEach(({ id, children, spread }) => {
        if (spread) {
          ids.push(id)
        }
        if (children) {
          this.collectId(children, ids)
        }
      })
      return ids
    },
    cancel() {
      this.$emit('closeAuthorityDialog')
    }
  }
}
</script>
