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
      type: 6
    }
  },
  components: {
    merchantStatistics
  }
}
</script>

