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
      supType: 3,
      routerName: 'designActiveList'
    }
  },
  components: {
    add
  }
}
</script>

