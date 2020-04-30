<template>
  <chain-data-detail
    :result="result"
    :type="type"
  />
</template>

<script>
import { getNewContractTxDetail } from '@/api/browser'
import chainDataDetail from '../components/chainDataDetail'

export default {
  components: {
    chainDataDetail
  },
  data() {
    return {
      type: 1,
      listParams: {
        id: ''
      },
      result: {}
    }
  },
  created() {
    if (this.$route.query.id) {
      this.type = this.$route.query.type
      this.listParams.id = this.$route.query.id
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      getNewContractTxDetail(this.listParams).then(data => {
        this.result = JSON.parse(data.data.data)
        this.result.hash = data.data.hash
        this.result.blockNumber = data.data.blockNumber
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
