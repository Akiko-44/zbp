<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      v-if="show"
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      unique-opened
    >
      <sidebar-item
        v-for="route in routers"
        :key="route.name"
        :item="route"
        :base-path="route.path"
      ></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
// import { getInfo } from '@/api/jewelryMerchant/merchant'
import { getInfo, getMerchantInfo } from '@/api/makeMerchant/center'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'routers'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      show: true
    }
  },
  created() {
    getMerchantInfo().then(data => {
      if (data.data.isCheck === 0 || data.data.isCheck === 1 || data.data.isCheck === 2 || data.data.isCheck === 11 || data.data.isCheck === 12) {
        this.routers[0].children[6].hidden = true
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
      if (data.data.registType !== 1) {
        this.routers[0].children[6].meta.title = '对公打款认证'
      }
    })
    getInfo().then(data => {
      // localStorage.setItem('userType', data.data.userType)
      if (data.data.userType === 3) {
        this.routers[0].children[7].hidden = true
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    })
  }
}
</script>
