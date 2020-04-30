<template>
  <reportDetail :id="id" />
</template>

<script>
import reportDetail from '@/components/app/fund/reportDetail'

export default {
  components: {
    reportDetail
  },
  data() {
    return {
      id: undefined
    }
  },
  created() {
    this.id = this.$route.query.id
  }
}
</script>

