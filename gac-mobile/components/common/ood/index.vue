<template>
  <div>
    <template v-if="type==3">
      <zbz
        :data="data"
        :position="position"
      />
    </template>
  </div>
</template>
<script>
import Zbz from './zbz'
export default {
  props: ['type', 'data', 'position'],
  components: { Zbz }
}
</script>
<style>
</style>
