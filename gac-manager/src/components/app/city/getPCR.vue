<template>
  <el-cascader @change="handleCityItemChange"
               change-on-select
               clearable
               v-model="selectedCity"
               :options="citiesData"
               :props="{
    label: 'cityName',
    value: 'cityid',
    children: 'cities'
  }" />
</template>

<script>
import { getPCR } from '@/api/common/city'

export default {
  data() {
    return {
      selectedCity: [],
      citiesData: [],
      citiesDataMap: {}
    }
  },
  created() {
    let citiesArr = []
    getPCR().then(result => {
      result.data.address.forEach((item, index) => {
        citiesArr.push({
          cityName: item.provinceName,
          cityid: item.provinceid,
          cities: item.citys
        })
      })
      this.citiesData = citiesArr
    })
  },
  methods: {
    handleCityItemChange() {
      this.$emit('change', this.selectedCity)
    }
  }
}
</script>
