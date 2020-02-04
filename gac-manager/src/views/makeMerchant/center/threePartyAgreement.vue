<template>
  <el-dialog
    title="TN自由划付业务合作协议（三方协议）"
    :visible.sync="dialogVisible"
  >
    <div class="agreement-main">
      <p><img src="../../../assets/image/protocol01.jpg" /></p>
      <p><img src="../../../assets/image/protocol02.jpg" /></p>
      <p><img src="../../../assets/image/protocol03.jpg" /></p>
      <p><img src="../../../assets/image/protocol04.jpg" /></p>
      <p><img src="../../../assets/image/protocol05.jpg" /></p>
      <p><img src="../../../assets/image/protocol06.jpg" /></p>
      <p><img src="../../../assets/image/protocol07.jpg" /></p>
      <p><img src="../../../assets/image/protocol08.jpg" /></p>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="dialogVisible = false"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.agreement-main {
  max-height: 500px;
  overflow-y: scroll;
  p {
    margin: 0;
  }
  img {
    width: 100%;
  }
}
</style>
