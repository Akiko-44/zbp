<template>
  <AppView
    class="home"
    title="珠宝展"
    :clickLeft="back"
  >
    <!--<AppView >
			<van-nav-bar title="珠宝展" class="home" />-->

    <!-- <vr /> -->
    <banner />
    <Box
      :type="3"
      :position="2"
    />
    <Box
      :type="3"
      :position="3"
    />
    <Box
      :type="3"
      :position="4"
    />
    <Box
      :type="3"
      :position="5"
    />
    <Box
      :type="3"
      :position="6"
    />
    <!-- <Activity url="gallery-activity" :supType="7"/> -->

  </AppView>
</template>

<script>
import Vr from './vr'
import Banner from './banner'
import Box from '@/components/common/box'
import Activity from '@/components/common/activity'
import { NavBar } from 'vant';
export default {
  name: "jewelry",
  head() {
    return {
      title: '珠宝展'
    }
  },
  data() {
    return {
    }
  },
  beforeCreate() {
    if (process.browser) {
      window.onload = function () {
        setTimeout(function () {
          if (this.$native.isApp()) {
            this.$native.getTitle('珠宝展')
          }
        }, 1)
      }
    }
  },
  beforeMount() {
    if (this.$native.isApp()) {
      this.$native.getTitle('珠宝展')
    }
  },
  activated() {
    let that = this
    window.onload = function () {
      setTimeout(function () {
        if (that.$native.isApp()) {
          that.$native.getTitle('珠宝展')
        }
      }, 1)
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    back() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        history.back()
      }
    },
  },
  components: {
    Vr,
    Banner,
    Box,
    Activity,
    NavBar
  }
}
</script>

<style lang="postcss" scoped>
.home {
  background-color: var(--light-gray);
}
</style>