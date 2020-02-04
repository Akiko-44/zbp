<template>
  <AppView title="公告">
    <!--<div>
	    <van-nav-bar
		  title="公告"
		  left-arrow
		  @click-left="back"
		/>
	</div>-->
    <div class="active-detail">
      <div class="active-header">
        <h3>{{detail.noticeName}}</h3>
      </div>
      <div class="active-time">{{detail.addTime}}</div>
      <div class="active-content"
           v-html="detail.noticeDetails"></div>
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
  head() {
    return {
      title: '公告详情'
    }
  },
  beforeMount() {
    this.$service('noticeDetail', { data: { id: this.$route.query.id } }).then(result => {
      this.detail = result.data
    })
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    back() {
      this.$router.go(-1)
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
      font-size: 16px;
      font-weight: bold;
    }
  }
  & .active-time {
    margin: 20px 0;
    color: #a9a9a9;
    font-size: 14px;
  }
  & .active-content {
    & p {
      color: #585858;
      line-height: 23px;
      & img {
        width: 100%;
      }
    }
  }
}
</style>
<style lang="postcss">
.active-content {
  & p {
    color: #585858;
    line-height: 23px;
    & img {
      width: 100%;
    }
  }
}
</style>