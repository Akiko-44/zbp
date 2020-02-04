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
      type: 6
    }
  },
  components: {
    goodsStatistics
  }
}
</script>

