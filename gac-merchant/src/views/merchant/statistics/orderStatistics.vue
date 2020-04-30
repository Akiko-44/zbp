<template>
  <div class="app-container calendar-list-container"> 
    <lineMarker></lineMarker>
    <lineSale></lineSale>
    <lineBrand></lineBrand>
    <pieArea></pieArea>
    <piePay></piePay>
  </div>
</template>
<script>
import lineMarker from './components/lineMarker'
import lineSale from './components/lineSale'
import lineBrand from './components/lineBrand'
import pieArea from './components/pieArea'
import piePay from './components/piePay'

export default {
  components:{
    lineMarker,
    lineSale,
    lineBrand,
    pieArea,
    piePay
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>
