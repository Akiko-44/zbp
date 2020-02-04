<template>
  <AppView
    class="atlas"
    :title="title"
    :scroll="false"
  >
    <!--<van-icon @click="$refs.share.show()" name="share" slot="nav-bar-right" />-->
    <div class="toComment" @click="showComment = true">评论</div>
    <image-box
      v-model="commentShow"
      :imgs="imgs"
    />
    <footer-nav
    	v-if="showComment"
      @comment:click="commentShow = !commentShow"
      :commentNum="commentNum"
      :praiseNum="praiseNum"
      :praiseStatus="praiseStatus"
      @input:praise="(num, status) => { praiseNum = num; praiseStatus = status }"
    />
    <comment
      v-model="commentShow"
    />
    <share
      :info="info"
      ref="share"
    />
  </AppView>
</template>

<script>
import ImageBox from './modules/imageBox'
import FooterNav from './modules/footerNav'
import Comment from './modules/comment'
import Share from '~/components/common/share'

export default {
  data () {
    return {
      commentShow: false,
      title: ' ',
      imgs: [],
      info: {},
      praiseNum: 0,
      praiseStatus: 1,
      commentNum: 0,
      showComment: false
    }
  },
  beforeMount () {
  	if (this.$native.isApp()) {
    	this.$native.getTitle('作品详情')
    }
    this.$service('galleryAtlasDetail', {
      resources: [this.$route.query.id]
    }).then(result => {
      const { pics, title, commentNum, praiseNum } = result.data
      this.imgs = pics
      this.title = title
      this.info = {
        title,
        url: location.href,
        imgUrl: this.$setImg(pics[0].url, {w: 100, format: 'jpeg'})
      }
      this.commentNum = commentNum
      this.praiseNum = praiseNum
    })
  },
  beforeCreate() {
    if (process.browser) {
      window.onload = function(){
        setTimeout(function(){
          if (this.$native.isApp()) {
			    	this.$native.getTitle('作品详情')
			    }
        },1)
      }
    }
  },
  activated () {
    let that = this
    window.onload = function(){
      setTimeout(function(){
        that.$native.getTitle('作品详情')
      },1)
    }
  },
  deactivated () {
    this.$destroy()
  },
  components: {
    ImageBox,
    FooterNav,
    Comment,
    Share
  }
}
</script>

<style lang="postcss" scoped>
.atlas {
  height: 100%;
  background: #000;
}
>>> .van-nav-bar {
  background: #000;
  color: white;
  & .van-icon {
    color: white;
  }
  &.van-hairline--bottom::after {
    display: none;
  }
  & .van-nav-bar__title {
    max-width: 70%;
  }
}
.toComment{
	position: fixed;
	background: #fff;
	padding: 5px 10px;
	top: 50%;
	right: 0;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	color: #666;
	z-index: 3;
}
</style>
