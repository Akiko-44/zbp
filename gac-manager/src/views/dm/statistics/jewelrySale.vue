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
      type: 1
    }
  },
  components: {
    saleStatistics
  }
}
</script>

