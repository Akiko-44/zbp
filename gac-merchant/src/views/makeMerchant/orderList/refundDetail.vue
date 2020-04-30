<template>
  <RefundDetail :getDetail="merchantRefundInfo" />
</template>

<script>
import RefundDetail from '@/components/app/orderRefund/detail'
import { merchantRefundInfo } from '@/api/common/order'

export default {
  components: {
    RefundDetail
  },
  methods: {
    merchantRefundInfo
  }
}
</script>
