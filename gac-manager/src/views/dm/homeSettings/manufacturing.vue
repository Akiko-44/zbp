<template>
  <div>
    <banner :category="3" />
    <work :flag="6"
          :caseType="1" />
    <work :flag="6"
          :caseType="2" />
    <br>
    <manufacturers :flag="1"
                   type="1" />
    <!--<manufacturers :flag="2"
                   type="2" />
    <manufacturers :flag="3"
                   type="3" />
    <manufacturers :flag="4"
                   type="4" />
    <manufacturers :flag="5"
                   type="5" />-->
    <br>
    <crafts />
  </div>
</template>

<script>
import banner from './components/banner'
import work from './components/work'
import manufacturers from './components/manufacturers'
import crafts from './components/crafts'

export default {
  data() {
    return {
      flag: 1
    }
  },
  components: {
    banner,
    work,
    manufacturers,
    crafts
  }
}
</script>

