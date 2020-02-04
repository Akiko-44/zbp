<template>
  <AppView title="新闻详情">
    <div class="toComment"
         @click="showComment = true">评论</div>
    <!--<div slot="nav-bar-right">

      <van-icon name="share" />
    </div>-->
    <div class="btn-share" @click="() => $refs.share.show()">
			<van-icon name="share" />
    </div>
    <DetailContent :content="detail.content"
                   :title="detail.title"
                   :authorName="detail.authorName" />
    <recommended :item="detail.related" />
    <SendComment :commentNum="detail.commentNum"
                 v-if="showComment" />
    <share :info="info"
           ref="share" />
    <van-loading color="white"
                 class="app-loading"
                 v-show="loading" />
  </AppView>
</template>

<script>
import DetailContent from './modules/content'
import Recommended from './modules/recommended'
import SendComment from '~/components/news/sendComment'
import Share from '~/components/common/share'
import ScrollToggle from '~/components/common/scrollToggle'

export default {
  data() {
    return {
      info: {},
      loading: true,
      detail: {
        content: '',
        title: '',
        authorName: '',
        related: {}
      },
      showComment: false
    }
  },
  head() {
    return {
      title: '新闻详情'
    }
  },
  beforeRouteUpdate(to, from, next) {
    window.scrollTo(0, 0)
    this.loadData(to.query.id)
    next()
  },
  beforeMount() {
    this.loadData(this.$route.query.id)
    if (this.$native.isApp()) {
    	this.$native.getTitle('新闻详情')
    }
  },
  activated() {
    let that = this
    window.onload = function () {
      setTimeout(function () {
        if (that.$native.isApp()) {
		    	that.$native.getTitle('新闻详情')
		    }
      }, 1)
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    loadData(id) {
      this.loading = true
      this.$service('newsArticleDetail', { resources: [id] }).then(this.success)
    },
    success(result) {
      this.loading = false
      this.detail = result.data
      this.info = {
        title: this.detail.title,
        imgUrl: 'http://img.zcool.cn/community/015f21575cd3ba0000012e7e230f2f.png@2o.png',
        link: location.href,
        desc: this.detail.title
      }
    }
  },
  components: {
    DetailContent,
    Recommended,
    SendComment,
    Share,
    ScrollToggle
  }
}
</script>
<style lang="postcss" scoped>
.toComment {
  position: fixed;
  background: #9a8c8c;
  padding: 5px 10px;
  bottom: 20%;
  right: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: #fff;
  z-index: 3;
}
.btn-share{
	position: fixed;
  background: #9a8c8c;
  padding: 5px 10px;
  bottom: 32%;
  right: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: #fff;
  z-index: 3;
}
</style>