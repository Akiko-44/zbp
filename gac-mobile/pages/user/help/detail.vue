<template>
    <AppView title="详情">
      <div class="block">
        <h1>{{helpDetail.artTitle}}</h1>
        <div v-html="helpDetail.articleDesc"></div>
      </div>
    </AppView>
</template>
<script>
export default {
  data() {
    return {
      helpDetail: ''
    }
  },
  activated() {
    this.$service('helpDetail', {resources: [this.$route.query.id]}).then((result) => {
      this.helpDetail = result.data
    })
  }
}
</script>
<style lang="postcss" scoped>
>>> .block{
  padding: 0 10px;
  & p{
    font-size: 12px;
    line-height: 20px;
  }
}
>>> h1{
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
}
>>> .wscnph{
  width: 100%;
}
</style>