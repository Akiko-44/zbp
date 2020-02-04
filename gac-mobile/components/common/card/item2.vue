<template>
<div class="app-card-item2 flex-row">
  <div class="card-img lazy-img-box" v-lazy:background-image="setImg(imgUrl, { w: 400 })"></div>
  <div class="card-info column-center">
    <h4>{{title}}</h4>
    <span class="dark-gray">{{describe}}</span>
  </div>
</div>
</template>

<style lang="postcss">
.app-card-item2 {
  & .card-img {
    margin-right: 8px;
    width: 120px;
    height: 90px;
    background-color: var(--light-gray);
    border-radius: 3px;
  }
  & .card-info {
    flex: 1;
    font-size: 12px;
    & h4 {
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>

<script>
import { setImg } from '~/utils/qiniu'

export default {
  props: {
    imgUrl: String,
    describe: String,
    title: String
  },
  methods: {
    setImg
  }
}
</script>
