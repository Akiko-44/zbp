<template>
  <div class="comment-item">
    <div class="top row-between">
      <div class="top-left item-center">
        <div class="img lazy-img-box" v-lazy:background-image="img"></div>
        <strong>{{name.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")}}</strong>
      </div>
      <div class="top-right">
        <!-- <span>{{praise}}</span> -->
        <!-- <i class="ico-praise"></i> -->
      </div>
    </div>
    <div class="content">
      <p class="word-break">{{content}}</p>
    </div>
    <div class="bottom van-hairline--bottom">
      <p>{{date | ago}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: require('~/assets/images/avatar.png')
    },
    name: String,
    content: String,
    date: String
  }
}
</script>

<style lang="postcss" scoped>
.comment-item {
  padding: 18px 18px 0;
}
.top-left {
  & .img {
    margin-right: 12px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  & strong {
    color: var(--black);
    font-size: 12px;
    font-weight: bold;
  }
}
.top-right {
  & span {
    color: #4d4d4d;
    font-size: 11px;
  }
}
.content {
  padding: 10px 0 14px;
  margin-left: 35px;
  & p {
    color: #141414;
    font-size: 16px;
    line-height: 22px;
    text-align: justify;
  }
}
.bottom {
  padding-bottom: 18px;
  margin-left: 35px;
  & p {
    color: var(--dark-gray);
    font-size: 11px;
  }
}
</style>
