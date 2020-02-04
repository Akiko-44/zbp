<template>
  <div>
    <activity :supType="3" :routerName="routerName"></activity>
  </div>
</template>

<script>
import activity from './components/activity'
export default {
	data() {
    return {
      routerName: 'designAddActive'
    }
  },
  components: {
    activity
  }
}
</script>
