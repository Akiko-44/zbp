<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: ''
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  watch:{
    roles(val){
      if (this.roles.includes('merchants')) {
        this.currentRole = 'editorDashboard'
      }else if (this.roles.includes('admin')) {
        this.currentRole = ''
      }else{
        this.currentRole = ''
      }
    }
  },
  created() {
    if (this.roles.includes('merchants')) {
        this.currentRole = 'editorDashboard'
      }else if (this.roles.includes('admin')) {
        this.currentRole = ''
      }else{
        this.currentRole = ''
      }
  }
}
</script>
