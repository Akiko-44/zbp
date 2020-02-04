<template>
    <AppView title="帮助与反馈">
      <van-cell-group>
        <van-cell :title="item.artTitle" is-link  @click="toList(item.id)" v-for="(item, i) in helpList" :key="i"/>
      </van-cell-group>
    </AppView>
</template>
<script>
export default {
  data() {
    return {
      helpList: []
    }
  },
  activated() {
    this.$service('helpList', {resources: [this.$route.query.id]}).then((result) => {
      this.helpList = result.data.records
    })
  },
  methods: {
    toList(id) {
      this.$router.push({name: 'user-help-detail', query: {id: id}})
    }
  }
}
</script>
<style lang="postcss" scoped>
  
</style>