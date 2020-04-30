<template>
  <div class="app-card-item">
    <div class="card-main flex-row">
      <!-- <img
        class="card-image"
        :src="data.imgUrl"
        alt=""
      /> -->
      <div
        class="img-box"
        :class="!data.isOnSale ? 'no-sale-img' : ''"
      >
        <img
          class="card-image"
          :src="data.imgUrl"
        >
        <div
          class="no-sale-text"
          v-if="!data.isOnSale"
        >
          <p>已下架</p>
        </div>
      </div>
      <div class="card-info">
        <div class="card-name">
          {{ data.title }}
        </div>
        <p class="card-else">
          <span class="column-box">
            <span class="column">{{ data.columnName }}</span>
          </span>
          <span>
            <img
              src="../../../../assets/images/icon/collected.png"
              width="10"
            > {{ collectNum}}</span>
        </p>
      </div>
      <van-button
        class="btn collect-btn"
        color="#999999"
        v-if="isCollect"
        @click.native.stop="collect(2)"
        plain
      >已收藏</van-button>
      <van-button
        class="btn collect-btn"
        color="#DF735A"
        v-if="!isCollect"
        @click.native.stop="collect(1)"
      >收藏</van-button>

      <slot />
    </div>
  </div>
  </div>
</template>

<script>
import { setImg } from "~/utils/qiniu";

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isCollect: true,
      collectNum: undefined
    }
  },
  created() {
    this.collectNum = this.data.collectNumber
  },
  methods: {
    setImg,
    collect(type) {
      this.$service("userCollectOrDelete", {
        resources: [type, this.data.id, 8]
      }).then(result => {
        this.collectNum = result.data
        this.isCollect = !this.isCollect
        this.$emit('collectCircleSuccess', this.isCollect)
      })
    }
  }
};
</script>

<style lang="postcss" scoped>
.app-card-item {
  padding: 10px 10px 0;
  font-size: 14px;
  color: var(--black);
  background-color: white;
  line-height: 18px;
  & .card-main {
    padding-bottom: 10px;
  }
  & .img-box.no-sale-img {
    width: 92px;
    height: 92px;
    position: relative;
    z-index: 1;
    margin: 0 auto;
    background: #000;
    & img {
      opacity: 0.5;
      filter: alpha(opacity=50);
    }
    & .no-sale-text {
      width: 100%;
      position: absolute;
      z-index: 2;
      top: 50%;
      margin-top: -9px;
      text-align: center;
      color: #fff;
    }
  }
  & .card-image {
    width: 92px;
    height: 92px;
  }
  & .card-info {
    position: relative;
    flex: 1;
    margin-left: 15px;
  }
  & .card-name {
    /* flex: 1; */
    margin-bottom: 10px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  & .card-brief {
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 36px;
  }
  & .card-else {
    position: absolute;
    bottom: 5px;
    font-size: 11px;
    color: #999;
  }
  & .column-box {
    display: inline-block;
    width: 80px;
  }
  & .card-else .column {
    padding: 0 6px;
    line-height: 17px;
    text-align: center;
    color: #fb746e;
    border: 1px solid #fb746e;
    display: inline-block;
    font-size: 11px;
    border-radius: 2px;
  }
  & .card-describe {
    line-height: 22px;
  }
  & .btn {
    position: absolute;
    right: 10px;
    bottom: 15px;
    padding: 0;
    width: 47px;
    height: 20px;
    line-height: 20px;
    font-size: 11px;
    border-radius: 3px;
  }
}
</style>
