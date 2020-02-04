<template>
  <AppView class="home">
  	<HeaderModule />
    <BannerModule />
   	<Box :type="1" :position="1"/>
   	<Box :type="1" :position="2"/>
   	<Box :type="1" :position="3"/>
   	<Box :type="1" :position="4"/>
   	<Box :type="1" :position="5"/>
   	<Box :type="1" :position="6"/>
   	<Activity url="gallery-activity" :supType="1"/>
  </AppView>
</template>

<script>
import BannerModule from './modules/banner'
import HeaderModule from './modules/header'
import Box from '@/components/common/box'
import Activity from '@/components/common/activity'
export default {
	head () {
    return {
      title: '图文馆'
    }
  },
  data () {
    if (this.$data) return
    return {
      query: {
        offset: 1,
        limit: 10
      }
    }
  },
  beforeCreate() {
    if (process.browser) {
      window.onload = function(){
        setTimeout(function(){
          if (this.$native.isApp()) {
			    	this.$native.getTitle('图文馆')
			    }
        },1)
      }
    }
  },
  beforeMount () {
    if (this.$native.isApp()) {
    	this.$native.getTitle('图文馆')
    }
  },
  activated () {
    let that = this
    window.onload = function(){
      setTimeout(function(){
        if (that.$native.isApp()) {
		    	that.$native.getTitle('图文馆')
		    }
      },1)
    }
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
    back () {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
//      history.back()
        this.$router.go(-1)
      }
    },
  },
  components: {
    BannerModule,
    HeaderModule,
    Box,
    Activity,
  }
}
</script>

<style lang="postcss" scoped>
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
