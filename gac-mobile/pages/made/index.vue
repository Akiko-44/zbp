<template>
<div class="made-index">
  <div class="made-content">
  	<p>需求名称: <span style="color: #999999;">{{detail.name}}</span></p>
  	<p>理想价格区间: ￥{{detail.lowPrice}} - ￥{{detail.highPrice}}</p>
  	<p>参考图片: </p>
  </div>
  <div class="made-img" v-if="detail.customsPic && detail.customsPic.length">
  	<a v-for="item in detail.customsPic" :key="item.customsId">
  		<img :src="$setImg(item.picUrl, { w: 100 })" width="100"/>
  	</a>
  </div>
  <div class="made-dec">
  	<h2>需求描述:</h2>
  	<p v-html="detail.customsDesc"></p>
  </div>
</div>
</template>
<script>

export default {
  data () {
    return {
      detail: {}
    }
  },
  head () {
    return {
      title: this.detail.name || ''
    }
  },
  deactivated () {
    this.$destroy()
  },
  beforeMount () {
    this.$loading(this.$service('madeDetail', {resources: [this.$route.query.id]}))
      .then(result => {
        this.detail = result.data
      })
  },
  methods: {
  	
  }
}
</script>

<style lang="postcss" scoped>
.made-index {
	& .made-content{
		padding: 20px;
		& p{line-height: 30px;}
	}
	& .made-img{
		display: flex;
		flex-wrap: wrap;
		padding: 0 20px;
		& a{
			display: inline-block;
			width: 100px;
			height: 100px;
			overflow: hidden;
			margin-right: 5px;
			margin-bottom: 5px;
			background: #FFFFFF;
			padding: 2px;
			border-radius: 3px;
		}
	}
	& .made-dec{
		padding: 0 20px;
		& p{
			font-size: 14px;
			color: #999999;
			line-height: 20px;
			margin-top: 10px;
		}
	}
}
</style>