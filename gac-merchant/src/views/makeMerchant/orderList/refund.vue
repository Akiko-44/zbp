<template>
  <RefundList :getPage="merchantRefundPage" detailRouteName="refundDetail" />
</template>

<script>
import RefundList from '@/components/app/orderRefund/list'
import { merchantRefundPage } from '@/api/common/order'

export default {
  components: {
    RefundList
  },
  methods: {
    merchantRefundPage
  }
}
</script>
