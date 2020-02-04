<template>
  <div class="thumbnail" @click="$emit('click', id)">
    <img class="img" v-lazy="setImg(img, { w: 800 })" v-size="{img: img, name}">
    <div class="text" v-if="text">
      <p class="van-ellipsis" :style="{fontSize: fontSize + 'px'}">{{text}}</p>
    </div>
  </div>
</template>

<script>
import { setImg } from '~/utils/filters'

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    text: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 15
    },
    name: {
      type: [String, Number],
      default: Date.now()
    }
  },
  methods: {
    setImg
  }
}
</script>

<style lang="postcss" scoped>
.thumbnail {
  position: relative;
  min-height: 150px;
  background-color: #efefef;
  & img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
  & img[lazy="error"] {
    width: 100px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: -20px;
    bottom: 0;
  }
  & .text {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 27px;
    line-height: 27px;
    background: rgba(0, 0, 0, 0.24);
    color: white;
    & p {
      padding: 0 10px;
    }
  }
}
</style>
