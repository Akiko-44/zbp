<template>
  <div class="footer-nav">
    <div class="footer-nav-inner item-center">
      <div class="comment-input">
        <input v-scrollTo type="text" placeholder="评论" v-model="value" maxLength="150">
      </div>
      <van-button class="send-btn" type="default" :loading="sendLoading" @click="send">发送</van-button>
      <ul class="actions">
        <li @click="praise">
          <i :class="[{ 'ico-like': praiseStatus === 1, 'ico-like-select': praiseStatus === 2 }]"></i>
          <span v-show="praiseNum" class="count" :class="{'select': praiseStatus === 2}">{{praiseNum}}</span>
        </li>
        <li @click="onlist">
          <i class="ico-comment"></i>
          <span class="count">{{commentNum}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commentNum: {
      type: Number,
      required: true
    },
    praiseNum: {
      type: Number,
      required: true
    },
    // 用户的点赞状态，1：没有点过赞 2：已点赞
    praiseStatus: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      value: '',
      sendLoading: false,
      query: {
        offset: 1,
        limit: 10
      }
    }
  },
  computed:{
		getTitle(){
			let res = location.href.split('/')
			return unescape(res[res.length-1].split('?')[1].split('=')[1])
		}
	},
  methods: {
    praise () {
      let num = this.praiseNum
      let status = this.praiseStatus

      this.$service('galleryAtlasPraise', {
        resources: [this.$route.query.id, this.praiseStatus]
      }).then(response => {
        // 点赞
        if (status === 1) {
          num++
          status = 2
        } else { // 取消点赞
          num--
          status = 1
        }
        this.$emit('input:praise', num, status)
      })
    },
    onlist(){
    	this.$service('galleryAtlasCommentList',{
      		data: this.query,
          resources: [this.$route.query.id]
      }).then(lis =>{
      	this.$emit('comment:click',lis)
      })
    },
    send () {
      if (this.value.trim()) {
        this.sendLoading = true
        this.$service('galleryAtlasComment', {
          data: {
            atlasId: +this.$route.query.id,
            content: this.value
          }
        }).then(this.success).catch(this.fail)
      } else {
        this.value = ''
      }
    },
    success () {
      this.$toast('评论成功')
      this.value = ''
      this.commentNum += 1
      this.sendLoading = false
    },
    fail () {
      this.$dialog.confirm({
        message: '评论失败',
        confirmButtonText: '重试',
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            this.send()
          }else{
          	this.sendLoading = false
          }
          done()
        }
      })
    }
  },
  components: {
  }
}
</script>

<style lang="postcss" scoped>
:root {
  --footer-height: 50px;
}
.footer-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: var(--footer-height);
  background: #000;
  overflow: hidden;
  & .send-btn {
    width: 58px;
    border: none;
    color: white;
    background: transparent;
  }
}

.footer-nav-inner {
  position: relative;
  padding: 0 12px;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 1;
  background: #000;
}

.comment-input {
  flex: 1;
  & input {
    margin: 0;
    padding: 6px 10px;
    width: 100%;
    line-height: normal;
    font-size: 14px;
    background: #191919;
    border: none;
    border-radius: 2px;
    color: white;
    box-sizing: border-box;
  }
}

.actions {
  display: flex;
  & li {
    position: relative;
    margin-left: 20px;
    width: 28px;
    height: 30px;
    background: rgba(0, 0, 0, 0.3);
    & .ico-comment {
      margin-top: 3px;
    }
    & .ico-download {
      margin-top: 2px;
    }
    & .count {
      position: absolute;
      top: 1px;
      right: -40px;
      width: 50px;
      color: white;
      font-size: 12px;
      transform: scale(0.9);
      text-align: left;
      background-color: #000;
      &.select {
        color: var(--brown);
      }
    }
  }
}
</style>
