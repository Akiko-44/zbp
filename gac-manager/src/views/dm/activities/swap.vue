<template>
	<div>
		<activity :supType="5" :routerName="routerName"></activity>
	</div>
</template>

<script>
	import activity from './components/activity'
	export default {
	  data() {
	    return {
	      routerName: 'swapAddActive'
	    }
	  },
	  components: {
	    activity
	  }
	}
</script>
