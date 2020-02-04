<template>
    <AppView title="帮助与反馈">
        <van-collapse v-model="activeNames"
          accordion>
            <van-collapse-item :title="item.name" name="1" v-for="(item, i) in helpCategory" :key="i">
              <van-cell :title="citem.name" is-link @click="toList(citem.id)" v-if="item.children && item.children.length" v-for="(citem, ci) in item.children" :key="ci"/>
            </van-collapse-item>
        </van-collapse>
        <div class="feedback">
          <span @click="$router.push({name: 'user-help-feedback'})">意见反馈</span>
        </div>
    </AppView>
</template>
<script>
export default {
  data() {
    return {
      helpCategory: [],
      activeNames: '1'
    }
  },
  activated() {
    this.$service('helpCategory', {params: {limit: 100}}).then((result) => {
      this.helpCategory = result.data
    })
  },
  methods: {
    toList(id) {
      this.$router.push({name: 'user-help-list', query: {id: id}})
    }
  }
}
</script>
<style lang="postcss" scoped>
.feedback{
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
  padding: 10px 0;
}
</style>