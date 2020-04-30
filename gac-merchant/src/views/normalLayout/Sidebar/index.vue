<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      v-if="show"
      mode="vertical"
      :default-active="$route.path"
      text-color="#666666"
      active-text-color="#3D87FD"
      ref="menu"
      :default-openeds="openIndex"
      @close="closeMenu"
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
import { page } from '@/api/common/mid';
import { getInfo, getMerchantInfo } from '@/api/makeMerchant/center';
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['sidebar', 'routers'])
  },
  data() {
    return {
      show: true,
      getMid: false,
      openIndex: []
    }
  },
  created() {
    this.getOpenIndex()
    // page().then(data => {
    //   if (data.data) {
    //     this.getMid = true
    //   }
    // })
    // getMerchantInfo().then(data => {
    //   if (
    //     data.data.isCheck === 0 ||
    //     data.data.isCheck === 1 ||
    //     data.data.isCheck === 2 ||
    //     data.data.isCheck === 11 ||
    //     data.data.isCheck === 12 ||
    //     this.getMid
    //   ) {
    //     this.routers[0].children[6].hidden = true
    //     this.show = false
    //     this.$nextTick(() => {
    //       this.show = true
    //     })
    //   }
    //   if (data.data.registType !== 1) {
    //     this.routers[0].children[6].meta.title = '对公打款认证';
    //   }
    // })
    // getInfo().then(data => {
    //   if (data.data.userType === 3) {
    //     this.routers[0].children[7].hidden = true
    //     this.show = false
    //     this.$nextTick(() => {
    //       this.show = true
    //     })
    //   }
    // })
  },
  methods: {
    getOpenIndex() {
      this.routers.map(item => {
        if (item.name && !item.hidden) {
          this.openIndex.push(item.name)
        }
      })
    },
    closeMenu(index) {
      this.$refs.menu.open(index)
    }
  }
}
</script>
