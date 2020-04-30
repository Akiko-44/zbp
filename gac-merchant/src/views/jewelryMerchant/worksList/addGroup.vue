<template>
  <promotion-add
    :type="1"
    from="groupList"
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
