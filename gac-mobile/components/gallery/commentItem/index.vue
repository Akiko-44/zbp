<template>
<div :class="'comment-item row-between van-hairline--bottom ' + type">
  <div class="left flex-row">
    <div class="userimg">
      <img v-lazy="item.img">
    </div>
    <div class="text">
      <p class="word-break">{{item.name.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")}}</p>
      <p class="word-break">{{item.text}}</p>
    </div>
  </div>
  <div class="right">
    <span class="date">{{item.date | ago}}</span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    // 样式风格
    type: {
      type: String,
      default: 'dark'
    },
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.comment-item {
  padding: 15px 0;
  & .userimg {
    margin-right: 8px;
    width: 30px;
    height: 30px;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: var(--light-gray);
    }
  }
  & .text {
    font-size: 15px;
    flex: 1;
    & p {
      margin-bottom: 10px;
    }
  }
  & .date {
    color: #b2b2b2;
    font-size: 10px;
  }
  & .left {
    width: 85%;
  }
}

.comment-item.light {
  &.van-hairline--bottom::after {
    opacity: 0.15;
  }
  & p:first-child {
    color: var(--gray);
  }
  & p:last-child {
    color: var(--dark-gray);
  }
}
.comment-item.dark {
  & p:first-child {
    color: #b2b2b2;
  }
  & p:last-child {
    color: #666;
  }
}
</style>
