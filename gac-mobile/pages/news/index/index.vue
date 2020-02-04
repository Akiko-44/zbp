<template>
  <AppView class="home">
    <van-icon
      slot="nav-bar-right"
      name="more-o"
      @click="classify"
    />
    <!-- <HeaderModule /> -->
    <BannerModule />
    <!--<div class="setPad">
	   	<Sincerity/>
	   	<Patent/>
	   	<Traceability/>
	   	<Bulletin/>
   	</div>-->
    <Box
      :type="2"
      :position="1"
    />
    <Box
      :type="2"
      :position="2"
    />
    <Box
      :type="2"
      :position="3"
    />
    <Box
      :type="2"
      :position="4"
    />

    <!-- <Activity url="gallery-activity"
              :supType="6" /> -->
  </AppView>
</template>
<script>
import BannerModule from './modules/banner'
import HeaderModule from './modules/header'
import Patent from './modules/patent'
import Sincerity from './modules/Sincerity'
import Bulletin from './modules/bulletin'
import Traceability from './modules/Traceability'
import Box from '@/components/common/box'
import Activity from '@/components/common/activity'
export default {
  head() {
    return {
      title: '热点资讯'
    }
  },
  data() {
    if (this.$data) return
    return {
      query: {
        offset: 1,
        limit: 10
      },
      flag: false
    }
  },
  beforeCreate() {
    if (process.browser) {
      if (this.$native.isApp()) {
        this.$native.getTitle('热点资讯')
      }
    }
  },
  activated() {
    let that = this
    window.onload = function () {
      setTimeout(function () {
        if (that.$native.isApp()) {
          that.$native.getTitle('热点资讯')
        }
      }, 1)
    }
  },
  deactivated() {
    this.$destroy()
  },
  updated() {
    let that = this
    window.onload = function () {
      setTimeout(function () {
        if (that.$native.isApp()) {
          that.$native.getTitle('热点资讯')
        }
      }, 1)
    }
  },
  methods: {
    back() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        history.back()
      }
    },
    classify() {
      this.$router.push({
        name: 'news-classify',
      })
    }
  },
  components: {
    BannerModule,
    HeaderModule,
    Box,
    Activity,
    Patent,
    Bulletin,
    Traceability,
    Sincerity
  }
}
</script>

<style lang="postcss" scoped>
.setPad {
  padding: 0 2.5%;
}
.home {
  background-color: var(--light-gray);
}
.list-module {
  padding: 12px;
  background-color: white;
  & .item {
    margin-bottom: 10px;
  }
}
</style>
