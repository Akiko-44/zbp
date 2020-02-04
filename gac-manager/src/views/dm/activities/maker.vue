<template>
	<div>
		<activity :supType="4" :routerName="routerName"></activity>
	</div>
</template>

<script>
	import activity from './components/activity'
	export default {
	  data() {
	    return {
	      routerName: 'makerAddActive'
	    }
	  },
	  components: {
	    activity
	  }
	}
</script>
