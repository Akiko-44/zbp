<template>
  <div>
    <banner :category="2" />
    <jewelry-recommend :source="1" />
    <jewelry-merchant :type="1" />
    <!--<jewelry-merchant :type="2" />
    <jewelry-merchant :type="3" />-->

  </div>
</template>

<script>
import banner from './components/banner'
import jewelryRecommend from './components/jewelryRecommend'
import jewelryMerchant from './components/jewelryMerchant'

export default {
  components: {
    banner,
    jewelryRecommend,
    jewelryMerchant
  }
}
</script>

