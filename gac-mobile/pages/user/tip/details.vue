<template>
  <AppView
    class="tip"
    title="详情"
  >
    <div class="box">
      <h1>{{data.title}}</h1>
      <p class="time">{{data.sendTime}}</p>
      <!-- <div class="time">
        <div>
          <span v-if="data.orderNumber">时间：</span>
          <span>{{data.time}}</span>
        </div>
        <div v-if="data.orderNumber">
          <span>订单：{{data.orderNumber}}</span>
        </div>
      </div> -->
      <div
        v-if="data.content"
        v-lazy-container="{ selector: 'img' }"
        v-html="lazyImgHtml(data.content)"
        class="imgs"
      ></div>
    </div>
  </AppView>
</template>

<script>
import { setImg } from '~/utils/qiniu'
import { lazyImgHtml } from '~/utils/filters'

export default {
  data() {
    return {
      data: {}
    }
  },
  beforeMount() {

  },
  activated() {
    // this.data = this.$route.query.data ? JSON.parse(this.$route.query.data) : {}
    this.$service("userMessageDetail", { params: { id: this.$route.query.id } })
      .then((res) => {
        this.data = res.data
      })
      .catch(() => { })
    //消息已读
    // this.$service("messageSystemRead", { data: { id: this.$route.query.id } })
    //   .then(() => { })
    //   .catch(() => { })
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setImg,
    lazyImgHtml
  }
}
</script>
<style lang="postcss" scoped>
.box {
  padding: 10px;
  font-size: 13px;
  color: #666;
  & h1 {
    color: #333;
    font-size: 18px;
  }
  & .time {
    color: #999;
    padding: 12px 0;
    line-height: 18px;
    font-size: 12px;
  }
}
.imgs >>> img {
  width: 100%;
}
.imgs >>> p {
  line-height: 25px;
}
</style>
