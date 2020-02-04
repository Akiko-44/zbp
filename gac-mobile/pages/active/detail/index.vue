<template>
  <AppView title="活动详情"
           :clickLeft="back">
    <!-- <div >
	    <van-nav-bar
		  title="活动详情"
		  left-arrow
		  @click-left="back"
		/>
	</div> -->
    <div class="active-detail">
      <div class="active-header">
        <h3>{{detail.title}}</h3>
        <div class="active-footer">
          <van-row type="flex"
                   justify="space-between">
            <van-col span="10">{{detail.updateTime}}</van-col>
            <van-col>
              <img class="icon_eye"
                   src="../../../static/icons/icon_eye.png" />{{detail.rate}}
              <img @click="like(detail.id)"
                   class="icon_like"
                   src="../../../static/icons/icon_like.png" />{{detail.likeNum}}
            </van-col>
          </van-row>
        </div>
        <div class="active-content"
             v-html="detail.content">

        </div>
      </div>
    </div>
  </AppView>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
export default {
  data() {
    return {
      list: {},
      detail: {
        likeNum: undefined
      }
    }
  },
  head() {
    return {
      title: this.detail.title
    }
  },
  beforeMount() {
    this.$service('activeDetail', { resources: [this.$route.query.id] })
      .then(result => {
        this.detail = result.data
      })
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    back() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    like(id) {
      if (!this.list[id]) {
        this.detail.likeNum++
        this.list[id] = 1
        axios.post(`/app/gallery/activity/updateIncrLikeNum?id=${id}`)
      } else {
        Toast('你已经点赞过了')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.active-detail {
  padding: 10px 20px 30px;
  & .active-header {
    & h3 {
      color: #333333;
      font-size: 18px;
    }
    & .active-footer {
      width: 100%;
      color: #999999;
      font-size: 12px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}

.icon_eye {
  width: 20px;
  vertical-align: middle;
}
.icon_like {
  width: 16px;
  margin-left: 8px;
  vertical-align: top;
}
</style>
<style lang="postcss">
.active-content {
  & p {
    & img {
      width: 100%;
    }
  }
}
</style>