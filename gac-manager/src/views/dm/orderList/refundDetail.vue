<template>
  <RefundDetail :getDetail="refundInfo" />
</template>

<script>
import RefundDetail from '@/components/app/orderRefund/detail'
import { refundInfo } from '@/api/common/order'

export default {
  components: {
    RefundDetail
  },
  methods: {
    refundInfo
  }
}
</script>
