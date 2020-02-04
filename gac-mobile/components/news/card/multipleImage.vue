<template>
  <div class="card" @click="$emit('click', id)">
    <div class="card-inner van-hairline--bottom">
      <div class="top">
        <h4 class="title word-break">{{title}}</h4>
      </div>
      <div class="content flex-row">
        <div v-for="(img, index) in imgs" :key="index" class="img lazy-img-box" v-lazy:background-image="setImg(img)"></div>
      </div>
      <div class="bottom">
        <span class="desc">{{desc}}</span>
        <span class="comment">{{comment}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setImg } from '~/utils/filters'

export default {
  props: {
    imgs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    setImg
  }
}
</script>

<style lang="postcss" scoped>
.card {
  padding: 12px 12px 0 12px;
  & .card-inner {
    padding-bottom: 12px;
  }
  & .img {
    margin-right: 15px;
    width: 70px;
    height: 70px;
    &:last-child {
      margin-right: 0;
    }
  }
  & .content {
    margin: 10px 0;
  }
  & .title {
    margin-top: -2px;
    font-size: 15px;
    line-height: 20px;
    color: var(--black);
  }
  & .desc {
    padding-right: 15px;
    font-size: 10px;
    color: #4d4d4d;
  }
  & .comment {
    font-size: 10px;
    color: #b3b3b3;
  }
}
</style>
