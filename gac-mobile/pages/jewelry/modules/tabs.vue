<template>
  <div class="tabs">
    <van-tabs @click=""
              v-model="active">
      <van-tab v-for="(tab, index) in tabs"
               :title="tab.catName"
               :value="tab.id"
               :key="index">
              <slot></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
	data() {
    return {
      active: 0,
      tabs: [{
      	id: 0,
      	catName: '推荐'
      },{
      	id: 1,
      	catName: '拼团'
      },{
      	id: 2,
      	catName: '促销'
      }]
    }
 	},
 	mounted () {
 		this.$service('jewelryCategories').then(data => {
 			this.tabs = this.tabs.concat(data.data)
 		})
 	},
  methods: {
    back() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    classify() {
      this.$router.push({
        name: 'news-classify',
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
/deep/ .van-tab.van-tab--active span{
	color: var(--black);
	font-size: 15px;
	font-weight: bold;
}
/deep/ .van-tabs__line{
	background-color: var(--red);
}
.logo-text {
  font-size: 18px;
  display: inline-block;
  vertical-align: -1px;
}
</style>
