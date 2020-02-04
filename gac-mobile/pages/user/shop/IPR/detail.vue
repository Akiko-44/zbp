<template>
	<AppView title="知识产权详情">
		<div class="detail">
      <div class="header">
        <h3>{{detail.name}}</h3>
        <p>{{detail.createTime}}</p>
      </div>
      <div class="img">
      	<img :src="item" v-for="item in detail.pics" width="100%"/>
      </div>
      <div class="content"
           v-html="detail.detail">
      </div>
    </div>
	</AppView>
</template>

<script>
export default {
	data() {
    return {
    	detail: {}
    }
  },
  activated() {
 		this.$service('intellectualDetail', { params: {id: this.$route.query.id} })
      .then(result => {
        this.detail = result.data
      })
  }
}
</script>

<style lang="postcss" scoped>
.detail{
	padding: 15px 12px;
	font-size: 14px;
	& .header{
		& h3{
			font-size: 16px;
			color: #19181E;
		}
		& p{
			margin: 30px auto 14px;
			color: #A9A9A9;
		}
	}
	& .content{
		line-height: 24px;
		color: var(--dark-gray);
	}
}
</style>