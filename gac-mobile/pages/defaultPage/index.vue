<template>
  <AppView title="页面建设中">
    <div class="default">
      <img
        src="../../assets/images/default_page.png"
        alt=""
      >
      <p>页面建设中</p>
    </div>
  </AppView>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="postcss" scoped>
.default {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 331px;
  height: 193px;
  margin-top: -92px;
  margin-left: -165px;
  & img {
    width: 100%;
  }
  & p {
    position: absolute;
    bottom: 18px;
    left: 50%;
    margin-left: -40px;
  }
}
</style>
