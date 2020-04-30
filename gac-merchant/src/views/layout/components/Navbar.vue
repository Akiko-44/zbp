<template>
  <el-menu
    class="navbar"
    mode="horizontal"
  >
    <breadcrumb class="breadcrumb-container"></breadcrumb>
  </el-menu>
</template>

<script>

import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  margin-bottom: 10px;
  background: white;
  height: 40px;
  line-height: 40px;
  border-radius: 0px !important;
  border-bottom: 0;
  .breadcrumb-container {
    padding-left: 20px;
  }
}
</style>
