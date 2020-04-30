<template>
  <div class="app-card-item">
    <div class="card-title d-flex j-sb a-center">
      <span
        class="text-black"
        v-if="data.type === 2"
      >举报类型：{{data.reportTypeName}}</span>
      <span
        class="text-black"
        v-else
      >举报类型：{{data.appealTypeName}}</span>
      <span
        class="text-dark-gray"
        v-if="data.type === 2"
      >{{reportStatusMap[data.reportStatus]}}</span>
      <span
        class="text-dark-gray"
        v-else
      >{{appealStatusMap[data.appealStatus]}}</span>
    </div>
    <div class="card-main d-flex">
      <div
        class="card-image lazy-img-box"
        v-lazy:background-image="setImg(data.thumbnail, { w: 400 })"
      ></div>
      <div class="card-info d-flex flex-column j-sb">
        <p class="card-name text-hidden text-black">
          {{data.title}}
        </p>
        <p class="d-flex j-sb a-center">
          <span class="text-light-black">作者：{{data.authorName}}</span>
          <span class="text-dark-gray">{{ data.createTime }}</span>
        </p>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { setImg } from '~/utils/qiniu'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      reportStatusMap: {
        1: '待审核',
        2: '举报成功',
        3: '举报失败',
      },
      appealStatusMap: {
        0: '待申诉',
        1: '申诉中',
        2: '申诉成功',
        3: '申诉失败',
      }
    }
  },
  methods: {
    setImg
  }
}
</script>

<style lang="postcss" scoped>
.app-card-item {
  font-size: 12px;
  background-color: white;
  & .card-title {
    line-height: 26px;
    padding: 0 10px;
    border-bottom: 1px solid #f2f2f2;
  }
  & .card-main {
    padding: 10px;
  }
  & .card-image {
    width: 54px;
    height: 54px;
    border-radius: 4px;
  }
  & .card-info {
    width: 265px;
    padding: 5px 0 8px 16px;
  }
}
</style>
