<template>
  <div class="card-box">
    <div class="card-img lazy-img-box">
      <img :src="setImg(imgUrl, { w: 400 })" />
    </div>
    <div class="card-info">
      <h4>{{title}}</h4>
      <span class="red"
            v-if="price">￥{{price.toFixed(2)}}</span>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.card-box {
  overflow: hidden;
  /* padding: 0 10px 10px; */
  border-radius: 5px;
}
.card-img {
  height: 160px;
  overflow: hidden;
  background-color: var(--light-gray);
  & img {
    width: 100%;
    height: 100%;
  }
}
.card-info {
  padding: 4px;
  font-size: 14px;
  line-height: 20px;
  background: #fff;
  & h4 {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>

<script>
import { setImg } from '~/utils/qiniu'

export default {
  props: {
    imgUrl: String,
    price: Number,
    title: String
  },
  methods: {
    setImg
  }
}
</script>
