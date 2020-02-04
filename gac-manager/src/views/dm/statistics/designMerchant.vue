<template>
  <div>
    <merchantStatistics :type="type" />
  </div>
</template>

<script>
import merchantStatistics from './components/merchantStatistics'

export default {
  data() {
    return {
      type: 5
    }
  },
  components: {
    merchantStatistics
  }
}
</script>

