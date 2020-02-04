<template>
  <section>
    <!-- <iframe
      class="vrbanner"
      :src="vrsite"
    ></iframe> -->
    <div class="vrbanner"></div>
    <!-- <div
      class="btn"
      @click="toVr"
    >
      <van-icon
        name="search"
        color="#fff"
      />
    </div> -->
  </section>
</template>
<script>
export default {
  data() {
    return {
      vrsite: null,
    }
  },
  beforeMount() {
    // this.$service('jewelryVRList', { params: { classIFY: 1, num: 1 } })
    //   .then(result => {
    //     this.vrsite = result.data[0].vrsite + "&output=embed"
    //   })
  },
  methods: {
    toVr() {
      this.$router.push({
        name: 'jewelryFair-vr',
        query: {
          src: this.vrsite
        }
      })
    },

  }
}
</script>
<style scoped>
section {
  position: relative;
}
.vrbanner {
  width: 100vw;
  height: 32vh;
  background: url("http://image.gacjc.com/pic_1rvQrKUoSomRF2y_1200_400.jpg?imageView2/2/format/webp");
  background-size: cover;
}
.btn {
  position: absolute;
  color: 333;
  padding: 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  left: 10px;
  bottom: 10px;
}
</style>