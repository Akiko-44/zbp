<template>
  <div>
    <orderStatistics :type="type" />
  </div>
</template>

<script>
import orderStatistics from './components/orderStatistics'

export default {
  data() {
    return {
      type: 2
    }
  },
  components: {
    orderStatistics
  }
}
</script>

