<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="logo">
      
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      ref="menu"
    >
      <sidebar-item :routes="permissionMenus"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permissionMenus',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    if (this.permissionMenus[0] && this.permissionMenus[0].code) {
      this.$refs.menu.open(this.permissionMenus[0].code)
    }
  }
}
</script>
