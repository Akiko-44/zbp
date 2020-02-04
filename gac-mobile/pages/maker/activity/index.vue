<template>
  <AppView class="desing-activity-list"
           title="活动列表">
    <active :supType="4"></active>
  </AppView>
</template>
<script>
import active from '../../active/index'


export default {
  components: {
    active
  },
  head() {
    return {
      title: '活动列表'
    }
  },
  beforeMount() {
    if (this.$native.isApp()) {
    	this.$native.getTitle('活动列表')
    }
  },
}
</script>
