<template>
  <AppView class="tip"
           title="详情">
    <div class="box">
      <h1>{{data.title}}</h1>
      <div class="time">
        <div>
          <span v-if="data.orderNumber">时间：</span>
          <span>{{data.time}}</span>
        </div>
        <div v-if="data.orderNumber">
          <span>订单：{{data.orderNumber}}</span>
        </div>
      </div>
      <div v-if="data.content"
           v-lazy-container="{ selector: 'img' }"
           v-html="lazyImgHtml(data.content)"
           class="imgs"></div>
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
    this.data = this.$route.query.data ? JSON.parse(this.$route.query.data) : {}
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
  /* width: 100%; */
  margin: 20px 28px;
  padding: 20px 10px;
  font-size: 13px;
  color: #666;
  background: #fff;
  border-radius: 10px;
  & h1 {
    color: #333;
    font-size: 18px;
  }
  & .time {
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