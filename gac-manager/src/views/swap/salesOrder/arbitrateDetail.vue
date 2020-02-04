<template>
  <arbitrate-detail :getDetail="refundInfo" />
</template>

<script>
import arbitrateDetail from '@/components/app/orderRefund/arbitrateDetail'
import { refundInfo } from '@/api/common/order'

export default {
  components: {
    arbitrateDetail
  },
  methods: {
    refundInfo
  }
}
</script>
