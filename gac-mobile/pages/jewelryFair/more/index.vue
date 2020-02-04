<template>
	<AppView class="home" :title="title" :class="{alpha:alpha}">
		<template v-if="$route.query.position<4">
			<more1 :exhibition_type="$route.query.position-1" v-on:lock="lock"/>
		</template>
		<template v-if="$route.query.position>3">
			<more2 :id="$route.query.id"/>
		</template>
	</AppView>
</template>

<script scoped>
	import More1 from './more1'
	import More2 from './more2'
	export default {
		data() {
			return {
				alpha:false,
				title: this.$route.query.title,
			}
		},
		components: {More2,More1},
		beforeMount() {
      if (this.$native.isApp()) {
	    	this.$native.getTitle(this.title)
	    }
    },
    activated () {
      let that = this
      window.onload = function(){
        setTimeout(function(){
          if (that.$native.isApp()) {
			    	that.$native.getTitle(that.title)
			    }
        },1)
      }
    },
    deactivated () {
      this.$destroy()
    },
		methods:{
			lock(type){
				this.alpha = type
			}
		}
	}
</script>
<style scoped>
	footer {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		background: #f8f8f8;
		&>*:nth-child(n+3) {
			margin-top: 14px;
		}
	}
	.boxCenter {
		margin: 0 auto;
	}
	.alpha {
		height: 100vh;
		overflow: hidden;
	}
</style>