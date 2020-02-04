<template>
  <AppView class="box"
           title="工艺详情">
    <div class="intro">
      <h1>{{detail.craftName}}</h1>
      <div style="float: left;">工艺介绍：</div>
      <div v-html="detail.intro"></div>
    </div>
    <div>
      <video v-if="detail.videoUrl"
             controls="controls"
             class="video"
             :src="detail.videoUrl" />
    </div>
  </AppView>
</template>

<script>
import { domain } from '@/utils/qiniu'
import { Toast } from 'vant'
export default {
  data() {
    return {
      domain,
      detail: {}
    }
  },
  head() {
    return {
      title: this.detail.craftName || ''
    }
  },
  beforeMount() {
    this.$loading(this.$service('makerArt', { resources: [this.$route.query.id] }))
      .then(result => {
        this.detail = result.data
      })
  },
  deactivated() {
    this.$destroy()
  },
  methods: {

  }
}
</script>

<style>
.box {
  & .intro {
    padding: 10px;
    & div {
      padding-top: 10px;
      font-size: 12px;
      line-height: 16px;
      & img {
        width: 100%;
      }
    }
  }
  & .video {
    width: 100%;
  }
}
</style>