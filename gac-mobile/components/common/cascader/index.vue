<template>
<van-popup v-model="show" position="bottom">
  <van-picker
    class="picker"
    show-toolbar
    :columns="columns"
    :value-key="props.label"
    @cancel="show = false"
    @confirm="confirm"
    @change="change"
  />
</van-popup>
</template>

<script>
function getColumns (data) {
  const columns = []
  const getChild = (index, data) => {
    if (!columns[index]) {
      columns[index] = []
    }
    data.forEach(item => {
      columns[index].push(item)
      if (item.children && item.children.length) {
        getChild(index + 1, item.children)
      }
    })
  }
  getChild(0, data)
  return columns
}
export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    options: Array,
    props: {
      type: Object,
      default () {
        return {
          value: 'value', label: 'label'
        }
      }
    }
  },
  computed: {
    allData () {
      return getColumns(this.options)
    },
    columns () {
      const columns = [{values: this.allData[0]}]
      for (let i = 1; i < this.allData.length; i++) {
        columns[i] = {}
        columns[i].values = this.allData[i - 1][0].children || []
      }
      return columns
    }
  },
  methods: {
    confirm (values, index) {
      this.$emit('confirm', values.filter(item => item !== undefined), index)
      this.show = false
    },
    change (picker, values, index) {
      picker.setColumnValues(index + 1, values[index].children || [])
      this.$emit('change')
    }
  }
}
</script>
