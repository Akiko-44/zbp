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
      type: 1
    }
  },
  components: {
    goodsStatistics
  }
}
</script>

