<template>
  <AppView class="desing-activity-list"
           title="活动列表">
    <active :supType="3"></active>
  </AppView>
</template>
<script>
import active from '../../active/index'


export default {
  components: {
    active
  },
  head() {
    return {
      title: '活动列表'
    }
  },
  activated() {
  	if (this.$native.isApp()) {
    	this.$native.getTitle('活动列表')
    }
  }
}
</script>

<style lang="postcss" scoped>
.desing-list {
  & .header {
    padding: 10px 15px;
  }
  & .module-list {
    display: flex;
    & li {
      flex-grow: 1;
      text-align: center;
      line-height: 45px;
      background: #f5f5f5;
      color: #333;
      border-bottom: 1px solid #f5f5f5;
    }
    & li.active {
      background: #fff;
      color: #c2a374;
    }
  }
  & .title-list {
    display: flex;
    box-shadow: 0 5px 7px #e6e8ee;
    & li {
      flex-grow: 1;
      text-align: center;
      line-height: 42px;
      color: #333;
    }
    & li.active {
      color: #c2a374;
    }
  }
}
</style>
