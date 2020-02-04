<template>
  <promotion-add
    :type="2"
    from="promotionList"
  ></promotion-add>
</template>

<script>
import promotionAdd from './promotion/add'
export default {
  components: {
    promotionAdd
  }
}
</script>
