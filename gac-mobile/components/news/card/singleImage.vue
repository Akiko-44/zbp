<template>
  <div class="card" @click="$emit('click', id)">
    <div class="card-inner row-between van-hairline--bottom">
      <div class="left">
        <div class="img lazy-img-box" v-lazy:background-image="setImg(img)"></div>
      </div>
      <div class="content word-break">
        <h4 class="title">{{title}}</h4>
        <p class="van-ellipsis desc">{{desc}}</p>
      </div>
      <div class="right">
        <span class="comment">{{comment}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setImg } from '~/utils/filters'

export default {
  props: {
    img: {
      type: String,
      default: ''
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
      type: [String, Number],
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
  }
  & .content {
    margin-right: 8px;
    flex: 1;
  }
  & .title {
    margin-top: -2px;
    font-size: 15px;
    line-height: 20px;
    color: var(--black);
  }
  & .desc {
    margin-top: 11px;
    font-size: 10px;
    color: #4d4d4d;
  }
  & .comment {
    position: absolute;
    bottom: 0;
    font-size: 10px;
    color: #b3b3b3;
    text-align: right;
    width: 100%;
  }
  & .right {
    position: relative;
    width: 65px;
  }
}
</style>
