<template>
	<areaSearch @getCity="handlerGetCity" :chooseCity="chooseCity"/>
</template>

<script>
import areaSearch from '~/components/common/areaSearch'

export default {
  components: {
    areaSearch
  },
  data (){
  	return {
  		chooseCity: ''
  	}
  },
  activated () {
  	this.chooseCity = this.$route.query.chooseCity
  },
  methods: {
  	handlerGetCity(data){
  		this.$router.push({name: 'index', query: {chooseCity: data}})
  	}
  }
}
</script>

<style>
</style>