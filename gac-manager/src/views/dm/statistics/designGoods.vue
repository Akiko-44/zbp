<template>
  <div>
    <goodsStatistics :type="type" />
  </div>
</template>

<script>
import goodsStatistics from './components/goodsStatistics'

export default {
  data() {
    return {
      type: 5
    }
  },
  components: {
    goodsStatistics
  }
}
</script>

