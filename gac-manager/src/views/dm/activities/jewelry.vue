<template>
	<div>
		<activity :supType="2" :routerName="routerName"></activity>
	</div>
</template>

<script>
	import activity from './components/activity'
	export default {
	  data() {
	    return {
	      routerName: 'jewelryAddActive'
	    }
	  },
	  components: {
	    activity
	  }
	}
</script>
