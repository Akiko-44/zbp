<template>
  <chain-data-detail :result="result" />
</template>

<script>
import { getDataHistoryDetail } from '@/api/group'
import chainDataDetail from '../components/chainDataDetail'

export default {
  components: {
    chainDataDetail
  },
  data() {
    return {
      listParams: {
        id: ''
      },
      result: {}
    }
  },
  created() {
    if (this.$route.query.id) {
      this.listParams.id = this.$route.query.id
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      getDataHistoryDetail(this.listParams).then(data => {
        this.result = JSON.parse(data.data)
        // console.log(this.result)
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
