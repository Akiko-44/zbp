<template>
  <div class="app-container calendar-list-container">
    <div class="doc-box" v-for="(item,index) in docList" :class="{active: item.isActive}" :key="index"
      @mouseover="selectStyle(index, item.docUrl)"
      @mouseout="outStyle(index, item.docUrl)">
    	<img src="../../../../static/img/helpdoc.png" alt="" />
    	<p class="doc-title">{{item.title}}</p>
    	<a :href="item.docUrl" download="application">
        <div class="download-btn"><img src="../../../../static/img/helpdownload.png"/></div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      docList: [
        {
          id: '1',
          docUrl: 'http://app.gacjc.com/app/download/help/makerReleaseGoods.docx',
          title: '发布商品',
          isActive: false
        }
      ],
      docUrl: ''
    }
  },
  methods: {
    selectStyle(i, docUrl){
  		this.docUrl = docUrl
      this.docList.forEach(element => {
        element.isActive = false
      })
      this.docList[i].isActive = true
  	},
  	outStyle(i, docUrl){
      this.docList[i].isActive = false
  	}
  }
}
</script>

<style scoped lang="postcss">
.app-container {
  padding: 62px 52px;
}
.doc-box {
  position: relative;
  display: inline-block;
  width: 220px;
  height: 270px;
  padding: 10px;
  margin-right: 100px;
  text-align: center;
  background-size: cover;
  z-index: 1;
  cursor: pointer;
}

.doc-box.active:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(29, 28, 28, 0.3);
  z-index: 0;
}

.doc-box .download-btn{
	display: none;
	position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
  margin-top: -25px;
  margin-left: -25px;
  z-index: 9;
}

.doc-box.active .download-btn{
	display: block;
}

.download-btn img{
	width: 100%;
}

.doc-title {
	padding: 20px 0;
	margin: 0;
  font-size: 20px;
}
</style>
