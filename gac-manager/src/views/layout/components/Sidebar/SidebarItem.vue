<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="'/'+item.code+'/'+item.children[0].code"
        :key="item.children[0].id">
        <el-menu-item :index="item.code+'/'+item.children[0].code" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].icon" :icon-class="item.children[0].icon"></svg-icon>
          <span v-if="item.children[0].title" slot="title">{{item.children[0].title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.code" :key="item.id">
        <template slot="title">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item.title" slot="title">{{item.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.id"></sidebar-item>

          <router-link v-else :to="'/'+item.code+'/'+child.code" :key="child.id">
            <el-menu-item :index="'/'+item.code+'/'+child.code">
              <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
              <span v-if="child.title" slot="title">{{child.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  }
}
</script>

