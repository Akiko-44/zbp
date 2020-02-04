<template>
  <div>
    <saleStatistics :type="type" />
  </div>
</template>

<script>
import saleStatistics from './components/saleStatistics'

export default {
  data() {
    return {
      type: 5
    }
  },
  components: {
    saleStatistics
  }
}
</script>

