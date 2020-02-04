<template>
  <div class="item7">
    <span class="delete"
       @click="del(data.id)">删除</span>
    <div>
      <p class="name"
       @click="linkTo(data.id)">
        {{data.name}}
      </p>
      <p class="create-time">{{data.createTime}}</p>
    </div>
    <van-row gutter="10" class="imglist"
       @click="linkTo(data.id)">
    	<van-col span="8" v-for="(item, i) in data.pics" :key="i" v-if="i < 3">
    		<img :src="item"/>
    	</van-col>
    </van-row>
    <div class="detail">
      {{data.detail}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    default: () => {
      return {

      }
    }
  },
  methods: {
    linkTo(id) {
      this.$router.push({
        name: 'user-shop-IPR-detail',
        query: { id }
      })
    },
    del(id) {
    	
    }
  }
}
</script>

<style lang="postcss" scoped>
.item7 {
	position: relative;
  margin: 10px 10px 0;
  padding: 15px 12px;
  border-radius: 5px;
  background: white;
  overflow: hidden;
  & .delete{
  	position: absolute;
    top: 6px;
    right: 0px;
    font-size: 13px;
    color: #aaaaac;
    padding: 10px;
  }
  & .name {
  	width: 280px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  	font-size: 15px;
  	color: var(--black);
  }
  & .create-time {
    padding-top: 10px;
    font-size: 13px;
    color: var(--gray);
  }
  & .imglist{
		margin: 15px auto;
		& img{
			width: 100px;
			height: 100px;
		}
	}
	& .detail{
		font-size:13px;
		color:#666666;
		line-height:21px;
		display: -webkit-box;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  -webkit-line-clamp: 2;
	  -webkit-box-orient: vertical;
	}
}

</style>
