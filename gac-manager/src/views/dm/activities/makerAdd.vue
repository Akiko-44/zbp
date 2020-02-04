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
      supType: 4,
      routerName: 'makerActiveList'
    }
  },
  components: {
    add
  }
}
</script>

