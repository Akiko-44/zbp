<template>
<van-popup v-model="show" position="bottom">
  <van-picker
    class="picker"
    show-toolbar
    :columns="cities"
    :loading="pickerLoading"
    value-key="regionName"
    @cancel="show = false"
    @confirm="cityConfirm"
    @change="cityChange"
    ref="picker"
  />
</van-popup>
</template>

<script>
const cities = {}

export default {
  props: {
    provinceId: [Number, String],
    cityId: [Number, String],
    areaId: [Number, String]
  },
  data () {
    return {
      show: false,
      pickerLoading: false,
      first: true,
      cities: [
        {
          values: []
        },
        {
          values: []
        },
        {
          values: []
        }
      ]
    }
  },
  watch: {
    show (value) {
      if (value && this.first) {
        this.$nextTick(this.load)
        this.first = false
      }
    }
  },
  methods: {
    async load () {
      this.pickerLoading = true
      const provinceData = await this.getData(1)
      provinceData.defaultIndex = this.findIndex(this.provinceId, provinceData)
      this.$refs.picker.setColumnValues(0, provinceData)

      const cityData = await this.getData(this.provinceId || provinceData[0].regionId)
      cityData.defaultIndex = this.findIndex(this.cityId, cityData)
      this.$refs.picker.setColumnValues(1, cityData)

      const areaData = await this.getData(this.cityId || cityData[0].regionId)
      areaData.defaultIndex = this.findIndex(this.areaId, areaData)
      this.$refs.picker.setColumnValues(2, areaData)

      this.pickerLoading = false
    },
    findIndex (id, data) {
      let index = 0
      if (id) {
        const length = data.length
        for (let i = 0; i < length; i++) {
          if (+data[i].regionId === +id) {
            return i
          }
        }
      }
      return index
    },
    cityConfirm (values, index) {
      this.show = false
      this.$emit('confirm', values, index)
    },
    cityChange (picker, values, index) {
      const item = values[index]
      if (index < 2 && item) {
        this.pickerLoading = true
        this.getData(item.regionId).then(data => {
          picker.setColumnValues(index + 1, data)
          this.pickerLoading = false
        }).catch(() => {
          this.pickerLoading = false
        })
      }
    },
    getData (id) {
      return cities[id]
        ? Promise.resolve(cities[id])
        : this.$service('commonAddress', {resources: [id]}).then(result => {
          const data = result.data
          cities[id] = data
          return data
        })
    }
  }
}
</script>
