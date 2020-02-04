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
      <!-- <i
        slot="right"
        class="ico-search-30"
        style="margin-right: 15px;"
        v-if="showSearch"
        @click="
          $router.push({
            name: 'jewelrySearch-wordSearch',
            query: { type: 'jewelryCircle' }
          })
        "
      ></i> -->
      <img
        src="../../../../assets/images/icon/search-30.png"
        width="18"
        slot="right"
        style="margin-right: 15px;vertical-align: middle;"
        v-if="showSearch"
        @click="
          $router.push({
            name: 'jewelrySearch-wordSearch',
            query: { type: 'jewelryCircle' }
          })
        ">
      <img
        src="../../../../assets/images/icon/share-circle.png"
        width="18"
        slot="right"
        style="vertical-align: middle;"
        @click="showShare">
    </van-nav-bar>
    <Share
      :info="info"
      ref="share"
    />
  </div>
</template>

<script>
import Share from '~/components/common/share'
export default {
  components: {
    Share
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    },
    showSearch: {
      typw: Boolean,
      default: false
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      titleShow: false
    }
  },
  beforeMount() {
    if (this.$native.isApp()) {
      this.$native.getTitle(this.title)
      window.share = this.share
    }
  },
  updated() {
    if (this.$native.isApp()) {
      this.$native.getTitle(this.title)
    }
  },
  activated() {
    if (
      !this.$native.isApp() &&
      !window.navigator.userAgent.includes('MicroMessenger')
    ) {
      this.titleShow = true
    }
  },
  methods: {
    back() {
      if (this.$native.isApp()) {
        this.$native.goToJewelryCircle()
      } else {
        this.$router.go(-1)
      }
    },
    showShare() {
      this.$refs.share.show()
      this.$service("jewelryCircleShare").then(result => { })
    },
    share() {
      this.$refs.share.show()
    }
  }
}

</script>

<style lang="postcss" scoped>
.logo-text {
  font-size: 18px;
  display: inline-block;
  vertical-align: -1px;
}
</style>
