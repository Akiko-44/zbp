<template>
<el-cascader
  @change="handleCityItemChange"
  change-on-select
  clearable
  v-model="selectedCity"
  :options="citiesData"
  :props="{
    label: 'regionName',
    value: 'regionId',
    children: 'cities'
  }"
/>  
</template>

<script>
import { getCities } from '@/api/common/city'

export default {
  data() {
    return {
      selectedCity: [],
      citiesData: [],
      citiesDataMap: {}
    }
  },
  created() {
    getCities(0).then(result => {
      this.citiesData = this.filterCitiesData(result.data)
    })
  },
  methods: {
    filterCitiesData(cities) {
      return cities.map((city, index) => {
        const data = {
          ...city,
          index,
          cities: []
        }
        this.citiesDataMap[city.regionId] = data
        return data
      })
    },
    handleCityItemChange(ids) {
      const selectCities = []
      if (ids.length) {
        // 当前选中的城市数据
        ids.forEach((id, i) => {
          selectCities.push(this.citiesDataMap[id])
        })
        // 最后一个城市的数据
        const lastCity = selectCities[selectCities.length - 1]
        // 获取下一级
        getCities(lastCity.regionId).then(result => {
          if (result.data.length) {
            lastCity.cities = this.filterCitiesData(result.data)
          } else {
            lastCity.cities = undefined
          }
        })
      }
      this.$emit('change', selectCities)
    }
  }
}
</script>
