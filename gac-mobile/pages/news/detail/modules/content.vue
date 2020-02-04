<template>
<div class="news-content word-break">
	<h1 v-text="title"></h1>
  <div class="content" v-html="content"></div>
  <br>
  <p class="gray" v-show="authorName">责任编辑：{{authorName}}</p>
</div>
</template>

<script>
export default {
  props: {
    authorName: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    title:{
    	type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.news-content {
  padding: 12px;
  font-size: 15px;
  line-height: 22px;
  color: var(--black);
  background: white;
  min-height: 300px;
  & h1{
  	width: calc(100vw - 60px);
  	font-size: 16px;
  	font-weight: 600;
  	text-align: center;
  	margin:10px auto;
  }
  & img {
    margin: 14px auto;
    display: block;
    max-width: 100%;
    height: auto;
  }
}
.content >>> img{
	width: 100%;
	height: auto;
}
</style>
