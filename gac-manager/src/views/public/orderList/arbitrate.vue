<template>
  <RefundList :getPage="arbitrationPage" :orderType="5" detailRouteName="arbitrateDetail" />
</template>

<script>
import RefundList from '@/components/app/orderRefund/arbitrateList'
import { arbitrationPage } from '@/api/common/order'

export default {
  components: {
    RefundList
  },
  methods: {
    arbitrationPage
  }
}
</script>
