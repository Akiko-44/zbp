<template>
  <div>
    <img :src="img" width="100%" />
  </div>
</template>

<style lang="postcss" scoped></style>

<script>
export default {
  data() {
    return {
      img: "http://app.gacjc.com/app/download/help/auction.jpg"
    };
  },
  head() {
    return {
      title: "竞拍协议"
    };
  }
};
</script>
