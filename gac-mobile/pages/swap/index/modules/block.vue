<template>
  <div class="app-home-block">
    <div class="block-header row-between">
      <strong class="block-title">{{title}}</strong>
      <nuxt-link class="more" :to="link">
        更多
        <van-icon class="more-icon" name="arrow" color="#999" />
      </nuxt-link>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    link: Object
  }
}
</script>

<style lang="postcss">
.app-home-block {
  padding: 20px 12px 10px;
  width: 100%;
  box-sizing: border-box;
  & .block-header {
    margin-bottom: 15px;
  }
  & .block-title {
    font-size: 16px;
    color: var(--black);
    font-weight: bold;
  }
  & .more {
    font-size: 12px;
    color: var(--dark-gray);
  }
  & .more-icon {
    font-size: 12px;
    transform: scale(0.7);
    top: 2px;
  }
}
</style>
