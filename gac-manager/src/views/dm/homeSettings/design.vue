<template>
  <div>
    <banner :category="4" />
    <work :flag="5"
          :caseType="0" />
    <br>
    <designer />
  </div>
</template>

<script>
import banner from './components/banner'
import work from './components/work'
import designer from './components/designer'

export default {
  data() {
    return {
      flag: 0
    }
  },
  components: {
    banner,
    work,
    designer
  }
}
</script>

