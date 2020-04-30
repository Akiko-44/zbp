<template>
  <div class="header">
    <van-nav-bar
      v-if="titleShow"
      @click-left="back"
      left-arrow
    >
      <div slot="title">
        <h4 class="logo-text">{{ title }}</h4>
      </div>
      <img
        src="../../../assets/images/icon/search-30.png"
        width="18"
        slot="right"
        style="vertical-align: middle;"
        @click="
          $router.push({
            name: 'jewelrySearch-wordSearch',
            query: { type: 'design' }
          })
        "
      />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      titleShow: false
    };
  },
  beforeMount() {
    if (this.$native.isApp()) {
      this.$native.getTitle(this.title);
      window.share = this.share;
    }
  },
  updated() {
    if (this.$native.isApp()) {
      this.$native.getTitle(this.title);
    }
  },
  activated() {
    if (
      !this.$native.isApp() &&
      !window.navigator.userAgent.includes("MicroMessenger")
    ) {
      this.titleShow = true;
    }
  },
  methods: {
    back() {
      if (this.$native.isApp()) {
        this.$native.goToJewelryCircle();
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.logo-text {
  font-size: 18px;
  display: inline-block;
  vertical-align: -1px;
}
</style>
