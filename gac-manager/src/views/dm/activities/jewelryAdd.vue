<template>
  <div>
    <add :supType="supType" :routerName="routerName" />
  </div>
</template>

<script>
import add from './components/add'

export default {
  data() {
    return {
      supType: 2,
      routerName: 'jewelryActiveList'
    }
  },
  components: {
    add
  }
}
</script>

