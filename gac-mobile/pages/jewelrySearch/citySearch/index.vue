<template>
  <areaSearch
    @getCity="handlerGetCity"
    :chooseCity="chooseCity"
  />
</template>

<script>
import areaSearch from '~/components/common/areaSearch'

export default {
  components: {
    areaSearch
  },
  data() {
    return {
      chooseCity: '',
      form: {}
    }
  },
  activated() {
    this.chooseCity = this.$route.query.chooseCity
    if (this.$route.query.data) {
      this.form = JSON.parse(this.$route.query.data)
    }
  },
  methods: {
    handlerGetCity(data) {
      if (this.$route.query.data) {
        this.form.contentReleaseArea = data
        this.$router.replace({ name: 'jewelryCircle-publish', query: { data: JSON.stringify(this.form) } })
      } else {
        this.$router.push({ name: 'index', query: { chooseCity: data } })
      }
    }
  }
}
</script>

<style>
</style>