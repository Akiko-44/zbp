<template>
  <List
    :goodsSource="6"
    routerName="makeWorkList"
  />
</template>
	
<script>
import List from './components/list'

export default {
  components: {
    List
  }
}
</script>