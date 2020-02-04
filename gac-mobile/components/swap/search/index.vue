<template>
<div class="app-search vertical">
	<div class="location" @click="$router.push({name: 'jewelrySearch-citySearch'})">
		<span v-if="chooseCity">{{chooseCity}}</span>
		<span v-else>深圳市</span>
		<i class="ico-pulldown"></i>
	</div>
	<div class="input-box">
		<van-icon class="item-center" name="search" color="#999" />
	  <input
	    type="text"
	    placeholder="输入关键字搜索"
	  >
	</div>
  <span class="ico-scan"></span>
</div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      chooseCity: '',
      types: [
        {type: 1, name: '宝贝互换'},
        {type: 2, name: '物品销售'},
        {type: 3, name: '物品拍卖'},
        {type: 4, name: '物品回收'}
      ]
    }
  },
  activated () {
    this.chooseCity = this.$route.query.chooseCity 
  },
  computed: {
    index () { return this.$store.state.swap.searchType }
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
    
  }
}
</script>

<style lang="postcss" scoped>
:root {
  --search-type-width: 80px;
}
.app-search {
  position: relative;
  width: 100%;
  background: white;
  box-sizing: border-box;
  & .location{
  	width: 70px;
  	font-size: 14px;
  	color: var(--dark-gray);
  	& span{
  		display: inline-block;
	    width: 50px;
	    text-align: center;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
  	}
  }
  & .ico-pulldown{
  	margin-left: 4px;
  }
  & .input-box{
  	position: relative;
    width: 260px;
    margin: 0 10px;
  }
  & input {
    display: block;
    width: 100%;
    line-height: normal;
    margin: 0;
    padding: 6px 10px 6px 30px;
    font-size: 12px;
    border-radius: 15px;
    color: var(--black);
    background: #f0f0f0;
    box-sizing: border-box;
    border: none;
  }
  & .van-icon {
    position: absolute;
    width: 30px;
    height: 100%;
    font-size: 14px;
    left: 0;
    display: flex;
  }
  & .search-type {
    position: absolute;
    left: 0;
    height: 100%;
    & p {
      padding-left: 15px;
      font-size: 12px;
      height: 100%;
    }
    & .ico-down {
      transition: 0.3s transform;
      transform-origin: 50% 45%;
      margin-top: 1px;
      &.active {
        transform: rotate(180deg);
      }
    }
  }
  & .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  & .search-type-list {
    position: absolute;
    top: 32px;
    z-index: 1;
    width: 100%;
    background-color: white;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); /*no*/
    & li {
      width: 100%;
      height: 35px;
      line-height: 35px;
      &.active {
        color: var(--brown);
      }
      &:last-child:after {
        border: none;
      }
    }
  }
}
</style>
