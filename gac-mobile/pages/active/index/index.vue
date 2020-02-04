<template>
  <div class="active-index">
    <!-- <ListModule name="activeIndex"
                :query="{
          offset: 1,
          limit: 10,
          supType: supType
        }"
                :ref="'list' + index"> -->
    <!-- <template slot-scope="{ list }"> -->
    <template>
      <Card3
        v-for="(item, index) in list"
        :key="index"
        :data="{
				    	phonePath: item.phonePath,
				    	title: item.title,
				    	content: item.content,
				    	updateTime: item.updateTime,
				    	likeNum: item.likeNum,
				    	rate: item.rate
				    }"
        @click.native="linkTo(item.id)"
      />
    </template>
    <div class="status">我们是有底线的平台</div>
    <!-- </ListModule> -->
  </div>
</template>
<script>
import Card3 from '~/components/dm/card/item3'
import ListModule from '~/components/common/list'
import AppList from '~/components/common/list'

export default {
  components: {
    Card3,
    ListModule,
    AppList
  },
  props: {
    supType: Number
  },
  data() {
    return {
      list: []
    }
  },
  activated() {
    this.$service('activeIndex', {
      data: {
        offset: 1,
        limit: 20,
        supType: this.supType
      }
    }).then(result => {
      this.list = result.data
    })

  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    linkTo(id) {
      this.$router.push({
        name: 'active-detail',
        query: { id }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.active-index {
}
.status {
  position: relative;
  /* z-index: -1; */
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: var(--dark-gray);
}
</style>