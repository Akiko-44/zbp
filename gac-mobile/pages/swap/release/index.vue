<template>
  <AppView class="Release" title="信息发布">
    <van-cell-group>
      <van-cell title="销售信息发布" is-link :to="{name: 'swap-release-general', query: { type: 2 }}" />
      <van-cell title="互换信息发布" is-link :to="{name: 'swap-release-general', query: { type: 1 }}" />
      <van-cell title="拍卖信息发布" is-link :to="{name: 'swap-release-auction'}"/>
      <van-cell title="回收信息发布" is-link :to="{name: 'swap-release-recycle'}" />
    </van-cell-group>
  </AppView>
</template>
